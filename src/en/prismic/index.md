# Prismic  

[[toc]]  

## How to Create a Page Type?  

To create a Page Type in Prismic, you can follow the tutorial directly, but there are some points to note during the creation process:  

1. Each page must have its own `uid`; otherwise, an error will occur during publishing.  
2. The code in the `update` and `delete` files of `aftershock-pc-au-order-sync` must be updated:  

```nginx  
app\routes\api.prismic-webhook-delete-au.js  
app\routes\api.prismic-webhook-update-au.js  
```  

>[!IMPORTANT]  
> - `Key` represents the ID of the page name. For example, `slp_product_group_settings` corresponds to the Page Type named `SLP Product Group Settings`.  
> - `Value` represents the corresponding `Shopify Metaobject` name, such as `prismic_cache_global_data`. Additionally, ensure the Metaobject exists; if not, create it to avoid errors.  

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

## How to Bind a Webhook?  

Webhooks are already configured in Vercel, so no further action is required.  

## Code Submission  

The recommended approach for submitting code is:  

1. Create a new branch from the corresponding base branch.  
2. After making changes, submit a PR to merge the code.  

This ensures the `master` branch remains clean and allows for quick rollbacks if needed.