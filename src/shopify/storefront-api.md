# Storefront API 中文文档

[[toc]]


本页整理 Hydrogen [`createStorefrontClient`](https://shopify.dev/docs/api/hydrogen/2024-10/utilities/createstorefrontclient) 中暴露的所有 Storefront API 方法与属性，包含完整中文说明。

>[!WARNING]
>在文档的最下方的 `Returns` 中，还有点击才能弹出，着实无语。

---

## 🚀 Cache（缓存）

### cache
从 `createStorefrontClient` 传入的缓存实例。

---

## 🧰 Cache 工具方法

### CacheCustom
`(overrideOptions: AllCacheOptions) => AllCacheOptions`

自定义缓存策略（完全控制 max-age、stale-while-revalidate 等）。

---

### CacheLong

`(overrideOptions?: AllCacheOptions) => AllCacheOptions`

长缓存策略。适合更新不频繁的数据，如产品数据、CMS 内容。

---

### CacheShort

`(overrideOptions?: AllCacheOptions) => AllCacheOptions`

短缓存策略。适合更新较频繁的数据。

---

### CacheNone

`() => NoStoreStrategy`

禁用所有缓存，始终从 API 拉取。

---

### generateCacheControlHeader

`(cacheOptions: AllCacheOptions) => string`

根据缓存策略生成 HTTP 的 **Cache-Control** 头字符串。

---

## 🌐 API URL & Token

### getApiUrl

`(props?: Partial<Pick<StorefrontClientProps, "storefrontApiVersion" | "storeDomain">>) => string`

生成完整的 Storefront API GraphQL URL。

---

### getShopifyDomain

`(props?: Partial<Pick<StorefrontClientProps, "storeDomain">>) => string`

返回完整 `.myshopify.com` 域名。

---

### getPrivateTokenHeaders

`(props?: Partial<Pick<StorefrontClientProps, "contentType">> & Pick<StorefrontClientProps, "privateStorefrontToken"> & { buyerIp?: string }) => Record<string,string>`

生成服务端调用 API 的 **私有 Token 请求头**。

---

### getPublicTokenHeaders

`(props?: Partial<Pick<StorefrontClientProps, "contentType">> & Pick<StorefrontClientProps, "publicStorefrontToken">>) => Record<string,string>`

生成客户端可用的 **公开 Token 请求头**。

---

## 🌏 i18n 国际化

### i18n
**类型：** `TI18n`

`createStorefrontClient` 传入的国际化配置，如区域、默认货币等。

---

## 🔧 GraphQL 操作方法

### query

`<TData>(query: string, options: StorefrontQueryOptionsForDocs) => Promise<TData & StorefrontError>`

执行 GraphQL **查询**（Query）。  
返回数据与错误对象。

---

### mutate

`<TData>(mutation: string, options: StorefrontMutationOptionsForDocs) => Promise<TData & StorefrontError>`

执行 GraphQL **变更**（Mutation）。

---

