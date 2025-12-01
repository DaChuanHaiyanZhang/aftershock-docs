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