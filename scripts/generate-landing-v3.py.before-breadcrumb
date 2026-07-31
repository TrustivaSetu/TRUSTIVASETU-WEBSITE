#!/usr/bin/env python3

from pathlib import Path
import argparse
import json
import shutil
import subprocess
import sys

parser = argparse.ArgumentParser(description="Trustiva Landing Generator")

parser.add_argument("page_key")
parser.add_argument("--apply", action="store_true")
parser.add_argument("--force", action="store_true")
parser.add_argument("--build", action="store_true")

args = parser.parse_args()

json_file = Path(f"data/landing-content/{args.page_key}.json")
template_file = Path("templates/landing-page.tsx.template")

if not json_file.exists():
    sys.exit(f"❌ Missing JSON: {json_file}")

if not template_file.exists():
    sys.exit(f"❌ Missing template: {template_file}")

data = json.loads(json_file.read_text())

required = [
    "slug",
    "key",
    "metadata",
    "landing",
]

for item in required:
    if item not in data:
        sys.exit(f"❌ Missing {item}")

target_dir = Path("app") / data["slug"]
target_file = target_dir / "page.tsx"

preview_dir = Path("generated")
preview_dir.mkdir(exist_ok=True)

preview_file = preview_dir / f'{data["slug"]}-page.tsx'

template = template_file.read_text()

function_name = "".join(
    x.capitalize()
    for x in data["key"].replace("-", " ").split()
) + "Page"

replace = {
    "__TITLE__": data["metadata"]["title"],
    "__DESCRIPTION__": data["metadata"]["description"],
    "__CANONICAL__": f'https://trustivasetu.com/{data["slug"]}',
    "__OG_TITLE__": data["metadata"]["ogTitle"],
    "__OG_DESCRIPTION__": data["metadata"]["ogDescription"],
    "__FUNCTION_NAME__": function_name,
    "__KEY__": data["key"],
}

for old, new in replace.items():
    template = template.replace(old, new)

preview_file.write_text(template)

print(f"✅ Preview : {preview_file}")

if not args.apply:
    print("ℹ️ Preview only")
    sys.exit(0)

backup = None

if target_file.exists():

    if not args.force:
        sys.exit(f"❌ Target already exists: {target_file}")

    backup = target_file.read_text()

target_dir.mkdir(parents=True, exist_ok=True)
target_file.write_text(template)

print(f"✅ Written : {target_file}")

if args.build:

    print("\n🚀 Running landing-data generator...\n")

    result = subprocess.run(
        ["python3", "scripts/generate-landing-data.py"],
        capture_output=True,
        text=True,
    )

    print(result.stdout)

    if result.returncode != 0:

        if backup is not None:
            target_file.write_text(backup)
        else:
            try:
                target_file.unlink()
            except FileNotFoundError:
                pass

        sys.exit("❌ landing-data generation failed")

    generated = Path("generated/landing-data.generated.ts")

    if not generated.exists():

        if backup is not None:
            target_file.write_text(backup)
        else:
            try:
                target_file.unlink()
            except FileNotFoundError:
                pass

        sys.exit("❌ generated landing-data file missing")

    shutil.copy2(generated, "lib/landing-data.ts")

    print("✅ Updated lib/landing-data.ts")

    print("\n🚀 Running npm run build...\n")

    build = subprocess.run(["npm", "run", "build"])

    if build.returncode != 0:

        print("\n❌ Build failed")

        if backup is not None:
            target_file.write_text(backup)
            print("↩ Restored previous page")
        else:
            try:
                target_file.unlink()
                print("↩ Removed generated page")
            except FileNotFoundError:
                pass

        sys.exit(build.returncode)

    print("\n🎉 Build successful")
