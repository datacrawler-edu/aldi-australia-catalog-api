# Input reference

The form shows collection mode, search text and maximum results first. **Store and search options** and **Exact product lookup by SKU** are separate collapsible sections; neither is needed for a basic national keyword search. Mode labels explain their requirements, while the API continues to use the values below. Optional fields may be omitted from API requests.

| Field | Default | Meaning |
|---|---|---|
| mode | search | search, products, categories, promotions, stores or suggestions. |
| query | empty | Product keyword, city/postcode for stores, or suggestion prefix. Empty search browses the catalog. |
| skus | [] | Numeric strings for products mode; preserve leading zeros. |
| categoryKey | empty | Category key for search, obtained for the chosen store. |
| promotionKey | empty | Promotion key for search, used separately from categoryKey. |
| servicePoint | empty | Store ID; required for categories/promotions, optional for search/products. Leave empty in stores mode. |
| includeDetails | false | Optional enrichment in search mode. Products mode already returns details. |
| maxItems | 100 | Cap of 1 to 2,000 unique results, not a completeness guarantee. |

Use query only in search/stores/suggestions; use skus only in products mode. Filters and includeDetails apply only to search. Get category/promotion keys through discovery; unsupported selectors are not silently broadened. [Try a small input](https://apify.com/datascraperes/aldi-australia-catalog-scraper?fpr=edudata).
