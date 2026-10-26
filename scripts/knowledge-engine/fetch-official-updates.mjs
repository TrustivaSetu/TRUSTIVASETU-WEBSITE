import crypto from "node:crypto";

import { fetchRBI } from "./providers/rbi.mjs";
import { fetchABDM } from "./providers/abdm.mjs";
import { fetchNABH } from "./providers/nabh.mjs";
import { fetchCDSCO } from "./providers/cdsco.mjs";
import { fetchIADVL } from "./providers/iadvl.mjs";

import { readJson, writeJson } from "./lib/storage.mjs";

const CACHE_FILE="data/knowledge/cache/index.json";
const HISTORY_FILE="data/knowledge/history/index.json";
const GENERATED_FILE="data/knowledge/generated/index.json";

const cache=readJson(CACHE_FILE,{});
const history=readJson(HISTORY_FILE,[]);

const historyByUrl=new Map(
  history.map(article=>[article.url||article.title,article])
);

const updates=[
  ...(await fetchRBI()),
  ...(await fetchABDM()),
  ...(await fetchNABH()),
  ...(await fetchCDSCO()),
  ...(await fetchIADVL())
];

const generated=[];

for(const item of updates){

  const hash=crypto
    .createHash("sha256")
    .update(item.url||item.title)
    .digest("hex");

  const existing=historyByUrl.get(item.url||item.title);

  if(existing){
    if(!existing.summary && item.summary){
      existing.summary=item.summary;
      existing.fetchedAt=new Date().toISOString();
    }
    continue;
  }

  cache[hash]=true;

  const article={
    ...item,
    hash,
    fetchedAt:new Date().toISOString()
  };

  generated.push(article);
  history.unshift(article);
  historyByUrl.set(item.url||item.title,article);
}

writeJson(CACHE_FILE,cache);
writeJson(HISTORY_FILE,history.slice(0,1000));
writeJson(GENERATED_FILE,generated);

console.log(
  "Sources:",
  {
    RBI:(await fetchRBI()).length,
    ABDM:(await fetchABDM()).length,
    NABH:(await fetchNABH()).length,
    CDSCO:(await fetchCDSCO()).length,
    IADVL:(await fetchIADVL()).length
  }
);

console.log(
  "New:",
  generated.length,
  "Duplicate:",
  updates.length-generated.length
);
