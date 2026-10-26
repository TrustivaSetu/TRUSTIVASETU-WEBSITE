from pathlib import Path
import sys

if len(sys.argv) != 2:
    print("Usage: python3 scripts/write_file.py <file>")
    sys.exit(1)

target = Path(sys.argv[1])
target.parent.mkdir(parents=True, exist_ok=True)

content = sys.stdin.read()
target.write_text(content, encoding="utf-8")

print(f"Wrote {target}")
