# Warranty

## 数据源

数据源在Prismic当中。[`#aux-warranty`](https://aftershockpc.prismic.io/builder/pages/YGULLxAAACMAJgbx?s=published)

## 组件引用结构链

```mermaid
flowchart TB

pages.$hanlde.jsx --> AuxSliceRenderer 

AuxSliceRenderer--renderAuxSlice--> AuxBanner
AuxSliceRenderer--renderAuxSlice--> TextsOnly
AuxSliceRenderer--renderAuxSlice--> HTMLTextOnly
```

```bash
app\components\Slices\AuxPagesSlices\AuxBanner\index.jsx
app\components\Slices\AuxPagesSlices\TextsOnly\index.jsx
app\components\Slices\AuxPagesSlices\HTMLTextOnly\index.jsx
```
