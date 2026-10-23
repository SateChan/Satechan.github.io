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
 | ID | 格式 | 分辨率 | 帧率 | 编码 (VCodec) | 音频 (ACodec) | 说明 |
| :--- | :--- | :--- | :---: | :--- | :--- | :--- |
| **30232** | m4a | - | - | - | `mp4a.40.2` (104k) | **推荐音频** |
| **30216** | m4a | - | - | - | `mp4a.40.5` (54k) | 音频 (省流量) |
| **100101** | mp4 | 1280x720 | 30 | `avc1.640028` (兼容好) | - | 720p 视频 |
| **100103** | mp4 | 1920x1080 | 30 | `avc1.640032` (兼容好) | - | 1080p 视频 |
| **100026** | mp4 | 1920x1080 | 30 | `av01.0.00M.10` (高压缩) | - | 1080p (体积小) |
- `yt-dlp -F "bv*+ba/b" "视频链接"` 下載最佳畫質策略  
- `yt-dlp -o "~/Downloads/%(title)s.%(ext)s" "视频链接"` 下載到指定位置  
- `yt-dlp -f 137+140 "视频链接"` 下載列出的視頻編號137與音頻編號140並合併  
- `yt-dlp -x --audio-format mp3 "视频链接"` 提取音頻並轉化爲mp3格式  
- `--cookies-from-browser chrome` 讀取瀏覽器cookie





