# instant.one 集成指南

[[toc]]

## 概述

`Instant.one` 通过跟踪用户在 `Aftershock` 商城中的实时行为（如浏览、加购），并利用AI分析这些数据，从而自动向用户推送高度个性化的营销邮件，以提升互动与转化。

`Klaviyo` 通过追踪用户在 `Aftershock` 商城中的行为与交易数据，并利用其营销自动化平台，为用户自动发送高度个性化的邮件、短信等多渠道信息，以培育客户关系并促进复购。

如何集成请查看官方文档。

>[!IMPORTANT]
>官方链接地址: https://help.instant.one/installing-instant-ai-for-headless-shopify-sites

## 核心流程与技术细节
整个集成流程围绕数据流转展开，具体技术实现如下：

1. 事件触发与采集
当用户在 Aftershock 商城浏览、查看商品或加购时，在网站代码中调用 window.InstantJS.track() 方法。这是整个数据流的起点。

2. 数据处理与同步
Instant.one 的 SDK 会捕获这些事件。其关键在于，Instant.one 不仅能转发原始数据，还能利用其AI能力对数据进行丰富和上下文分析（例如，判断用户意图），然后将标准化的用户行为事件实时同步到 Klaviyo 平台。这通常通过 Klaviyo 的 API 完成。

3. 营销自动化触发
在 Klaviyo 后台，这些由 Instant.one 同步过来的事件（如 Product Viewed、Added to Cart）会与具体的用户档案（Profile）关联。可以基于这些事件创建或触发对应的自动化流程（Flow）。

## 事件跟踪核心概念

在开始集成前，了解 Instant 事件跟踪的三个核心对象会很有帮助：
- **`products`**: 描述被浏览的商品，用于 `PAGE_VIEWED`, `COLLECTION_VIEWED`, `PRODUCT_VIEWED`。
- **`cart`**: 描述购物车的完整状态，用于 `CART_VIEWED`, `CHECKOUT_STARTED`。
- **`items`**: 描述购物车中变动的商品项，与 `cart` 搭配用于 `ITEM_ADDED_TO_CART`。

所有事件都通过全局的 `window.InstantJS.track()` 方法发送。您可以同时发送给 Instant 和其他服务商（如 Klaviyo）。

---

## 可用事件速览

下表列出了所有需要跟踪的事件及其核心用途，方便您快速了解。每个事件的具体参数和示例请参阅后续的详细章节。

| 事件类型 | 触发时机 | 必需参数 | 核心目的 |
| :--- | :--- | :--- | :--- |
| **PAGE_VIEWED** | 用户浏览任何页面时 | `products` | 记录页面关联的商品曝光，用于个性化推荐。 |
| **PRODUCT_VIEWED** | 用户查看商品详情页时 | `products` | 追踪具体的商品浏览行为，分析用户兴趣。 |
| **ITEM_ADDED_TO_CART** | 商品被加入购物车时 | `cart`, `items` | 捕获加购行为，用于弃购挽回和购物车推荐。 |
| **CART_VIEWED** | 用户打开购物车页面时 | `cart` | 记录用户主动查看购物车的行为。 |
| **CHECKOUT_STARTED** | 用户进入结算流程时 | `cart` | 标识关键的转化节点，用于优化结算流程。 |
| **COLLECTION_VIEWED** | 用户浏览商品分类/集合页时 | `products` | 了解用户对商品类别的偏好。 |

---

## 事件详情与集成指南

以下是对每个事件的详细说明、示例代码和参数列表。

### PAGE_VIEWED
当用户浏览任何页面时触发。您可以在页面加载时，发送当前页面相关的商品信息，帮助 Instant AI 了解上下文并提供个性化推荐。

**TypeScript 函数示例**
```typescript
// 示例：在网站全局布局或页面组件中调用
function trackPageView(pageProducts: InteractionProduct[]): void {
  const eventPayloads: InstantEvent[] = [
    {
      provider: "INSTANT",
      event: {
        products: pageProducts // 传入当前页面希望关联的商品数组
      }
    }
  ];

  if (window.InstantJS) {
    window.InstantJS.track("PAGE_VIEWED", eventPayloads);
  } else {
    console.warn('InstantJS 未加载');
  }
}

// 使用示例：在商品列表页，传入前3个商品
// const productsOnPage = [...];
// trackPageView(productsOnPage.slice(0, 3));
```

**事件载荷示例**
```javascript
window.InstantJS?.track("PAGE_VIEWED", [
  {
    provider: "INSTANT",
    event: {
      products: [
        {
          product_id: "prod_123",
          product_sku: "TSHIRT-WHITE-M",
          product_name: "纯棉白色T恤（M码）",
          price: 2999,
          currency: "CNY",
          image: { url: "https://cdn.example.com/tshirt-white.jpg" },
          online_store_url: "https://shop.example.com/product/tshirt-white" // 重要
        }
      ]
    }
  }
]);
```

**`products` 参数说明 (InteractionProduct)**
| 参数名 | 类型 | 是否必需 | 说明与示例 |
| :--- | :--- | :--- | :--- |
| **`product_id`** | `string` | **是** | 商品唯一ID。`"prod_12345"` |
| **`product_sku`** | `string` | **是** | 商品SKU。`"BLANKET-SMALL"` |
| **`product_name`** | `string` | **是** | 商品名称。`"法兰绒毯子"` |
| **`image`** | `object` | **是** | 主图对象，必须含 `url`。`{url: ‘https://...’}` |
| `online_store_url` | `string` | **强烈建议** | 商品页链接。有助于生成正确链接。 |
| `price` | `number` | 否 | 价格（单位：分）。`8900` 表示89.00元 |
| `currency` | `string` | 否 | 货币代码。`"CNY"`, `"USD"` |
| `variant_id` | `string` | 否 | 变体ID。`"var_678"` |

### PRODUCT_VIEWED
当用户查看单个商品的详情页时触发。这是理解用户兴趣的最关键事件之一。

**TypeScript 函数示例**
```typescript
function trackProductView(product: InteractionProduct): void {
  // 注意：products 属性应是一个数组，即使只包含一个商品
  const eventPayloads: InstantEvent[] = [
    {
      provider: "INSTANT",
      event: {
        products: [product] 
      }
    }
  ];
  window.InstantJS?.track("PRODUCT_VIEWED", eventPayloads);
}
// 使用示例：在商品详情页的React组件或Vue的mounted钩子中调用
// useEffect(() => { trackProductView(currentProduct); }, [currentProduct]);
```

**事件载荷示例**
```javascript
window.InstantJS?.track("PRODUCT_VIEWED", [
  {
    provider: "INSTANT",
    event: {
      products: [
        {
          product_id: "prod_456",
          product_sku: "HOODIE-L-BLACK",
          product_name: "黑色连帽卫衣",
          product_brand: "UrbanWear",
          variant_id: "var_789",
          variant_title: "L码 / 黑色",
          price: 8900,
          currency: "CNY",
          image: {
            url: "https://example.com/hoodie-black.jpg",
            alt: "黑色连帽卫衣"
          },
          handle: "black-hoodie",
          online_store_url: "https://shop.example.com/products/black-hoodie" // 必须
        }
      ]
    }
  }
]);
```

**关键参数说明**
`PRODUCT_VIEWED` 事件使用 `InteractionProduct` 类型，其参数与 `PAGE_VIEWED` 事件中的表格基本一致。但请务必提供更详尽的商品信息，特别是：
- **`variant_id` 和 `variant_title`**：如果商品有规格（如尺寸、颜色），必须提供，以确保推荐准确性。
- **`online_store_url`**：必须提供，这是生成“查看商品”按钮链接的基础。

### ITEM_ADDED_TO_CART
当用户将商品加入购物车时触发。这是**最关键且数据结构最特殊**的事件，请特别注意 `cart` 和 `items` 的区别。

**数据结构核心规则**：
- `cart` 对象中的 `items` 数组：必须包含**加入操作后**，购物车内的**所有商品**（包括原有的和新增的）。
- 顶级的 `items` 数组：应只包含本次**新加入的那一个（或几个）商品项**。

**TypeScript 函数示例**
```typescript
/**
 * 发送商品加入购物车事件
 * @param entireCart 加入新商品后，购物车的完整状态
 * @param addedItems 本次被新加入的一个或多个商品项
 */
function trackItemAddedToCart(
  entireCart: InteractionCart,
  addedItems: InteractionCartItem[]
): void {
  const eventPayloads: InstantEvent[] = [
    {
      provider: "INSTANT",
      event: {
        cart: entireCart,   // 规则1：完整的购物车
        items: addedItems   // 规则2：仅新增项
      }
    }
  ];
  window.InstantJS?.track("ITEM_ADDED_TO_CART", eventPayloads);
}
// 使用示例：在“加入购物车”按钮的回调函数中调用
// const updatedCart = await api.addToCart(product);
// trackItemAddedToCart(updatedCart, [product]);
```

**事件载荷示例**
```javascript
// 场景：购物车原有1件“T恤”，现加入1件“卫衣”
window.InstantJS?.track("ITEM_ADDED_TO_CART", [
  {
    provider: "INSTANT",
    event: {
      cart: { // 代表加购后的完整购物车
        cart_url: "https://shop.example.com/cart/abc123",
        currency: "CNY",
        grand_total: 13800,
        items: [ // 规则1：包含所有商品（T恤+卫衣）
          { // 原有商品
            item_id: "cart_line_1",
            product_id: "prod_123",
            product_name: "纯棉T恤",
            quantity: 1,
            price: 4900,
            // ... 其他字段
          },
          { // 新加入的商品（也必须出现在这里）
            item_id: "cart_line_2", 
            product_id: "prod_456",
            product_name: "黑色连帽卫衣",
            quantity: 1, // 当前总数量为1
            price: 8900,
            // ... 其他字段
          }
        ]
      },
      items: [ // 规则2：仅包含新加入的“卫衣”
        {
          item_id: "cart_line_2", // 此ID与上方cart.items中的对应
          product_id: "prod_456",
          product_name: "黑色连帽卫衣",
          quantity: 1, // 本次加入的数量
          price: 8900,
          // ... 其他字段
        }
      ]
    }
  }
]);
```

**`cart` 参数表格 (InteractionCart)**
| 参数名 | 类型 | 是否必需 | 说明 |
| :--- | :--- | :--- | :--- |
| **`cart_url`** | `string` | **是** | 购物车页面URL。`"https://.../cart"` |
| **`items`** | `InteractionCartItem[]` | **是** | **购物车中所有商品**的数组。 |
| `cart_id` | `string` | 否 | 购物车会话ID。 |
| `grand_total` | `number` | 否 | 总计金额（单位：分）。 |
| `currency` | `string` | 否 | 货币代码。 |

**`items` 参数表格 (InteractionCartItem)**
此类型继承自 `InteractionProduct`，增加了购物车项专属字段。
| 参数名 | 类型 | 是否必需 | 说明 |
| :--- | :--- | :--- | :--- |
| **`item_id`** | `string` | **是** | **购物车行ID**，非产品ID。用于唯一标识购物车中的一行。 |
| **`quantity`** | `number` | **是** | 该商品在购物车中的**总数量**。 |
| `item_name` | `string` | 否 | 商品项名称，通常同 `product_name`。 |
| （继承的所有参数） | | | 如 `product_id`, `price`, `image` 等也必须提供。 |

### CART_VIEWED
当用户查看购物车页面时触发。

**TypeScript 函数示例**
```typescript
function trackCartView(currentCart: InteractionCart): void {
  window.InstantJS?.track("CART_VIEWED", [
    { provider: "INSTANT", event: { cart: currentCart } }
  ]);
}
// 使用示例：在购物车页面组件加载时调用
```

**必需参数**：`cart` 对象（结构与 `ITEM_ADDED_TO_CART` 事件中的完全一致），需包含购物车内最新的所有商品信息。

### CHECKOUT_STARTED
当用户开始结算（通常指进入结算页面或点击“去结算”按钮）时触发。这是衡量转化率的关键节点。

**TypeScript 函数示例**
```typescript
function trackCheckoutStarted(checkoutCart: InteractionCart): void {
  // 确保购物车数据是结算时的最终状态
  window.InstantJS?.track("CHECKOUT_STARTED", [
    { provider: "INSTANT", event: { cart: checkoutCart } }
  ]);
}
```

**必需参数**：`cart` 对象。建议在此事件中提供尽可能准确的金额信息，包括：
- **`grand_total`**: 订单总计。
- **`discounts`**: 应用的折扣数组。
- **`shipping_total`**: 运费。
- **`tax_total`**: 税费。

### COLLECTION_VIEWED
当用户浏览一个商品集合或分类页面时触发。

**TypeScript 函数示例**
```typescript
function trackCollectionView(collectionProducts: InteractionProduct[]): void {
  // 通常传入该集合页当前显示的商品列表
  window.InstantJS?.track("COLLECTION_VIEWED", [
    { provider: "INSTANT", event: { products: collectionProducts } }
  ]);
}
// 使用示例：在分类页加载时，传入第一屏的商品列表
```

**必需参数**：`products` 数组，应包含该集合下的代表性商品（例如当前页的前20个商品）。每个商品提供 `product_id`, `product_name`, `image`, `online_store_url` 等核心信息即可。

---

## 实施与测试建议

1.  **实施顺序**：建议按 `PAGE_VIEWED` → `PRODUCT_VIEWED` → `ITEM_ADDED_TO_CART` → `CART_VIEWED` → `CHECKOUT_STARTED` 的顺序依次实现和测试。
2.  **测试方法**：
    - 在浏览器开发者工具的 **Console（控制台）** 中，直接输入 `window.InstantJS.track` 并回车，检查函数是否存在。
    - 触发事件后，在 **Network（网络）** 标签页中过滤 `instant` 请求，查看发送的数据负载。
    - 验证关键数据：
        - `cart_url` 和商品的 `online_store_url` 是否为完整URL。
        - 对于 `ITEM_ADDED_TO_CART`，检查 `cart.items` 与顶级 `items` 数组是否遵循上述规则。

## 通用 TypeScript 类型参考
```typescript
// 事件类型枚举
type InteractionType = 
  | "PAGE_VIEWED" | "COLLECTION_VIEWED" | "PRODUCT_VIEWED"
  | "ITEM_ADDED_TO_CART" | "CART_VIEWED" | "CHECKOUT_STARTED";

// Instant 事件载荷类型
type InstantEvent = {
  provider: "INSTANT";
  event: {
    cart?: InteractionCart;
    items?: InteractionCartItem[];
    products?: InteractionProduct[];
  };
};

// 其他服务商类型示例（如Klaviyo）
type KlaviyoEvent = {
  provider: "KLAVIYO";
  event: any; // 请根据Klaviyo官方文档定义具体结构
};

// 全局窗口类型扩展
declare global {
  interface Window {
    InstantJS?: {
      track: (type: InteractionType, body: (InstantEvent | KlaviyoEvent)[]) => void;
    };
  }
}
```
