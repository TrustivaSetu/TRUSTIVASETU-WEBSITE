import crypto from "node:crypto";

import { fetchRBI } from "./providers/rbi.mjs";
import { fetchABDM } from "./providers/abdm.mjs";

import { readJson, writeJson } from "./lib/storage.mjs";

const CACHE_FILE="data/knowledge/cache/index.json";
const HISTORY_FILE="data/knowledge/history/index.json";
const GENERATED_FILE="data/knowledge/generated/index.json";

const cache=readJson(CACHE_FILE,{});
const history=readJson(HISTORY_FILE,[]);

const updates=[
  ...(await fetchRBI()),
  ...(await fetchABDM())
];

const generated=[];

for(const item of updates){

  const hash=crypto
    .createHash("sha256")
    .update(item.title+(item.summary||""))
    .digest("hex");

  if(cache[hash]){
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
}

writeJson(CACHE_FILE,cache);
writeJson(HISTORY_FILE,history.slice(0,1000));
writeJson(GENERATED_FILE,generated);

console.log(
  "Sources:",
  {
    RBI:(await fetchRBI()).length,
    ABDM:(await fetchABDM()).length
  }
);

console.log(
  "New:",
  generated.length,
  "Duplicate:",
  updates.length-generated.length
);
