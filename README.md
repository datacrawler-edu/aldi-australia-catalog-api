# ALDI Australia product API examples

Collect grocery catalog results with the hosted [ALDI Australia Catalog Scraper](https://apify.com/datascraperes/aldi-australia-catalog-scraper?fpr=edudata), then use Python, JavaScript or cURL to process its Dataset. These examples focus on safe run handling, keyword batches and spreadsheet exports.

## What this repository helps you do

- Request a small product-keyword selection and inspect whether it completed.
- Keep separate results for several grocery keywords.
- Export displayed prices and unit-price wording to CSV.
- Use the same hosted interface for products, categories, promotions, stores and suggestions.

## Example result

Selected fields from one real product are shown below. [The JSON sample](data/sample-output.json) contains the complete record; [the CSV sample](data/sample-output.csv) is an explicit projection.

```json
{
  "id": "000000000538441002",
  "type": "product",
  "scrapedAt": "2026-11-13T14:58:59.905777+00:00",
  "data": {
    "sku": "000000000538441002",
    "name": "Milk Mouse - Milk Chocolate 168g",
    "price": {
      "amount": 399,
      "amountRelevant": 399,
      "amountRelevantDisplay": "$3.99",
      "bottleDeposit": 0,
      "bottleDepositDisplay": "$0.00",
      "comparison": 238,
      "comparisonDisplay": "$2.38 per 100 g",
      "currencyCode": "AUD",
      "currencySymbol": "$",
      "perUnit": null,
      "perUnitDisplay": null,
      "wasPriceDisplay": null,
      "additionalInfo": null,
      "savingsDisplay": null,
      "bottleDepositType": null,
      "feeText": null
    }
  }
}
```

## Run without code

Open [the Actor](https://apify.com/datascraperes/aldi-australia-catalog-scraper?fpr=edudata), choose search mode in Input, enter milk and use maxItems=5. Click Start, inspect the Dataset and the run summary, then export JSON or CSV. A successful run status can still mean that input needs correction or collection is incomplete: check complete in SUMMARY. See [the no-code guide](docs/no-code-guide.md).

## Try it with Apify's free plan

The [current Free plan](https://apify.com/pricing?fpr=edudata) includes $5 in monthly prepaid usage and requires no credit card to start. Unused credits expire at the billing-cycle end. Available credit can cover a small test; the Actor still bills saved results and this is not unlimited free usage.

## Quick start for developers

Use Python 3.12 or later and run:

```bash
pip install -r examples/python/requirements.txt
export APIFY_API_TOKEN="your-token"
python examples/python/collect_products.py
```

For PowerShell, set the token with `$env:APIFY_API_TOKEN = "your-token"`. Never commit it. The pinned client handles reads; the paid start is deliberately sent once. If that response is unclear, inspect recent runs rather than automatically starting another.

## Input example

```json
{
  "mode": "search",
  "query": "milk",
  "skus": [],
  "categoryKey": "",
  "promotionKey": "",
  "servicePoint": "",
  "includeDetails": false,
  "maxItems": 5
}
```

[Input reference](docs/input-reference.md) covers the other modes and compatible selectors. The example uses all eight public fields while leaving unrelated selectors empty.

## Request examples

- [cURL start and polling](examples/curl-request.md)
- [Python single search](examples/python/collect_products.py)
- [Python keyword batches](examples/python/batch_keywords.py)
- [Python export of an existing Dataset](examples/python/export_prices_csv.py)
- [JavaScript request](examples/javascript/request.mjs), using Node 20 or later and the native fetch API

Each search example has a $0.01 per-run limit and a 180-second Actor timeout. The keyword example starts two separate runs. Export reads an existing Dataset and does not start a new run; normal API/storage usage can still apply.

## Output fields

| Field | Meaning |
|---|---|
| id | Stable source identifier preserved as text. |
| type | product, category, promotion, store or suggestion. |
| data | Complete source attributes, varying by result type. |
| scrapedAt | UTC collection timestamp. |
| data.price.amountRelevant | Product amount in Australian cents, when available. |
| data.price.amountRelevantDisplay | Displayed product price. |
| data.price.comparisonDisplay | Unit-price wording. |

Optional fields can be missing or null. See [the output reference](docs/output-reference.md).

## Common use cases

Keep bounded product snapshots, compare keyword selections and prepare spreadsheet exports. Product details can include descriptions, ingredients and allergens when available. [Use cases](docs/use-cases.md) explains the limits.

## Export ALDI Australia product prices to CSV

Copy a Dataset ID from an existing run, then execute `python examples/python/export_prices_csv.py DATASET_ID --output aldi-prices.csv`. The script reads every page, accepts a legitimate final empty page and preserves zero amounts. It exports only product rows.

## Collect several ALDI grocery keywords with Python

Run the batch example after reviewing its milk/bread queries. Each query has its own budget and run ID. Overlapping products can occur across separate searches; retain the query label rather than assuming global uniqueness.

## FAQ

See [the FAQ](docs/faq.md). Keyword milk can match chocolate products. Store selection can produce null prices. notForSale concerns online purchasing and does not establish stock availability.

## Limits and pricing

This Actor covers Australia. maxItems is a unique-result cap from 1 to 2,000; a source or time-limit stop can deliver fewer results with an incomplete summary. Details, prices and promotions can change.

Native PAY_PER_EVENT bills one saved result, whether product, category, promotion, store or suggestion. Current USD prices:

| Plan | Per result | Per 1,000 results |
|---|---:|---:|
| FREE | $0.001 | $1.00 |
| BRONZE | $0.0009 | $0.90 |
| SILVER | $0.0008 | $0.80 |
| GOLD / PLATINUM / DIAMOND | $0.00075 | $0.75 |

There is no start or detail fee; platform usage is included in the Actor's listed event price. Saved results from an incomplete collection remain billable. Confirm the [current Actor pricing](https://apify.com/datascraperes/aldi-australia-catalog-scraper?fpr=edudata) before large batches. These examples do not certify billing for every customer plan.

## Hosted version

[Run the hosted Actor](https://apify.com/datascraperes/aldi-australia-catalog-scraper?fpr=edudata) from its web interface or through the public Apify API. The examples call the hosted service and do not contain its scraping implementation. Some links include the referral parameter fpr=edudata.

## Responsible use

Respect applicable laws, source terms and privacy requirements. This project is independent of ALDI. Accounts, orders and checkout are outside scope. Keep credentials out of commits and issue reports.

## Support

For example bugs, [open an issue](https://github.com/datacrawler-edu/aldi-australia-catalog-api/issues) with sanitized input. For hosted-run problems, use the [Actor's Issues tab](https://apify.com/datascraperes/aldi-australia-catalog-scraper?fpr=edudata) and include the run ID.

## License

The integration examples and documentation use the [MIT License](LICENSE).
