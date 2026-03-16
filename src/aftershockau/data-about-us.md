# About us

[[toc]]

## 数据源

数据在 `Prismic` 中维护以后，通过 `webhook` 保存到 `Shopify Metaobjects`，而后使用 `Storefront API` 调用。[`#aux-aboutus`](https://aftershockpc.prismic.io/builder/pages/YECxIRAAACcAA8zx?s=published)

```mermaid
flowchart LR
Prismic --webhooks--> SM[Shopify Metaobject] --GraphQL--> Hydrogen
```


## 组件引用结构链

该界面的入口文件为 pages.$hanlde.jsx

```mermaid
flowchart LR

pages.$hanlde.jsx --> AuxSliceRenderer 

AuxSliceRenderer--renderAuxSlice--> ImageWithTitle
AuxSliceRenderer--renderAuxSlice--> HTMLTextOnly
AuxSliceRenderer--renderAuxSlice--> TwoColumns
```

>[!NOTE]
>`renderAuxSlice` 方法是 AuxSliceRenderer 组件的一个方法，负责分发所有组件，最后拼接为一个界面。

```bash
app\components\Slices\AuxPagesSlices\ImageWithTitle\index.jsx
app\components\Slices\AuxPagesSlices\HTMLTextOnly\index.jsx
app\components\Slices\AuxPagesSlices\TwoColumns\index.jsx
```

图中黄色文字表示颜色组件名称。

![aftershock](/screenshots/1-12-2025_111720_localhost.jpeg "aftershock")
