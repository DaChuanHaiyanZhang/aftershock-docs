# Instant.one Integration Guide

[[toc]]

## Overview

`Instant.one` tracks users' real-time behavior (such as browsing and adding to cart) in the `Aftershock` store and utilizes AI to analyze this data, thereby automatically sending highly personalized marketing emails to users to enhance engagement and conversion.

`Klaviyo` tracks users' behavior and transaction data in the `Aftershock` store and leverages its marketing automation platform to automatically send users highly personalized emails, SMS, and other multi-channel messages to nurture customer relationships and promote repeat purchases.

For details on how to integrate, please refer to the official documentation.

>[!IMPORTANT]
>Official link: https://help.instant.one/installing-instant-ai-for-headless-shopify-sites

## Core Process and Technical Details
The entire integration process revolves around data flow, with the specific technical implementation as follows:

1.  **Event Triggering and Collection**
    When users browse, view products, or add items to cart in the Aftershock store, the `window.InstantJS.track()` method is called in the website code. This is the starting point of the entire data flow.

2.  **Data Processing and Synchronization**
    The Instant.one SDK captures these events. The key point is that Instant.one can not only forward raw data but also enrich and contextually analyze the data using its AI capabilities (e.g., determining user intent), then synchronize the standardized user behavior events to the Klaviyo platform in real-time. This is typically accomplished via Klaviyo's API.

3.  **Marketing Automation Triggering**
    In the Klaviyo backend, these events synchronized from Instant.one (such as `Product Viewed`, `Added to Cart`) are associated with specific user profiles. Corresponding automation workflows (Flows) can be created or triggered based on these events.

## Core Concepts of Event Tracking

Before starting the integration, it is helpful to understand the three core objects for Instant event tracking:
- **`products`**: Describes products being viewed, used for `PAGE_VIEWED`, `COLLECTION_VIEWED`, `PRODUCT_VIEWED`.
- **`cart`**: Describes the complete state of the shopping cart, used for `CART_VIEWED`, `CHECKOUT_STARTED`.
- **`items`**: Describes the changed items in the shopping cart, used with `cart` for `ITEM_ADDED_TO_CART`.

All events are sent via the global `window.InstantJS.track()` method. You can send events simultaneously to Instant and other service providers (such as Klaviyo).

---

## Available Events Overview

The table below lists all events that need to be tracked and their core purposes for quick reference. Detailed parameters and examples for each event are provided in subsequent sections.

| Event Type | Trigger Timing | Required Parameters | Core Purpose |
| :--- | :--- | :--- | :--- |
| **PAGE_VIEWED** | When a user browses any page. | `products` | Records product exposure associated with the page for personalized recommendations. |
| **PRODUCT_VIEWED** | When a user views a product details page. | `products` | Tracks specific product viewing behavior to analyze user interest. |
| **ITEM_ADDED_TO_CART** | When a product is added to the cart. | `cart`, `items` | Captures add-to-cart behavior for cart abandonment recovery and cart recommendations. |
| **CART_VIEWED** | When a user opens the cart page. | `cart` | Records the user's active action of viewing the cart. |
| **CHECKOUT_STARTED** | When a user enters the checkout process. | `cart` | Identifies a key conversion point for optimizing the checkout flow. |
| **COLLECTION_VIEWED** | When a user browses a product category/collection page. | `products` | Understands user preferences for product categories. |

---

## Event Details and Integration Guide

The following provides detailed explanations, example code, and parameter lists for each event.

### PAGE_VIEWED
Triggered when a user browses any page. You can send product information related to the current page upon page load to help Instant AI understand the context and provide personalized recommendations.

**TypeScript Function Example**
```typescript
// Example: Call in website global layout or page component
function trackPageView(pageProducts: InteractionProduct[]): void {
  const eventPayloads: InstantEvent[] = [
    {
      provider: "INSTANT",
      event: {
        products: pageProducts // Pass the array of products to associate with the current page
      }
    }
  ];

  if (window.InstantJS) {
    window.InstantJS.track("PAGE_VIEWED", eventPayloads);
  } else {
    console.warn('InstantJS is not loaded');
  }
}

// Usage Example: On a product listing page, pass the first 3 products
// const productsOnPage = [...];
// trackPageView(productsOnPage.slice(0, 3));
```

**Event Payload Example**
```javascript
window.InstantJS?.track("PAGE_VIEWED", [
  {
    provider: "INSTANT",
    event: {
      products: [
        {
          product_id: "prod_123",
          product_sku: "TSHIRT-WHITE-M",
          product_name: "Cotton White T-Shirt (Size M)",
          price: 2999,
          currency: "CNY",
          image: { url: "https://cdn.example.com/tshirt-white.jpg" },
          online_store_url: "https://shop.example.com/product/tshirt-white" // Important
        }
      ]
    }
  }
]);
```

**`products` Parameter Description (InteractionProduct)**
| Parameter Name | Type | Required? | Description & Example |
| :--- | :--- | :--- | :--- |
| **`product_id`** | `string` | **Yes** | Unique product ID. `"prod_12345"` |
| **`product_sku`** | `string` | **Yes** | Product SKU. `"BLANKET-SMALL"` |
| **`product_name`** | `string` | **Yes** | Product name. `"Flannel Blanket"` |
| **`image`** | `object` | **Yes** | Main image object, must contain `url`. `{url: 'https://...'}` |
| `online_store_url` | `string` | **Strongly Recommended** | Product page link. Helps generate correct links. |
| `price` | `number` | No | Price (in the smallest currency unit, e.g., cents). `8900` represents 89.00 units. |
| `currency` | `string` | No | Currency code. `"CNY"`, `"USD"` |
| `variant_id` | `string` | No | Variant ID. `"var_678"` |

### PRODUCT_VIEWED
Triggered when a user views a single product's details page. This is one of the most critical events for understanding user interest.

**TypeScript Function Example**
```typescript
function trackProductView(product: InteractionProduct): void {
  // Note: The `products` property should be an array, even if containing only one product
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
// Usage Example: Call in a React component's useEffect or Vue's mounted hook on the product detail page
// useEffect(() => { trackProductView(currentProduct); }, [currentProduct]);
```

**Event Payload Example**
```javascript
window.InstantJS?.track("PRODUCT_VIEWED", [
  {
    provider: "INSTANT",
    event: {
      products: [
        {
          product_id: "prod_456",
          product_sku: "HOODIE-L-BLACK",
          product_name: "Black Hoodie",
          product_brand: "UrbanWear",
          variant_id: "var_789",
          variant_title: "Size L / Black",
          price: 8900,
          currency: "CNY",
          image: {
            url: "https://example.com/hoodie-black.jpg",
            alt: "Black Hoodie"
          },
          handle: "black-hoodie",
          online_store_url: "https://shop.example.com/products/black-hoodie" // Required
        }
      ]
    }
  }
]);
```

**Key Parameter Notes**
The `PRODUCT_VIEWED` event uses the `InteractionProduct` type, whose parameters are largely consistent with the table in the `PAGE_VIEWED` event. However, it is essential to provide more detailed product information, especially:
- **`variant_id` and `variant_title`**: Must be provided if the product has specifications (like size, color) to ensure recommendation accuracy.
- **`online_store_url`**: Must be provided as it is the basis for generating the "View Product" button link.

### ITEM_ADDED_TO_CART
Triggered when a user adds a product to the shopping cart. This is the **most critical and structurally unique** event. Pay special attention to the distinction between `cart` and `items`.

**Core Data Structure Rules**:
- The `items` array within the `cart` object: Must contain **all products** in the cart **after the add operation** (including existing and newly added ones).
- The top-level `items` array: Should contain only the **newly added item(s)** from this specific operation.

**TypeScript Function Example**
```typescript
/**
 * Sends the 'Item Added to Cart' event
 * @param entireCart The complete state of the cart after adding the new item(s)
 * @param addedItems The one or more item(s) newly added in this operation
 */
function trackItemAddedToCart(
  entireCart: InteractionCart,
  addedItems: InteractionCartItem[]
): void {
  const eventPayloads: InstantEvent[] = [
    {
      provider: "INSTANT",
      event: {
        cart: entireCart,   // Rule 1: The complete cart
        items: addedItems   // Rule 2: Only the newly added items
      }
    }
  ];
  window.InstantJS?.track("ITEM_ADDED_TO_CART", eventPayloads);
}
// Usage Example: Call in the callback function of an "Add to Cart" button
// const updatedCart = await api.addToCart(product);
// trackItemAddedToCart(updatedCart, [product]);
```

**Event Payload Example**
```javascript
// Scenario: The cart originally had 1 "T-Shirt", now 1 "Hoodie" is added
window.InstantJS?.track("ITEM_ADDED_TO_CART", [
  {
    provider: "INSTANT",
    event: {
      cart: { // Represents the complete cart after addition
        cart_url: "https://shop.example.com/cart/abc123",
        currency: "CNY",
        grand_total: 13800,
        items: [ // Rule 1: Contains all items (T-Shirt + Hoodie)
          { // Original item
            item_id: "cart_line_1",
            product_id: "prod_123",
            product_name: "Cotton T-Shirt",
            quantity: 1,
            price: 4900,
            // ... other fields
          },
          { // Newly added item (must also appear here)
            item_id: "cart_line_2", 
            product_id: "prod_456",
            product_name: "Black Hoodie",
            quantity: 1, // Current total quantity is 1
            price: 8900,
            // ... other fields
          }
        ]
      },
      items: [ // Rule 2: Contains only the newly added "Hoodie"
        {
          item_id: "cart_line_2", // This ID corresponds to the item in cart.items above
          product_id: "prod_456",
          product_name: "Black Hoodie",
          quantity: 1, // Quantity added in this operation
          price: 8900,
          // ... other fields
        }
      ]
    }
  }
]);
```

**`cart` Parameter Table (InteractionCart)**
| Parameter Name | Type | Required? | Description |
| :--- | :--- | :--- | :--- |
| **`cart_url`** | `string` | **Yes** | Cart page URL. `"https://.../cart"` |
| **`items`** | `InteractionCartItem[]` | **Yes** | Array of **all products** in the cart. |
| `cart_id` | `string` | No | Cart session ID. |
| `grand_total` | `number` | No | Total amount (in smallest currency unit). |
| `currency` | `string` | No | Currency code. |

**`items` Parameter Table (InteractionCartItem)**
This type inherits from `InteractionProduct` and adds shopping-cart-item-specific fields.
| Parameter Name | Type | Required? | Description |
| :--- | :--- | :--- | :--- |
| **`item_id`** | `string` | **Yes** | **Cart line item ID**, not the product ID. Used to uniquely identify a line in the cart. |
| **`quantity`** | `number` | **Yes** | The **total quantity** of this product in the cart. |
| `item_name` | `string` | No | Item name, usually the same as `product_name`. |
| (All inherited parameters) | | | Such as `product_id`, `price`, `image` must also be provided. |

### CART_VIEWED
Triggered when a user views the shopping cart page.

**TypeScript Function Example**
```typescript
function trackCartView(currentCart: InteractionCart): void {
  window.InstantJS?.track("CART_VIEWED", [
    { provider: "INSTANT", event: { cart: currentCart } }
  ]);
}
// Usage Example: Call when the cart page component loads
```

**Required Parameters**: The `cart` object (structure is identical to that in the `ITEM_ADDED_TO_CART` event), needs to contain the latest information on all items in the cart.

### CHECKOUT_STARTED
Triggered when a user starts the checkout process (typically upon entering the checkout page or clicking the "Proceed to Checkout" button). This is a key node for measuring conversion rate.

**TypeScript Function Example**
```typescript
function trackCheckoutStarted(checkoutCart: InteractionCart): void {
  // Ensure cart data reflects the final state at checkout
  window.InstantJS?.track("CHECKOUT_STARTED", [
    { provider: "INSTANT", event: { cart: checkoutCart } }
  ]);
}
```

**Required Parameters**: The `cart` object. It is recommended to provide as accurate monetary information as possible in this event, including:
- **`grand_total`**: Order total.
- **`discounts`**: Array of applied discounts.
- **`shipping_total`**: Shipping cost.
- **`tax_total`**: Tax amount.

### COLLECTION_VIEWED
Triggered when a user browses a product collection or category page.

**TypeScript Function Example**
```typescript
function trackCollectionView(collectionProducts: InteractionProduct[]): void {
  // Typically pass the list of products currently displayed on that collection page
  window.InstantJS?.track("COLLECTION_VIEWED", [
    { provider: "INSTANT", event: { products: collectionProducts } }
  ]);
}
// Usage Example: When a category page loads, pass the products from the first screen
```

**Required Parameters**: An array of `products`, which should include representative products from that collection (e.g., the first 20 products on the current page). Core information like `product_id`, `product_name`, `image`, `online_store_url` should be provided for each product.

---

## Implementation and Testing Recommendations

1.  **Implementation Order**: It is recommended to implement and test in the following order: `PAGE_VIEWED` → `PRODUCT_VIEWED` → `ITEM_ADDED_TO_CART` → `CART_VIEWED` → `CHECKOUT_STARTED`.
2.  **Testing Methods**:
    - In the browser's Developer Tools **Console**, type `window.InstantJS.track` and press Enter to check if the function exists.
    - After triggering an event, filter for `instant` requests in the **Network** tab to view the sent data payload.
    - Validate key data:
        - Check if `cart_url` and product `online_store_url` are complete URLs.
        - For `ITEM_ADDED_TO_CART`, verify that `cart.items` and the top-level `items` array follow the aforementioned rules.

## Generic TypeScript Type Reference
```typescript
// Event type enumeration
type InteractionType = 
  | "PAGE_VIEWED" | "COLLECTION_VIEWED" | "PRODUCT_VIEWED"
  | "ITEM_ADDED_TO_CART" | "CART_VIEWED" | "CHECKOUT_STARTED";

// Instant event payload type
type InstantEvent = {
  provider: "INSTANT";
  event: {
    cart?: InteractionCart;
    items?: InteractionCartItem[];
    products?: InteractionProduct[];
  };
};

// Other service provider type example (e.g., Klaviyo)
type KlaviyoEvent = {
  provider: "KLAVIYO";
  event: any; // Define specific structure according to Klaviyo's official documentation
};

// Global window type extension
declare global {
  interface Window {
    InstantJS?: {
      track: (type: InteractionType, body: (InstantEvent | KlaviyoEvent)[]) => void;
    };
  }
}
```