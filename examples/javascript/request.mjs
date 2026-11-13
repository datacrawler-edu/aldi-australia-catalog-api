import {readFile,mkdir,writeFile} from 'node:fs/promises';
import {setTimeout as pause} from 'node:timers/promises';
const token=process.env.APIFY_API_TOKEN;
if(!token)throw new Error('Set APIFY_API_TOKEN.');
const base=(process.env.APIFY_API_BASE_URL || 'https://api.apify.com').replace(/\/$/,'');
const headers={Authorization:'Bearer '+token,'Content-Type':'application/json'};
async function get(path){const response=await fetch(base+'/v2/'+path,{headers,redirect:'error',signal:AbortSignal.timeout(30000)});if(!response.ok)throw new Error('Read failed; inspect the existing run before restarting.');return response.json();}
const input=JSON.parse(await readFile(new URL('../../data/sample-input.json',import.meta.url),'utf8'));
let started;
try{const response=await fetch(base+'/v2/acts/datascraperes~aldi-australia-catalog-scraper/runs?timeout=180&maxTotalChargeUsd=0.01',{method:'POST',headers,body:JSON.stringify(input),redirect:'error',signal:AbortSignal.timeout(30000)});if(!response.ok)throw new Error();started=(await response.json()).data;if(!started?.id)throw new Error();}
catch{throw new Error('Start failed or its response is unclear. Inspect recent runs; do not automatically repeat POST.');}
console.error('Started run '+started.id);
await mkdir('outputs',{recursive:true});await writeFile('outputs/last-run.json',JSON.stringify({id:started.id}));
const deadline=Date.now()+240000;
let run;
do{run=(await get('actor-runs/'+started.id)).data;if(['SUCCEEDED','FAILED','ABORTED','TIMED-OUT'].includes(run.status))break;if(Date.now()>=deadline)throw new Error('Wait expired; inspect run '+started.id);await pause(1000);}while(true);
if(run.status!=='SUCCEEDED')throw new Error('Inspect failed run '+started.id+'; do not restart automatically.');
const summary=await get('key-value-stores/'+run.defaultKeyValueStoreId+'/records/SUMMARY');
if(summary.complete!==true)throw new Error('Collection incomplete or input needs correction. Inspect SUMMARY and existing saved data.');
const rows=[];
for(let offset=0;;){const page=await get('datasets/'+run.defaultDatasetId+'/items?format=json&clean=true&limit=100&offset='+offset);if(!Array.isArray(page))throw new Error('Invalid Dataset response.');if(!page.length)break;rows.push(...page);offset+=page.length;}
console.log(JSON.stringify(rows,null,2));
