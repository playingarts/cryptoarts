import { GraphQLHandler, HttpResponse, graphql } from "msw";
import { productsQuery } from "../../../mocks/productsQuery";
import { mockDecks } from "../../../mocks/DecksQuery";
import backgroundImage from "../../../mocks/images/backgroundImage.png";
import jd from "../../../mocks/images/jordanDebney.png";

export const handlers: GraphQLHandler[] = [
  graphql.query("Products", () =>
    HttpResponse.json({
      data: {
        products: productsQuery.map((product) => ({
          ...product,
          deck: mockDecks.find((deck) => deck.slug === product.deck),
        })),
      },
    })
  ),
  graphql.query("DailyCard", () =>
    HttpResponse.json({
      data: {
        dailyCard: {
          artist: {
            slug: "jordan-debney",
            name: "Jordan Debney",
            country: "New Zealand",
            info: "Artist, muralist, illustrator from Wellington, New Zealand.",
            userpic: jd.src,

            website: "https://linktr.ee/jordandebney",
            shop: "https://shop.jordandebney.com/",
            social: {
              instagram: "https://instagram.com/jordandebney",
              facebook: "",
              twitter: "https://twitter.com/jordandebney",
              behance: "",
              dribbble: "",
              foundation: "",
              superrare: "",
              makersplace: "",
              knownorigin: "",
              rarible: "",
              niftygateway: "",
              showtime: "",
            },
          },
          info: "Psychedelic. In your face. There is nothing more fun than taking a simple concept and ruining it with how it can possibly be manipulated with my imagination.",
          suit: "diamonds",
          value: "ace",
          deck: "one",
          opensea: "",
          img: "https://s3.amazonaws.com/img.playingarts.com/one-big-hd/ace-of-diamonds-jordan-debney.jpg",
          cardBackground: backgroundImage.src,
          video: "",
        },
      },
    })
  ),
  graphql.query("Ratings", () =>
    HttpResponse.json({
      data: {
        ratings: [
          {
            review: "Gorgeous.",
            who: "Matthew V. from Florida, USA",
            title: "Edition One",
          },
          {
            review:
              "Thank you for the smooth handling of getting the playing cards I ordered to me; not only are they little gems by their own right, they are also a perfect way to discover new talented artists, who I may otherwise never come across.",
            who: "Matthew V. from Florida, USA",
            title: "Special Edition",
          },
          {
            review:
              "I’ve never seen anything like this! Its like a gallery in a deck. Just stuning.",
            who: "Matthew V. from Florida, USA",
            title: "Edition Two",
          },
          {
            review: "Amazing concept.”",
            who: "Matthew V. from Florida, USA",
            title: "Edition Two",
          },

          {
            review: "Gorgeous.",
            who: "Matthew V. from Florida, USA",
            title: "Edition One",
          },
          {
            review:
              "Thank you for the smooth handling of getting the playing cards I ordered to me; not only are they little gems by their own right, they are also a perfect way to discover new talented artists, who I may otherwise never come across.",
            who: "Matthew V. from Florida, USA",
            title: "Special Edition",
          },
          {
            review:
              "I’ve never seen anything like this! Its like a gallery in a deck. Just stuning.",
            who: "Matthew V. from Florida, USA",
            title: "Edition Two",
          },
          {
            review: "Amazing concept.”",
            who: "Matthew V. from Florida, USA",
            title: "Edition Two",
          },

          {
            review: "Gorgeous.",
            who: "Matthew V. from Florida, USA",
            title: "Edition One",
          },
          {
            review:
              "Thank you for the smooth handling of getting the playing cards I ordered to me; not only are they little gems by their own right, they are also a perfect way to discover new talented artists, who I may otherwise never come across.",
            who: "Matthew V. from Florida, USA",
            title: "Special Edition",
          },
          {
            review:
              "I’ve never seen anything like this! Its like a gallery in a deck. Just stuning.",
            who: "Matthew V. from Florida, USA",
            title: "Edition Two",
          },
          {
            review: "Amazing concept.”",
            who: "Matthew V. from Florida, USA",
            title: "Edition Two",
          },

          {
            review: "Gorgeous.",
            who: "Matthew V. from Florida, USA",
            title: "Edition One",
          },
          {
            review:
              "Thank you for the smooth handling of getting the playing cards I ordered to me; not only are they little gems by their own right, they are also a perfect way to discover new talented artists, who I may otherwise never come across.",
            who: "Matthew V. from Florida, USA",
            title: "Special Edition",
          },
          {
            review:
              "I’ve never seen anything like this! Its like a gallery in a deck. Just stuning.",
            who: "Matthew V. from Florida, USA",
            title: "Edition Two",
          },
          {
            review: "Amazing concept.”",
            who: "Matthew V. from Florida, USA",
            title: "Edition Two",
          },

          {
            review: "Gorgeous.",
            who: "Matthew V. from Florida, USA",
            title: "Edition One",
          },
          {
            review:
              "Thank you for the smooth handling of getting the playing cards I ordered to me; not only are they little gems by their own right, they are also a perfect way to discover new talented artists, who I may otherwise never come across.",
            who: "Matthew V. from Florida, USA",
            title: "Special Edition",
          },
          {
            review:
              "I’ve never seen anything like this! Its like a gallery in a deck. Just stuning.",
            who: "Matthew V. from Florida, USA",
            title: "Edition Two",
          },
          {
            review: "Amazing concept.”",
            who: "Matthew V. from Florida, USA",
            title: "Edition Two",
          },

          {
            review: "Gorgeous.",
            who: "Matthew V. from Florida, USA",
            title: "Edition One",
          },
          {
            review:
              "Thank you for the smooth handling of getting the playing cards I ordered to me; not only are they little gems by their own right, they are also a perfect way to discover new talented artists, who I may otherwise never come across.",
            who: "Matthew V. from Florida, USA",
            title: "Special Edition",
          },
          {
            review:
              "I’ve never seen anything like this! Its like a gallery in a deck. Just stuning.",
            who: "Matthew V. from Florida, USA",
            title: "Edition Two",
          },
          {
            review: "Amazing concept.”",
            who: "Matthew V. from Florida, USA",
            title: "Edition Two",
          },

          {
            review: "Gorgeous.",
            who: "Matthew V. from Florida, USA",
            title: "Edition One",
          },
          {
            review:
              "Thank you for the smooth handling of getting the playing cards I ordered to me; not only are they little gems by their own right, they are also a perfect way to discover new talented artists, who I may otherwise never come across.",
            who: "Matthew V. from Florida, USA",
            title: "Special Edition",
          },
          {
            review:
              "I’ve never seen anything like this! Its like a gallery in a deck. Just stuning.",
            who: "Matthew V. from Florida, USA",
            title: "Edition Two",
          },
          {
            review: "Amazing concept.”",
            who: "Matthew V. from Florida, USA",
            title: "Edition Two",
          },

          {
            review: "Gorgeous.",
            who: "Matthew V. from Florida, USA",
            title: "Edition One",
          },
          {
            review:
              "Thank you for the smooth handling of getting the playing cards I ordered to me; not only are they little gems by their own right, they are also a perfect way to discover new talented artists, who I may otherwise never come across.",
            who: "Matthew V. from Florida, USA",
            title: "Special Edition",
          },
          {
            review:
              "I’ve never seen anything like this! Its like a gallery in a deck. Just stuning.",
            who: "Matthew V. from Florida, USA",
            title: "Edition Two",
          },
          {
            review: "Amazing concept.”",
            who: "Matthew V. from Florida, USA",
            title: "Edition Two",
          },
        ],
      },
    })
  ),
];
