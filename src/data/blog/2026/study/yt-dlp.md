---
title: "yt-dlp 命令歸納"
author: "沙茶ちゃん"
pubDatetime: 2026-10-22
description: "yt-dlp 命令歸納，留作参考用。"
tags:
  - 命令
  - 参考
featured: true
draft: false
---

# 日常使用
```
`yt-dlp --cookies-from-browser chrome -F "bv*+ba/b" -o "~/Downloads/%(title)s.%(ext)s" "URL"`
```

# 注釋
- `yt-dlp -U` 更新yt-dlp
- `yt-dlp -F "视频链接"` 查詢視頻所有畫質與音頻編號
  - `yt-dlp -F "https://www.bilibili.com/video/BV1fdUYYWEJM"`
  - ![輸出](../../../../assets/images/yt-dlp-f.png)
  - *視頻格式優先選擇兼容性良好的hav*
  - `yt-dlp -f 30280+100103 "视频链接"` 下載列出的視頻編號137與音頻編號140並合併
- `yt-dlp -F "bv*+ba/b" "视频链接"` 下載最佳畫質策略
- `yt-dlp -o "~/Downloads/%(title)s.%(ext)s" "视频链接"` 下載到指定位置
- `yt-dlp -x --audio-format mp3 "视频链接"` 提取音頻並轉化爲mp3格式
- `--cookies-from-browser chrome` 讀取瀏覽器cookie





