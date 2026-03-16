````md
# REVIEWS.io Polaris `window.ReviewsWidget` Parameter Documentation

## Basic Usage

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

## 1. Top-Level Parameters

| Parameter      | Type     | Description                          | Example                 |
| -------------- | -------- | ------------------------------------ | ----------------------- |
| `selector`     | `string` | Mount container selector             | `'#ReviewsWidget'`      |
| `store`        | `string` | Store identifier                     | `'aftershockpc.com.au'` |
| `widget`       | `string` | Widget type. Fixed value for Polaris | `'polaris'`             |
| `options`      | `object` | Main configuration object            | `{ ... }`               |
| `translations` | `object` | Text overrides                       | `{ ... }`               |
| `styles`       | `object` | CSS variable overrides               | `{ ... }`               |

---

## 2. `options` Top-Level Parameters

| Parameter                   | Type      | Description                      | Example                                  |
| --------------------------- | --------- | -------------------------------- | ---------------------------------------- |
| `types`                     | `string`  | Controls which modules are shown | `'product_review,questions'`             |
| `enable_sentiment_analysis` | `boolean` | Enables sentiment analysis       | `true`                                   |
| `lang`                      | `string`  | Language                         | `'en'`                                   |
| `layout`                    | `string`  | Layout style                     | `''`                                     |
| `per_page`                  | `number`  | Number of items per page         | `15`                                     |
| `store_review`              | `object`  | Store review settings            | `{ hide_if_no_results: false }`          |
| `third_party_review`        | `object`  | Third-party review settings      | `{ hide_if_no_results: false }`          |
| `product_review`            | `object`  | Product review settings          | `{ sku: '', hide_if_no_results: false }` |
| `questions`                 | `object`  | Q&A settings                     | `{ ... }`                                |
| `header`                    | `object`  | Header settings                  | `{ ... }`                                |
| `filtering`                 | `object`  | Filtering settings               | `{ ... }`                                |
| `reviews`                   | `object`  | Review list settings             | `{ ... }`                                |

---

## 3. `types` Available Values

| Value                | Description           |
| -------------------- | --------------------- |
| `product_review`     | Product reviews       |
| `store_review`       | Store reviews         |
| `third_party_review` | Third-party reviews   |
| `questions`          | Questions and answers |

### Example

```js
types: 'product_review,questions'
```

---

## 4. `layout` Available Values

| Value        | Description     |
| ------------ | --------------- |
| `''`         | Default layout  |
| `'bordered'` | Bordered layout |
| `'large'`    | Large layout    |
| `'reverse'`  | Reverse layout  |

### Example

```js
layout: ''
```

---

## 5. `options.store_review`

| Parameter            | Type      | Description                            | Example |
| -------------------- | --------- | -------------------------------------- | ------- |
| `hide_if_no_results` | `boolean` | Hide section when there are no results | `false` |

### Example

```js
store_review: {
  hide_if_no_results: false
}
```

---

## 6. `options.third_party_review`

| Parameter            | Type      | Description                            | Example |
| -------------------- | --------- | -------------------------------------- | ------- |
| `hide_if_no_results` | `boolean` | Hide section when there are no results | `false` |

### Example

```js
third_party_review: {
  hide_if_no_results: false
}
```

---

## 7. `options.product_review`

| Parameter            | Type      | Description                                              | Example           |
| -------------------- | --------- | -------------------------------------------------------- | ----------------- |
| `sku`                | `string`  | Product SKU. Multiple SKUs are separated with semicolons | `'SKU001;SKU002'` |
| `hide_if_no_results` | `boolean` | Hide section when there are no results                   | `false`           |

### Example

```js
product_review: {
  sku: 'SKU001;SKU002',
  hide_if_no_results: false
}
```

### Notes

* `sku` supports multiple values
* Multiple SKUs must be separated by semicolons `;`, not commas

---

## 8. `options.questions`

| Parameter                          | Type      | Description                             | Example |
| ---------------------------------- | --------- | --------------------------------------- | ------- |
| `hide_if_no_results`               | `boolean` | Hide section when there are no results  | `false` |
| `enable_ask_question`              | `boolean` | Enable the ask question button          | `true`  |
| `enable_ask_question_button_style` | `boolean` | Use default ask question button styling | `false` |
| `show_dates`                       | `boolean` | Show dates                              | `true`  |
| `grouping`                         | `string`  | Q&A grouping value, often set to SKU    | `''`    |

### Example

```js
questions: {
  hide_if_no_results: false,
  enable_ask_question: true,
  enable_ask_question_button_style: false,
  show_dates: true,
  grouping: ''
}
```

### Notes

* `grouping` is used to group questions and answers
* A common approach is to pass `sku` or another product grouping value

---

## 9. `options.header`

| Parameter                    | Type      | Description                                | Example |
| ---------------------------- | --------- | ------------------------------------------ | ------- |
| `enable_summary`             | `boolean` | Enable summary                             | `true`  |
| `enable_ratings`             | `boolean` | Show ratings                               | `true`  |
| `enable_attributes`          | `boolean` | Show attributes                            | `true`  |
| `enable_image_gallery`       | `boolean` | Enable image gallery                       | `true`  |
| `enable_percent_recommended` | `boolean` | Show percent recommended                   | `false` |
| `enable_write_review`        | `boolean` | Enable write review entry                  | `true`  |
| `enable_ask_question`        | `boolean` | Enable ask question entry                  | `true`  |
| `enable_sub_header`          | `boolean` | Enable sub-header area                     | `true`  |
| `rating_decimal_places`      | `number`  | Number of decimal places for ratings       | `2`     |
| `use_write_review_button`    | `boolean` | Use dedicated write review button styling  | `false` |
| `enable_if_no_results`       | `boolean` | Show header even when there are no results | `false` |

### Example

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

## 10. `options.filtering`

| Parameter                                | Type      | Description                                       | Example |
| ---------------------------------------- | --------- | ------------------------------------------------- | ------- |
| `enable`                                 | `boolean` | Enable filtering                                  | `true`  |
| `enable_text_search`                     | `boolean` | Enable text search                                | `true`  |
| `enable_sorting`                         | `boolean` | Enable sorting                                    | `true`  |
| `enable_product_filter`                  | `boolean` | Enable product filter                             | `false` |
| `enable_media_filter`                    | `boolean` | Enable media filter                               | `true`  |
| `enable_overall_rating_filter`           | `boolean` | Enable overall rating filter                      | `true`  |
| `enable_language_filter`                 | `boolean` | Enable language filter                            | `false` |
| `enable_language_filter_language_change` | `boolean` | Enable language filter linkage on language change | `false` |
| `enable_ratings_filters`                 | `boolean` | Enable rating filters                             | `true`  |
| `enable_attributes_filters`              | `boolean` | Enable attribute filters                          | `true`  |

### Example

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

## 11. `options.reviews`

| Parameter                    | Type      | Description                      | Example            |
| ---------------------------- | --------- | -------------------------------- | ------------------ |
| `enable_avatar`              | `boolean` | Show avatar                      | `false`            |
| `enable_reviewer_name`       | `boolean` | Show reviewer name               | `true`             |
| `enable_reviewer_address`    | `boolean` | Show reviewer address            | `true`             |
| `reviewer_address_format`    | `string`  | Address format                   | `'city, country'`  |
| `enable_verified_badge`      | `boolean` | Show verified badge              | `true`             |
| `enable_subscriber_badge`    | `boolean` | Show subscriber badge            | `true`             |
| `review_content_filter`      | `string`  | Review content filter value      | `'undefined'`      |
| `enable_reviewer_recommends` | `boolean` | Show whether reviewer recommends | `true`             |
| `enable_attributes`          | `boolean` | Show review attributes           | `true`             |
| `enable_product_name`        | `boolean` | Show product name                | `true`             |
| `enable_review_title`        | `boolean` | Show review title                | `undefined`        |
| `enable_replies`             | `boolean` | Show replies                     | `undefined`        |
| `enable_images`              | `boolean` | Show images                      | `true`             |
| `enable_ratings`             | `boolean` | Show ratings                     | `true`             |
| `enable_share`               | `boolean` | Enable sharing                   | `true`             |
| `enable_helpful_vote`        | `boolean` | Enable helpful vote              | `true`             |
| `enable_helpful_display`     | `boolean` | Show helpful count               | `true`             |
| `enable_report`              | `boolean` | Enable report action             | `true`             |
| `enable_date`                | `boolean` | Show date                        | `true`             |
| `enable_third_party_source`  | `boolean` | Show third-party source          | `true`             |
| `default_sort`               | `string`  | Default sort order               | `'highest_rating'` |

### Example

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

### `default_sort` Available Values

| Value              | Description                      |
| ------------------ | -------------------------------- |
| `'helpful_desc'`   | Sort by helpful count descending |
| `'date_desc'`      | Sort by date descending          |
| `'date_asc'`       | Sort by date ascending           |
| `'highest_rating'` | Sort by highest rating           |
| `'lowest_rating'`  | Sort by lowest rating            |

### Notes

These fields appeared in public examples, but they do not look especially stable:

* `review_content_filter`
* `enable_review_title`
* `enable_replies`

Do not pass garbage values. Especially do not copy this nonsense blindly:

```js
review_content_filter: 'undefined'
```

That is sloppy.

---

## 12. `translations`

| Parameter    | Type     | Description           | Example                                    |
| ------------ | -------- | --------------------- | ------------------------------------------ |
| Any text key | `string` | Replaces default text | `'Verified Customer': 'Verified Customer'` |

### Example

```js
translations: {
  'Verified Customer': 'Verified Customer'
}
```

### Notes

* `translations` is a key-value object
* `key` is the original text
* `value` is the replacement text
* There is no full public list of supported translation keys, so this part needs to be tested case by case

---

## 13. Confirmed `styles` Variables

### Base

| Variable           | Example Value |
| ------------------ | ------------- |
| `--base-font-size` | `'16px'`      |

### Common Button

| Variable                             | Example Value |
| ------------------------------------ | ------------- |
| `--common-button-font-family`        | `'inherit'`   |
| `--common-button-font-size`          | `'16px'`      |
| `--common-button-font-weight`        | `'500'`       |
| `--common-button-letter-spacing`     | `'0'`         |
| `--common-button-text-transform`     | `'none'`      |
| `--common-button-vertical-padding`   | `'10px'`      |
| `--common-button-horizontal-padding` | `'20px'`      |
| `--common-button-border-width`       | `'2px'`       |
| `--common-button-border-radius`      | `'0px'`       |

### Primary Button

| Variable                        | Example Value |
| ------------------------------- | ------------- |
| `--primary-button-bg-color`     | `'#0E1311'`   |
| `--primary-button-border-color` | `'#0E1311'`   |
| `--primary-button-text-color`   | `'#ffffff'`   |

### Secondary Button

| Variable                          | Example Value   |
| --------------------------------- | --------------- |
| `--secondary-button-bg-color`     | `'transparent'` |
| `--secondary-button-border-color` | `'#0E1311'`     |
| `--secondary-button-text-color`   | `'#0E1311'`     |

### Stars

| Variable                       | Example Value        |
| ------------------------------ | -------------------- |
| `--common-star-color`          | `'#0E1311'`          |
| `--common-star-disabled-color` | `'rgba(0,0,0,0.25)'` |
| `--medium-star-size`           | `'22px'`             |
| `--small-star-size`            | `'19px'`             |

### Heading Text

| Variable                        | Example Value |
| ------------------------------- | ------------- |
| `--heading-text-color`          | `'#0E1311'`   |
| `--heading-text-font-weight`    | `'600'`       |
| `--heading-text-font-family`    | `'inherit'`   |
| `--heading-text-line-height`    | `'1.4'`       |
| `--heading-text-letter-spacing` | `'0'`         |
| `--heading-text-transform`      | `'none'`      |

### Body Text

| Variable            | Example Value |
| ------------------- | ------------- |
| `--body-text-color` | `'#0E1311'`   |

### Example

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

## 14. Full Example

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
