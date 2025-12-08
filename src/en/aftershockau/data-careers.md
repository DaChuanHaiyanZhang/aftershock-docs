# Careers

[[toc]]

## Data Source

After being maintained in `Prismic`, the data is saved to `Shopify Metaobjects` via `webhook`, and then fetched using the `Storefront API`. [`#aux-careers`](https://aftershockpc.prismic.io/builder/pages/YGUBARAAACMAJdl4?s=published)

```mermaid
flowchart LR

Prismic#aux-careers --webhook--> SM[Shopify Metaobjects] --GraphQL--> SA[Storefront API]
```


## Component Reference Chain

The core component is the JobsBlock component, primarily responsible for displaying Aftershock's recruitment information.

```mermaid
flowchart LR

pages.$handle.jsx --> AuxSliceRenderer
AuxSliceRenderer--renderAuxSlice--> TwoColumns
AuxSliceRenderer--renderAuxSlice--> JobsBlock

JobsBlock --> CustomSelect
```

```bash
app\components\Slices\AuxPagesSlices\JobsBlock\index.jsx
app\components\Slices\AuxPagesSlices\JobsBlock\CustomSelect\index.jsx
```