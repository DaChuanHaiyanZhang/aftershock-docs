# Warranty

## Data Source

The data source is stored in Prismic. [`#aux-warranty`](https://aftershockpc.prismic.io/builder/pages/YGULLxAAACMAJgbx?s=published)

## Component Reference Chain

```mermaid
flowchart TB

pages.$handle.jsx --> AuxSliceRenderer

AuxSliceRenderer--renderAuxSlice--> AuxBanner
AuxSliceRenderer--renderAuxSlice--> TextsOnly
AuxSliceRenderer--renderAuxSlice--> HTMLTextOnly
```

```bash
app\components\Slices\AuxPagesSlices\AuxBanner\index.jsx
app\components\Slices\AuxPagesSlices\TextsOnly\index.jsx
app\components\Slices\AuxPagesSlices\HTMLTextOnly\index.jsx
```