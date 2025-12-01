# Drivers 驱动下载

[[toc]]

## 数据源

数据源在Prismic当中。[`#aux-drivers`](https://aftershockpc.prismic.io/builder/pages/YGUNZBAAACAAJhCu?s=published)

## 组件引用结构链

```mermaid
flowchart LR

pages.$hanlde.jsx --> AuxSliceRenderer 

AuxSliceRenderer--renderAuxSlice--> TextsOnly
AuxSliceRenderer--renderAuxSlice--> Drivers
```
```bash
app\components\Slices\AuxPagesSlices\TextsOnly\index.jsx
app\components\Slices\AuxPagesSlices\Drivers\index.jsx

```
