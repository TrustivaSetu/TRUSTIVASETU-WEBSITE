#!/usr/bin/env python3

import argparse
import json
from pathlib import Path

parser = argparse.ArgumentParser(description="Create a new Trustiva landing JSON")

parser.add_argument("--key", required=True)
parser.add_argument("--title", required=True)

args = parser.parse_args()

key = args.key.strip().lower()
title = args.title.strip()

slug = f"{key}-loan"

outfile = Path("data/landing-content") / f"{key}.json"

if outfile.exists():
    raise SystemExit(f"❌ File already exists: {outfile}")

data = {
    "slug": slug,
    "key": key,

    "metadata": {
        "title": f"{title} in India | Healthcare Financing | Trustiva Setu",
        "description": f"Apply for a {title.lower()} through Trustiva Setu's lending partners. Loan approval is subject to lender eligibility.",
        "ogTitle": f"{title} | Trustiva Setu",
        "ogDescription": f"Healthcare financing for {title.lower()}."
    },

    "landing": {
        "title": title,
        "description": f"Healthcare financing for {title.lower()} through trusted lending partners.",
        "heroTitle": f"Finance Your {title}",
        "heroSubtitle": "Flexible healthcare financing through trusted lending partners.",

        "treatments": [
            {
                "title": "Treatment Option 1",
                "description": "Replace with actual treatment."
            },
            {
                "title": "Treatment Option 2",
                "description": "Replace with actual treatment."
            },
            {
                "title": "Treatment Option 3",
                "description": "Replace with actual treatment."
            },
            {
                "title": "Treatment Option 4",
                "description": "Replace with actual treatment."
            }
        ],

        "faqs": [
            {
                "question": "Who can apply?",
                "answer": "Eligibility depends on the lending partner's credit assessment."
            },
            {
                "question": "What documents are required?",
                "answer": "PAN, Aadhaar, KYC documents and income proof may be required."
            },
            {
                "question": "How much loan can I get?",
                "answer": "Loan amount depends on treatment cost and lender eligibility."
            },
            {
                "question": "How long does approval take?",
                "answer": "Approval timelines depend on document verification and lender processes."
            }
        ]
    }
}

outfile.write_text(json.dumps(data, indent=2))

print(f"✅ Created {outfile}")
