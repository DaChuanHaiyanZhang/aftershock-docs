# Knowledge Hub

[[toc]]

## 首页

### 数据流

Knowledge Hub 首页的数据主要保存在 [Prismic](https://aftershock-knowledge-hub.prismic.io/builder/working) 中

- Prismic 的 API & Security

    <details>
    <summary>查看 Prismic的 API & Security 配置内容</summary>

  ![aftershock](/screenshots/ScreenShot_2025-11-27_111127_260.png "aftershock")

  ![aftershock](/screenshots/ScreenShot_2025-11-27_111212_560.png "aftershock")
    </details>

- Previews

    <details>
    <summary>查看 Prismic Previews 配置内容</summary>

  ![aftershock](/screenshots/ScreenShot_2025-11-27_111237_639.png "aftershock")
    </details>

- Translations & Locales

    <details>
    <summary>查看 Prismic Translations & Locales 配置内容</summary>
    
    ![aftershock](/screenshots/ScreenShot_2025-11-27_111319_290.png "aftershock")
    </details>

- webhook 的地址 Update

  ```
  https://aftershock-pc-au-order-sync.vercel.app/api/prismic-webhook-update-knowledge-hub
  ```

  - webhook 的地址 Delete

  ```
  https://aftershock-pc-au-order-sync.vercel.app/api/prismic-webhook-delete-knowledge-hub
  ```

### 组件引用结构链

#### **PrismicPreviewWrapperKnowledgeHub**

该组件是 Knowledge Hub main 组件，用来包裹所有的首页组件

组件地址：

```
app\components\PrismicPreviewModes\PrismicPreviewWrapperKnowledgeHub.jsx
```

#### **Header**(不是全局 header 组件)

该组件在接收到参数之后进行渲染、展示工作，其中包含了 Title、Search 组件。

**Title** 组件用来展示标题

**Search** 组件用来展示搜索框

搜索使用了插件：[Fuse.js](https://www.fusejs.io/)

并在数据渲染的时候通过 [**Prismic 的 Api 能力**](https://prismic.io/docs)查询了所有数据，在数据初始化的时候完成了注入。

<details>
<summary>查看相关代码</summary>

prismic.js

```jsx
import * as prismic from "@prismicio/client";
export function getKnowledgeHubPrismicClient(previewRef) {
  const client = prismic.createClient(knowledgeHubRepositoryName, {
    accessToken: process.env.KNOWLEDGE_HUB_PRISMIC_TOKEN,
  });

  return client;
}
```

app\routes\knowledge-hub.jsx

```jsx
export async function loader(args) {
  const prismicClient = getKnowledgeHubPrismicClient(previewRef);
  const page = await prismicClient.getByUID("landing_page", "main", {
    ref: previewRef,
  });
}
```

app\components\KnowledgeHub\Header\Search\index.jsx

```jsx
useEffect(() => {
  if (!searchInput.trim()) {
    setFilteredResults([]);
    return;
  }

  const options = {
    includeScore: true,
    keys: ["data.title", "data.discussion_title", "data.topic_title"],
    threshold: 0.5,
  };

  const fuse = new Fuse(
    [
      ...(knowledgeBasePosts || []).map((post) => ({ ...post, type: "post" })),
      ...(knowledgeBaseDisscussions || []).map((disc) => ({
        ...disc,
        type: "discussion",
      })),
      ...(knowledgeBaseCategories || []).map((cat) => ({
        ...cat,
        type: "topic",
      })),
    ],
    options
  );

  const results = fuse.search(searchInput);
  setFilteredResults(results.map((result) => result.item));
}, [
  searchInput,
  knowledgeBasePosts,
  knowledgeBaseDisscussions,
  knowledgeBaseCategories,
]);
```

</details>

如下图所示：

![aftershock](/screenshots/ScreenShot_2025-11-27_145637_990.png "aftershock")

组件地址：

```
app\components\KnowledgeHub\Header\index.jsx
app\components\KnowledgeHub\Header\Titles\index.jsx
app\components\KnowledgeHub\Header\Search\index.jsx
```

#### KnowledgeHub 组件

```
app\components\KnowledgeHub\index.jsx
```

**特别注意** knowledge-hub.jsx 文件在查询界面相关 categories 问题分类时，又使用了自定义字段到 metaobjects

```jsx
export const GET_METAOBJECTS = `
  query GetMetaobjects($type: String!, $first: Int!) {
    metaobjects(type: $type, first: $first) {
      nodes {
        fields {
          key
          value
        }
      }
    }
  }
`;

const categoriesVariables = {
  type: "prismic_cache_knowledge_hub_category",
  first: 250,
};
storefront.query(GET_METAOBJECTS, {
  variables: categoriesVariables,
  cache: storefront.CacheShort(),
});
```

>[!NOTE]
> [Storefront Api 文档地址](https://shopify.dev/docs/storefronts/headless/hydrogen/data-fetching)
>
> [Metaobjects 文档地址](https://admin.shopify.com/store/aftershockpcau/content/metaobjects/entries/prismic_cache_global_data/99848782004)

该组件有两个组件控制数据的渲染和输出：

![aftershock](/screenshots/ScreenShot_2025-11-27_154813_667.png "aftershock")

CategoriesList 展示类型，点击之后进入到分组详情页面

```
app\components\KnowledgeHub\CategoriesList\index.jsx
app\components\KnowledgeHub\CategoriesList\CategoryCard\index.jsx
```

FeaturedList 展示 Featured，点击之后进入到分组详情页面

```
app\components\KnowledgeHub\FeaturedList\index.jsx
```

## Categories 分组页面

`/knowledge-hub/$handle`

Categories 的数据源于 CategoriesList 界面的传入，向上反推即可：

```mermaid
knowledge-hub.jsx(获取数据) --> KnowledgeHub --> CategoriesList
```

```jsx
import { CategoriesList } from "./CategoriesList";

export function KnowledgeHub({ mainPageContent, categories, featuredPosts }) {
  const { featuredTitle, topicsTitle } = mainPageContent;
  return (
    <div className="flex flex-col items-center w-full h-auto z-[10] bg-[#1e1e1e]">
      <div className="flex justify-center items-center w-full max-w-[1440px] h-auto text-white py-[20px] tablet-lg:py-[50px]">
        <div className="flex flex-col justify-center items-center w-full h-auto">
          <CategoriesList categories={categories} topicsTitle={topicsTitle} />
        </div>
      </div>
    </div>
  );
}
```

CategoryCard 组件代码, 跳转到了分类界面

```jsx
import { Link } from "@remix-run/react";
import { Image } from "@shopify/hydrogen";

export function CategoryCard({ category }) {
  return (
    <Link
      to={`/knowledge-hub/` + category.uid}
      className="flex flex-col md:flex-row justify-start items-center gap-[5px] mobile-sm:gap-[10px] md:gap-[20px] tablet-lg:gap[25px] p-[5px] mobile-sm:p-[10px] md:px-[16px] tablet-lg:px-[24px] w-[80px] mobile-sm:w-[100px] md:w-[200px] tablet-lg:w-[275px] h-[80px] mobile-sm:h-[100px] md:h-[68px] bg-[#141414] rounded-[5px] cursor-pointer border border-transparent hover:border-[#a50000] transition-all duration-300 ease-in-out"
      prefetch="none"
    >
      <Image src={category.icon} alt={category.title} width={30} height={30} />
      <span className="font-roboto-normal text-[8px] mobile-sm:text-[10px] md:text-[13px] tablet-lg:text-[16px] font-bold text-center md:text-left px-[5px] md:p-0">
        {category.title}
      </span>
    </Link>
  );
}
```

>[!NOTE] 
>[Image 组件地址](https://shopify.dev/docs/api/hydrogen/latest/components/image)

### 数据源

数据源于 Prismic， 因为有个很明显的信号，在 CategoryCard 的链接中，传入了分组的 uid（prismic）的，到详情页进行查询。

查询根据分组的 UID

knowledge-hub\_.$category.jsx 就可以印证

```jsx
export async function loader({ context, params, request }) {
  const { storefront } = context;

  const category = await prismicClient.getByUID("topic", params.category, {
    ref: previewRef,
  });

  const preparedCategories = parseKnowledgeHubData(categories.metaobjects);

  const category = preparedCategories.find(
    (cat) => cat.uid === params.category
  );
}
```

### 组件引用链

#### PrismicPreviewWrapperKnowledgeHub

最外层的 wrapper 包裹组件

```
app\components\PrismicPreviewModes\PrismicPreviewWrapperKnowledgeHub.jsx
```

#### CategoryPage

列表折叠的组件显示名称、类型以及链接之类的数据

```
app\components\KnowledgeHub\CategoryPage\index.jsx
app\components\KnowledgeHub\CategoryPage\BreadCrumbs\index.jsx
app\components\KnowledgeHub\CategoryPage\Titles\index.jsx
app\components\KnowledgeHub\CategoryPage\DiscussionsList\index.jsx
app\components\KnowledgeHub\CategoryPage\DiscussionsList\PostsList\index.jsx
app\components\KnowledgeHub\CategoryPage\DiscussionsList\PostsList\PostCard\index.jsx
app\components\KnowledgeHub\CategoryPage\DiscussionsList\PostsList\PostCard\PostBadges\index.jsx
```

## Categories 详情页

知识详情页

> Tips：从 FeatureList 的 Item 中进入详情页

### 数据源

数据源于 Prismic ，可以使用 UID 的方式进行查询。

knowledge-hub*.$category*.$post.jsx 关键代码如下：

```jsx
export async function loader({ context, params, request }) {
  const post = await prismicClient.getByUID("post", params.post, {
    ref: previewRef,
  });
}
```

>[!NOTE]
>[client.getByUID](https://prismic.io/docs/technical-reference/prismicio-client/v7#getbyuid)

### 组件引用链

#### PrismicPreviewWrapperKnowledgeHub

一个最外层包裹的 Wrapper

```
app\components\PrismicPreviewModes\PrismicPreviewWrapperKnowledgeHub.jsx
```

#### PostPageSidebar

该组件主要用来展示左侧分组信息，分组信息通过解析详情获取，左侧点击实现 tabs 切换和锚点效果，解析代码如下：

```
app\components\KnowledgeHub\PageSideBar\index.jsx
```

```jsx
const preparedTitles = post.data?.body1.reduce((acc, block) => {
  const contentTitle = block.primary.content_title;

  const subTitles = block.items
    .filter((item) => item.set_to_menu === true && item.sub_title.length > 0)
    .map((item) => {
      const baseId = asText(item.sub_title).split(" ").join("-").toLowerCase();
      return {
        text: asText(item.sub_title),
        id: generateUniqueId(baseId),
      };
    });

  if (
    contentTitle &&
    contentTitle[0] &&
    contentTitle[0].text &&
    contentTitle[0].text.length > 0
  ) {
    const baseId = block.id;
    acc.push({
      text: contentTitle[0].text,
      id: generateUniqueId(baseId),
      subTitles: [],
    });
  }

  if (subTitles.length > 0 && acc.length > 0) {
    acc[acc.length - 1].subTitles.push(...subTitles);
  }

  return acc;
}, []);
```

#### KnowledgeHubBreadcrumbs

该组件主要展示当前信息的面包屑位置，数据来源是 knowledge-hub*.$category*.$post.jsx 解析得来

```jsx
<KnowledgeHubBreadcrumbs
  topic={content.topic}
  postPage={content.topic?.data}
  getDiscTitle={getDiscTitle}
  post={post}
  discussions={discussions}
/>
```

#### PostHeaderContent

该组件主要展示当前页面的头部信息，有标题、标签、视频、发送邮件、扫码打电话等功能

视频播放来关联的源是：youtube

组件信息如下：
```
app\components\KnowledgeHub\PostHeaderContent\index.jsx
app\components\KnowledgeHub\PostHeaderContent\TagsList\index.jsx
app\components\KnowledgeHub\PostHeaderContent\ActionsList\index.jsx
```

#### PostsList

问答被分成了很多明细信息，形成了PostList，在该组件中解析

```
app\components\KnowledgeHub\PostsList\index.jsx
app\components\KnowledgeHub\PostsList\ImageAbove\index.jsx
app\components\KnowledgeHub\PostsList\ImageBelow\index.jsx
app\components\KnowledgeHub\PostsList\ImageLeft\index.jsx
app\components\KnowledgeHub\PostsList\ImageRight\index.jsx
app\components\KnowledgeHub\PostsList\Warning\index.jsx
```

#### PostPageQuestion

问题评分系统结果，目前属于隐藏状态，功能貌似还没完善
```
app\components\KnowledgeHub\PostPageQuestion\index.jsx
```
