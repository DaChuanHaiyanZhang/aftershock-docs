# Shopify Metaobjects

[[toc]]


## 什么是 `Metaobjects`

Metaobjects 是 Shopify 提供的一种自定义数据结构，让你可以创建和存储额外的结构化信息。

>[!IMPORTANT]
>就像在 Shopify 中创建一个自定义的数据库表
>
>你可以定义字段结构,然后创建多个数据条目
>
>可以关联到产品、页面等资源,或者独立使用

## `Metaobjects` 的组成

1. 基本信息 (Basic Info)
    - **Name** (名称)
    
        在 Admin 中显示的名称，例如: "Prismic Cache Sale Page"

    - **Type** 系统内部使用的唯一标识符
        
        格式: 小写字母+下划线，例如: prismic_cache_sale_page（***一般会根据name自动创建***）

    - **Description** (描述) - 可选

2. Fields (字段定义)
    - **Field name** (字段名)
    - **Key** (字段键)
        
        代码中使用的标识符，例如: document_id，用于 GraphQL 查询。
    - **Type** (字段类型)，[查看文档](https://help.shopify.com/en/manual/custom-data/metafields/metafield-definitions/metafield-types#advanced)
3. Metaobjects Options (选项配置)，
    - **Active-draft status** 表示是否发布该 `metaobjects`
    - **Translations** 表示是否支持多语言
    - **Storefront API access**：`Hydrogen` 前端能否访问
        - **None**: 不在 `Storefront API` 中暴露
        - **Public read**: 可通过 `Storefront API` 读取
    - **Publish entries as web pages**
        - 启用后,每个 entry 可以生成独立的 URL
        - 可以选择 theme template
        - 适合创建动态页面(如博客文章、作者页)

## `Metaobjects` 定义

1. ✋ 手动操作 `Shopfiy` 后台
    - Settings > Custom data > Metaobjects > Add definition
    - Content > Metaobjects > Add definition
2. 🔧 Admin GraphQL API [metaobjectDefinitionCreate](https://shopify.dev/docs/api/admin-graphql/latest/mutations/metaobjectDefinitionCreate)

##