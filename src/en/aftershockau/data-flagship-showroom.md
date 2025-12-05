# Flagship Showroom

[[toc]]

## Data Flow

Data is maintained on Prismic, [`#aux-flagship-showroom`](https://aftershockpc.prismic.io/builder/pages/ZUxSRhYAACYAIJby?s=published).

The data is then fetched via an API and rendered.

```jsx
const page = await prismicClient.getByUID("aux_page", params.handle, {
  ref: previewRef,
});

const documentId = url.searchParams.get("documentId");
if (documentId) {
  const page = await prismicClient.getByID(documentId, {
    ref: previewRef,
  });
  previewData = page;
}
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