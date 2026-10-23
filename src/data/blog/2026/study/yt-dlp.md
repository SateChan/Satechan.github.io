---
title: "yt-dlp 命令归纳"
author: "沙茶ちゃん"
pubDatetime: 2026-10-22
description: "yt-dlp 命令归纳，留作参考用。"
tags:
  - 命令
  - 参考
featured: true
draft: false
---

- `yt-dlp -U` 更新yt-dlp  
- `yt-dlp -F "视频链接"` 查詢視頻所有畫質與音頻編號
 - `yt-dlp -F "https://www.bilibili.com/video/BV1fdUYYWEJM"`  
ID     EXT RESOLUTION FPS │  FILESIZE   TBR PROTO │ VCODEC          VBR ACODEC      ABR
───────────────────────────────────────────────────────────────────────────────────────
30216  m4a audio only     │ ≈ 1.80MiB   54k https │ audio only          mp4a.40.5   54k
30232  m4a audio only     │ ≈ 3.44MiB  104k https │ audio only          mp4a.40.2  104k
30280  m4a audio only     │ ≈ 3.44MiB  104k https │ audio only          mp4a.40.2  104k
100099 mp4 640x360     30 │ ≈14.85MiB  447k https │ avc1.64001E    447k video only
100109 mp4 640x360     30 │ ≈ 9.40MiB  283k https │ hev1.1.6.L120  283k video only
100022 mp4 640x360     30 │ ≈10.51MiB  316k https │ av01.0.00M.10  316k video only
100100 mp4 852x480     30 │ ≈24.83MiB  748k https │ avc1.64001F    748k video only
100110 mp4 852x480     30 │ ≈13.15MiB  396k https │ hev1.1.6.L120  396k video only
100023 mp4 852x480     30 │ ≈16.85MiB  507k https │ av01.0.00M.10  507k video only
100101 mp4 1280x720    30 │ ≈44.47MiB 1340k https │ avc1.640028   1340k video only
100111 mp4 1280x720    30 │ ≈20.59MiB  620k https │ hev1.1.6.L120  620k video only
100024 mp4 1280x720    30 │ ≈19.97MiB  602k https │ av01.0.00M.10  602k video only
100103 mp4 1920x1080   30 │ ≈86.00MiB 2590k https │ avc1.640032   2590k video only
100113 mp4 1920x1080   30 │ ≈41.63MiB 1254k https │ hev1.1.6.L150 1254k video only
100026 mp4 1920x1080   30 │ ≈32.91MiB  991k https │ av01.0.00M.10  991k video only
- `yt-dlp -F "bv*+ba/b" "视频链接"` 下載最佳畫質策略  
- `yt-dlp -o "~/Downloads/%(title)s.%(ext)s" "视频链接"` 下載到指定位置  
- `yt-dlp -f 137+140 "视频链接"` 下載列出的視頻編號137與音頻編號140並合併  
- `yt-dlp -x --audio-format mp3 "视频链接"` 提取音頻並轉化爲mp3格式  
- `--cookies-from-browser chrome` 讀取瀏覽器cookie





