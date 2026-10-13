# 所有 App 都要有的功能 · Standards for every app

Woo Brothers 的每一个 App，现有的和以后新做的，都要符合这里的要求。

## 1. 更新后弹出「更新了什么」

App 一更新，使用者下次打开时就要看到一个弹窗，写清楚：

- **版本号**，例如 `v1.2.0`
- **更新日期**，例如 `2026-10-13`
- **更新了哪些功能 / 修好了什么**，用 App 支持的每一种语言写（华文 / English / BM）

另外，App 的「关于 / 设置 / Info」页面要显示目前的版本号和日期，并能打开全部更新记录。

第一次安装 App 的新用户不用看到这个弹窗，因为他们没有旧版本可以比较。

### 怎么做

1. 把 [`shared/whatsnew.js`](shared/whatsnew.js) 复制到 App 里，用 `<script src="whatsnew.js"></script>` 载入，并把它加进 service worker 的离线缓存清单。
2. 在 App 里放一份更新记录，最新的放最前面：

   ```js
   const RELEASES = [
     { v: "1.1.0", date: "2026-10-13", notes: {
       zh: ["新增：……", "修好：……"],
       en: ["New: …", "Fixed: …"],
       ms: ["Baharu: …", "Dibaiki: …"] } },
     { v: "1.0.0", date: "2026-09-30", notes: { zh: ["第一版"], en: ["First release"], ms: ["Keluaran pertama"] } },
   ];
   ```

3. App 启动后调用一次：

   ```js
   WhatsNew.init({
     version: RELEASES[0].v,
     releases: RELEASES,
     key: "<app代号>.seenVersion",      // 记住上次看过的版本
     lang: () => currentLang,            // 'zh' | 'zht' | 'en' | 'ms'
     isNewUser: () => firstEverLaunch,   // 第一次打开时为 true
   });
   ```

4. 在「关于」页面显示 `WhatsNew.label(RELEASES)`（例如 `v1.1.0 · 2026-10-13`），并放一个连结调用 `WhatsNew.history()` 打开全部更新记录。

### 每次发布新版本

- 在 `RELEASES` 最前面加一条：新的版本号、今天的日期、每种语言写改了什么。写给一般使用者看，不写技术细节。
- 版本号规则：只修 bug 加最后一位（1.1.0 → 1.1.1），加新功能加中间一位（1.1.1 → 1.2.0），大改版加第一位。
- App 要能自己发现新版本并更新（或提示「有新版本，立即更新？」），不能要使用者手动清缓存。

### 目前的 App

| App | 更新记录放在 |
|---|---|
| CompareCast | `app.js` 的 `RELEASES` |
| NDVI | `index.html` 的 `RELEASES` |
| Oil Palm Wiki | `js/releases.js` |
| Oil Palm Basics (SawitBasics) | `releases.js` |
| Meteorology | `data/releases.json` |
| Plant Physiology | `data/releases.json` |
| Bible | `js/releases.js` |
| Learn Statistics | `index.html` 的 `RELEASES` |

## 2. 有新版本时先问一句

App 开着的时候如果服务器上有新版本，要出现提示「有新版本可以更新 [立即更新] [稍后]」，不能突然重新载入、打断使用者。

- App 自己没有更新检查的，调用 `WhatsNew.watch()`：打开时、回到画面时、每 15 分钟检查一次 `index.html` 的 Last-Modified。
- Service worker 换新版本后要重新载入的，改成调用 `WhatsNew.offerUpdate(reload)`。

## 3. 设置页：二维码、分享连结、版本

每个 App 的「设置 / 关于 / Info」页都要有：

- **二维码**：扫描就打开 App 的网址。用离线产生的 `qr.svg`（例如 `node NDVI/tools/make-qr.mjs <网址>`）或在手机上产生（OilPalmWiki `js/qrcode.js`），不要用外部网站产生。
- **网址**文字，以及「**分享 App 链接**」按钮：手机有分享功能就打开分享，没有就复制连结。
- **版本号、更新日期和时间**：`WhatsNew.label(RELEASES)` 会给出 `v1.2.0 · 2026-10-13 14:05`（时间是这一版在 GitHub Pages 上线的时间），旁边放「更新记录」连结。

## 4. 离线缓存只能清理自己的

所有 App 都放在同一个网址 `bryanwoo988.github.io` 下面，共用同一个浏览器缓存。Service worker 清理旧缓存时，**只能删自己的**（缓存名字用 App 自己的前缀，例如 `bible-`、`pphys-`），不能把别的 App 的离线资料删掉。
