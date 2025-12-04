# Careers

[[toc]]

## Data Source

Data is stored in `Prismic`, [`#aux-careers`](https://aftershockpc.prismic.io/builder/pages/YGUBARAAACMAJdl4?s=published).

## Component Reference Chain

The core component is the `JobsBlock` component, primarily responsible for displaying Aftershock's recruitment information.

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