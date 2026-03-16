# Prismic

[[toc]]

## 怎么创建 Page Type？

在 Prismic 创建 Page Type 可以直接根据教程来，但是创建的时候有一些地方需要注意：

1. 每个页面必须有自己的 uid，否则会在发布的时候直接报错
2. 必须要去 `aftershock-pc-au-order-sync` 的`更新`和`删除`文件中更新代码。

```nginx
app\routes\api.prismic-webhook-delete-au.js
app\routes\api.prismic-webhook-update-au.js
```
>[!IMPORTANT]
>`Key` 表示页面名称的id，例如 `slp_product_group_settings`实际上就是名为 `SLP product group settings` 的 Page Type。
>
>`Value` 表示对应的 `Shopify Metaobject` 的名称，例如: `prismic_cache_global_data`。另外，需要注意如果不存在，则需要创建。否则会报错。

```javascript
const objectTypes = {
  aux_page: "prismic_cache_aux_pages",
  features_list: "prismic_cache_features_list",
  footer: "prismic_cache_global_data",
  gaming_landing_page: "prismic_cache_gaming_page",
  "landing-page": "prismic_cache_landing_page",
  limited_edition_page: "prismic_cache_limited_page",
  navigation_main: "prismic_cache_global_data",
  panel_prints: "prismic_cache_panel_prints",
  pc_config: "prismic_cache_global_data",
  slp_product_group_settings: "prismic_cache_global_data",
  pc_model: "prismic_cache_pc_model_pages",
  "series-landing-page": "prismic_cache_series_pages",
  workstations_pag: "prismic_cache_workstations_page",
  sale_page: "prismic_cache_sale_page",
};
```

## 怎么绑定 Webhook？

webhook 已经绑定在了 vercel 当中，所以无需担心。

## 代码提交

建议的提交代码的方式为：

1. 从对应的分支拉取新分支
2. 修改完成以后提交 PR 合并代码

这样才能保证 `master` 分支的纯净和可快速回退。
