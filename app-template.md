# Woo Brothers 网站：App 资料模板

想把 App 放上 woobrothers.my，请照这个模板填好，连同图片一起发给 Bryan。

- 一个 App 填一份。有好几个 App 的话，在同一个文件里复制好几份，每份之间用一行 `---` 隔开。
- 能写三种语言最好；只会写一种也没关系，其它语言我们帮忙翻译，再请你确认。
- 不知道或者没有的项目，写「无」就好。

---

## 填写区（从这里开始复制）

### 1. 基本资料

| 项目 | 填写 | 说明 |
|---|---|---|
| App 名字 | | 网站上显示的名字，例如 `CompareCast` |
| App 代号 | | 小写英文、数字、`-`，不能有空格，例如 `comparecast`、`rain-alert`。图片名字要用这个代号开头 |
| App 网址 | | 打开 App 的完整网址，`https://` 开头。还没上线就写「无」 |
| 类别（选一个） | | 天气 / 卫星监测 / 病虫害 / 学习 / 园地管理。都不适合的话写你想要的类别名 |
| 支持的语言 | | 在 BM、EN、华 里面选，例如 `BM, EN, 华` |
| 搜索关键字 | | 别人可能会搜什么字就写什么，三种语言都可以，用空格分开，例如 `rain hujan 下雨 forecast 预报` |

### 2. 介绍文字

每种语言都要有三样东西：

- **一句话介绍**：20 个字以内，说清楚这个 App 做什么。
- **详细介绍**：2–4 句。说用户遇到什么问题、这个 App 怎样帮他。少用术语。
- **功能**：3–5 项，每项一行，越短越好。

**华文**
- 一句话介绍：
- 详细介绍：
- 功能：
  1.
  2.
  3.

**English**
- 一句话介绍 (Tagline)：
- 详细介绍 (Description)：
- 功能 (Features)：
  1.
  2.
  3.

**Bahasa Malaysia**
- 一句话介绍 (Tagline)：
- 详细介绍 (Penerangan)：
- 功能 (Ciri-ciri)：
  1.
  2.
  3.

### 3. 图片

图片直接附上原档，不要截图后再截图，也不要用 WhatsApp 压缩过的版本（WhatsApp 请用「文件」方式发送）。

| 图片 | 文件名 | 规格 | 必须？ |
|---|---|---|---|
| Logo | `代号-logo.png` | 正方形，至少 512×512，PNG | 建议有 |
| 封面 | `代号-cover.jpg` | 横向 16:9，例如 1280×720 | 可以没有 |
| 截图 | `代号-1.png`、`代号-2.png`…… | 手机直式截图，最多 5 张，按顺序编号 | 建议 2–3 张 |

没有 logo 的话，网站会用 App 名字的第一个字母代替；没有封面，会用深绿格子底加类别小图标。

### 4. 联系人（不会放上网站）

| 项目 | 填写 |
|---|---|
| 开发者名字 | |
| WhatsApp | |

---

## 范例（CompareCast）

### 1. 基本资料

| 项目 | 填写 |
|---|---|
| App 名字 | CompareCast |
| App 代号 | comparecast |
| App 网址 | https://bryanwoo988.github.io/CompareCast/ |
| 类别 | 天气 |
| 支持的语言 | BM, EN, 华 |
| 搜索关键字 | rain hujan 下雨 forecast ramalan 预报 wind angin 风 |

### 2. 介绍文字（只列华文）

- 一句话介绍：多模型天气比较，按地块提醒
- 详细介绍：不同的天气模型，预报常常不一样。CompareCast 把几个模型的预报和实际下雨量放在一起比较，告诉你哪个模型在你的园地最准，还可以为每个地块设定下雨提醒。
- 功能：
  1. 预报与实际雨量对比
  2. 多个天气模型并排比较
  3. 阵风地图，提前防断枝倒树
  4. 按地块的下雨提醒

### 3. 图片

- `comparecast-logo.png`
- `comparecast-1.png`、`comparecast-2.png`

---

## 给 Bryan：模板和 `apps.json` 的对应

| 模板里的项目 | `apps.json` 字段 |
|---|---|
| App 名字 | `name` |
| App 代号 | `id`（网址会变成 `woobrothers.my/#app-代号`） |
| App 网址 | `url`（「无」→ `null`） |
| 类别 | `category`：天气 `weather`、卫星监测 `field`、病虫害 `pest`、学习 `learn`、园地管理 `manage` |
| 支持的语言 | `languages` |
| 搜索关键字 | `keywords` |
| 一句话介绍 / 详细介绍 / 功能 | `zh` / `en` / `ms` 里的 `tagline` / `description` / `features` |
| `代号-logo.png` | `logo` → `img/代号-logo.png` |
| `代号-cover.jpg` | `cover` → `img/代号-cover.jpg` |
| `代号-1.png`…… | `screenshots` → `["img/代号-1.png", …]` |
| 联系人 | 不放进 `apps.json` |

互动图表（`demo`）不放在模板里，新 App 默认是 `null`。需要的话个别讨论。
