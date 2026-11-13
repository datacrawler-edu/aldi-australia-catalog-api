"""Export an existing Dataset; this example never starts an Actor run."""
import argparse
import csv
from common import iter_rows
def main():
    parser=argparse.ArgumentParser();parser.add_argument('dataset_id');parser.add_argument('--output',default='aldi-prices.csv');args=parser.parse_args()
    fields=['id','name','brandName','amountRelevantCents','displayPrice','unitPrice']
    with open(args.output,'w',encoding='utf-8',newline='') as target:
        writer=csv.DictWriter(target,fieldnames=fields);writer.writeheader()
        for row in iter_rows(args.dataset_id):
            if row.get('type')!='product':continue
            data=row['data'];price=data.get('price');price=price if isinstance(price,dict) else {}
            writer.writerow(dict(zip(fields,[row['id'],data.get('name'),data.get('brandName'),price.get('amountRelevant'),price.get('amountRelevantDisplay'),price.get('comparisonDisplay')])))
if __name__=='__main__':main()
