/**
 * 簡繁切換
 *
 * - 預設顯示繁體（也就是你原本寫的稿子）
 * - 點一下切成簡體：台灣用語會一併轉成大陸用語（檔案→文件、軟體→软件）
 * - 選擇會存進 localStorage，換頁、下次造訪都記得
 * - 也支援網址參數：?lang=cn / ?lang=tw，方便分享指定版本
 * - 字典是動態載入的（gzip 後約 52KB），沒切到簡體就不會下載
 */

const STORAGE_KEY = "pref-lang";

type Variant = "tw" | "cn";
type Convert = (text: string) => string;

// 這些元素裡的文字不轉：程式碼、指令、輸入框
// 用 closest 判斷祖先，因為程式碼高亮會把內容包在 <span> 裡
const SKIP_SELECTOR = [
  "pre",
  "code",
  "kbd",
  "samp",
  "script",
  "style",
  "noscript",
  "textarea",
  "[data-no-convert]",
].join(", ");

// 有中文字的節點才需要處理（數字、符號、emoji 一律跳過）
const HAS_CJK = /[\u3400-\u9fff]/;

let current: Variant = "tw";
let convertText: Convert | null = null;
let converterPromise: Promise<Convert> | null = null;
let observer: MutationObserver | null = null;

// 記住每個文字節點的原稿，才能無損切回繁體
const originals = new WeakMap<Text, string>();
const originalTitle = document.title;

async function getConverter(): Promise<Convert> {
  if (!converterPromise) {
    converterPromise = import("opencc-js/t2cn").then(OpenCC => {
      // twp = 台灣正體（含台灣用語），cn = 大陸簡體
      convertText = OpenCC.Converter({ from: "twp", to: "cn" });
      return convertText;
    });
  }
  return converterPromise;
}

function collectTextNodes(root: Node): Text[] {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  let node = walker.nextNode();
  while (node) {
    nodes.push(node as Text);
    node = walker.nextNode();
  }
  return nodes;
}

function convertNode(node: Text, convert: Convert) {
  const parent = node.parentElement;
  if (!parent || parent.closest(SKIP_SELECTOR)) return;

  const value = node.nodeValue;
  if (!value || !HAS_CJK.test(value)) return;

  if (!originals.has(node)) originals.set(node, value);

  const converted = convert(originals.get(node) ?? value);
  if (converted !== node.nodeValue) node.nodeValue = converted;
}

function convertWithin(root: Node, convert: Convert) {
  for (const node of collectTextNodes(root)) convertNode(node, convert);
}

function restoreWithin(root: Node) {
  for (const node of collectTextNodes(root)) {
    const original = originals.get(node);
    if (original !== undefined) {
      node.nodeValue = original;
      originals.delete(node);
    }
  }
}

// 搜尋結果等內容是點擊後才插入頁面的，補轉一次
function startObserver() {
  if (observer || !convertText) return;

  observer = new MutationObserver(records => {
    if (current !== "cn" || !convertText) return;
    const convert = convertText;

    for (const record of records) {
      record.addedNodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE) {
          convertNode(node as Text, convert);
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          convertWithin(node, convert);
        }
      });
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

function stopObserver() {
  observer?.disconnect();
  observer = null;
}

async function toSimplified() {
  const convert = await getConverter();

  convertWithin(document.body, convert);
  if (originalTitle) document.title = convert(originalTitle);
  document.documentElement.setAttribute("lang", "zh-Hans");

  startObserver();
}

function toTraditional() {
  stopObserver();
  restoreWithin(document.body);

  if (originalTitle) document.title = originalTitle;
  document.documentElement.setAttribute("lang", "zh-Hant");
}

function syncButtons(variant: Variant) {
  document
    .querySelectorAll<HTMLButtonElement>("[data-lang-toggle]")
    .forEach(btn => {
      btn.textContent = variant === "cn" ? "简" : "繁";
      btn.dataset.variant = variant;

      const label = variant === "cn" ? "切換成繁體" : "切換成簡體";
      btn.setAttribute("aria-label", label);
      btn.setAttribute("title", label);
    });
}

function persistVariant(variant: Variant) {
  try {
    localStorage.setItem(STORAGE_KEY, variant);
  } catch {
    // 無痕模式等情況下可能寫不進去，忽略即可
  }
}

async function setVariant(next: Variant, persist = true) {
  if (next === current) {
    syncButtons(next);
    if (persist) persistVariant(next);
    return;
  }

  const prev = current;
  current = next;

  try {
    if (next === "cn") {
      await toSimplified();
    } else {
      toTraditional();
    }
  } catch (error) {
    // 字典下載失敗等情況：還原狀態，避免按鈕顯示與頁面內容不一致
    current = prev;
    syncButtons(prev);
    throw error;
  }

  if (persist) persistVariant(next);
  syncButtons(next);
}

function bindToggle() {
  document
    .querySelectorAll<HTMLButtonElement>("[data-lang-toggle]")
    .forEach(btn => {
      if (btn.dataset.bound === "true") return;
      btn.dataset.bound = "true";

      btn.addEventListener("click", async () => {
        // 手動切換後移除 ?lang，否則重新整理會被網址參數蓋回去
        const url = new URL(location.href);
        if (url.searchParams.has("lang")) {
          url.searchParams.delete("lang");
          history.replaceState(null, "", url);
        }

        btn.setAttribute("aria-busy", "true");
        try {
          await setVariant(current === "cn" ? "tw" : "cn");
        } catch (error) {
          console.error("簡繁切換失敗", error);
        } finally {
          btn.removeAttribute("aria-busy");
        }
      });
    });
}

function initialVariant(): Variant {
  const forced = new URLSearchParams(location.search).get("lang");
  if (forced === "cn" || forced === "tw") return forced;

  try {
    return localStorage.getItem(STORAGE_KEY) === "cn" ? "cn" : "tw";
  } catch {
    return "tw";
  }
}

async function init() {
  syncButtons(current);
  bindToggle();

  // 不論簡繁都寫回 localStorage，讓 ?lang 參數在換頁後也能延續
  await setVariant(initialVariant());
}

void init();
