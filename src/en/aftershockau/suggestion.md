# Optimization Suggestions

[[toc]]

## Using FrontApp for Data Analysis

Perhaps we can later perform data analysis on user online chat information to draw conclusions and facilitate business planning.

<details>
<summary>View AI Suggestion Guide</summary>

This document outlines how to retrieve chat logs via the **FrontApp API** for data analysis.

### 1. FrontApp API Overview

FrontApp provides two main APIs:

- **REST API**: [https://dev.frontapp.com/reference](https://dev.frontapp.com/reference)
- **GraphQL API**: [https://dev.frontapp.com/docs/graphql](https://dev.frontapp.com/docs/graphql)

Main accessible resources:

| Resource           | Description                                                                 |
| ------------------ | --------------------------------------------------------------------------- |
| `conversations`    | All conversations/threads (emails, chats, Facebook Messenger, etc.)         |
| `messages`         | Messages within each conversation                                           |
| `contacts`         | User information                                                            |
| `users`            | Team member information                                                     |
| `tags` / `folders` | Conversation categorization                                                 |

> In theory, all chat logs and user information can be accessed through these resources.

---

### 2. Steps to Retrieve Chat Logs

#### Step 1: Fetch Conversation List

```http
GET /conversations
Authorization: Bearer <API_TOKEN>
```

- The API returns paginated data, requiring pagination loops (`page` / `per_page`).
- Filters can be used to screen specific types of conversations.

#### Step 2: Fetch Messages for Each Conversation

```http
GET /conversations/{conversation_id}/messages
Authorization: Bearer <API_TOKEN>
```

Example response:

```json
[
  {
    "id": "msg_123",
    "body": "Hello, how can I help?",
    "from": "user_1",
    "to": ["user_2"],
    "created_at": "2025-11-27T08:00:00Z",
    "attachments": []
  }
]
```

#### Step 3: Fetch User Information

- `from` / `to` correspond to `contacts` or `users`.
- Can query in batches or cache user information.

---

### 3. Considerations

1. **API Rate Limits**

   - Front API has call limits per token; requires handling pagination + delayed requests.

2. **Permission Issues**

   - Only conversations you have permission to access.
   - Admin rights needed for full data access.

3. **Large Data Volume**

   - Large teams may have hundreds of thousands of messages.
   - Recommend saving directly to a database or CSV before analysis.

4. **Sensitive Data**
   - Messages may contain user private information. Consider desensitization or compliance handling before analysis.

---

### 4. Node.js Example (REST API)

```js
const fetch = require("node-fetch");
const API_TOKEN = process.env.FRONT_API_TOKEN;

// Fetch all conversations
async function getAllConversations() {
  let conversations = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const res = await fetch(
      `https://api2.frontapp.com/conversations?page=${page}`,
      {
        headers: { Authorization: `Bearer ${API_TOKEN}` },
      }
    );
    const data = await res.json();
    conversations.push(...data._results);
    hasMore = data._pagination.next;
    page++;
  }

  return conversations;
}

// Fetch messages for a single conversation
async function getMessages(conversationId) {
  const res = await fetch(
    `https://api2.frontapp.com/conversations/${conversationId}/messages`,
    {
      headers: { Authorization: `Bearer ${API_TOKEN}` },
    }
  );
  return res.json();
}
```

---

### 5. Summary

- **Chat logs can be downloaded via the FrontApp API**, suitable for data analysis.
- Must meet the following conditions:

  1. Have admin rights.
  2. Handle pagination and rate limits.
  3. Consider privacy and compliance.

- Recommended process:
  1. Get conversation list.
  2. Get messages for each conversation.
  3. Get user information.
  4. Save data to database/CSV.
  5. Perform analysis.

---

**Note**: Suggest starting with a small-scale test to ensure manageable data volume and verify permissions and API limits.

</details>

## HeroBanner Component Optimization

```bash
app\components\Slices\LandingPageSlices\HeroBanner\index.jsx
```

Should use more efficient loops to match specified components instead of switch statements. Problematic code:

> [!WARNING]
> Too many loops; need alternative solution.

```jsx
function renderSlice(slice, index) {
  switch (slice.slice_type) {
    case "hero_banner":
      return <HeroBanner data={slice} />;
    case "new_categories":
      return <NewCategories data={slice} />;
    case "limited_edition_slice":
      return <LimitedEditionSlice data={slice} />;
    case "ultracore_carousel":
      return <UltracoreCarousel data={slice} location="home page" />;
    case "embed_video":
      return <EmbedVideo data={slice} />;
    case "new_awards":
      return <NewAwards data={slice} />;
    case "rts_pcs":
      return <RTSPCs data={slice} />;
    case "tik_tok_videos":
      return <TikTokVideos data={slice} />;
    case "three_category":
      return <ThreeCategory data={slice} />;
    case "cta":
      return <CTA data={slice} />;
    case "trusted_partners":
      return <TrustedPartners data={slice} />;
    case "reviews_carousel":
      return <ReviewsCarousel data={slice} />;
    case "reviews_io":
      return <ReviewsIoCarouselWidget data={slice} />;
    case "location_banner":
      return <LocationBanner data={slice} />;
    case "static_code":
      return <StaticCode data={slice} />;
    case "desktops_carousell":
      return <DesktopsCarousell data={slice} />;
    default:
      return null;
  }
}

export function SliceRenderer({ slices }) {
  <div className="flex flex-col justify-center items-center w-full h-auto bg-[#111111]">
    {slices.map((slice, index) => (
      <div
        className="flex flex-col justify-center items-center w-full h-auto"
        key={index}
        data-slice-index={index}
      >
        {renderSlice(slice, index)}
      </div>
    ))}
  </div>;
}
```

## Swiper Plugin Optimization

Since Swiper is used in many places, and to achieve certain animation effects in product detail pages, it is also used, I suggest registering the Swiper object globally after importing it.

>[!NOTE]
>If Swiper effects are needed in Static Code later, global registration is required. This can reduce unnecessary script imports and ease difficulties in script referencing and usage.

## NewCategories Optimization Solution

<details>
<summary>View Source Code</summary>

```jsx
<div
  className={`relative transition-all duration-300 ease-in-out overflow-hidden w-full flex items-center justify-center mt-[-20px] md:mt-0 ${
    isHovered === index ? "scale-105" : ""
  }`}
  style={
    isDesktop
      ? {
          width: "100%",
        }
      : {
          // aspectRatio: `${item.image_width}/${item.image_height}`,
          width: "100%",
        }
  }
  ref={(el) => {
    imageRefs.current[index] = el;
    containerRefs.current[index] = el;
  }}
  onMouseEnter={() => {
    setIsHovered(index);
    gsap.to(imageRefs.current[index], {
      filter: "drop-shadow(0 8px 20px rgba(255,0,0,0.3))",
      duration: 0.05,
      ease: "power2.out",
    });
  }}
  onMouseLeave={() => {
    setIsHovered(null);
    gsap.to(imageRefs.current[index], {
      filter: "none",
      duration: 0.1,
      ease: "power2.out",
    });
  }}
  onClick={() => {
    window.op("track", "collection-button-click", {
      "collection-name": item.button_text,
    });
  }}
>
  <img
    src={item.image_link.url}
    alt={item.image_alt_text}
    className="select-none"
    style={{
      ...(isDesktop
        ? {
            aspectRatio: `${item.image_width}/${item.image_height}`,
            maxHeight: "100%",
            maxWidth: "100%",
            width: "auto",
            height: "auto",
          }
        : {
            aspectRatio: `${item.image_width}/${item.image_height}`,
            width: "100%",
            maxWidth: "100%",
            maxHeight: "100%",
          }),
      // imageRendering: '-webkit-optimize-contrast',
    }}
    loading="eager"
  />
</div>
```

</details>

Actually, there is no need to use gsap here because it is only:

- Adding filter: drop-shadow(...) to the image on hover
- Removing filter on leave

This essentially is:

```css
filter: drop-shadow(...);
```

➡ CSS natively supports this; no animation complexity, no need for GSAP.

CSS hover can completely replace all your current GSAP functions. The equivalent CSS is:

```css
.img {
  transition: filter 0.2s ease;
}

.img:hover {
  filter: drop-shadow(0 8px 20px rgba(255, 0, 0, 0.3));
}
```

- GSAP is only necessary in **the following cases**:

  If you need these, then use GSAP:

  ✔ Complex animation sequences

  For example: color → blur → spread → breathing effect → glowing wave spreading outward.

  ✔ Multi-stage gradient animations

  For example: brighten at 50% hover, brighter at 70%, add blur at 100%.

  ✔ ScrollTrigger scroll-triggered

  Brightness increases based on scroll progress.

  ✔ Multi-element delay, staggering, timeline synchronization

  For example, 5 images flashing in sequence on hover.

  ✔ GPU physical animations (inertia, spring)

  Hard to express with CSS, need GSAP's physical model.

Performance Comparison Results

| Metric               | CSS Hover Filter | GSAP Filter    |
| -------------------- | ---------------- | -------------- |
| Main Thread Usage    | ★★★★★ Lowest      | ★★★✩✩ Medium-high |
| FPS Stability        | ★★★★★            | ★★★            |
| Layout/Repaint Count | ★★★★★            | ★★             |
| Memory Usage         | ★★★★★            | ★★★            |
| Code Complexity      | ★★★★★            | ★★★            |
| Animation Control    | ★★               | ★★★★★          |

## Homepage EXPLORE OUR RANGE (DesktopsCarousell) Component Optimization Suggestion

This component uses simple, crude tab switching. Consider implementing tab switching with a slider effect; other plugins may also be used.

## TrackerForm Defect

- Root Cause

  Shopify Storefront API does not have a direct `orderByNumber` query, resulting in only being able to query through a list and then analyze/query on the frontend.

- Current Solution

  - Users logged in: Upon entering the page, first cache 100 orders, then use the `find` method on the frontend to query.

    ```jsx
    //  order-tracker.jsx
    export async function loader({context}) {
      const {session, storefront} = context;
      const customerAccessToken = session.get('customerAccessToken');
      let orders = null;
      if (customerAccessToken) {
        const response = await storefront.query(CUSTOMER_ORDERS_QUERY, {
          variables: {customerAccessToken, first: 100},
        });
        orders = response?.customer?.orders;
      }
      return data(
        {orders, isLoggedIn: !!customerAccessToken, customerAccessToken},
        {
          headers: {
            'Oxygen-Cache-Control': 'public, max-age=1, stale-while-revalidate=9',
          },
        },
      );
    }

    ```

    - ❌ Defects:
      1. Causes lag when the frontend enters the page.
      2. **Can only query from 100** order data.
    - ✅ Advantages:
      1. User queries are very fast because data is fetched directly from frontend cache.
      2. Most users won't have 100 orders, so this defect may not be critical. However, there is still a business logic defect.
    - 🛠️ Solution:

      After the user enters the page, query data when entering the order number for search, or cache the first 100 first. If the data volume exceeds 100 and no result is found, query further down. This ensures that if the order number exists, it can be found regardless.

  - Users not logged in: Upon entering the page, when querying, first query the first 100, then use the `find` method on the frontend to query.

    ```jsx
    // OrderTracker\index.jsx
    const handleSearch = async () => {
      try {
        const requestBody = {
          orderNumber: orderNum,
          email: emailValue.trim(),
        };

        const response = await fetch('/api/track-order', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(requestBody),
        });

        const data = await response.json();
        setApiLoading(false);

        if (data.error) {
          if (data.error === 'Order number and email do not match') {
            setOrderNumberError('Order number and email do not match');
            setEmailError('Order number and email do not match');
          } else if (data.error === 'Order not found') {
            setOrderNumberError(
              'Order number not found. New orders may take up to 24 hours to show. No email after 24 hours? Contact support',
            );
          } else if (data.error === 'Invalid email address') {
            setEmailError('Invalid email address');
          } else {
            setStatusError(data.error);
          }
          return;
        }

        setStatusError('');
        setFetcherData(data);
      } catch (err) {
        setApiLoading(false);
        console.error('API Error:', err);
        setStatusError('Internal error');
      }
    }
    ```

    - ❌ Defect: **Can only query from 100** order data, may lead to missing data if user has over 100 orders.
    - 🛠️ Solution:

      After the user enters the page, query data when entering the order number for search, or cache the first 100 first. If the data volume exceeds 100 and no result is found, query further down. This ensures that if the order number exists, it can be found regardless.

## toStaticCode Optimization Solution

::: code-group

```bash
app\routes\products.$handle.jsx
```

```javascript
function toStaticCode(metaobject) {
  const fields = metaobject?.fields || [];
  const map = {};

  fields.forEach((f) => {
    map[f.key] = f.value || "";
  });

  return {
    html: map.html || null,
    css: map.css || null,
    js: map.js || null,
  };
}
```

:::

### Issues with the original code:

1. Fields are hardcoded, only returning html/css/js. If metaobject adds a json field later → code needs changes.
2. JSON strings cannot be parsed. If a field itself is JSON (common in your project), the original code returns a string, which is unusable.
3. This code converts empty strings to `""`, not `null`, causing frontend type inconsistencies.
4. If a field doesn't exist, `map.html` will be `undefined` → fallback to `null`, behavior may be incorrect.

### Real Benefits

1. ✔ More robust: automatically handles multiple fields, automatically parses JSON, handles null, avoids bugs.
2. ✔ More maintainable: when metaobject adds fields later, no code changes needed anywhere.
3. ✔ Safer: no errors due to JSON strings, won't return incorrect formats.
4. ✔ Code is shorter and more readable, especially the Object.fromEntries version.

### Optimization Result

```javascript
function toStaticCode(metaobject) {
  return Object.fromEntries(
    (metaobject?.fields || []).map(f => [
      f.key,
      f.value ?? null
    ])
  );
}
```

## Product Details Business Logic Optimization

```bash
app\routes\products.$handle.jsx
```

>[!DANGER]
>Seeing `Promise.all` makes it hard to stay calm.

### Optimization Reason

Complex code logic makes browsing time-consuming and laborious.

### Optimization Strategy

Encapsulate and separate business logic.

## ErrorBoundary Optimization

### Problem

Every time jumping to another page, when an error occurs, it first jumps to the most basic error page, then redirects to the corresponding error page. The entire redirect process is noticeably visible.

### Solution

Hope that every time jumping to an error page, it instantly reaches the error page instead of redirecting. Currently unsure if achievable, as it might be possible through different component replacements.

## Workstations Page `fetchFeaturesForModels` Method Alternative.

### Problem

Consistently using `Promise.all` can cause serious performance issues. For example 👉, with 10 pieces of data, originally could be fetched in one go, but I query the server 10 times to complete. Performance impact may be more than 10x.

Problem code snippet:

```javascript
async function fetchFeaturesForModels(models, storefront, prismicData) {
    const METAOBJECT_QUERY = `
      query GetMetaobject($handle: MetaobjectHandleInput!) {
        metaobject(handle: $handle) { 
          fields {
            key
            value
          }
        }
      }
    `;

    const uniqueFeatureIds = [
      ...new Set(models.map((m) => prismicMap[m.prismic_uid]).filter(Boolean)),
    ];

    await Promise.all( // [!code error]
      uniqueFeatureIds.map(async (id) => { // [!code error]
        try { // [!code error]
          const res = await storefront.query(METAOBJECT_QUERY, { // [!code error]
            variables: { // [!code error]
              handle: {type: 'prismic_cache_features_list', handle: id}, // [!code error]
            }, // [!code error]
          }); // [!code error]
          // [!code error]
          const dataField = res?.metaobject?.fields?.find(// [!code error]
            (f) => f.key === 'data',// [!code error]
          ); // [!code error]
          if (dataField?.value) { // [!code error]
            metaobjectCache[id] = JSON.parse(dataField.value); // [!code error]
          }// [!code error]
        } catch { // [!code error]
          metaobjectCache[id] = null; // [!code error]
        } // [!code error]
      }),// [!code error]
    );
  }
```

### Solution

Use [metaobjects](https://shopify.dev/docs/api/admin-graphql/latest/queries/metaobjects?example=fetch-metaobjects-with-string-search) to replace the current `metaobject`, allowing batch querying in one go instead of N queries✌️.

```javascript
async function fetchFeaturesForModels(models, storefront, prismicData) {
  const METAOBJECTS_BATCH_QUERY = `
    query GetMetaobjectsBatch($handles: [MetaobjectHandleInput!]!) {
      metaobjects(handles: $handles, first: 100) {
        nodes {
          handle
          fields {
            key
            value
          }
        }
      }
    }
  `;
  // code ...
  // Batch query handles
  const handles = uniqueFeatureIds.map(id => ({
    handle: id,
    type: 'prismic_cache_features_list'
  }));
  // code ...
  const result = await storefront.query(METAOBJECTS_BATCH_QUERY, {
    variables: { handles }
  });
  // code ...
}
```

>[!NOTE]
>Check other places using `Promise.all`; perhaps all can be solved this way.

## Original Image Size Issue - Technical Side Suggestion.

Original image loading does consume a lot of resources due to image size, ultimately causing slow loading. To solve this, preparation is needed from both ends.

1. Compress before image upload.
2. After image upload, update code on the technical side. Hydrogen provides `OSS` capability, allowing cropping at the specific layout location during calls, which can also achieve cropping effects.

## Server Page Performance Issue Handling Solution

Solution 1: Use GraphQL alias query; this solution cannot be dynamic.

```javascript
const MULTIPLE_METAOBJECTS_QUERY = `#graphql
  query {
    desktop: metaobject(handle: {type: "prismic_cache_sale_page", handle: "desktop"}) {
      id
      handle
      fields {
        key
        value
      }
    }
    workstation: metaobject(handle: {type: "prismic_cache_sale_page", handle: "workstation"}) {
      id
      handle
      fields {
        key
        value
      }
    }
    laptop: metaobject(handle: {type: "prismic_cache_sale_page", handle: "laptop"}) {
      id
      handle
      fields {
        key
        value
      }
    }
  }
`;

const result = await storefront.query(MULTIPLE_METAOBJECTS_QUERY);

console.log(result.desktop);      // desktop object
console.log(result.workstation);  // workstation object
console.log(result.laptop);       // laptop object

// Convert to array
const metaobjects = [
  result.desktop,
  result.workstation,
  result.laptop
].filter(Boolean);

```

Solution 2: Dynamically generate GraphQL query.

```javascript
// app/lib/metaobject.ts

/**
 * Dynamically generate GraphQL query for multiple metaobjects
 */
export function buildMultipleMetaobjectsQuery(
  type: string,
  handles: string[]
) {
  const queries = handles.map((handle, index) => `
    item${index}: metaobject(handle: {type: "${type}", handle: "${handle}"}) {
      id
      handle
      fields {
        key
        value
      }
    }
  `).join('\n');
  
  return `query { ${queries} }`;
}

// Usage
const handles = ['desktop', 'workstation', 'laptop'];
const query = buildMultipleMetaobjectsQuery('prismic_cache_sale_page', handles);

const result = await storefront.query(query);

// Extract results
const metaobjects = Object.values(result).filter(Boolean);
console.log(metaobjects); // [desktop object, workstation object, laptop object]

```