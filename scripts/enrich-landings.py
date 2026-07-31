#!/usr/bin/env python3

import json
from pathlib import Path

BASE = Path("data/landing-content")

DATA = {
    "dental-implant": {
        "treatments": [
            ["Single Dental Implant","Finance single tooth implant procedures."],
            ["Multiple Dental Implants","Funding for multiple implant restorations."],
            ["Full Mouth Implants","Finance complete full-mouth rehabilitation."],
            ["Implant Supported Dentures","Support for implant-retained dentures."]
        ],
        "faqs": [
            ["Can I finance dental implants?","Eligible applicants may apply through participating lending partners subject to credit assessment."],
            ["Does financing cover full-mouth implants?","Loan amount depends on treatment cost and lender eligibility."],
            ["Which documents are required?","PAN, Aadhaar, KYC and income proof may be required."],
            ["How long does approval take?","Approval depends on lender verification and internal assessment."]
        ]
    },

    "knee-replacement": {
        "treatments": [
            ["Total Knee Replacement","Finance complete knee replacement surgery."],
            ["Partial Knee Replacement","Funding for partial knee replacement procedures."],
            ["Revision Knee Replacement","Finance revision surgery where applicable."],
            ["Robotic Knee Surgery","Funding support for robotic-assisted procedures."]
        ],
        "faqs": [
            ["Can I finance knee replacement surgery?","Eligible applicants may apply through lending partners."],
            ["Who is eligible?","Eligibility depends on lender credit assessment."],
            ["Which documents are needed?","PAN, Aadhaar, KYC and income proof."],
            ["How quickly is approval given?","Approval timelines vary by lender."]
        ]
    },

    "hip-replacement": {
        "treatments": [
            ["Total Hip Replacement","Finance complete hip replacement surgery."],
            ["Partial Hip Replacement","Funding for partial replacement procedures."],
            ["Revision Hip Surgery","Support for revision procedures."],
            ["Robotic Hip Replacement","Finance robotic-assisted hip surgery."]
        ],
        "faqs": [
            ["Can I get a hip replacement loan?","Eligible applicants can apply through lending partners."],
            ["How much financing is available?","Loan amount depends on treatment cost and eligibility."],
            ["What documents are required?","Standard KYC and income proof."],
            ["How long is approval?","Approval depends on lender verification."]
        ]
    },

    "spine-surgery": {
        "treatments": [
            ["Slip Disc Surgery","Finance spine procedures."],
            ["Spinal Fusion","Funding for spinal fusion surgery."],
            ["Endoscopic Spine Surgery","Finance minimally invasive spine procedures."],
            ["Decompression Surgery","Funding for decompression treatment."]
        ],
        "faqs": [
            ["Can spine surgery be financed?","Eligible applicants can apply through participating lenders."],
            ["Who can apply?","Eligibility depends on lender assessment."],
            ["Documents required?","PAN, Aadhaar and income proof."],
            ["Approval timeline?","Depends on lender verification."]
        ]
    },

    "egg-freezing": {
        "treatments": [
            ["Egg Freezing Cycle","Finance complete egg freezing."],
            ["Hormonal Stimulation","Funding for ovarian stimulation."],
            ["Egg Retrieval","Finance egg retrieval procedures."],
            ["Cryopreservation","Funding for egg storage."]
        ],
        "faqs": [
            ["Can egg freezing be financed?","Eligible applicants may apply through participating lenders."],
            ["Does financing include storage?","Coverage depends on treatment package and lender."],
            ["Required documents?","Standard KYC and income proof."],
            ["Approval time?","Varies by lender."]
        ]
    },

    "fertility-preservation": {
        "treatments": [
            ["Egg Preservation","Finance egg preservation."],
            ["Embryo Preservation","Funding for embryo freezing."],
            ["Sperm Preservation","Finance sperm banking."],
            ["Oncofertility","Support for fertility preservation before cancer treatment."]
        ],
        "faqs": [
            ["Can fertility preservation be financed?","Eligible applicants may apply subject to lender approval."],
            ["Who is eligible?","Eligibility depends on lender assessment."],
            ["Documents required?","PAN, Aadhaar and income proof."],
            ["Approval timeline?","Depends on lender verification."]
        ]
    },

    "bariatric-surgery": {
        "treatments": [
            ["Gastric Sleeve","Finance sleeve gastrectomy."],
            ["Gastric Bypass","Funding for gastric bypass surgery."],
            ["Mini Gastric Bypass","Finance minimally invasive bariatric surgery."],
            ["Revision Bariatric Surgery","Funding support for revision procedures."]
        ],
        "faqs": [
            ["Can bariatric surgery be financed?","Eligible applicants may apply through lending partners."],
            ["What procedures are covered?","Coverage depends on clinic and lender policies."],
            ["Documents required?","Standard KYC and income proof."],
            ["Approval time?","Depends on lender verification."]
        ]
    },

    "gynecomastia": {
        "treatments": [
            ["Gynecomastia Surgery","Finance male chest reduction surgery."],
            ["Liposuction","Funding for liposuction where required."],
            ["Gland Excision","Finance gland removal procedures."],
            ["Revision Surgery","Funding for revision surgery."]
        ],
        "faqs": [
            ["Can gynecomastia surgery be financed?","Eligible applicants may apply through lending partners."],
            ["Who can apply?","Subject to lender eligibility."],
            ["Required documents?","Standard KYC and income proof."],
            ["Approval time?","Depends on lender verification."]
        ]
    },

    "liposuction": {
        "treatments": [
            ["Abdominal Liposuction","Finance abdominal body contouring."],
            ["Thigh Liposuction","Funding for thigh contouring."],
            ["Arm Liposuction","Finance arm liposuction."],
            ["360 Liposuction","Funding for comprehensive body contouring."]
        ],
        "faqs": [
            ["Can liposuction be financed?","Eligible applicants may apply through participating lenders."],
            ["Is cosmetic treatment eligible?","Eligibility depends on lender policy."],
            ["Documents required?","Standard KYC and income proof."],
            ["Approval timeline?","Depends on lender assessment."]
        ]
    },

    "rhinoplasty": {
        "treatments": [
            ["Cosmetic Rhinoplasty","Finance cosmetic nose reshaping."],
            ["Functional Rhinoplasty","Funding for breathing correction surgery."],
            ["Revision Rhinoplasty","Finance revision surgery."],
            ["Septorhinoplasty","Funding for combined procedures."]
        ],
        "faqs": [
            ["Can rhinoplasty be financed?","Eligible applicants may apply through lending partners."],
            ["Who is eligible?","Subject to lender assessment."],
            ["Required documents?","Standard KYC and income proof."],
            ["Approval time?","Depends on lender verification."]
        ]
    },

    "invisible-braces": {
        "treatments": [
            ["Clear Aligners","Finance clear aligner treatment."],
            ["Teen Aligners","Funding for adolescent aligners."],
            ["Adult Orthodontics","Finance adult aligner treatment."],
            ["Retainers","Funding for post-treatment retainers."]
        ],
        "faqs": [
            ["Can invisible braces be financed?","Eligible applicants may apply through lending partners."],
            ["Which aligners are covered?","Coverage depends on clinic and lender."],
            ["Documents required?","Standard KYC and income proof."],
            ["Approval timeline?","Depends on lender verification."]
        ]
    }
}

updated = 0

for key, value in DATA.items():
    path = BASE / f"{key}.json"
    if not path.exists():
        continue

    obj = json.loads(path.read_text())

    obj["landing"]["treatments"] = [
        {"title": t, "description": d}
        for t, d in value["treatments"]
    ]

    obj["landing"]["faqs"] = [
        {"question": q, "answer": a}
        for q, a in value["faqs"]
    ]

    path.write_text(json.dumps(obj, indent=2, ensure_ascii=False) + "\n")
    updated += 1

print(f"Updated {updated} landing files.")
