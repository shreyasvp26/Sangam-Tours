/**
 * Terms & Conditions — sourced from docs/Website requirements.pdf §11 (Legal Pages).
 * Structured for the public Terms page; not CMS-editable at launch.
 */

export type TermsSection = {
  number: number;
  title: string;
  points: readonly string[];
};

export const termsAndConditionsMeta = {
  title: "Terms & Conditions",
  /** Publication date for the supplied requirements text. */
  lastUpdatedDate: "2026-08-01",
  intro:
    "These terms apply when you book or travel on a Sangam Tours group departure. Please read them carefully before confirming your booking.",
} as const;

export const termsAndConditionsSections: readonly TermsSection[] = [
  {
    number: 1,
    title: "Booking Confirmation",
    points: [
      "A booking is confirmed only after receiving the required booking amount.",
      "All bookings are subject to availability.",
      "Sangam Tours reserves the right to accept or reject any booking.",
    ],
  },
  {
    number: 2,
    title: "Tour Prices",
    points: [
      "All prices are quoted in Indian Rupees (INR).",
      "Prices are subject to change due to airfare, hotel tariffs, fuel costs, government taxes, exchange rate fluctuations, or other unforeseen circumstances.",
      "GST, TCS and other applicable charges will be charged as mentioned in the tour package.",
    ],
  },
  {
    number: 3,
    title: "Payments",
    points: [
      "The balance amount must be paid before the due date communicated by Sangam Tours.",
    ],
  },
  {
    number: 4,
    title: "Cancellation & Refund",
    points: [
      "Cancellation charges will apply according to the applicable Cancellation & Refund Policy.",
    ],
  },
  {
    number: 5,
    title: "Passport, Visa & Travel Documents",
    points: [
      "Sangam Tours is not responsible for visa rejection or delays by embassies or government authorities.",
    ],
  },
  {
    number: 6,
    title: "Travel Insurance",
    points: [
      "Travel insurance is strongly recommended for all international tours unless specifically included in the package.",
    ],
  },
  {
    number: 7,
    title: "Itinerary Changes",
    points: [
      "Sangam Tours reserves the right to modify hotels, sightseeing, transport, or itinerary due to weather, road conditions, operational requirements, government restrictions, or circumstances beyond our control.",
    ],
  },
  {
    number: 9,
    title: "Health & Medical Conditions",
    points: [
      "Guests must ensure they are medically fit to travel.",
      "Any existing medical condition should be disclosed before booking.",
    ],
  },
  {
    number: 10,
    title: "Baggage",
    points: [
      "Guests are responsible for their personal luggage and belongings.",
      "Sangam Tours shall not be liable for loss, theft, or damage to baggage.",
    ],
  },
  {
    number: 11,
    title: "Force Majeure",
    points: [
      "Sangam Tours shall not be responsible for cancellations, delays, or changes caused by natural disasters, adverse weather, strikes, political unrest, pandemics, government restrictions, or any other event beyond our reasonable control.",
    ],
  },
  {
    number: 12,
    title: "Limitation of Liability",
    points: [
      "Sangam Tours acts only as an intermediary between travellers and airlines, hotels, transport providers, guides, and other service providers.",
      "We are not responsible for any loss, injury, delay, accident, or damage caused by third-party service providers.",
    ],
  },
  {
    number: 13,
    title: "Photography",
    points: [
      "Photographs and videos taken during tours may be used for promotional and marketing purposes unless the guest informs us otherwise before the tour.",
    ],
  },
  {
    number: 14,
    title: "Website Information",
    points: [
      "While we strive to keep all information accurate and up to date, Sangam Tours does not guarantee that all content, prices, itineraries, or availability displayed on the website will always be current.",
      "We reserve the right to update or modify information without prior notice.",
    ],
  },
  {
    number: 15,
    title: "Privacy",
    points: [
      "Your personal information is collected only for booking, customer support, and communication purposes.",
      "Please refer to our Privacy Policy for more details.",
    ],
  },
  {
    number: 16,
    title: "Governing Law",
    points: [
      "These Terms & Conditions shall be governed by the laws of India.",
      "Any disputes shall be subject to the exclusive jurisdiction of the courts in Nagpur, Maharashtra.",
    ],
  },
] as const;
