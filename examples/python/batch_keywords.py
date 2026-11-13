"""One separate, budgeted run per keyword; no automatic failed-start replay."""
import json
from common import start_once,wait_for_dataset,iter_rows,sample_input
def main():
    for query in ['milk','bread']:
        value=sample_input();value['query']=query
        dataset=wait_for_dataset(start_once(value))
        for row in iter_rows(dataset):print(json.dumps({'query':query,'result':row},ensure_ascii=False))
if __name__=='__main__':main()
