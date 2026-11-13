# Output reference

Each Dataset row has id, type, data and scrapedAt. data preserves source attributes. Categories add parentKey; original children can also remain nested. The complete product sample is in ../data/sample-output.json.

Product price.amountRelevant is in Australian cents. price.amountRelevantDisplay and comparisonDisplay preserve displayed wording; prices can be null. Descriptions, ingredients and allergens are optional. Image URLs can contain size/slug placeholders. notForSale is not a stock indicator.

The CSV example explicitly projects id, name, brandName, amountRelevantCents, displayPrice and unitPrice. It does not claim those are the complete raw output. JSON preserves nested records.

After SUCCEEDED, read the run's SUMMARY record. complete=false can indicate input correction, missing enrichment or a partial source collection. Inspect saved rows without treating them as a finished snapshot; delivered rows remain billable. Storage or delivery uncertainty may still fail the Actor.
