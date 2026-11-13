# cURL: start once and inspect the same run

Set APIFY_API_TOKEN first. This Bash example also uses jq. Start may incur charges; the request caps the run at $0.01. Never add automatic retries to this POST.

```bash
curl --fail-with-body --request POST \
  'https://api.apify.com/v2/acts/datascraperes~aldi-australia-catalog-scraper/runs?timeout=180&maxTotalChargeUsd=0.01' \
  --header "Authorization: Bearer $APIFY_API_TOKEN" \
  --header 'Content-Type: application/json' \
  --data-binary @data/sample-input.json --output run.json
RUN_ID=$(jq -r '.data.id' run.json)
curl --fail --header "Authorization: Bearer $APIFY_API_TOKEN" \
  "https://api.apify.com/v2/actor-runs/$RUN_ID?waitForFinish=60"
```

If start fails or its response is lost, inspect recent runs before trying again. Poll the same run until it reaches a terminal status. Read its defaultKeyValueStoreId, fetch the SUMMARY record and require complete=true before treating the collection as finished. The Dataset remains available for inspecting incomplete output. Use [the Python example](python/collect_products.py) for automated checks, or [open the hosted Actor](https://apify.com/datascraperes/aldi-australia-catalog-scraper?fpr=edudata).
