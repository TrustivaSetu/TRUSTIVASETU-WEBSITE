# LOS ↔ LMS — dono connect kaise karein

## LMS kahan hai?

| App | Folder | Port | URL |
|-----|--------|------|-----|
| **LMS** (Lead Management) | `C:\trustiva-lms` | **3000** | http://localhost:3000 |
| **LOS** (Healthcare Console) | `c:\Users\abhik\trustivasetu-website\trustiva-los` | **3001** | http://localhost:3001 |

VS Code / Cursor explorer mein ab **`trustivasetu-website/trustiva-lms`** dikhega — ye `C:\trustiva-lms` ka shortcut (junction) hai, saara LMS code wahi se open hota hai.

Production LMS: **https://data.trustivasetu.com** (same code as `C:\trustiva-lms`)

## Ek saath chalana (local)

**Terminal 1 — LMS:**

```powershell
cd C:\trustiva-lms
npm run dev
```

**Terminal 2 — LOS:**

```powershell
cd c:\Users\abhik\trustivasetu-website\trustiva-los
npm run dev
```

LOS `.env.local` (local ke liye):

```
NEXT_PUBLIC_LMS_URL=http://localhost:3000
NEXT_PUBLIC_LOS_API_KEY=9ceZWE8qoIVaGXPgj6nCLiup7KYFdvsN
```

Ye key `C:\trustiva-lms\.env` ke `LOS_API_KEY` se **same** honi chahiye.

Production par LOS URL:

```
NEXT_PUBLIC_LMS_URL=https://data.trustivasetu.com
```

## Kya sync hota hai

| LOS action | LMS page / Reports |
|------------|-------------------|
| Register Healthcare Partner | Clinics |
| Create User (@trustivasetu.com) | Users |
| Verify OTP / Final Submit Enquiry | Leads |
| Hospital Lifecycle → Add Scheme | Clinic commercials |
| **Har sidebar tab** (Credit, Collections, Lenders, All Leads, …) | Leads + **Reports** auto-update |

Har tab par form + **Save & update LMS reports** → `POST /api/los/sync/activity`

Top-right green/red banner = sync result.

## Verify

1. LMS + LOS dono `npm run dev` chal rahe hon
2. LOS: Hospital register → green banner
3. LMS: http://localhost:3000/clinics → hospital row
4. LOS: Create User → LMS Users
5. LOS: Enquiry Final Submit → LMS Leads

Full API detail: `C:\trustiva-lms\docs\LOS_INTEGRATION.md`
