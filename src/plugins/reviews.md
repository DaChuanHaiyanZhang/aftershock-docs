````md
# REVIEWS.io Polaris `window.ReviewsWidget` 参数文档

## 基础调用结构

```js
window.ReviewsWidget('#ReviewsWidget', {
  store: 'your-store',
  widget: 'polaris',
  options: {},
  translations: {},
  styles: {}
});
````

---

## 一、第一层参数

| 参数             | 类型       | 说明               | 示例                      |
| -------------- | -------- | ---------------- | ----------------------- |
| `selector`     | `string` | 挂载容器选择器          | `'#ReviewsWidget'`      |
| `store`        | `string` | 店铺标识             | `'aftershockpc.com.au'` |
| `widget`       | `string` | 组件类型，Polaris 固定值 | `'polaris'`             |
| `options`      | `object` | 主功能配置区           | `{ ... }`               |
| `translations` | `object` | 文案覆盖             | `{ ... }`               |
| `styles`       | `object` | 样式变量覆盖           | `{ ... }`               |

---

## 二、`options` 顶层参数

| 参数                          | 类型        | 说明       | 示例                                       |
| --------------------------- | --------- | -------- | ---------------------------------------- |
| `types`                     | `string`  | 控制显示哪些模块 | `'product_review,questions'`             |
| `enable_sentiment_analysis` | `boolean` | 启用情感分析   | `true`                                   |
| `lang`                      | `string`  | 语言       | `'en'`                                   |
| `layout`                    | `string`  | 布局样式     | `''`                                     |
| `per_page`                  | `number`  | 每页显示数量   | `15`                                     |
| `store_review`              | `object`  | 店铺评论配置   | `{ hide_if_no_results: false }`          |
| `third_party_review`        | `object`  | 第三方评论配置  | `{ hide_if_no_results: false }`          |
| `product_review`            | `object`  | 产品评论配置   | `{ sku: '', hide_if_no_results: false }` |
| `questions`                 | `object`  | 问答配置     | `{ ... }`                                |
| `header`                    | `object`  | 头部配置     | `{ ... }`                                |
| `filtering`                 | `object`  | 筛选配置     | `{ ... }`                                |
| `reviews`                   | `object`  | 评论列表配置   | `{ ... }`                                |

---

## 三、`types` 可用值

| 值                    | 说明    |
| -------------------- | ----- |
| `product_review`     | 产品评论  |
| `store_review`       | 店铺评论  |
| `third_party_review` | 第三方评论 |
| `questions`          | 问答    |

### 示例

```js
types: 'product_review,questions'
```

---

## 四、`layout` 可用值

| 值            | 说明   |
| ------------ | ---- |
| `''`         | 默认布局 |
| `'bordered'` | 边框布局 |
| `'large'`    | 大号布局 |
| `'reverse'`  | 反向布局 |

### 示例

```js
layout: ''
```

---

## 五、`options.store_review`

| 参数                   | 类型        | 说明       | 示例      |
| -------------------- | --------- | -------- | ------- |
| `hide_if_no_results` | `boolean` | 无结果时是否隐藏 | `false` |

### 示例

```js
store_review: {
  hide_if_no_results: false
}
```

---

## 六、`options.third_party_review`

| 参数                   | 类型        | 说明       | 示例      |
| -------------------- | --------- | -------- | ------- |
| `hide_if_no_results` | `boolean` | 无结果时是否隐藏 | `false` |

### 示例

```js
third_party_review: {
  hide_if_no_results: false
}
```

---

## 七、`options.product_review`

| 参数                   | 类型        | 说明                  | 示例                |
| -------------------- | --------- | ------------------- | ----------------- |
| `sku`                | `string`  | 产品 SKU，多个 SKU 用分号分隔 | `'SKU001;SKU002'` |
| `hide_if_no_results` | `boolean` | 无结果时是否隐藏            | `false`           |

### 示例

```js
product_review: {
  sku: 'SKU001;SKU002',
  hide_if_no_results: false
}
```

### 说明

* `sku` 支持多个值
* 多个 SKU 用分号 `;` 分隔，不是逗号

---

## 八、`options.questions`

| 参数                                 | 类型        | 说明           | 示例      |
| ---------------------------------- | --------- | ------------ | ------- |
| `hide_if_no_results`               | `boolean` | 无结果时是否隐藏     | `false` |
| `enable_ask_question`              | `boolean` | 是否启用提问按钮     | `true`  |
| `enable_ask_question_button_style` | `boolean` | 是否启用默认提问按钮样式 | `false` |
| `show_dates`                       | `boolean` | 是否显示日期       | `true`  |
| `grouping`                         | `string`  | 问答分组值，常传 SKU | `''`    |

### 示例

```js
questions: {
  hide_if_no_results: false,
  enable_ask_question: true,
  enable_ask_question_button_style: false,
  show_dates: true,
  grouping: ''
}
```

### 说明

* `grouping` 用于 Q&A 分组
* 常见做法是传 `sku` 或其他产品分组值

---

## 九、`options.header`

| 参数                           | 类型        | 说明               | 示例      |
| ---------------------------- | --------- | ---------------- | ------- |
| `enable_summary`             | `boolean` | 启用摘要             | `true`  |
| `enable_ratings`             | `boolean` | 启用评分显示           | `true`  |
| `enable_attributes`          | `boolean` | 启用属性显示           | `true`  |
| `enable_image_gallery`       | `boolean` | 启用图片画廊           | `true`  |
| `enable_percent_recommended` | `boolean` | 启用推荐百分比          | `false` |
| `enable_write_review`        | `boolean` | 启用写评论入口          | `true`  |
| `enable_ask_question`        | `boolean` | 启用提问入口           | `true`  |
| `enable_sub_header`          | `boolean` | 启用副标题区域          | `true`  |
| `rating_decimal_places`      | `number`  | 评分小数位数           | `2`     |
| `use_write_review_button`    | `boolean` | 是否使用独立写评论按钮样式    | `false` |
| `enable_if_no_results`       | `boolean` | 无结果时是否仍显示 header | `false` |

### 示例

```js
header: {
  enable_summary: true,
  enable_ratings: true,
  enable_attributes: true,
  enable_image_gallery: true,
  enable_percent_recommended: false,
  enable_write_review: true,
  enable_ask_question: true,
  enable_sub_header: true,
  rating_decimal_places: 2,
  use_write_review_button: false,
  enable_if_no_results: false
}
```

---

## 十、`options.filtering`

| 参数                                       | 类型        | 说明            | 示例      |
| ---------------------------------------- | --------- | ------------- | ------- |
| `enable`                                 | `boolean` | 启用筛选          | `true`  |
| `enable_text_search`                     | `boolean` | 启用文本搜索        | `true`  |
| `enable_sorting`                         | `boolean` | 启用排序          | `true`  |
| `enable_product_filter`                  | `boolean` | 启用产品筛选        | `false` |
| `enable_media_filter`                    | `boolean` | 启用媒体筛选        | `true`  |
| `enable_overall_rating_filter`           | `boolean` | 启用总体评分筛选      | `true`  |
| `enable_language_filter`                 | `boolean` | 启用语言筛选        | `false` |
| `enable_language_filter_language_change` | `boolean` | 语言切换时启用语言筛选联动 | `false` |
| `enable_ratings_filters`                 | `boolean` | 启用评分维度筛选      | `true`  |
| `enable_attributes_filters`              | `boolean` | 启用属性筛选        | `true`  |

### 示例

```js
filtering: {
  enable: true,
  enable_text_search: true,
  enable_sorting: true,
  enable_product_filter: false,
  enable_media_filter: true,
  enable_overall_rating_filter: true,
  enable_language_filter: false,
  enable_language_filter_language_change: false,
  enable_ratings_filters: true,
  enable_attributes_filters: true
}
```

---

## 十一、`options.reviews`

| 参数                           | 类型        | 说明      | 示例                 |
| ---------------------------- | --------- | ------- | ------------------ |
| `enable_avatar`              | `boolean` | 显示头像    | `false`            |
| `enable_reviewer_name`       | `boolean` | 显示评论者姓名 | `true`             |
| `enable_reviewer_address`    | `boolean` | 显示评论者地址 | `true`             |
| `reviewer_address_format`    | `string`  | 地址格式    | `'city, country'`  |
| `enable_verified_badge`      | `boolean` | 显示已验证标签 | `true`             |
| `enable_subscriber_badge`    | `boolean` | 显示订阅者标签 | `true`             |
| `review_content_filter`      | `string`  | 评论内容过滤值 | `'undefined'`      |
| `enable_reviewer_recommends` | `boolean` | 显示是否推荐  | `true`             |
| `enable_attributes`          | `boolean` | 显示评论属性  | `true`             |
| `enable_product_name`        | `boolean` | 显示产品名   | `true`             |
| `enable_review_title`        | `boolean` | 显示评论标题  | `undefined`        |
| `enable_replies`             | `boolean` | 显示回复    | `undefined`        |
| `enable_images`              | `boolean` | 显示图片    | `true`             |
| `enable_ratings`             | `boolean` | 显示评分    | `true`             |
| `enable_share`               | `boolean` | 启用分享    | `true`             |
| `enable_helpful_vote`        | `boolean` | 启用有帮助投票 | `true`             |
| `enable_helpful_display`     | `boolean` | 显示有帮助统计 | `true`             |
| `enable_report`              | `boolean` | 启用举报    | `true`             |
| `enable_date`                | `boolean` | 显示日期    | `true`             |
| `enable_third_party_source`  | `boolean` | 显示第三方来源 | `true`             |
| `default_sort`               | `string`  | 默认排序    | `'highest_rating'` |

### 示例

```js
reviews: {
  enable_avatar: false,
  enable_reviewer_name: true,
  enable_reviewer_address: true,
  reviewer_address_format: 'city, country',
  enable_verified_badge: true,
  enable_subscriber_badge: true,
  enable_reviewer_recommends: true,
  enable_attributes: true,
  enable_product_name: true,
  enable_images: true,
  enable_ratings: true,
  enable_share: true,
  enable_helpful_vote: true,
  enable_helpful_display: true,
  enable_report: true,
  enable_date: true,
  enable_third_party_source: true,
  default_sort: 'highest_rating'
}
```

### `default_sort` 可用值

| 值                  | 说明      |
| ------------------ | ------- |
| `'helpful_desc'`   | 按有帮助数降序 |
| `'date_desc'`      | 按日期倒序   |
| `'date_asc'`       | 按日期正序   |
| `'highest_rating'` | 按最高评分   |
| `'lowest_rating'`  | 按最低评分   |

### 注意

这些字段虽然公开示例里出现过，但不算特别稳：

* `review_content_filter`
* `enable_review_title`
* `enable_replies`

别传垃圾值，尤其别学示例里的：

```js
review_content_filter: 'undefined'
```

这写法很烂。

---

## 十二、`translations`

| 参数       | 类型       | 说明     | 示例                                         |
| -------- | -------- | ------ | ------------------------------------------ |
| 任意文案 key | `string` | 替换默认文案 | `'Verified Customer': 'Verified Customer'` |

### 示例

```js
translations: {
  'Verified Customer': 'Verified Customer'
}
```

### 说明

* `translations` 是键值对对象
* `key` 是原始文案
* `value` 是替换后的文案
* 公开资料没有完整的 key 列表，所以这部分只能自己逐项测试

---

## 十三、`styles` 已确认变量

### 基础

| 变量名                | 示例值      |
| ------------------ | -------- |
| `--base-font-size` | `'16px'` |

### 按钮通用

| 变量名                                  | 示例值         |
| ------------------------------------ | ----------- |
| `--common-button-font-family`        | `'inherit'` |
| `--common-button-font-size`          | `'16px'`    |
| `--common-button-font-weight`        | `'500'`     |
| `--common-button-letter-spacing`     | `'0'`       |
| `--common-button-text-transform`     | `'none'`    |
| `--common-button-vertical-padding`   | `'10px'`    |
| `--common-button-horizontal-padding` | `'20px'`    |
| `--common-button-border-width`       | `'2px'`     |
| `--common-button-border-radius`      | `'0px'`     |

### 主按钮

| 变量名                             | 示例值         |
| ------------------------------- | ----------- |
| `--primary-button-bg-color`     | `'#0E1311'` |
| `--primary-button-border-color` | `'#0E1311'` |
| `--primary-button-text-color`   | `'#ffffff'` |

### 次按钮

| 变量名                               | 示例值             |
| --------------------------------- | --------------- |
| `--secondary-button-bg-color`     | `'transparent'` |
| `--secondary-button-border-color` | `'#0E1311'`     |
| `--secondary-button-text-color`   | `'#0E1311'`     |

### 星级

| 变量名                            | 示例值                  |
| ------------------------------ | -------------------- |
| `--common-star-color`          | `'#0E1311'`          |
| `--common-star-disabled-color` | `'rgba(0,0,0,0.25)'` |
| `--medium-star-size`           | `'22px'`             |
| `--small-star-size`            | `'19px'`             |

### 标题文字

| 变量名                             | 示例值         |
| ------------------------------- | ----------- |
| `--heading-text-color`          | `'#0E1311'` |
| `--heading-text-font-weight`    | `'600'`     |
| `--heading-text-font-family`    | `'inherit'` |
| `--heading-text-line-height`    | `'1.4'`     |
| `--heading-text-letter-spacing` | `'0'`       |
| `--heading-text-transform`      | `'none'`    |

### 正文文字

| 变量名                 | 示例值         |
| ------------------- | ----------- |
| `--body-text-color` | `'#0E1311'` |

### 示例

```js
styles: {
  '--base-font-size': '16px',
  '--common-button-font-family': 'inherit',
  '--common-button-font-size': '16px',
  '--common-button-font-weight': '500',
  '--common-button-letter-spacing': '0',
  '--common-button-text-transform': 'none',
  '--common-button-vertical-padding': '10px',
  '--common-button-horizontal-padding': '20px',
  '--common-button-border-width': '2px',
  '--common-button-border-radius': '0px',
  '--primary-button-bg-color': '#0E1311',
  '--primary-button-border-color': '#0E1311',
  '--primary-button-text-color': '#ffffff',
  '--secondary-button-bg-color': 'transparent',
  '--secondary-button-border-color': '#0E1311',
  '--secondary-button-text-color': '#0E1311',
  '--common-star-color': '#0E1311',
  '--common-star-disabled-color': 'rgba(0,0,0,0.25)',
  '--medium-star-size': '22px',
  '--small-star-size': '19px',
  '--heading-text-color': '#0E1311',
  '--heading-text-font-weight': '600',
  '--heading-text-font-family': 'inherit',
  '--heading-text-line-height': '1.4',
  '--heading-text-letter-spacing': '0',
  '--heading-text-transform': 'none',
  '--body-text-color': '#0E1311'
}
```

---

## 十四、完整示例

```js
window.ReviewsWidget('#ReviewsWidget', {
  store: 'aftershockpc.com.au',
  widget: 'polaris',
  options: {
    types: 'product_review,questions',
    enable_sentiment_analysis: true,
    lang: 'en',
    layout: '',
    per_page: 15,

    store_review: {
      hide_if_no_results: false
    },

    third_party_review: {
      hide_if_no_results: false
    },

    product_review: {
      sku: '',
      hide_if_no_results: false
    },

    questions: {
      hide_if_no_results: false,
      enable_ask_question: true,
      enable_ask_question_button_style: false,
      show_dates: true,
      grouping: ''
    },

    header: {
      enable_summary: true,
      enable_ratings: true,
      enable_attributes: true,
      enable_image_gallery: true,
      enable_percent_recommended: false,
      enable_write_review: true,
      enable_ask_question: true,
      enable_sub_header: true,
      rating_decimal_places: 2,
      use_write_review_button: false,
      enable_if_no_results: false
    },

    filtering: {
      enable: true,
      enable_text_search: true,
      enable_sorting: true,
      enable_product_filter: false,
      enable_media_filter: true,
      enable_overall_rating_filter: true,
      enable_language_filter: false,
      enable_language_filter_language_change: false,
      enable_ratings_filters: true,
      enable_attributes_filters: true
    },

    reviews: {
      enable_avatar: false,
      enable_reviewer_name: true,
      enable_reviewer_address: true,
      reviewer_address_format: 'city, country',
      enable_verified_badge: true,
      enable_subscriber_badge: true,
      review_content_filter: 'undefined',
      enable_reviewer_recommends: true,
      enable_attributes: true,
      enable_product_name: true,
      enable_review_title: undefined,
      enable_replies: undefined,
      enable_images: true,
      enable_ratings: true,
      enable_share: true,
      enable_helpful_vote: true,
      enable_helpful_display: true,
      enable_report: true,
      enable_date: true,
      enable_third_party_source: true,
      default_sort: 'highest_rating'
    }
  },

  translations: {
    'Verified Customer': 'Verified Customer'
  },

  styles: {
    '--base-font-size': '16px',
    '--common-button-font-family': 'inherit',
    '--common-button-font-size': '16px',
    '--common-button-font-weight': '500',
    '--common-button-letter-spacing': '0',
    '--common-button-text-transform': 'none',
    '--common-button-vertical-padding': '10px',
    '--common-button-horizontal-padding': '20px',
    '--common-button-border-width': '2px',
    '--common-button-border-radius': '0px',
    '--primary-button-bg-color': '#0E1311',
    '--primary-button-border-color': '#0E1311',
    '--primary-button-text-color': '#ffffff',
    '--secondary-button-bg-color': 'transparent',
    '--secondary-button-border-color': '#0E1311',
    '--secondary-button-text-color': '#0E1311',
    '--common-star-color': '#0E1311',
    '--common-star-disabled-color': 'rgba(0,0,0,0.25)',
    '--medium-star-size': '22px',
    '--small-star-size': '19px',
    '--heading-text-color': '#0E1311',
    '--heading-text-font-weight': '600',
    '--heading-text-font-family': 'inherit',
    '--heading-text-line-height': '1.4',
    '--heading-text-letter-spacing': '0',
    '--heading-text-transform': 'none',
    '--body-text-color': '#0E1311'
  }
});
```

```
```
