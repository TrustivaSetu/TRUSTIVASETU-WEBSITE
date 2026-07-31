#!/usr/bin/env python3

from pathlib import Path
import argparse
import json
import sys

parser = argparse.ArgumentParser(
    description="Trustiva Landing Page Generator V3"
)

parser.add_argument(
    "page_key",
    help="Landing page key (example: medical, hair-transplant)"
)

parser.add_argument(
    "--apply",
    action="store_true",
    help="Write generated page into app/"
)

args = parser.parse_args()

page_key = args.page_key
apply_mode = args.apply

REQUIRED_FIELDS = ["slug", "key", "metadata", "landing"]
REQUIRED_METADATA = ["title", "description", "ogTitle", "ogDescription"]
REQUIRED_LANDING = [
    "title",
    "description",
    "heroTitle",
    "heroSubtitle",
    "treatments",
    "faqs",
]

json_file = Path(f"data/landing-content/{page_key}.json")
template_file = Path("templates/landing-page.tsx.template")
preview_dir = Path("generated")

if not json_file.exists():
    sys.exit(f"❌ JSON not found: {json_file}")

if not template_file.exists():
    sys.exit(f"❌ Template not found: {template_file}")

data = json.loads(json_file.read_text())

for field in REQUIRED_FIELDS:
    if field not in data:
        sys.exit(f"❌ Missing field: {field}")

for field in REQUIRED_METADATA:
    if field not in data["metadata"]:
        sys.exit(f"❌ Missing metadata.{field}")

for field in REQUIRED_LANDING:
    if field not in data["landing"]:
        sys.exit(f"❌ Missing landing.{field}")

target_dir = Path("app") / data["slug"]
target_file = target_dir / "page.tsx"

template = template_file.read_text()

function_name = "".join(
    w.capitalize()
    for w in page_key.replace("-", " ").split()
) + "Page"

replacements = {
    "__TITLE__": data["metadata"]["title"],
    "__DESCRIPTION__": data["metadata"]["description"],
    "__CANONICAL__": f"https://trustivasetu.com/{data['slug']}",
    "__OG_TITLE__": data["metadata"]["ogTitle"],
    "__OG_DESCRIPTION__": data["metadata"]["ogDescription"],
    "__FUNCTION_NAME__": function_name,
    "__KEY__": data["key"],
}

for old, new in replacements.items():
    template = template.replace(old, new)

preview_dir.mkdir(exist_ok=True)

preview_file = preview_dir / f"{data['slug']}-page.tsx"
preview_file.write_text(template)

print(f"✅ Preview : {preview_file}")

if apply_mode:

    if target_file.exists():
        sys.exit(f"❌ Target already exists: {target_file}")

    target_dir.mkdir(parents=True, exist_ok=True)
    target_file.write_text(template)

    print(f"✅ Written : {target_file}")
else:
    print("ℹ️ Preview only (use --apply to create app page)")
