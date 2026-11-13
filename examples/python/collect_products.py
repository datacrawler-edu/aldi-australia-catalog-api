"""Start one small hosted search; print verified results."""
import json
from common import start_once,wait_for_dataset,iter_rows,sample_input
def main():
    dataset=wait_for_dataset(start_once(sample_input()))
    for row in iter_rows(dataset):print(json.dumps(row,ensure_ascii=False))
if __name__=='__main__':main()
