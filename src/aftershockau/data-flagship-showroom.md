# Flagship Showroom

[[toc]]

## 数据流

数据在 `Prismic` 中维护以后，通过 `webhook` 保存到 `Shopify Metaobjects`，而后使用 `Storefront API` 调用，[`#aux-flagship-showroom`](https://aftershockpc.prismic.io/builder/pages/ZUxSRhYAACYAIJby?s=published)

```mermaid
flowchart LR
Prismic --> page.$handle.jsx --> Data Analysis --> Specific Handle
```


## 组件使用

### PrismicPreviewWrapperAux

这是一个外层的wrapper包裹层。

> Tips: [Suspense](https://zh-hans.react.dev/reference/react/Suspense)

> Tips: [Await](https://remix.org.cn/docs/en/main/components/await)

### AuxSkeleton

骨架屏组件，貌似没显示，这里使用了[react-loading-skeleton](https://github.com/dvtng/react-loading-skeleton) 插件

```
app\components\Slices\AuxPagesSlices\AuxSkeleton\index.jsx
```

### AuxSliceRenderer

通过不同的id等使用不同的组件对界面进行渲染。里面代码非常丰满。

```
app\components\Slices\AuxPagesSlices\AuxSliceRenderer.jsx
```



