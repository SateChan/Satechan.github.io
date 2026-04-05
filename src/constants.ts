import type { Props } from "astro";
import IconMail from "@/assets/icons/IconMail.svg";
import IconGitHub from "@/assets/icons/IconGitHub.svg";
import IconBrandX from "@/assets/icons/IconBrandX.svg";
import IconFacebook from "@/assets/icons/IconFacebook.svg";
import IconTelegram from "@/assets/icons/IconTelegram.svg";
import IconWechat from "@/assets/icons/IconWechat.svg";
import IconQq from "@/assets/icons/IconQq.svg";
import IconTiktok from "@/assets/icons/IconTiktok.svg";
import IconBilbili from "@/assets/icons/IconBilibili.svg";
import { SITE } from "@/config";

interface Social {
  name: string;
  href: string;
  linkTitle: string;
  icon: (_props: Props) => Element;
}

export const SOCIALS: Social[] = [
  {
    name: "微信",
    href: "javascript:void(0)",
    linkTitle: `沙茶ちゃん個WeChat`,
    icon: IconWechat,
  },
  {
    name: "QQ",
    href: "http://connect.qq.com/widget/shareqq/index.html?url=",
    linkTitle: `沙茶ちゃん個QQ`,
    icon: IconQq,
  },
  {
    name: "抖音",
    href: "https://v.douyin.com/fzIEyjuOxgg/",
    linkTitle: `沙茶ちゃん個抖音`,
    icon: IconTiktok,
  },
    {
    name: "Bilibili",
    href: "https://space.bilibili.com/502920505",
    linkTitle: `沙茶ちゃん個Bilibili`,
    icon: IconBilbili,
  },
  {
    name: "GitHub",
    href: "https://github.com/SateChan",
    linkTitle: `沙茶ちゃん個GitHub`,
    icon: IconGitHub,
  },
  {
    name: "X",
    href: "https://x.com/satechan08",
    linkTitle: `沙茶ちゃん個X`,
    icon: IconBrandX,
  },
  {
    name: "郵箱",
    href: "mailto:3467379193@qq.com",
    linkTitle: `
    沙茶ちゃん個郵箱
    3467379193@qq.com`,
    icon: IconMail,
  },
] as const;

export const SHARE_LINKS: Social[] = [
  {
    name: "微信",
    href: "javascript:alert('請複製網頁連結後，在微信中貼上分享給好友')", 
    linkTitle: `來去微信中分享`,
    icon: IconWechat,
  },
  {
    name: "QQ",
    href: "https://connect.qq.com/widget/shareqq/index.html?url=", 
    linkTitle: `來去QQ中分享`,
    icon: IconQq,
  },
  {
    name: "X",
    href: "https://x.com/intent/post?url=",
    linkTitle: `來去X分享`,
    icon: IconBrandX,
  },
  {
    name: "Telegram",
    href: "https://t.me/share/url?url=",
    linkTitle: `來去Telegram分享`,
    icon: IconTelegram,
  },
] as const;
