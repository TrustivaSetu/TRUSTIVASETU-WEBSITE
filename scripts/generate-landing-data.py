#!/usr/bin/env python3

from pathlib import Path
import json

SOURCE_DIR = Path("data/landing-content")
OUTPUT_DIR = Path("generated")
OUTPUT_FILE = OUTPUT_DIR / "landing-data.generated.ts"

OUTPUT_DIR.mkdir(exist_ok=True)

items = []

for json_file in sorted(SOURCE_DIR.glob("*.json")):
    data = json.loads(json_file.read_text())

    key = data["key"]
    landing = data["landing"]

    items.append(
        f'''  "{key}": {json.dumps(landing, indent=4, ensure_ascii=False)},'''
    )

content = f'''export type LandingContent = {{
  title: string;
  description: string;
  heroTitle: string;
  heroSubtitle: string;
  treatments: {{
    title: string;
    description: string;
  }}[];
  faqs: {{
    question: string;
    answer: string;
  }}[];
}};

export const landingData = {{
{chr(10).join(items)}
}} satisfies Record<string, LandingContent>;
'''

OUTPUT_FILE.write_text(content)

print(f"✅ Generated: {OUTPUT_FILE}")
print(f"✅ Landing pages: {len(items)}")
