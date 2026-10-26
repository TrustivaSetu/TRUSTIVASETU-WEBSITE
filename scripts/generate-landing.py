from pathlib import Path
import sys

if len(sys.argv) != 4:
    print("Usage:")
    print("python3 scripts/generate-landing.py slug 'Page Title' key")
    sys.exit(1)

slug = sys.argv[1]
title = sys.argv[2]
key = sys.argv[3]

src = Path("app/medical-loan/page.tsx")
dst_dir = Path(f"app/{slug}")
dst_dir.mkdir(parents=True, exist_ok=True)

text = src.read_text()

text = text.replace("Medical Loan in India", title)
text = text.replace('page="medical"', f'page="{key}"')

(dst_dir / "page.tsx").write_text(text)

print(f"✅ Created app/{slug}/page.tsx")
