// Real guest reviews, copied from Manon's Booking.com and Airbnb host
// dashboards. Only add entries here that are actual, verifiable reviews —
// the aggregateRating numbers also feed into the site's structured data
// (schema.org), and Google penalizes review/rating markup that doesn't
// match what's genuinely shown to users.

export interface Testimonial {
  author: string;
  source: "Booking.com" | "Airbnb";
  rating: number; // out of `scale`
  scale: number;
  text: string;
}

export interface PropertyReviews {
  propertySlug: string;
  aggregateRating: {
    ratingValue: number;
    bestRating: number;
    reviewCount: number;
    source: "Booking.com";
  };
  testimonials: Testimonial[];
}

export const propertyReviews: PropertyReviews[] = [
  {
    propertySlug: "casa-moya-moraira",
    aggregateRating: {
      ratingValue: 9.6,
      bestRating: 10,
      reviewCount: 23,
      source: "Booking.com"
    },
    testimonials: [
      {
        author: "Jessica",
        source: "Booking.com",
        rating: 10,
        scale: 10,
        text: "The property is well kept and spotlessly clean. The facilities are great and well thought out."
      },
      {
        author: "Laurence",
        source: "Booking.com",
        rating: 10,
        scale: 10,
        text: "The villa is well equipped, with wonderful views and lots of windows. It feels light, airy and bright and at the same time very secluded and private. It's in a peaceful and quiet neighbourhood, great if you want to unwind by the pool."
      },
      {
        author: "Manon",
        source: "Airbnb",
        rating: 5,
        scale: 5,
        text: "By far the most beautiful view you can think of, crystal clear, fast and enthusiastic communication, more than enough stuff in the house and a very good atmosphere. Just a big 10!"
      },
      {
        author: "Marcos",
        source: "Airbnb",
        rating: 5,
        scale: 5,
        text: "The villa is fine, we were very quiet, everything was very clean and with many utensils to cook the best, without a doubt the views."
      },
      {
        author: "Miranda",
        source: "Airbnb",
        rating: 5,
        scale: 5,
        text: "Perfect house. Clean! Swimming pool and a few terraces to stay during the sun hours. Marvelous views. Fine beds and lovely chairs!!"
      },
      {
        author: "Maurice",
        source: "Airbnb",
        rating: 5,
        scale: 5,
        text: "This is truly a wonderful house to spend a vacation or to work for a period of time. The house is in a prime location, quiet yet cozy, with a phenomenal view over Moraira and especially the sea."
      }
    ]
  },
  {
    propertySlug: "moya-apartment-denia",
    aggregateRating: {
      ratingValue: 8.6,
      bestRating: 10,
      reviewCount: 13,
      source: "Booking.com"
    },
    testimonials: [
      {
        author: "Ewelina",
        source: "Booking.com",
        rating: 10,
        scale: 10,
        text: "Nice, clean and well equipped apartment, right on the beach. Private parking on the property. In the neighborhood there are several different types of restaurants as well as windsurf and surf school. Very nice and helpful host."
      },
      {
        author: "Alberto",
        source: "Airbnb",
        rating: 5,
        scale: 5,
        text: "A great, neat place to rest. The terrace is magnificent. No need to go far. We'll be back."
      },
      {
        author: "Diana",
        source: "Airbnb",
        rating: 5,
        scale: 5,
        text: "Spectacular!! It's worth sitting on that terrace and dreaming or clearing your mind for a few moments. Highly recommended."
      },
      {
        author: "Angel",
        source: "Airbnb",
        rating: 5,
        scale: 5,
        text: "The service from Manon was very good. She is a friendly person and was always concerned about our needs. The accommodation is very comfortable."
      },
      {
        author: "Sandra",
        source: "Airbnb",
        rating: 5,
        scale: 5,
        text: "For beach lovers, the apartment is simply a dream! From the huge balcony, you can look directly at the sea and the beautiful mountains in the hinterland."
      },
      {
        author: "Christine",
        source: "Airbnb",
        rating: 5,
        scale: 5,
        text: "This apartment is outstanding!! I felt like a millionaire, standing on the massive, wrap around balcony."
      }
    ]
  }
];

export function getPropertyReviews(propertySlug: string) {
  return propertyReviews.find((r) => r.propertySlug === propertySlug);
}
