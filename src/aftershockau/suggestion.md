# 优化建议

[[toc]]

## 使用 FrontApp 做数据分析

也许我们后续还可以对用户在线聊天的信息进行数据分析，得出一些结论，方便做商业规划

<details>
<summary>查看AI建议指南</summary>

本文档整理了如何通过 **FrontApp API** 获取聊天记录以进行数据分析的方法。

### 1. FrontApp API 概览

FrontApp 提供两种主要 API：

- **REST API**: [https://dev.frontapp.com/reference](https://dev.frontapp.com/reference)
- **GraphQL API**: [https://dev.frontapp.com/docs/graphql](https://dev.frontapp.com/docs/graphql)

主要可访问的资源：

| 资源               | 描述                                               |
| ------------------ | -------------------------------------------------- |
| `conversations`    | 所有会话/线程（邮件、聊天、Facebook Messenger 等） |
| `messages`         | 每个 conversation 中的消息                         |
| `contacts`         | 用户信息                                           |
| `users`            | 团队成员信息                                       |
| `tags` / `folders` | 对话分类                                           |

> 理论上，可以通过这些资源获取所有聊天记录及用户信息。

---

### 2. 获取聊天记录步骤

#### 步骤一：获取对话列表

```http
GET /conversations
Authorization: Bearer <API_TOKEN>
```

- API 返回分页数据，需循环翻页（`page` / `per_page`）。
- 可使用 filter 筛选特定类型对话。

#### 步骤二：获取每个对话的消息

```http
GET /conversations/{conversation_id}/messages
Authorization: Bearer <API_TOKEN>
```

返回内容示例：

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

#### 步骤三：获取用户信息

- `from` / `to` 对应 `contacts` 或 `users`。
- 可批量查询或缓存用户信息。

---

### 3. 注意事项

1. **API 速率限制**

   - Front API 对每个 token 有调用限制，需要处理分页 + 延时请求。

2. **权限问题**

   - 只能访问有权限的对话。
   - 获取全量数据需管理员权限。

3. **数据量大**

   - 大团队可能几十万条消息。
   - 建议直接保存到数据库或 CSV，再分析。

4. **敏感数据**
   - 消息可能包含用户隐私信息。分析前应考虑脱敏或合规处理。

---

### 4. Node.js 示例（REST API）

```js
const fetch = require("node-fetch");
const API_TOKEN = process.env.FRONT_API_TOKEN;

// 获取所有对话
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

// 获取单个对话消息
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

### 5. 总结

- **可以通过 FrontApp API 下载聊天记录**，适合数据分析。
- 需要满足以下条件：

  1. 拥有管理员权限
  2. 处理分页与速率限制
  3. 注意隐私与合规

- 推荐流程：
  1. 获取会话列表
  2. 获取每个会话消息
  3. 获取用户信息
  4. 保存数据到数据库/CSV
  5. 进行分析

---

**备注**：建议先做小规模测试，确保数据量可控，并验证权限和 API 限制。

</details>

## HeroBanner 组件优化

```bash
app\components\Slices\LandingPageSlices\HeroBanner\index.jsx
```

应该使用更高效率的循环去匹配指定的组件，而不是 switch 去判断。问题代码：

> [!WARNING]
> 循环次数太多，需要使用其他方案代替

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

## Swiper 插件的优化

因为很多地方都使用了 swiper ，而且在修饰商品详情页时，为了一些动画效果也会使用到，所以我更建议在引入 swiper 之后将 swiper 对象注册到全局。

>[!NOTE]
>如果后续要在 Static Code 做 Swiper 效果，则需要全局注册，这样能较少很多不必要的脚本引入，也能减少脚本引用和使用的困难。

## NewCategories 的优化方案

<details>
<summary>查看源代码</summary>

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

实际上这里完全没有必要使用 gsap，因为它只是在做：

- hover 时给图片加 filter: drop-shadow(...)
- 离开时去掉 filter

这本质是：

```css
filter: drop-shadow(...);
```

➡ CSS 已经原生支持，没有任何动画复杂度，不需要 GSAP。

CSS hover 完全能替代你当前 GSAP 的所有功能，等价的 css 就是：

```css
.img {
  transition: filter 0.2s ease;
}

.img:hover {
  filter: drop-shadow(0 8px 20px rgba(255, 0, 0, 0.3));
}
```



- GSAP 只有在“以下情况”才有必要：

  如果你需要这些，那才用 GSAP：

  ✔ 复杂动画序列

  比如：色彩 → 模糊 → 扩散 → 呼吸效果 → 发光波动往外扩散

  ✔ 多段渐变动画

  比如：hover 到 50% 才变亮、70% 变更亮、100% 再加模糊

  ✔ ScrollTrigger 滚动触发

  页面滚动时根据进度亮度增强

  ✔ 多元素延迟、交错、时间轴同步

  比如 5 张图片 hover 时按序闪光

  ✔ GPU 物理动画（惯性、spring）

  CSS 不好表达，需要 GSAP 的物理模型

性能对比结果

| 指标                | CSS Hover Filter | GSAP Filter    |
| ------------------- | ---------------- | -------------- |
| 主线程占用          | ★★★★★ 最低       | ★★★✩✩ 中等偏高 |
| FPS 稳定性          | ★★★★★            | ★★★            |
| Layout/Repaint 次数 | ★★★★★            | ★★             |
| 内存占用            | ★★★★★            | ★★★            |
| 代码复杂度          | ★★★★★            | ★★★            |
| 动画可控性          | ★★               | ★★★★★          |


## 首页 EXPLORE OUR RANGE （DesktopsCarousell） 组件优化建议

该组件是简单粗暴的tabs点击切换，是否可以考虑使用滑块效果做tabs，使用其他插件也可。

## TrackerForm 缺陷

- 产生根本原因

  Shopify Storefront API 没有直接的 `orderByNumber` 查询，导致只能通过列表查询，然后前端进行分析、查询。

- 当前解决方案
  - 登录状态下的用户进入该界面后，先缓存100条订单数据，然后前端使用 `find` 方法进行查询。
    
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
    - ❌ 缺陷：
      1. 导致前端进入页面时的卡顿
      2. **只能从100条**的数据中查询订单信息
    - ✅ 优势：
      1. 用户在查询的时候会非常快，因为直接从前端缓存中获取数据。
      2. 一般的用户不可能下100个订单，这就导致实际上这个缺陷也不是尖锐的缺陷。但是实际上还是有业务逻辑的缺陷。
    - 🛠️ 解决方案：
      
      在用户进入界面后，输入订单号查询时再查询数据，或者先缓存前100条，如果数据量大于100，且没有查询到的情况下，则向下查询，这样会保证如果订单号存在的情况下，不论如何都能查询到数据。

  - 登录状态下的用户，进入页面，在查询的时候，先查询前面100条，然后前端使用 `find` 方法进行查询。

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

    - ❌ 缺陷 **只能从100条**的数据中查询订单信息，可能导致数据缺失，前提是用户的订单数量超过100条。
    - 🛠️ 解决方案：

      在用户进入界面后，输入订单号查询时再查询数据，或者先缓存前100条，如果数据量大于100，且没有查询到的情况下，则向下查询，这样会保证如果订单号存在的情况下，不论如何都能查询到数据。


## toStaticCode 优化方案

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



### 原代码的问题是：

1. 字段是写死的，只返回 html/css/js，如果以后 metaobject 多加一个 json 字段 → 要改代码。
2. JSON 字符串无法解析，如果字段本身是 JSON（你项目里经常这样），原代码会返回字符串，不可用。
3. 这段代码会把空字符串变成 ""，而不是 null，造成前端类型不一致。
4. 如果字段不存在，map.html 会是 undefined → fallback 到 null，行为可能不对

### 真实收益

1. ✔ 更健壮，自动处理多字段，自动解析 JSON，处理 null，避免 bug
2. ✔ 更可维护，以后 metaobject 再加字段，不用改任何地方
3. ✔ 更安全，不会因为 JSON 字符串导致报错，不会返回错误格式
4. ✔ 代码更短更可读，尤其是 Object.fromEntries 版本

### 优化结果
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

## 商品详情业务逻辑优化

```bash
app\routes\products.$handle.jsx
```

>[!DANGER]
>看了 `promise.all` 基本无法淡定。

### 优化原因

代码逻辑繁杂，导致浏览很费时费力。

### 优化策略

封装、业务逻辑分离。

## ErrorBoundary 优化

### 问题

每次在跳转到其他界面，在发生错误时，先会跳转到最基础的错误界面，然后再跳转到对应的错误界面。整个 redirect 过程是明显可见的。

### 解决方案

希望每次在跳转到错误界面时，都可以秒到错误界面，而不是 redirect 过去。目前还不知道是否可以实现，因为貌似可以通过不同的组件替换实现。

## Workstations 页面 `fetchFeaturesForModels` 方法替代方案。

### 问题

如果一直使用 `Promise.all` 会导致比较严重的性能问题，举个例子👉，有10条数据，原本一次可以拉取完成，但是我要在服务器查询10回完成。性能影响可能不止10倍。

问题代码片段：

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
### 解决方案

使用 [metaobjects](https://shopify.dev/docs/api/admin-graphql/latest/queries/metaobjects?example=fetch-metaobjects-with-string-search) 替代现有的 `metaobject`，这样可以一次性查询完成，而不是查询N次✌️。

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
  // 批量查询 handles
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
>多看看其他地方的 `Promise.all` 或许都可以通过这个方式解决。