import { siteUrl } from './shared';

const mainSite = 'https://www.kashfy.site';

/**
 * Header for /llms.txt and /llms-full.txt (llmstxt.org format: H1, blockquote summary, key facts, link sections).
 * Prices are not repeated here: they live in the plans table and are served by the main site's /llms.txt.
 */
export const llmsIntro = `# Kashfy

> Kashfy is AI clinic software for doctors, clinics, labs and radiology centers in Egypt. An AI receptionist answers patients on the clinic's own WhatsApp number in Egyptian Arabic and English, 24/7, and books them into the schedule. Visits, prescriptions, lab and radiology results, finance and the team run from one dashboard. Clinics pay per booking, not per doctor.

These are the Kashfy user docs (${siteUrl}). Arabic versions of every page are under ${siteUrl}/ar.

Key facts:
- Pricing is per booking, not per doctor or per message. Plans start at 799 EGP/month (Solo). Every plan includes every feature.
- The first 30 bookings are free, with no card and no time limit.
- Only visits that actually happen count as bookings. Cancellations and no-shows never count.
- Going over a plan never stops bookings or the AI; extra bookings are billed at the plan's overage price.
- AI messages have a fair-use allowance that grows with bookings. Passing it never pauses the AI.
- Payment is by InstaPay, mobile wallet or bank transfer, in EGP. There is no online card payment.
- Patients message the clinic's own WhatsApp Business number on Meta's official Cloud API.

## Current plans and prices

- [Pricing page](${mainSite}/en/pricing): live plans, prices, included bookings, doctor limits and overage
- [Kashfy llms.txt](${mainSite}/llms.txt): product summary with the live price list, generated from the plans table
- [Plans & Pricing docs](${siteUrl}/billing/plans): the free trial, what counts as a booking, extra bookings, fair use, activating a plan
`;

/** Fumadocs renders root-relative links; llms.txt readers need absolute ones. */
export function absolutizeLinks(md: string) {
  return md.replace(/\]\(\//g, `](${siteUrl}/`);
}
