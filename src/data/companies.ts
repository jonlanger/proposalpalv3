import type { CompanyProfile } from "./types";

/**
 * Client profiles summarized (not copied) from public filings and news, as of September 2026.
 * Figures are rounded; always verify against the linked sources before using them with a client.
 */
export const COMPANIES: CompanyProfile[] = [
  {
    id: "walmart",
    name: "Walmart Inc.",
    aliases: ["walmart", "walmart inc", "walmart inc.", "walmart us", "sam's club"],
    industry: "Retail (Consumer)",
    headquarters: "Bentonville, Arkansas",
    asOf: "Fiscal year ended January 31, 2026 (FY26)",
    overview:
      "The world's largest retailer by revenue, operating Walmart U.S., Walmart International and Sam's Club U.S. It combines a dense store network (4,600+ U.S. stores) with a fast-growing eCommerce, marketplace, advertising and membership business, and is using automation and AI to lower its cost to serve.",
    financials: [
      "FY26 total revenue about $713B, up 4.7% (5.1% in constant currency).",
      "FY26 operating income about $29.8B; operating margin about 4.2% of net sales.",
      "Global eCommerce grew about 24% in FY26 to roughly $150B; Walmart U.S. eCommerce about $100B.",
      "Q4 FY26: global advertising up 37% (Walmart Connect U.S. up 41%), membership fee revenue up about 15%, eCommerce about 23% of sales.",
      "Q4 FY26 operating cash flow for the year about $41.6B; free cash flow about $14.9B.",
    ],
    segments: [
      "Walmart U.S.: the largest segment; Q4 FY26 comp sales up 4.6%, eCommerce up 27% (eighth straight quarter above 20%).",
      "Walmart International: Q4 FY26 net sales up 7.5% in constant currency, eCommerce up 17% (Flipkart, Walmex, others).",
      "Sam's Club U.S.: Q4 FY26 comp sales up 4.0% ex-fuel, record membership, eCommerce up 23%.",
      "Higher-margin flywheel: advertising (Walmart Connect, VIZIO), Walmart+ and Sam's Club membership, third-party marketplace and fulfillment services.",
    ],
    leadership: [
      "John Furner – President & CEO since February 1, 2026 (previously CEO of Walmart U.S.); succeeded Doug McMillon.",
      "David Guggina – President & CEO, Walmart U.S. since February 2026.",
      "Doug McMillon – former CEO; adviser through FY27.",
    ],
    priorities: [
      "Keep eCommerce growing profitably: lower last-mile cost, faster delivery (same-day and under-3-hour), marketplace scale.",
      "Supply chain automation: automated regional DCs serving roughly 65% of stores by end of FY26; $520M program with Symbotic for about 400 accelerated pickup-and-delivery centers.",
      "Grow the higher-margin businesses: advertising, membership and marketplace services.",
      "Apply AI across merchandising, inventory, associate tools and customer shopping agents.",
      "Associate productivity and new roles as automation changes store and DC work.",
    ],
    recentDevelopments: [
      "CEO transition to John Furner (Feb 2026) framed as continuity of the omnichannel strategy.",
      "Drone delivery with Wing expanding to about 150 more stores in 2026; 1 million drone deliveries passed in May 2026; a network of 270+ locations planned for 2027.",
      "Symbotic acquired Walmart's Advanced Systems and Robotics business alongside the APD development program.",
    ],
    competitors: ["Amazon", "Costco", "Target", "Kroger", "Aldi", "Dollar General"],
    sources: [
      { title: "Walmart FY26 Form 10-K (SEC)", url: "https://www.sec.gov/Archives/edgar/data/104169/000010416926000055/wmt-20260131.htm" },
      { title: "Walmart Q4 FY26 earnings release", url: "https://corporate.walmart.com/news/2026/02/19/walmart-releases-q4-fy26-earnings" },
      { title: "Walmart 2026 annual report and proxy", url: "https://corporate.walmart.com/news/2026/04/23/walmart-releases-2026-annual-report-and-proxy-statement" },
      { title: "Retail Dive: 3 takeaways from Walmart's 2026 annual report", url: "https://www.retaildive.com/news/walmarts-annual-report-ecommerce-store-investments-AI/818542/" },
      { title: "Symbotic to acquire Walmart's robotics business", url: "https://ir.symbotic.com/news-releases/news-release-details/symbotic-acquire-walmarts-advanced-systems-and-robotics-business" },
      { title: "Walmart: 1 million drone deliveries", url: "https://corporate.walmart.com/news/2026/05/29/walmart-celebrates-1-million-drone-deliveries-marking-a-major-milestone-in-customer-convenience" },
    ],
  },
  {
    id: "ford",
    name: "Ford Motor Company",
    aliases: ["ford", "ford motor", "ford motor company", "ford motor co"],
    industry: "Automotive (Industrial Goods)",
    headquarters: "Dearborn, Michigan",
    asOf: "Fiscal year 2025",
    overview:
      "A U.S. automaker organized into Ford Blue (gas and hybrid vehicles), Ford Model e (EVs and software), Ford Pro (commercial vehicles and services) and Ford Credit. After a costly EV build-out, Ford reset its EV plans in late 2025 around affordable vehicles on a new Universal EV Platform, while pushing hard on cost and quality.",
    financials: [
      "2025 revenue a record $187.3B, up about 1%.",
      "2025 net loss about $8.2B, driven by roughly $19.5B of special charges tied to the EV pullback (about $8.5B of asset write-downs and $5.5B of cash charges through 2027).",
      "2025 adjusted EBIT about $6.8B; adjusted free cash flow about $3.5B.",
      "2026 guidance: adjusted EBIT $8–10B, adjusted free cash flow $5–6B, capex $9.5–10.5B.",
    ],
    segments: [
      "Ford Pro: the profit engine; 2025 EBIT about $6.8B (down year over year) from Super Duty, Transit and software/services.",
      "Ford Blue: gas and hybrid vehicles, including F-Series; expected to benefit from the EV reset starting in 2026.",
      "Ford Model e: 2025 EBIT loss about $4.8B (margin about -72%) on wholesales up 69%; 2026 loss guided to $4–4.5B.",
      "Ford Credit: captive finance arm.",
    ],
    leadership: [
      "Jim Farley – President & CEO.",
      "Sherry House – CFO since 2025 (formerly CFO of Lucid; the first woman to hold the role at Ford).",
      "Bill Ford – Executive Chair.",
    ],
    priorities: [
      "Make EVs profitable through the Universal EV Platform: about 20% fewer parts, 25% fewer fasteners, 40% fewer workstations, and 15% faster assembly; a roughly $30,000 midsize electric pickup in 2027.",
      "Take out structural cost, especially warranty and material cost (about $1.5B reduced in 2025, more targeted in 2026).",
      "Fix quality: Ford issued a record ~152 recalls in 2025; warranty costs have run above $4B a year.",
      "Grow Ford Pro software and services (subscriptions, telematics, uptime).",
      "Manage tariff exposure and supply disruptions (e.g., the Novelis aluminum plant fire).",
    ],
    recentDevelopments: [
      "December 2025: EV strategy reset with $19.5B of special charges.",
      "Q4 2025: largest quarterly earnings miss in four years, but 2026 guidance well received.",
      "2026: CFO commentary points to sharply lower first-generation EV losses and growing paid software subscriptions.",
    ],
    competitors: ["General Motors", "Stellantis", "Toyota", "Tesla", "Hyundai-Kia", "BYD (outside the U.S.)"],
    sources: [
      { title: "Ford FY2025 Form 10-K (SEC)", url: "https://www.sec.gov/Archives/edgar/data/37996/000003799626000015/f-20251231.htm" },
      { title: "CNBC: Ford to record $19.5B in special charges on EV pullback", url: "https://www.cnbc.com/2025/12/15/ford-ev-pullback.html" },
      { title: "CNBC: Ford Q4 2025 earnings", url: "https://www.cnbc.com/2026/02/10/ford-motor-f-earnings-q4-2025.html" },
      { title: "Edmunds: Ford confirms $30,000 midsize EV truck for 2027", url: "https://www.edmunds.com/car-news/2027-ford-midsize-electric-pickup-announcement.html" },
      { title: "CBT News: Ford posts record recalls in 2025", url: "https://www.cbtnews.com/ford-posts-record-152-recalls-in-2025-but-says-vehicle-quality-is-improving/" },
    ],
  },
  {
    id: "pfizer",
    name: "Pfizer Inc.",
    aliases: ["pfizer", "pfizer inc", "pfizer inc."],
    industry: "Biopharmaceuticals (Health Care)",
    headquarters: "New York, New York",
    asOf: "Fiscal year 2025",
    overview:
      "One of the world's largest biopharmaceutical companies, spanning primary care, specialty care, oncology (strengthened by the 2023 Seagen acquisition) and vaccines. Pfizer is managing a large loss-of-exclusivity wave while shifting its cost base and rebuilding growth through oncology, launches and a return to obesity via the Metsera acquisition.",
    financials: [
      "2025 revenue about $62.6B, down about 2% operationally; excluding COVID products, operational growth of about 6%.",
      "Cost realignment program expected to deliver about $5.7B of net savings through 2026; about $500M of R&D savings in 2025 being reinvested.",
      "2026 guidance: revenue $59.5–62.5B, adjusted diluted EPS $2.80–3.00, adjusted SI&A $12.5–13.5B.",
    ],
    segments: [
      "Primary care, specialty care and oncology biopharma businesses, plus Pfizer CentreOne (contract manufacturing) and Pfizer Ignite.",
      "Key franchises: Eliquis (with BMS), Vyndaqel family, Prevnar family, Ibrance, Xtandi (with Astellas), Padcev, Nurtec, Abrysvo.",
    ],
    leadership: [
      "Dr. Albert Bourla – Chairman & CEO.",
      "Cecile Guegan – Interim CFO from August 16, 2026, after CFO Dave Denton left for a role outside pharma.",
    ],
    priorities: [
      "Offset the 2026–2028 loss-of-exclusivity wave (an estimated $17–18B of annual revenue at risk by 2028, including Eliquis, Ibrance, Xtandi and Xeljanz).",
      "Execute roughly 20 pivotal study starts in 2026 and deliver on oncology and launches.",
      "Build an obesity platform after the Metsera acquisition (about $7B enterprise value, closed November 2025).",
      "Deliver cost realignment and manufacturing optimization savings while reinvesting in R&D.",
    ],
    recentDevelopments: [
      "Completed the Metsera acquisition (monthly injectable and oral obesity candidates).",
      "Eliquis European patent expiry from May 2026.",
      "CFO transition announced June 2026; search under way.",
    ],
    competitors: ["Merck & Co.", "Johnson & Johnson", "AstraZeneca", "Novartis", "Eli Lilly", "Novo Nordisk (obesity)"],
    sources: [
      { title: "Pfizer Q4/FY2025 earnings release", url: "https://www.businesswire.com/news/home/20260203145333/en/Pfizer-Reports-Solid-Full-Year-2025-Results-And-Reaffirms-2026-Guidance" },
      { title: "Pfizer FY2026 guidance (Dec 2025)", url: "https://www.pfizer.com/news/press-release/press-release-detail/pfizer-reaffirms-full-year-2025-eps-guidance-and-provides" },
      { title: "Pfizer completes acquisition of Metsera", url: "https://www.pfizer.com/news/press-release/press-release-detail/pfizer-completes-acquisition-metsera" },
      { title: "BioSpace: Pfizer fast-tracks obesity programs against patent cliff", url: "https://www.biospace.com/business/jpm26-pfizer-fast-tracks-obesity-programs-in-race-against-patent-cliff" },
      { title: "Pfizer announces CFO transition", url: "https://www.pfizer.com/news/press-release/press-release-detail/pfizer-announces-chief-financial-officer-transition" },
    ],
  },
  {
    id: "jpmorgan",
    name: "JPMorgan Chase & Co.",
    aliases: ["jpmorgan", "jp morgan", "jpmorgan chase", "jpmorgan chase & co", "jpmorgan chase & co.", "chase", "jpmorganchase"],
    industry: "Banking (Financial Institutions)",
    headquarters: "New York, New York",
    asOf: "Fiscal year 2025",
    overview:
      "The largest U.S. bank by assets, operating Consumer & Community Banking (Chase), the Commercial & Investment Bank, and Asset & Wealth Management. It is one of the largest technology spenders in financial services and among the most advanced banks in deploying AI at scale.",
    financials: [
      "2025 net income about $57.0B ($20.02 per share); ROTCE about 20%.",
      "2025 total net revenue about $182B; total assets about $4.4T.",
      "Technology spend about $18B in 2025; 2026 expense outlook about $105B, including about $20B for technology.",
      "Asset & Wealth Management: record net inflows, AUM about $4.8T, client assets about $7.1T.",
    ],
    segments: [
      "Consumer & Community Banking (Chase): retail banking, cards, auto, home lending.",
      "Commercial & Investment Bank: investment banking, markets, payments, commercial banking.",
      "Asset & Wealth Management: J.P. Morgan Asset Management and Private Bank.",
    ],
    leadership: [
      "Jamie Dimon – Chairman & CEO (expects to stay roughly three more years as of mid-2026).",
      "Doug Petno – Co-President and CEO of the Commercial & Investment Bank (from June 2026).",
      "Troy Rohrbaugh – Co-President and CEO of Consumer & Community Banking (from June 2026).",
      "Jeremy Barnum – CFO.",
      "Teresa Heitsenrether – Chief Data & Analytics Officer; retiring at the end of 2026, with the standalone AI chief role not being replaced.",
    ],
    priorities: [
      "Scale AI: 450+ use cases in production with a plan to reach about 1,000; about $2B a year of AI spend matched by about $2B of benefits.",
      "LLM Suite, an internal generative AI platform available to 200,000+ employees; moving toward agentic AI in operations.",
      "Modernize the technology estate (cloud migration, data platforms) while holding expense discipline as rate tailwinds fade.",
      "Keep AI governance, model risk and access control ahead of agent deployment.",
    ],
    recentDevelopments: [
      "June 2026 leadership reshuffle: Petno and Rohrbaugh named co-presidents; Marianne Lake departed.",
      "AI moving from a standalone function into the lines of business (the CDAO role will not be backfilled).",
    ],
    competitors: ["Bank of America", "Citigroup", "Wells Fargo", "Goldman Sachs", "Morgan Stanley"],
    sources: [
      { title: "JPMorgan Chase FY2025 Form 10-K (SEC)", url: "https://www.sec.gov/Archives/edgar/data/19617/000162828026008131/jpm-20251231.htm" },
      { title: "JPMorgan Chase 4Q25 earnings release", url: "https://www.sec.gov/Archives/edgar/data/19617/000162828026001902/a4q25erfexhibit991narrative.htm" },
      { title: "CNBC: JPMorgan names co-presidents as Lake exits", url: "https://www.cnbc.com/2026/06/25/jpmorgan-chase-co-presidents-lake-exits.html" },
      { title: "American Banker: Teresa Heitsenrether profile", url: "https://www.americanbanker.com/news/2025-the-most-powerful-women-in-banking-no-8-teresa-heitsenrether-jpmorganchase" },
      { title: "Constellation Research: JPMorgan's IT and AI bets", url: "https://www.constellationr.com/insights/news/jpmorgan-chases-it-ai-bets-where-returns-are" },
    ],
  },
  {
    id: "seven-eleven",
    name: "7-Eleven, Inc. (North America)",
    aliases: ["7-eleven", "7-eleven usa", "7 eleven", "7-eleven inc", "7-eleven, inc.", "seven eleven"],
    industry: "Convenience Retail (Consumer)",
    headquarters: "Irving, Texas",
    asOf: "2026",
    overview:
      "The North American convenience store business of Japan's Seven & i Holdings, with roughly 13,000 stores in the U.S. and Canada (projected to fall to about 12,300 after closures). Seven & i plans to take the North American business public while keeping a majority stake, and is refocusing on fresh food and store productivity.",
    financials: [
      "Owned by Seven & i Holdings; the North American IPO originally planned for 2026 has slipped to fiscal 2027 at the earliest.",
      "Store count projected to fall from 13,000+ (2024) to about 12,272 by fiscal year end after about 645 closures.",
    ],
    segments: [
      "Company-operated and franchised convenience stores and fuel (including the Speedway network acquired in 2021).",
      "Fresh and proprietary food, 7NOW delivery, and the 7Rewards loyalty program.",
    ],
    leadership: [
      "Stephen Hayes Dacus – CEO of Seven & i Holdings (the group's first non-Japanese CEO).",
    ],
    priorities: [
      "Prepare the North American business for a standalone listing, which requires strong systems, reporting and controls.",
      "A food-forward strategy with a bigger fresh-food push to lift margins and differentiate.",
      "Rationalize underperforming stores and raise productivity per store.",
      "Modernize core systems (ERP, POS, inventory) and franchise integration.",
    ],
    recentDevelopments: [
      "IPO delayed; layoffs and store closures in 2026 while investing in food.",
      "Seven & i refocusing exclusively on convenience after rejecting a takeover approach from Alimentation Couche-Tard.",
    ],
    competitors: ["Circle K (Couche-Tard)", "Casey's", "Wawa", "Sheetz", "Murphy USA", "QuikTrip"],
    sources: [
      { title: "C-Store Dive: 7-Eleven's turbulent 2026", url: "https://www.cstoredive.com/news/7-elevens-turbulent-2026-ipo-delays-layoffs-and-a-bigger-food-push/820729/" },
      { title: "CSP Daily News: Seven & i delays North American IPO", url: "https://www.cspdailynews.com/company-news/seven-i-holdings-delays-north-american-ipo-fiscal-year-2027" },
      { title: "WFAA: 7-Eleven parent names new CEO, eyes IPO", url: "https://www.wfaa.com/article/news/local/dallas-county/7-eleven-parent-company-new-ceo-planning-us-ipo/287-0ded718c-2cf2-45a8-9424-30da07f947be" },
    ],
  },
];

export function findCompany(clientName: string | undefined): CompanyProfile | undefined {
  if (!clientName) return undefined;
  const n = clientName.trim().toLowerCase();
  // Whole-word match so "Ford" matches "Ford Pro" but not "Stanford".
  const hit = (a: string) => new RegExp(`(^|[^a-z0-9])${a.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}($|[^a-z0-9])`).test(n);
  return COMPANIES.find((c) => c.aliases.some(hit));
}
