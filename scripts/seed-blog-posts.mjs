/**
 * Seeds new blog posts (idempotent: upsert by slug).
 * Run on the production box from the repo root:
 *   node scripts/seed-blog-posts.mjs
 * Posts render as plain text (whitespace-pre-wrap), so content is plain text, no markdown.
 * Set PUBLISH=0 to insert as drafts instead.
 */
import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();
const PUBLISH = process.env.PUBLISH !== "0";

const CTA = `\n\nWant to offer or explore medical financing? Visit trustivasetu.com or write to us through the Contact Us page.\n\nLoan approval, amount and terms depend on the lender's policies and your eligibility. Always read the Key Fact Statement before you accept a loan.`;

const posts = [
{
slug: "what-is-no-cost-emi-for-medical-treatment",
title: "What Is No-Cost EMI for Medical Treatment, and How Does It Actually Work?",
excerpt: "No-Cost EMI sounds simple, but who pays the interest? Here is a clear explanation for patients and clinics.",
content: `Medical bills rarely arrive at a convenient time. Whether it is a dental procedure, an IVF cycle or an eye surgery, many families would rather spread the cost over a few months than pay everything at once. That is where No-Cost EMI comes in.

What does "No-Cost" mean?

In a No-Cost EMI, the patient pays only the treatment amount, split into equal monthly instalments. The lender's interest is not charged to the patient as a separate cost. Instead, it is covered by a subvention, which is a fee the clinic or another party pays to the lender so the patient does not have to.

Who pays the interest, then?

The interest does not disappear. It is absorbed through that subvention. This is why you should always compare the No-Cost EMI price with the cash price. If a clinic gives a discount for cash payment, the true cost of the EMI is the difference between the two.

What should a patient check?

1. The total amount payable, including any processing fee and taxes.
2. The number of instalments and the due date of each.
3. What happens if a payment is late.
4. Whether you can pre-close the loan and what it costs.
5. The Key Fact Statement. RBI's digital lending rules require lenders to provide it before you accept the loan.

Why does it matter for clinics?

When patients can pay in instalments, more of them go ahead with recommended treatment instead of postponing it. The clinic is paid by the lender and does not have to chase patients for collections.

How does TrustivaSetu help?

TrustivaSetu connects clinics and hospitals with regulated lending partners through one platform, so a patient can check options at the clinic itself and the clinic does not have to manage multiple lender relationships.${CTA}`
},
{
slug: "ivf-treatment-financing-what-to-check-before-you-borrow",
title: "IVF Treatment Financing: What to Check Before You Borrow",
excerpt: "IVF is a major expense and is rarely covered by insurance. Know what to check before you choose a loan.",
content: `IVF and other fertility treatments are among the most emotionally and financially demanding medical journeys. Most health insurance policies do not cover them, so couples often pay out of pocket. A medical loan can help, but it should be chosen carefully.

Plan for more than one cycle

Success is not guaranteed in a single attempt. Ask your clinic for a realistic estimate that includes medicines, tests, procedures and the possibility of an additional cycle. Borrow with that range in mind, not only the best case.

Questions to ask the clinic

1. What is included in the package price and what is charged extra?
2. Is the loan paid directly to the clinic?
3. What is the refund or adjustment policy if treatment is paused or cancelled?

Questions to ask the lender

1. What is the interest rate and the total amount payable?
2. Are there processing fees, GST or other charges?
3. Can I pre-pay or foreclose, and is there a charge?
4. Is there a cooling-off period during which I can exit the loan?

Choose an EMI you can sustain

Pick a tenure where the monthly instalment fits comfortably in your household budget. A longer tenure lowers the instalment but increases the total interest.

Keep documents ready

Lenders usually ask for identity proof, address proof and income details. Having them ready makes approval faster.

TrustivaSetu works with clinics that offer IVF and fertility treatment and helps patients explore financing options through our lending partners, so treatment decisions are not delayed by payment worries.${CTA}`
},
{
slug: "dental-treatment-emi-braces-implants-aligners",
title: "Dental Treatment on EMI: Braces, Implants, Aligners and Smile Makeovers",
excerpt: "Dental care is often paid out of pocket. See how EMI can make braces, implants and aligners easier to afford.",
content: `Dental treatments such as braces, implants, aligners, root canals and full-mouth rehabilitation are usually not covered by standard health insurance. Because many of them are staged over several visits, paying the full amount upfront can be difficult.

Why people delay dental care

Dental problems often start small and become expensive when ignored. A cavity left alone can turn into a root canal, and a missing tooth can affect neighbouring teeth. Delay is usually about the upfront cost, not about the need.

How EMI helps

With an EMI option, the treatment plan can start when it is clinically needed, and the cost is spread across monthly instalments. This works especially well for long treatments like braces and clear aligners, where care continues for many months.

What to ask before you choose EMI

1. Is the treatment cost the same for EMI and cash payment?
2. Are there any processing fees or taxes in addition to the instalments?
3. What is the total amount you will pay over the full tenure?
4. Can you close the loan early?

For dental clinics

Offering EMI at the front desk helps patients accept the full treatment plan instead of choosing only the cheapest part of it. The clinic receives payment from the lender, and the patient pays in instalments.

TrustivaSetu helps dental clinics add patient financing without building their own lending setup.${CTA}`
},
{
slug: "why-clinics-should-offer-patient-financing",
title: "Why Every Clinic Should Offer Patient Financing",
excerpt: "Patient financing helps more patients say yes to treatment, without the clinic taking on credit risk.",
content: `Every clinician has seen it: a patient agrees that the treatment is needed, asks for the price, and then goes quiet. The reason is almost always cost, not trust in the doctor.

What patient financing changes

When a clinic offers EMI, the conversation shifts from "Can I afford the full amount today?" to "Can I manage a monthly instalment?" That shift helps patients commit to treatment they already need.

Benefits for the clinic

1. More treatment plans accepted, especially higher-value ones.
2. Payment from the lender, not from the patient in parts, so the clinic is not responsible for collecting instalments.
3. A stronger patient experience, because the options are explained at the clinic itself.
4. Better planning, since cash flow does not depend on patients paying in stages.

Where it works best

Financing is most useful for elective and often insurance-excluded care such as IVF and fertility, dental, cosmetology, ophthalmology and hearing aids.

What to look for in a financing partner

1. Regulated lending partners.
2. A simple process that fits into the clinic's daily workflow.
3. Clear patient communication, including the total amount payable.
4. Support for onboarding and training your front-desk team.

How TrustivaSetu works

TrustivaSetu provides clinics with a technology platform to check patient financing options and connects them with multiple regulated lending partners. Clinics do not need to negotiate separately with each lender.

If you run a clinic and want to explore patient financing, get in touch with us.${CTA}`
},
{
slug: "medical-loan-checklist-questions-to-ask-your-lender",
title: "Medical Loan Checklist: 8 Questions to Ask Before You Accept",
excerpt: "A simple checklist to compare medical loans and avoid surprises on charges, tenure and repayment.",
content: `A medical loan can be a useful tool when a treatment cannot wait. But the offer that looks easiest is not always the one that costs the least. Use this checklist before you accept.

1. What is the total amount I will repay?
Do not look only at the monthly instalment. Multiply it by the number of months and add any upfront charges.

2. Is the interest rate fixed or reducing, and what is the effective cost?
Ask for the annual percentage rate (APR) so you can compare offers fairly.

3. What fees apply?
Processing fee, documentation charges and taxes should all be shown in writing.

4. Did I receive the Key Fact Statement?
RBI's digital lending rules require lenders to give you a Key Fact Statement before you accept. Read it.

5. Is there a cooling-off period?
Ask whether you can exit the loan within a short period by returning the principal and a proportionate interest.

6. Can I pre-pay or foreclose?
Know whether there is a charge for paying early.

7. What happens if I miss an instalment?
Ask about penal charges and how they are calculated.

8. Who is the lender and where do I raise complaints?
The lender should be a regulated bank or NBFC, and you should know how to reach the grievance officer.

A few more tips

1. Borrow only what you need.
2. Never share OTPs or passwords with anyone.
3. Be careful with unknown apps that ask for excess permissions.

TrustivaSetu works with regulated lending partners and helps patients understand their options at the clinic before they decide.${CTA}`
},
{
slug: "trustivasetu-medical-card-and-personal-loans-one-platform",
title: "TrustivaSetu Now Offers Medical, Card and Personal Loans Through Trusted Partners",
excerpt: "Medical loans with CleverPe, card loans with Paytm and personal loans with Gromo, all through TrustivaSetu.",
content: `TrustivaSetu began with one purpose: making healthcare financing simple for patients and clinics. Today we are expanding what patients and partners can access on our platform.

Our services

Medical Loans (NBFC loans for treatments), powered by CleverPe.
Card Loans, powered by Paytm.
Personal Loans, powered by Gromo.

Why we work with partners

Each of these partners brings its own lending capability and regulatory standing. TrustivaSetu acts as an aggregator and technology platform that brings them together, so patients and clinics get one place to explore options instead of dealing with each lender separately.

What this means for patients

1. More options to explore when a treatment or a medical expense comes up.
2. A clear process at the clinic, with the terms shown before you decide.
3. Lenders that are regulated, with their own approval criteria.

What this means for clinics

1. A single integration to offer financing across lending products.
2. Less back-and-forth with multiple lenders.
3. Support from the TrustivaSetu team for onboarding and training.

Our focus remains healthcare, especially elective and insurance-excluded care such as IVF and fertility, dental, cosmetology, ophthalmology and hearing aids.

To know more, visit trustivasetu.com.${CTA}`
},
];

const base = Date.now();
for (let i = 0; i < posts.length; i++) {
  const p = posts[i];
  const publishedAt = PUBLISH ? new Date(base - i * 60_000) : null; // keep stable ordering
  const r = await db.blogPost.upsert({
    where: { slug: p.slug },
    update: { title: p.title, excerpt: p.excerpt, content: p.content },
    create: { slug: p.slug, title: p.title, excerpt: p.excerpt, content: p.content, published: PUBLISH, publishedAt },
  });
  console.log("ok", r.slug, r.published ? "published" : "draft");
}
await db.$disconnect();
