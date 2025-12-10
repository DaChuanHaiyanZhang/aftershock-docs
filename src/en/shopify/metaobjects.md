# Shopify Metaobjects

[[toc]]

## What are [`Metaobjects`](https://help.shopify.com/en/manual/custom-data/metaobjects)

Metaobjects are a custom data structure provided by Shopify, allowing you to create and store additional structured information.

>[!IMPORTANT]
>Think of it as creating a custom database table within Shopify.
>
>You can define field structures and then create multiple data entries.
>
>They can be associated with products, pages, and other resources, or used independently.

## Composition of `Metaobjects`

1. Basic Information (Basic Info)
    - **Name** (Display name)
    
        The name displayed in the Admin, e.g., "Prismic Cache Sale Page."

    - **Type** (Unique internal identifier)
        
        Format: lowercase letters + underscores, e.g., prismic_cache_sale_page (***usually automatically created based on the name***).

    - **Description** - Optional.

2. Fields (Field definitions)
    - **Field name**
    - **Key** (Field key)
        
        Identifier used in code, e.g., document_id, for GraphQL queries.
    - **Type** (Field type), [View documentation](https://help.shopify.com/en/manual/custom-data/metafields/metafield-definitions/metafield-types#advanced).

3. Metaobjects Options (Configuration options),
    - **Active-draft status**: indicates whether the `metaobjects` is published.
    - **Translations**: indicates whether multiple languages are supported.
    - **Storefront API access**: whether `Hydrogen` frontend can access it.
        - **None**: Not exposed in the `Storefront API`.
        - **Public read**: Can be read via the `Storefront API`.
    - **Publish entries as web pages**
        - When enabled, each entry can generate an independent URL.
        - Theme template can be selected.
        - Suitable for creating dynamic pages (e.g., blog posts, author pages).

## Defining `Metaobjects`

1. ✋ Manual operation in `Shopify` backend.
    - Settings > Custom data > Metaobjects > Add definition.
    - Content > Metaobjects > Add definition.
2. 🔧 Admin GraphQL API [metaobjectDefinitionCreate](https://shopify.dev/docs/api/admin-graphql/latest/mutations/metaobjectDefinitionCreate).