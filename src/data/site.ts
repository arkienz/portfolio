// Single place to edit all copy, links and contact details.
// Contact details come from the owner's published Easy Payroll marketing card.
import payBanner from '../assets/payroll/00-banner-1600x900.png';
import payHook from '../assets/payroll/00-hook.png';
import payPremiums from '../assets/payroll/01-premiums.png';
import payNoNeg from '../assets/payroll/02-no-negative-pay.png';
import payRates from '../assets/payroll/05-rate-packs.png';
import payShifts from '../assets/payroll/06-shifts.png';
import paySelf from '../assets/payroll/07-self-service.png';
import posBanner from '../assets/pos/00-banner-1600x900.png';
import posOffline from '../assets/pos/02-works-offline.png';
import posProfit from '../assets/pos/03-real-profit.png';
import posStock from '../assets/pos/04-inventory.png';
import posKitchen from '../assets/pos/05-kitchen-screens.png';
import posRules from '../assets/pos/06-ph-rules.png';
import posDash from '../assets/pos/07-dashboard.png';

export const site = {
  name: 'Mark Angelo Pasion',
  title: 'Mark Angelo Pasion | Builds software for Philippine small businesses',
  description:
    'Portfolio of Mark Angelo Pasion: Easy Payroll, the DevPOS cafe point of sale, the Kaha GCash ledger and the DevPAUTANG loan book, built in C# and .NET for Philippine businesses.',
  email: 'markangelopasion@ymail.com',
  phone: '0956 592 9546',
  github: 'https://github.com/arkienz',
};

// The four scroll steps of the 3D intro, in order. The first is the page's h1.
export const intro = {
  steps: [
    'Four apps that get Philippine payroll, sales, cash and credit right.',
    'Every screen comes from a real app.',
    'Payroll, a cafe POS, a GCash ledger and a loan book.',
    'Pick one and see it run on your own data.',
  ],
};

export const showcases = [
  {
    id: 'payroll',
    name: 'Easy Payroll',
    blurb:
      'Payroll for Philippine companies that gets night shifts, holidays and overtime right: SSS, PhilHealth, Pag-IBIG and withholding tax, and shifts that cross midnight.',
    points: [
      'Premiums multiply, as the rules say. Night overtime at 150 an hour is 206.25, not the 202.50 you get by adding.',
      'Net pay never goes below zero. Loans are cut to what fits and flagged for HR.',
      'Government rates arrive as signed rate packs you review before they apply.',
      'Staff clock in on their own sign-in, with the time stamped by the server.',
    ],
    cta: 'Ask for a payroll walkthrough',
    banner: payBanner,
    shots: [
      { src: payHook, title: 'Premiums multiply', sub: 'Night overtime at 150 an hour is 206.25, not 202.50.', alt: 'Night overtime math: multiplied premiums give 206.25, added gives 202.50' },
      { src: payPremiums, title: 'Paid as the law says', sub: 'Every premium on the payslip: hours, rate and amount.', alt: 'Payslip premiums with hours, rate and amount' },
      { src: payNoNeg, title: 'Net pay never below zero', sub: 'Loans are cut to what fits and flagged for HR.', alt: 'A short cutoff with a loan due keeps net pay above zero' },
      { src: payShifts, title: 'Day, mid, night, rotating', sub: 'A 9 PM to 6 AM shift belongs to the day it started.', alt: 'Day, mid, night and rotating shift roster' },
      { src: payRates, title: 'Signed rate packs', sub: 'Review each government rate table before applying it.', alt: 'Versioned rate packs reviewed before applying' },
      { src: paySelf, title: 'Staff help themselves', sub: 'Server-stamped clock in, schedule, leave and payslips.', alt: 'Employee self-service sign-in, clock in and payslips' },
    ],
    note: 'Screens show sample data (Acme Foods Inc.).',
  },
  {
    id: 'pos',
    name: 'DevPOS',
    blurb:
      'The cafe point of sale that knows the real profit on every cup. Sell, track ingredients, run kitchen screens and close the day on an Android tablet or a Windows PC.',
    points: [
      'Cash and GCash checkout keep selling when the internet is down.',
      'Profit after VAT and ingredient costs, with stock that deducts itself.',
      'Kitchen and bar screens, Senior and PWD discounts, and the Z-Reading.',
      "QR Ph through the shop's own account, when there is a connection.",
    ],
    cta: 'Ask for a POS demo',
    banner: posBanner,
    shots: [
      { src: posOffline, title: 'Tuloy ang benta', sub: 'Cash and GCash checkout keep working with no internet.', alt: 'Checkout keeps working with no internet' },
      { src: posProfit, title: 'Real profit per cup', sub: 'After VAT and ingredient costs, not just sales.', alt: 'Real profit per cup after VAT and costs' },
      { src: posStock, title: 'Ingredient stock', sub: 'Sales deduct what they use; low items are flagged.', alt: 'Ingredient inventory and low stock' },
      { src: posKitchen, title: 'Kitchen and bar screens', sub: 'Orders go straight to the people making them.', alt: 'Kitchen and bar order screens' },
      { src: posRules, title: 'Senior, PWD and Z-Reading', sub: 'Philippine discount and closing rules built in.', alt: 'Senior, PWD discounts and Z-Reading' },
      { src: posDash, title: 'Today at a glance', sub: 'Sales, profit, orders and low stock on one screen.', alt: 'Sales dashboard with profit, orders and low stock' },
    ],
    note: 'Screens show sample data (Demo Cafe).',
  },
];

export const store = [
  {
    id: 'kaha',
    name: 'Kaha',
    text: "A ledger for sari-sari stores that do GCash cash-in and cash-out. Each transaction goes in with the customer's number and the fee, and the day's fees, GCash balance and cash on hand add up by themselves. No internet, encrypted on the phone or PC.",
    status: 'Free with a 30-day Pro trial. In development.',
  },
  {
    id: 'utang',
    name: 'DevPAUTANG',
    text: "The listahan, without the lost notebook. For anyone who lends (5-6, hulugan, flat interest): who owes what and when, late penalties added for you, and the day's collection route with reminders. Works offline on Android and Windows.",
    status: 'Pre-release 0.8.0. Screenshots coming soon.',
  },
];

export const about =
  "I'm Mark Angelo Pasion, a software developer in the Philippines. I build each app end to end in C# and .NET, from the database to Android and Windows, and I test the money math on its edges.";

export const principles = [
  { t: 'Offline first', d: 'Three of the four apps need no internet, so the shop keeps working when the connection drops.' },
  { t: 'Money is exact', d: 'Premiums, rounding and compounding are tested on the boundaries.' },
  { t: 'Private by design', d: 'Company data is kept apart on the server; device data is encrypted.' },
];

// The contact wallet: one walkthrough pass per app, each an email with the subject filled in.
export const passes = [
  { name: 'Easy Payroll', for: 'For companies', bring: 'Bring one real cutoff.', mark: '₱' },
  { name: 'DevPOS', for: 'For cafes', bring: 'Bring your menu.', mark: 'P' },
  { name: 'Kaha', for: 'For sari-sari stores', bring: 'Bring a day of GCash entries.', mark: 'K' },
  { name: 'DevPAUTANG', for: 'For lenders', bring: 'Bring your listahan.', mark: 'U' },
];

export const walkthroughMail = (app: string) =>
  `mailto:${site.email}?subject=${encodeURIComponent(`Free walkthrough: ${app}`)}`;
