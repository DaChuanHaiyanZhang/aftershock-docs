# Knowledge Hub

[[toc]]

## Homepage

### Data Flow

The data for the Knowledge Hub homepage is mainly stored in [Prismic](https://aftershock-knowledge-hub.prismic.io/builder/working).

- Prismic API & Security

    <details>
    <summary>View Prismic API & Security Configuration</summary>

  ![aftershock](/screenshots/ScreenShot_2025-11-27_111127_260.png "aftershock")

  ![aftershock](/screenshots/ScreenShot_2025-11-27_111212_560.png "aftershock")
    </details>

- Previews

    <details>
    <summary>View Prismic Previews Configuration</summary>

  ![aftershock](/screenshots/ScreenShot_2025-11-27_111237_639.png "aftershock")
    </details>

- Translations & Locales

    <details>
    <summary>View Prismic Translations & Locales Configuration</summary>
    
    ![aftershock](/screenshots/ScreenShot_2025-11-27_111319_290.png "aftershock")
    </details>

- Webhook Update URL

  ```
  https://aftershock-pc-au-order-sync.vercel.app/api/prismic-webhook-update-knowledge-hub
  ```

  - Webhook Delete URL

  ```
  https://aftershock-pc-au-order-sync.vercel.app/api/prismic-webhook-delete-knowledge-hub
  ```

### Component Reference Chain

#### **PrismicPreviewWrapperKnowledgeHub**

This component is the Knowledge Hub main component, used to wrap all homepage components.
```
app\components\PrismicPreviewModes\PrismicPreviewWrapperKnowledgeHub.jsx
```

#### **Header** (Not the global header component)

This component renders and displays content after receiving parameters, including the Title and Search components.

**Title** component is used to display the title.

**Search** component is used to display the search box.

The search uses the [Fuse.js](https://www.fusejs.io/) plugin.

During data rendering, all data is queried via [**Prismic's API capabilities**](https://prismic.io/docs) and injected during data initialization.

<details>
<summary>View Related Code</summary>

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

As shown in the image below:

![aftershock](/screenshots/ScreenShot_2025-11-27_145637_990.png "aftershock")

Component Paths:

```
app\components\KnowledgeHub\Header\index.jsx
app\components\KnowledgeHub\Header\Titles\index.jsx
app\components\KnowledgeHub\Header\Search\index.jsx
```

#### KnowledgeHub Component

```
app\components\KnowledgeHub\index.jsx
```

**Special Note**: When querying related categories in the knowledge-hub.jsx file, custom fields are also used in metaobjects.

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
>[Storefront API Documentation](https://shopify.dev/docs/storefronts/headless/hydrogen/data-fetching)
>
>[Metaobjects Documentation](https://admin.shopify.com/store/aftershockpcau/content/metaobjects/entries/prismic_cache_global_data/99848782004)

This component has two components controlling data rendering and output:

![aftershock](/screenshots/ScreenShot_2025-11-27_154813_667.png "aftershock")

CategoriesList displays categories. Clicking on a category navigates to the group details page.

```
app\components\KnowledgeHub\CategoriesList\index.jsx
app\components\KnowledgeHub\CategoriesList\CategoryCard\index.jsx
```

FeaturedList displays featured content. Clicking on an item navigates to the group details page.

```
app\components\KnowledgeHub\FeaturedList\index.jsx
```

## Categories Group Page

`/knowledge-hub/$handle`

The data for Categories originates from the CategoriesList page. Tracing backward:

```mermaid
knowledge-hub.jsx(fetches data) --> KnowledgeHub --> CategoriesList
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

CategoryCard component code, which navigates to the category page:

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
>[Image Component Documentation](https://shopify.dev/docs/api/hydrogen/latest/components/image)

### Data Source

The data originates from Prismic, as indicated by the clear signal that the CategoryCard link passes the group's uid (from Prismic) to the details page for querying.

Queries are based on the group's UID.

knowledge-hub\_.$category.jsx confirms this:

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

### Component Reference Chain

#### PrismicPreviewWrapperKnowledgeHub

The outermost wrapper component.

```
app\components\PrismicPreviewModes\PrismicPreviewWrapperKnowledgeHub.jsx
```

#### CategoryPage

Displays list collapse components, names, types, links, and other data.

```
app\components\KnowledgeHub\CategoryPage\index.jsx
app\components\KnowledgeHub\CategoryPage\BreadCrumbs\index.jsx
app\components\KnowledgeHub\CategoryPage\Titles\index.jsx
app\components\KnowledgeHub\CategoryPage\DiscussionsList\index.jsx
app\components\KnowledgeHub\CategoryPage\DiscussionsList\PostsList\index.jsx
app\components\KnowledgeHub\CategoryPage\DiscussionsList\PostsList\PostCard\index.jsx
app\components\KnowledgeHub\CategoryPage\DiscussionsList\PostsList\PostCard\PostBadges\index.jsx
```

## Category Details Page

Knowledge details page.

>[!NOTE]
>Enter the details page from an item in FeatureList.

### Data Source

The data originates from Prismic and can be queried using the UID method.

Key code from knowledge-hub*.$category*.$post.jsx:

```jsx
export async function loader({ context, params, request }) {
  const post = await prismicClient.getByUID("post", params.post, {
    ref: previewRef,
  });
}
```
>[!NOTE]
>[client.getByUID](https://prismic.io/docs/technical-reference/prismicio-client/v7#getbyuid)

### Component Reference Chain

#### PrismicPreviewWrapperKnowledgeHub

The outermost wrapper component.

```
app\components\PrismicPreviewModes\PrismicPreviewWrapperKnowledgeHub.jsx
```

#### PostPageSidebar

This component primarily displays left-side grouping information, obtained by parsing details. Clicking on the left side implements tabs switching and anchor effects. Parsing code is as follows:

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

This component primarily displays the breadcrumb location of the current information, derived from parsing in knowledge-hub*.$category*.$post.jsx.

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

This component primarily displays the header information of the current page, including title, tags, video, send email, scan to call, and other features.

The video player source is linked to: YouTube.

Component paths:
```
app\components\KnowledgeHub\PostHeaderContent\index.jsx
app\components\KnowledgeHub\PostHeaderContent\TagsList\index.jsx
app\components\KnowledgeHub\PostHeaderContent\ActionsList\index.jsx
```

#### PostsList

Q&As are divided into many detailed pieces of information, forming a PostsList, which is parsed within this component.

```
app\components\KnowledgeHub\PostsList\index.jsx
app\components\KnowledgeHub\PostsList\ImageAbove\index.jsx
app\components\KnowledgeHub\PostsList\ImageBelow\index.jsx
app\components\KnowledgeHub\PostsList\ImageLeft\index.jsx
app\components\KnowledgeHub\PostsList\ImageRight\index.jsx
app\components\KnowledgeHub\PostsList\Warning\index.jsx
```

#### PostPageQuestion

Question rating system results, currently hidden as the feature seems incomplete.
```
app\components\KnowledgeHub\PostPageQuestion\index.jsx
```