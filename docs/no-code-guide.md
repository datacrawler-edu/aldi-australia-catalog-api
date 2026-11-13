# Run ALDI catalog searches without code

1. Open [the hosted Actor](https://apify.com/datascraperes/aldi-australia-catalog-scraper?fpr=edudata).
2. In Input choose search, enter a keyword such as milk and set maxItems to 5.
3. Enable includeDetails only if additional descriptions or ingredients are needed.
4. Start the run and inspect Dataset plus SUMMARY. Require complete=true for finished collection.
5. Export JSON to preserve nested data, or CSV for spreadsheets.

To discover a store, choose stores mode with query Sydney and leave servicePoint empty. Copy a returned data.id into the next store-specific search. Categories and promotions require a servicePoint; obtain their keys from the corresponding discovery mode. Invalid input produces field warnings. Apify may reject schema-invalid input before the Actor starts.
