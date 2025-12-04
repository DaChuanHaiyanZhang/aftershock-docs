# 依赖与插件

[[toc]]

## 核心框架与运行环境

| 包名 | 功能说明 |
|------|----------|
| [@shopify/hydrogen](https://shopify.dev/docs/storefronts/headless/hydrogen/getting-started) | Shopify 官方 React 框架，支持服务器端渲染与 Hydrogen API。 |
| [@shopify/remix-oxygen](https://shopify.dev/docs/storefronts/headless/hydrogen/getting-started) | Remix 与 Shopify Oxygen Edge Runtime 集成。 |
| [@shopify/mini-oxygen](https://www.npmjs.com/package/@shopify/mini-oxygen) | 本地模拟 Oxygen 运行环境。（Mock数据使用） |
| [@remix-run/react](https://github.com/remix-run/remix) / server-runtime / fs-routes / route-config / dev | Remix 框架核心模块，负责路由、数据加载、构建等功能。 |
| [react / react-dom](https://zh-hans.react.dev/reference/react-dom) | React 主库与 DOM 渲染器。 |
| [react-router-dom](https://reactrouter.remix.org.cn/) | 前端路由导航库。 |
| [graphql](https://graphql.cn/) | 一种用于 API 的查询语言 |


## 内容管理与实验系统

| 包名 | 功能说明 |
|------|----------|
| [@prismicio/client](https://github.com/prismicio/prismic-client) | [Prismic](https://prismic.io/) 集成，用于**内容管理和页面模块化**。 |
| [@intelligems/headless](https://headless.intelligems.io/) | A/B 测试、定价实验与功能开关（feature flag）控制。 |

---

## 文件上传与媒体管理

| 包名 | 功能说明 |
|------|----------|
| uploadcare-widget | Uploadcare 原生上传控件，对应外部脚本 `uploadcare.full.min.js`。 |
| @uploadcare/react-uploader | Uploadcare React 组件封装。 |
| spark-md5 | 计算文件 MD5 值（用于缓存或上传校验）。 |

---

## 邮件与通信

| 包名 | 功能说明 |
|------|----------|
| [Frontapp](https://dev.frontapp.com/reference/installation) | 客服在线聊天工具 |
| @emailjs/browser / emailjs | 使用 EmailJS 在前端直接发送邮件，无需服务器端配置。 |
| nodemailer | 后端（Hydrogen Functions）发送邮件的 Node 库。 |

---

## 动画、UI 与交互

| 包名 | 功能说明 |
|------|----------|
| framer-motion | React 动画库，用于流畅过渡与动效。 |
| gsap | 高性能动画引擎，支持复杂时间轴控制。 |
| react-fast-marquee | 跑马灯效果组件。 |
| react-zoom-pan-pinch | 图片/元素的缩放与拖动交互。 |
| react-loading-skeleton | 页面骨架屏组件。 |
| swiper | 幻灯片与轮播组件库。 |
| tailwind-scrollbar | 美化滚动条的 Tailwind 插件。 |

---

## 搜索、分享与分析

| 包名 | 功能说明 |
|------|----------|
| fuse.js | 轻量级模糊搜索引擎，用于产品搜索。 |
| react-share | 社交媒体分享按钮组件。 |
| isbot | 检测访问者是否为搜索引擎爬虫，用于 SEO 优化。 |
| qrcode.react | 生成二维码的 React 组件。 |

---

## 辅助与工具类

| 包名 | 功能说明 |
|------|----------|
| crypto-js | 加密工具库（SHA、AES 等算法）。 |
| js-cookie | 浏览器 Cookie 管理。 |
| remix-utils | Remix 辅助函数，如缓存与 session 管理。 |

---

## 开发与构建工具

| 包名 | 功能说明 |
|------|----------|
| vite / vite-tsconfig-paths / vite-plugin-cjs-interop | 前端构建与打包工具。 |
| vite-bundle-visualizer / rollup-plugin-visualizer | 打包体积分析工具。 |
| eslint / eslint-plugin-hydrogen / @remix-run/eslint-config | 代码质量与规范检查。 |
| tailwindcss / autoprefixer / postcss | 样式与 CSS 处理工具链。 |
| typescript / @types/react / @types/react-dom / @types/eslint | TypeScript 支持与类型定义。 |
| prettier / @shopify/prettier-config | 代码格式化。 |
| @total-typescript/ts-reset | 重置 TypeScript 内置类型，增强类型安全。 |
| @graphql-codegen/cli / graphql / graphql-tag | GraphQL 查询与类型生成工具。 |

---

##  Shopify CLI 与 Hydrogen 工具集

| 包名 | 功能说明 |
|------|----------|
| @shopify/cli | Shopify 官方 CLI 工具，用于 Hydrogen 开发与部署。 |
| @shopify/hydrogen-codegen | 自动生成 GraphQL 查询与类型定义。 |
| @shopify/oxygen-workers-types | Shopify Edge Runtime 类型定义。 |

---

## 其他实用组件

| 包名 | 功能说明 |
|------|----------|
| @stagewise/toolbar | 开发调试工具栏。 |
| @react-icons/all-files / react-icons | 常用图标组件库（FontAwesome、Feather 等）。 |

---

## 分类概览

| 分类 | 功能方向 | 代表包 |
|------|----------|--------|
| 核心框架 | Hydrogen + Remix | @shopify/hydrogen, @remix-run/react |
| 内容管理 | CMS / 实验系统 | @prismicio/*, @intelligems/headless |
| 上传系统 | 文件上传/CDN | uploadcare-widget, @uploadcare/react-uploader |
| 动画与交互 | UI 动效与交互 | framer-motion, gsap, swiper |
| 邮件系统 | 邮件发送 | emailjs, nodemailer |
| 搜索与分享 | 搜索与社交分享 | fuse.js, react-share, isbot |
| 构建优化 | Vite + ESLint + Prettier | vite, eslint, prettier |

---

## Node 环境要求

``` json
"engines": {
  "node": ">=18.0.0"
}

```