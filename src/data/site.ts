// Single place to edit all copy, links and contact details.
// Contact details come from the owner's published Easy Payroll marketing card.
import banner from '../assets/payroll/00-banner-1600x900.png';
import hook from '../assets/payroll/00-hook.png';
import premiums from '../assets/payroll/01-premiums.png';
import noNeg from '../assets/payroll/02-no-negative-pay.png';
import rates from '../assets/payroll/05-rate-packs.png';
import shifts from '../assets/payroll/06-shifts.png';
import self from '../assets/payroll/07-self-service.png';
import dash from '../assets/payroll/09-dashboard.png';

export const site = {
  name: 'Mark Angelo Pasion',
  role: 'Software developer',
  title: 'Mark Angelo Pasion | Builds software for Philippine small businesses',
  description:
    'Portfolio of Mark Angelo Pasion: Easy Payroll, an offline-first POS, a GCash ledger and a lending record book, built in C# and .NET for Philippine businesses.',
  email: 'markangelopasion@ymail.com',
  phone: '0956 592 9546',
  github: 'https://github.com/arkienz',
};

export const hero = {
  eyebrow: 'Software developer, Philippines',
  headline: 'Software that gets Philippine payroll, cash and credit right.',
  sub: 'I build and sell apps for small businesses: payroll with the real premium rules, a POS that works with no internet, and ledgers for the store and the lender.',
};

export const featured = {
  name: 'Easy Payroll',
  code: 'DevPAYROLL',
  status: 'In development, evaluation version available',
  blurb:
    'Multi-tenant payroll for Philippine companies. SSS, PhilHealth, Pag-IBIG and withholding tax, night differential, holiday and rest-day premiums, and day, mid, night and rotating shifts, including shifts that cross midnight.',
  points: [
    'Premiums multiply, as the rules require: night overtime at 150 an hour is 206.25, not 202.50.',
    'Net pay never goes below zero: contributions first, then loans cut to what fits, flagged for HR.',
    'Government rates arrive as digitally signed rate packs that you review before applying.',
    'Employee self-service: own sign-in, server-stamped clock in, schedule, leave and payslips.',
  ],
  stack: ['C#', '.NET', 'Blazor', 'Multi-tenant'],
  banner,
  shots: [
    { src: hook, alt: 'Night overtime math: multiplied premiums give 206.25, added gives 202.50' },
    { src: premiums, alt: 'Payslip premiums with hours, rate and amount' },
    { src: noNeg, alt: 'A short cutoff with a loan due keeps net pay above zero' },
    { src: shifts, alt: 'Day, mid, night and rotating shift roster' },
    { src: rates, alt: 'Versioned rate packs reviewed before applying' },
    { src: self, alt: 'Employee self-service sign-in, clock in and payslips' },
    { src: dash, alt: 'Staff dashboard with attendance and the current cutoff' },
  ],
};

export const projects = [
  {
    name: 'DevPOS',
    tag: 'Point of sale',
    text: 'Offline-first POS for independent cafes. Every checkout action works with zero internet; data lives in a local SQLite database on Android tablets and Windows.',
    stack: ['C#', 'MAUI Blazor', 'SQLite'],
    status: 'In development',
  },
  {
    name: 'Kaha (DevGCASH)',
    tag: 'Store ledger',
    text: 'A ledger for sari-sari stores doing GCash cash-in and cash-out: transactions, fees earned, balance and cash on hand. No server, no accounts, encrypted on the device. Not affiliated with GCash.',
    stack: ['C#', 'MAUI Blazor', 'Encrypted SQLite'],
    status: 'In development',
  },
  {
    name: 'DevPAUTANG',
    tag: 'Loan record book',
    text: 'Record book for informal lenders: who owes what and when, late penalties, and a planned collection route with reminders. Works offline on Android and Windows.',
    stack: ['C#', 'MAUI Blazor', 'SQLite'],
    status: 'Pre-release 0.8.0',
  },
];

export const principles = [
  { t: 'Offline first', d: 'Most of my apps need no internet at all, so a shop keeps selling when the connection drops.' },
  { t: 'Money is exact', d: 'Rounding, premiums and compounding are computed and tested on the boundaries, not eyeballed.' },
  { t: 'Private by design', d: 'Per-company data separation on the server, encrypted local databases, no secrets in shipped apps.' },
  { t: 'One codebase', d: 'C# and .NET from the database to Android and Windows, so one fix reaches every platform.' },
];

export const skills = ['C#', '.NET', 'Blazor', 'MAUI', 'SQLite', 'Multi-tenant design', 'Payroll and tax rules (PH)', 'Android', 'Windows', 'Astro', 'Tailwind CSS'];
