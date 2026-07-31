from pathlib import Path
import re
import sys

if len(sys.argv) != 7:
    print("Usage:")
    print("python3 scripts/generate-landing-v2.py <slug> '<title>' '<description>' '<og_title>' '<og_description>' <key>")
    sys.exit(1)

slug = sys.argv[1].strip()
title = sys.argv[2].strip()
description = sys.argv[3].strip()
og_title = sys.argv[4].strip()
og_description = sys.argv[5].strip()
key = sys.argv[6].strip()

if not re.fullmatch(r"[a-z0-9-]+", slug):
    print(f"❌ Invalid slug: {slug}")
    sys.exit(1)

template = Path("templates/landing-page.tsx.template")

if not template.exists():
    print("❌ Template not found.")
    sys.exit(1)

destination = Path(f"app/{slug}")

if destination.exists():
    print(f"❌ app/{slug} already exists.")
    sys.exit(1)

function_name = "".join(part.capitalize() for part in slug.split("-")) + "Page"
canonical = f"https://www.trustivasetu.com/{slug}"

text = template.read_text()

replacements = {
    "__TITLE__": title,
    "__DESCRIPTION__": description,
    "__CANONICAL__": canonical,
    "__OG_TITLE__": og_title,
    "__OG_DESCRIPTION__": og_description,
    "__FUNCTION_NAME__": function_name,
    "__KEY__": key,
}

for placeholder, value in replacements.items():
    text = text.replace(placeholder, value)

destination.mkdir(parents=True)

(destination / "page.tsx").write_text(text)

print(f"✅ Created {destination}/page.tsx")
