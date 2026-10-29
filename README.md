# woobrothers.my

Woo Brothers 农业 App 网站。免费、非营利。

## 文件

| 文件 | 用途 |
|---|---|
| `index.html` | 网站页面（首页、App 目录、App 详情页） |
| `apps.json` | **所有 App 的资料**。加 App 只改这个文件 |
| `img/` | logo、封面、截图 |
| `img/brand/` | 网站 logo、主屏幕图标、WhatsApp 分享图。`logo-source.png` 是原图 |
| `favicon.ico` `apple-touch-icon.png` `site.webmanifest` | 浏览器图标和加到主屏幕的设定，不要删 |
| `CNAME` | 域名 woobrothers.my，不要删 |

## 加一个新 App

朋友要加 App：请他们照 [`app-template.md`](app-template.md) 填好，连同图片发过来。

1. 把图片上传到 `img/`，例如 `img/myapp-logo.png`。
2. 打开 `apps.json`，复制一整个 `{ … }` 区块，贴在最后一个 App 后面。
3. 前一个 App 的 `}` 后面要加逗号 `,`。
4. 修改内容，然后 Commit。大约一分钟后网站会更新。

## 每个字段

| 字段 | 意思 | 例子 |
|---|---|---|
| `id` | 代号，小写英文、数字、`-`，不能重复 | `"comparecast"` |
| `name` | App 名字 | `"CompareCast"` |
| `category` | 类别：`weather`（天气与气候）`field` `pest` `learn` `manage`。类别按钮按这个顺序排列 | `"weather"` |
| `url` | App 网址；还没有就写 `null` | `"https://…"` |
| `added` | 加进网站的日期（马来西亚时间）。用途：「最新在前 / 最旧在前」排序；详情页显示「上架日期」；7 天内加的 App 卡片上自动显示「新」标签。同一天的按 `apps.json` 里的先后，所以新 App 一律加在最后 | `"2026-10-22"` |
| `logo` / `cover` | 图片路径；没有就写 `null` | `"img/myapp-logo.png"` |
| `cover` 多张 | 放几张图片就会自动轮播（每 5 秒换一张，也可以左右滑） | `["img/myapp-cover.jpg", "img/myapp-cover-2.jpg"]` |
| `languages` | 支持的语言 | `["BM", "EN", "华"]` |
| `keywords` | 额外搜索关键字，用空格分开 | `"rain hujan 下雨"` |
| `screenshots` | 截图路径列表，可以空 `[]` | `["img/myapp-1.png"]` |
| `zh` / `en` / `ms` | 三种语言的 `tagline`（一句话）、`description`（介绍）、`features`（功能列表） | |
| `demo` | 互动图表，不需要就写 `null` | 见下面 |

## 互动图表 `demo`

- `"type": "compare"`：柱子 = 实际值，线 = 几种预测，自动算准确度。需要 `xLabels`、`bars`、`lines`。
- `"type": "trend"`：几条线随时间变化。需要 `xLabels`、`lines`。

文字可以写一种（`"ECMWF IFS"`），也可以三种语言（`{ "zh": "…", "en": "…", "ms": "…" }`）。

## 常见错误

- 两个 App 之间少了逗号，或者列表最后一项后面多了逗号。
- 用了中文引号 `“ ”`。必须用英文 `" "`。
- `null` 不要加引号。

格式出错时，App 目录页会显示红色提示和出错的行号。
