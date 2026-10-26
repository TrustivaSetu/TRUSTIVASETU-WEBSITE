import fs from "node:fs";

export function readJson(file, fallback = null) {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch {
    return fallback;
  }
}

export function writeJson(file, data) {
  fs.mkdirSync(file.substring(0, file.lastIndexOf("/")), {
    recursive: true
  });

  fs.writeFileSync(
    file,
    JSON.stringify(data, null, 2)
  );
}
