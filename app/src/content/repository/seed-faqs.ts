/**
 * General FAQ seeds — grounded in Website requirements.pdf, Terms & Conditions (§11),
 * and documented customer concerns (01-brand-strategy.md §9 / 10-content-and-seo-strategy.md §4.7).
 * General only (no packageId) so Homepage, FAQ page, and package fallbacks share one set.
 */

import type { Faq } from "@/domain";

type FaqSeed = Omit<Faq, "packageId">;

const FAQ_DEFS: FaqSeed[] = [
  {
    id: "faq-how-to-book",
    question: "How do I book a tour with Sangam Tours?",
    answer:
      "You can enquire through the website form, WhatsApp Us, or Call Now. A booking is confirmed only after we receive the required booking amount, and all bookings are subject to availability.",
    faqCategory: "booking",
    displayOrder: 1,
    status: "published",
  },
  {
    id: "faq-price-changes",
    question: "Will the price change after I book?",
    answer:
      "Every package lists what is Included and Not Included before you enquire. Prices are quoted in Indian Rupees and may change due to airfare, hotel tariffs, fuel costs, government taxes, exchange rates, or other unforeseen circumstances. GST, TCS, and other applicable charges are charged as stated on the package.",
    faqCategory: "pricing",
    displayOrder: 2,
    status: "published",
  },
  {
    id: "faq-tour-manager",
    question: "Who will help us if something goes wrong on the trip?",
    answer:
      "A dedicated Tour Manager accompanies every Sangam Tours group departure to handle logistics, coordination, and on-ground support from start to finish.",
    faqCategory: "travel",
    displayOrder: 3,
    status: "published",
  },
  {
    id: "faq-cancel",
    question: "What happens if I need to cancel?",
    answer:
      "Cancellation charges apply according to the applicable Cancellation & Refund Policy. Please review our Terms & Conditions before confirming, and contact us as early as possible if your plans change.",
    faqCategory: "policies",
    displayOrder: 4,
    status: "published",
  },
  {
    id: "faq-how-to-reach",
    question: "How do I reach someone before booking?",
    answer:
      "Call +91 8983365332 or +91 8856998734, WhatsApp Us, or email info@sangamtours.com. You can also send an enquiry from any package page or the Contact page — no account is required.",
    faqCategory: "booking",
    displayOrder: 5,
    status: "published",
  },
  {
    id: "faq-offices",
    question: "Do you have offices I can visit?",
    answer:
      "Yes. Our Nagpur office is at Shop No. 4, Yashodhara Apartment, Chhoti Dhantoli, Opp. Yashwant Stadium, Nagpur – 440012. We also have an Akola office at 169, \"Chintamani\", Opp. T.T.N. Collage, Keshav Nagar, Akola – 444004. Maps are available on the Contact page.",
    faqCategory: "booking",
    displayOrder: 6,
    status: "published",
  },
  {
    id: "faq-what-is-included",
    question: "What is usually included in a package price?",
    answer:
      "Inclusions vary by package and are listed on each package page. Across our departures you will typically see accommodation, meals, transportation, a daily 1L water bottle, and a Tour Manager. Some domestic tours also include a 3AC train ticket; some international tours include air tickets and entry tickets where stated.",
    faqCategory: "pricing",
    displayOrder: 7,
    status: "published",
  },
  {
    id: "faq-gst-airfare",
    question: "Why do some prices show “+ GST” or “+ Airfare”?",
    answer:
      "We show price qualifiers exactly as they apply to each package. “+ GST” means GST is charged in addition to the listed amount. “+ Airfare” means airfare is not bundled into that starting price. Always check the package’s Included and Not Included lists for the full picture.",
    faqCategory: "pricing",
    displayOrder: 8,
    status: "published",
  },
  {
    id: "faq-not-included",
    question: "What is usually not included?",
    answer:
      "Common exclusions include sightseeing or entry tickets (unless listed as included), flight tickets (unless listed as included), personal expenses, travel insurance where applicable, and any service not specifically mentioned under Included. Each package page states its own Not Included list.",
    faqCategory: "pricing",
    displayOrder: 9,
    status: "published",
  },
  {
    id: "faq-family-suitable",
    question: "Is this trip suitable for my parents or children?",
    answer:
      "Sangam Tours designs group holidays for families, senior citizens, couples, corporate groups, and solo travellers across Maharashtra. Suitability depends on the itinerary — check the package overview, destinations, and pacing details, then WhatsApp or call us if you need help choosing a comfortable departure.",
    faqCategory: "travel",
    displayOrder: 10,
    status: "published",
  },
  {
    id: "faq-food-stay",
    question: "Will food and stay be comfortable?",
    answer:
      "Domestic tours include home-style meals along with accommodation and daily essentials such as a 1L water bottle. Every package page lists Included and Not Included so you can see stay and meal arrangements before you enquire.",
    faqCategory: "travel",
    displayOrder: 11,
    status: "published",
  },
  {
    id: "faq-high-altitude",
    question: "Are high-altitude trips like Leh–Ladakh prepared for altitude?",
    answer:
      "Where applicable, high-altitude itineraries such as Leh–Ladakh include required permits and oxygen cylinder support, along with accommodation, meals, transportation, and a Tour Manager. Review that package’s Included list for the exact provisions.",
    faqCategory: "travel",
    displayOrder: 12,
    status: "published",
  },
  {
    id: "faq-travel-insurance",
    question: "Is travel insurance included?",
    answer:
      "Travel insurance is strongly recommended for all international tours unless it is specifically included in the package. Where it is not listed under Included, it remains the traveller’s responsibility.",
    faqCategory: "policies",
    displayOrder: 13,
    status: "published",
  },
  {
    id: "faq-visa",
    question: "Who is responsible for passport, visa, and travel documents?",
    answer:
      "Travellers are responsible for valid passports, visas, and required travel documents. Sangam Tours is not responsible for visa rejection or delays by embassies or government authorities.",
    faqCategory: "policies",
    displayOrder: 14,
    status: "published",
  },
  {
    id: "faq-itinerary-changes",
    question: "Can the itinerary change after booking?",
    answer:
      "Yes. Sangam Tours may modify hotels, sightseeing, transport, or itinerary due to weather, road conditions, operational needs, government restrictions, or circumstances beyond our control. Full details are in our Terms & Conditions.",
    faqCategory: "policies",
    displayOrder: 15,
    status: "published",
  },
  {
    id: "faq-balance-payment",
    question: "When do I pay the balance amount?",
    answer:
      "After the booking amount confirms your seat, the balance must be paid before the due date communicated by Sangam Tours.",
    faqCategory: "booking",
    displayOrder: 16,
    status: "published",
  },
];

export function seedFaqs(): Faq[] {
  return FAQ_DEFS.map((faq) => ({ ...faq }));
}
