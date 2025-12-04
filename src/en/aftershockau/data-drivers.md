# Drivers

[[toc]]

## Data Source

The data source is stored in Prismic. [`#aux-drivers`](https://aftershockpc.prismic.io/builder/pages/YGUNZBAAACAAJhCu?s=published).

## Component Reference Chain

```mermaid
flowchart LR

pages.$handle.jsx --> AuxSliceRenderer

AuxSliceRenderer--renderAuxSlice--> TextsOnly
AuxSliceRenderer--renderAuxSlice--> Drivers
```

```bash
app\components\Slices\AuxPagesSlices\TextsOnly\index.jsx
app\components\Slices\AuxPagesSlices\Drivers\index.jsx
```