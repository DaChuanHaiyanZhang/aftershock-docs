# Flagship Showroom

[[toc]]

## Data Flow

After being maintained in `Prismic`, the data is saved to `Shopify Metaobjects` via `webhook`, and then fetched using the `Storefront API`. [`#aux-flagship-showroom`](https://aftershockpc.prismic.io/builder/pages/ZUxSRhYAACYAIJby?s=published).


```mermaid
flowchart LR
Prismic --> page.$handle.jsx --> Data Analysis --> Specific Handle
```

## Component Usage

### PrismicPreviewWrapperAux

This is an outer wrapper layer.

> Tips: [Suspense](https://react.dev/reference/react/Suspense)

> Tips: [Await](https://remix.run/docs/en/main/components/await)

### AuxSkeleton

A skeleton screen component that doesn't seem to be displayed. It uses the [react-loading-skeleton](https://github.com/dvtng/react-loading-skeleton) plugin.

```
app\components\Slices\AuxPagesSlices\AuxSkeleton\index.jsx
```

### AuxSliceRenderer

Renders the interface using different components based on various IDs. The code inside is quite extensive.

```
app\components\Slices\AuxPagesSlices\AuxSliceRenderer.jsx
```