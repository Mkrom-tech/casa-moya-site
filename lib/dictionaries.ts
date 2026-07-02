import type { Locale } from "./properties";

export const dictionaries = {
  nl: {
    siteName: "Casa Moya",
    nav: { properties: "Onze huizen", contact: "Contact" },
    home: {
      title: "Twee huizen aan de Costa Blanca",
      subtitle:
        "Boek rechtstreeks bij ons — geen commissie voor Airbnb of Booking.com, en altijd het beste directe tarief.",
      cta: "Bekijk beschikbaarheid"
    },
    property: {
      guests: "gasten",
      bedrooms: "slaapkamers",
      bathrooms: "badkamers",
      perNight: "per nacht",
      amenitiesTitle: "Voorzieningen",
      availabilityTitle: "Beschikbaarheid",
      inquiryTitle: "Boekingsaanvraag",
      backToOverview: "Terug naar overzicht"
    },
    form: {
      name: "Naam",
      email: "E-mailadres",
      checkin: "Aankomst",
      checkout: "Vertrek",
      guests: "Aantal gasten",
      message: "Bericht (optioneel)",
      submit: "Verstuur aanvraag",
      success:
        "Bedankt! Je aanvraag is verstuurd. We nemen binnen 24 uur contact met je op.",
      note: "Dit is een aanvraag, geen definitieve boeking. Je ontvangt persoonlijk bevestiging van ons."
    },
    footer: {
      rights: "Alle rechten voorbehouden."
    }
  },
  en: {
    siteName: "Casa Moya",
    nav: { properties: "Our houses", contact: "Contact" },
    home: {
      title: "Two houses on the Costa Blanca",
      subtitle:
        "Book directly with us — no commission for Airbnb or Booking.com, always our best direct rate.",
      cta: "Check availability"
    },
    property: {
      guests: "guests",
      bedrooms: "bedrooms",
      bathrooms: "bathrooms",
      perNight: "per night",
      amenitiesTitle: "Amenities",
      availabilityTitle: "Availability",
      inquiryTitle: "Booking request",
      backToOverview: "Back to overview"
    },
    form: {
      name: "Name",
      email: "Email address",
      checkin: "Check-in",
      checkout: "Check-out",
      guests: "Number of guests",
      message: "Message (optional)",
      submit: "Send request",
      success:
        "Thank you! Your request has been sent. We'll get back to you within 24 hours.",
      note: "This is a request, not a confirmed booking. You'll receive a personal confirmation from us."
    },
    footer: {
      rights: "All rights reserved."
    }
  }
} satisfies Record<Locale, unknown>;

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}
