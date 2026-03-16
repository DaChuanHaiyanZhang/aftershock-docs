# Shopify Liquid Objects 总览表

| Object                 | 作用              | 常用字段示例                                  | 典型使用场景                        |
| ---------------------- | --------------- | --------------------------------------- | ----------------------------- |
| **request**            | 当前请求上下文         | `url` `path` `page_type` `params`       | 判断页面类型、读取 URL 参数、AB / Preview |
| **canonical_url**      | 当前页面 SEO 标准 URL | —                                       | SEO、数据回传                      |
| **shop**               | 店铺全局信息          | `name` `domain` `secure_url` `currency` | 全局配置、多店铺兼容                    |
| **product**            | 当前商品            | `id` `handle` `variants` `metafields`   | 商品详情页、schema 渲染               |
| **variant**            | 当前选中变体          | `id` `price` `available`                | SKU / 价格 / 库存                 |
| **collection**         | 当前集合            | `handle` `products` `filters`           | 集合页、商品列表                      |
| **collections**        | 所有集合映射          | `collections['frontpage']`              | 取指定集合                         |
| **page**               | 普通页面            | `title` `handle` `content`              | About / Contact               |
| **blog**               | 博客              | `handle` `articles`                     | 博客列表页                         |
| **article**            | 博客文章            | `title` `content` `tags`                | 内容页                           |
| **cart**               | 购物车             | `items` `item_count` `total_price`      | Mini cart、cart 页              |
| **customer**           | 当前登录用户          | `id` `email` `tags`                     | 登录态判断、会员价                     |
| **routes**             | Shopify 路由      | `cart_url` `account_login_url`          | 跳转 URL                        |
| **localization**       | 语言 / 国家         | `country` `language`                    | 多语言、多地区                       |
| **currency**           | 当前货币            | `iso_code` `symbol`                     | 多币种显示                         |
| **settings**           | 主题全局设置          | `color_primary` 等                       | theme settings                |
| **section**            | 当前 section 实例   | `id` `settings` `blocks`                | Section schema                |
| **block**              | 当前 block 实例     | `id` `type` `settings`                  | 商品详情模块                        |
| **content_for_layout** | 主内容插槽           | —                                       | layout.liquid                 |
| **content_for_header** | header 注入内容     | —                                       | app / analytics               |
| **template**           | 当前模板名           | `name` `suffix`                         | 模板判断                          |
| **theme**              | 当前主题信息          | `name` `id`                             | 主题识别                          |
| **search**             | 搜索结果            | `results` `terms`                       | 搜索页                           |
| **paginate**           | 分页信息            | `pages` `current_page`                  | 列表分页                          |
| **recommendations**    | 商品推荐            | `products`                              | 关联推荐                          |
| **linklists**          | 导航菜单            | `main-menu.links`                       | Header / Footer               |
| **metaobjects**        | Metaobject 数据   | `metaobjects.xxx`                       | 结构化内容（你很关键）                   |
| **metafields**         | 元字段集合           | `product.metafields.xxx`                | 扩展字段                          |
| **files**              | 店铺文件            | `files['xx.png']`                       | 素材引用                          |
| **images**             | 主题图片            | `images.logo`                           | 主题资源                          |

---

## request

`request` 对象用于获取**当前 URL 及其关联页面的上下文信息**。  
它不是浏览器级 URL API，而是 **Shopify 在 Liquid 中暴露的页面状态对象**。

### 属性一览

| 属性 | 类型 | 说明 |
|----|----|----|
| `design_mode` | boolean | 是否从 Theme Editor 中发起请求 |
| `visual_preview_mode` | boolean | 是否处于 Theme Editor 的可视化 section 预览 |
| `host` | string | 当前请求所在的域名 |
| `origin` | string | 请求的协议 + 域名 |
| `locale` | shop_locale | 当前请求的语言 / 地区 |
| `page_type` | string（枚举） | 当前请求的页面类型 |
| `path` | string \| nil | 当前请求路径 |

```json
{
  "design_mode": false,
  "host": "polinas-potent-potions.myshopify.com",
  "locale": {},
  "origin": "https://polinas-potent-potions.myshopify.com",
  "page_type": "index",
  "path": "/",
  "visual_preview_mode": false
}
```