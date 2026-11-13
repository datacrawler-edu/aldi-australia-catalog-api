# FAQ

## Is this an official ALDI API?

No. These examples integrate an independent hosted Actor through the public Apify API.

## Why did a successful run return an incomplete collection?

The Actor can exit cleanly for correctable input or an expected source stop. Read SUMMARY.complete and the field warnings; the examples refuse to label incomplete output as complete.

## Does milk mean only drinking milk?

No. Keyword matching can include chocolate and other related products.

## Can I use exact product identifiers?

Choose products mode, clear query and supply numeric SKU strings in skus. Preserve leading zeros. Unavailable identifiers are reported without substituting unrelated products.

## Is notForSale an out-of-stock flag?

No. It concerns online purchasing. Stock availability is not provided.

## Can I safely retry a failed start?

Inspect recent runs first: the paid run may already exist even if its start response was lost. The examples do not automatically repeat start POST requests. Once a run ID is known, poll that same run.

## Are the examples free?

Code is MIT licensed; hosted runs and API usage follow Apify pricing. Available plan credit may cover a small test. Saved rows from partial collection remain billable.
