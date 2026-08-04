import fs from "node:fs";
import crypto from "node:crypto";

import { fetchRBI } from "./providers/rbi.mjs";

const updates = await fetchRBI();

const output = updates.map(item=>({

  ...item,

  hash: crypto
    .createHash("sha256")
    .update(item.title + item.summary)
    .digest("hex"),

  fetchedAt:new Date().toISOString()

}));

fs.writeFileSync(
  "data/knowledge/generated/index.json",
  JSON.stringify(output,null,2)
);

console.log(
  "Fetched:",
  output.length,
  "notifications"
);
