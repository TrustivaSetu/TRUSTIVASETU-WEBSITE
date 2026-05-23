# Trustiva LOS — Blueprint implementation

Your workflow document is implemented as a **modular LOS** with:

- **Central status engine** (`lib/los/status-engine.ts`) — ENQUIRY_CREATED → OTP_VERIFIED → … → DISBURSED
- **JSON database** (`data/los-db.json` via `/api/los/db`) — all leads, users, visits, enquiries persist
- **LMS auto-sync** on lead create/update, credit, collections, hospitals, users

## Run (VS Code terminal)

**Terminal 1 — LMS**
```powershell
cd C:\trustiva-lms
npm run dev
```

**Terminal 2 — LOS**
```powershell
cd C:\Users\abhik\trustivasetu-website\trustiva-los
npm install
npm run dev
```

- LMS: http://localhost:3000/login  
- LOS: http://localhost:3001/login  
- Login: `admin@trustivasetu.com` / `Admin@123`  
- Demo OTP: `123456`

## Every sidebar tab

| Menu | Module |
|------|--------|
| User Administration | Users + Hospital + Lifecycle + LMS sync |
| Associate Targets | Targets table |
| Attendance | Check-in/out |
| All Leads | Full table, filters, status change, Open detail |
| Lead Allocation | Assign / bulk assign |
| Active Cases | Buckets + TAT |
| Create Lead | 7-step wizard + status engine |
| My Leads | KPIs + list |
| My Enquiries | CRUD + convert to lead |
| Visits | Schedule / check-in / complete |
| Finance Estimator | EMI products 12/4, 3/0, etc. |
| Credit / Collections / Lenders / NACH / Payments | Ops module + LMS |

## Lead detail

All Leads → **Open** → `/dashboard/leads/[id]` (tabs: personal, timeline, disbursal, comments)

## Code layout

```
trustiva-los/
  lib/los/           types, status-engine, client-api, sync-to-lms
  app/api/los/db/    persistent store
  components/los/    LosProvider, LosShell, modules/*
```

## Still optional (phase 2)

- Real file upload / S3
- Bureau & WhatsApp APIs
- JWT auth (currently demo localStorage login)
- Full document OCR
