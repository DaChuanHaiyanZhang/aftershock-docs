# About Us

[[toc]]

## Data Source

The data source for this interface is `Prismic`, [`#aux-aboutus`](https://aftershockpc.prismic.io/builder/pages/YECxIRAAACcAA8zx?s=published).

```mermaid
flowchart LR
Prismic --webhooks--> SM[Shopify Metaobject] --GraphQL--> Hydrogen
```

## Component Reference Chain

The entry file for this interface is `pages.$handle.jsx`.

```mermaid
flowchart TB

pages.$handle.jsx --> AuxSliceRenderer

AuxSliceRenderer--renderAuxSlice--> ImageWithTitle
AuxSliceRenderer--renderAuxSlice--> HTMLTextOnly
AuxSliceRenderer--renderAuxSlice--> TwoColumns
```

>[!NOTE]
>The `renderAuxSlice` method is a method of the `AuxSliceRenderer` component, responsible for distributing all components, which are finally assembled into an interface.

```bash
app\components\Slices\AuxPagesSlices\ImageWithTitle\index.jsx
app\components\Slices\AuxPagesSlices\HTMLTextOnly\index.jsx
app\components\Slices\AuxPagesSlices\TwoColumns\index.jsx
```

The yellow text in the diagram indicates the color component names.

![aftershock](/screenshots/1-12-2025_111720_localhost.jpeg "aftershock")