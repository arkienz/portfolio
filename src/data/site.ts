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
  eyebrow: 'Software developer, Philippines',
  steps: [
    'Four apps that get Philippine payroll, sales, cash and credit right.',
    'Every screen comes from a real app.',
    'Payroll, a cafe POS, a GCash ledger and a loan book.',
    'Pick one and see it run on your own data.',
  ],
};

// color is the token name in global.css (--color-<color>).
export const apps = [
  { name: 'Easy Payroll', href: '#payroll', mark: '₱', color: 'navy', markText: 'text-accent', text: 'Payroll for companies, premiums done the legal way.', status: 'Evaluation version available' },
  { name: 'DevPOS', href: '#pos', mark: 'P', color: 'pos', markText: 'text-accent-ink', text: 'Cafe point of sale that knows the real profit on every cup.', status: 'Free demo available' },
  { name: 'Kaha', href: '#more', mark: 'K', color: 'kaha', markText: 'text-white', text: 'GCash cash-in and cash-out ledger for sari-sari stores.', status: 'In development' },
  { name: 'DevPAUTANG', href: '#more', mark: 'U', color: 'utang', markText: 'text-white', text: 'Loan record book and collection route for informal lenders.', status: 'Pre-release 0.8.0' },
];

export const showcases = [
  {
    id: 'payroll',
    tag: 'Payroll · for companies',
    name: 'Easy Payroll',
    blurb:
      'Multi-tenant payroll for Philippine companies: SSS, PhilHealth, Pag-IBIG and withholding tax, night differential, holiday and rest-day premiums, and shifts that cross midnight.',
    points: [
      'Night overtime at 150 an hour is 206.25 when premiums multiply, not 202.50.',
      'Net pay never goes below zero; loans are cut to what fits and flagged for HR.',
      'Government rates arrive as signed rate packs you review before applying.',
      'Employee self-service: server-stamped clock in, schedule, leave and payslips.',
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
    note: 'Sample data. Not affiliated with SSS, PhilHealth, Pag-IBIG, BIR or DOLE.',
  },
  {
    id: 'pos',
    tag: 'Point of sale · for cafes',
    name: 'DevPOS',
    blurb:
      'The cafe POS that knows your real profit on every cup. Sell, track ingredients, run kitchen screens and close the day on an Android tablet or a Windows PC.',
    points: [
      'Cash and GCash checkout keep selling when the internet is down.',
      'Profit after VAT and ingredient costs, plus automatic ingredient stock.',
      'Kitchen and bar screens, Senior/PWD discounts and Z-Reading.',
      "QR Ph payments through the shop's own account (needs internet).",
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
    note: 'Sample data (Demo Cafe).',
  },
];

export const more = [
  {
    name: 'Kaha',
    color: 'kaha',
    tag: 'Store ledger · Android and Windows',
    text: "For sari-sari stores doing GCash cash-in and cash-out. Record each transaction and see today's fees earned, GCash balance and cash on hand.",
    facts: [['Internet', 'Not needed'], ['Data', 'Encrypted on the device'], ['Price', 'Free, 30-day Pro trial'], ['Status', 'In development']],
    note: 'Not affiliated with GCash, G-Xchange, Inc. or Globe Fintech.',
  },
  {
    name: 'DevPAUTANG',
    color: 'utang',
    tag: 'Loan record book · Android and Windows',
    text: "For neighbors, relatives and store owners who lend (5-6, hulugan, flat interest): who owes what and when, late penalties, and the day's collection route.",
    facts: [['Internet', 'Not needed'], ['Reminders', 'Due dates and routes'], ['Penalties', 'Multa added for you'], ['Status', 'Pre-release 0.8.0']],
    note: 'Screenshots coming soon.',
  },
];

export const principles = [
  { t: 'Offline first', d: 'Three of the four apps need no internet, so the shop keeps working when the connection drops.' },
  { t: 'Money is exact', d: 'Premiums, rounding and compounding are tested on the boundaries, not eyeballed.' },
  { t: 'Private by design', d: 'Per-company data separation on the server and encrypted databases on the device.' },
  { t: 'One codebase', d: 'C# and .NET from the database to Android and Windows, so one fix reaches every platform.' },
];

// The contact card's app picker; the email subject follows the choice.
export const contactApps = [
  ['payroll', 'Easy Payroll'],
  ['pos', 'DevPOS'],
  ['other', 'Other'],
] as const;
