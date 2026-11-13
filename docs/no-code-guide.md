# Run ALDI catalog searches without code

1. Open [the hosted Actor](https://apify.com/datascraperes/aldi-australia-catalog-scraper?fpr=edudata).
2. In Input keep **Search products** selected, enter a keyword such as milk in **Search text / city / prefix**, and set **Maximum results** to 5. Leave both collapsible sections untouched for a basic national search.
3. Open **Store and search options** only for a store-specific selection, extra details or a category/promotion filter. These are optional for a basic search. Enable **Include extra product details** only when needed.
4. Start the run and inspect Dataset plus SUMMARY. Require complete=true for finished collection.
5. Export JSON to preserve nested data, or CSV for spreadsheets.

To discover a store, choose **Find stores** with query Sydney and leave servicePoint empty. Copy a returned data.id into the next store-specific search. **List categories** and **List promotions** require a servicePoint and empty search text; obtain their keys from the corresponding discovery mode.

Open **Exact product lookup by SKU** only when using **Get exact product details**. Enter numeric SKU strings, preserve leading zeros, and clear search text. When switching modes, clear fields that do not apply. Invalid input produces field warnings. Apify may reject schema-invalid input before the Actor starts.
