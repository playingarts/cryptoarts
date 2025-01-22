import { GraphQLHandler, HttpResponse, graphql } from "msw";
import { productsQuery } from "../mocks/productsQuery";
import { mockDecks } from "../mocks/DecksQuery";
import backgroundImage from "../mocks/images/backgroundImage.png";
import jd from "../mocks/images/jordanDebney.png";

export const handlers: GraphQLHandler[] = [
  graphql.query("Decks", () => {
    return HttpResponse.json({
      data: {
        decks: mockDecks,
      },
    });
  }),
  graphql.query("Deck", () => {
    return HttpResponse.json({
      data: {
        deck: { ...mockDecks.find((item) => item.slug === "zero") },
      },
    });
  }),
  graphql.query("HeroCards", () =>
    HttpResponse.json({
      data: {
        heroCards: [
          {
            artist: "michael-molloy",
            info: "",
            suit: "spades",
            value: "queen",
            deck: "zero",
            opensea: "",
            img: "https://s3.amazonaws.com/img.playingarts.com/zero-big-hd/queen-of-spades-michael-molloy.jpg",
            video: "",
          },
          {
            artist: "evgeny-kiselev",
            animator: "buff-motion",
            info: "",
            suit: "diamonds",
            value: "5",
            deck: "zero",
            opensea: "",
            img: "https://s3.amazonaws.com/img.playingarts.com/zero-big-hd/5-of-diamonds-evgeny-kiselev.jpg",
            video:
              "https://s3.amazonaws.com/img.playingarts.com/zero-video/5-diamonds_01.mp4",
          },
        ],
      },
    })
  ),

  graphql.query("Podcasts", () =>
    HttpResponse.json({
      data: {
        podcasts: [
          {
            name: "Jonathan Monaghan",
            podcastName: "Jonathan Monaghan",
            image:
              "https://s3.amazonaws.com/img.playingarts.com/www/podcast/ep18.jpg",
            episode: 18,
            youtube:
              "https://www.youtube.com/watch?v=ZuqptFNmFz0&list=PLhr51fAv2oZrgD0MreHVp8m9fdb7ETF4L",
            desc: "In this episode Jonathan discusses his journey from neuroscience to motion design.",
            time: "1h 35m",
          },
          {
            name: "Prateek Vatash",
            podcastName: "Prateek Vatash",
            image:
              "https://s3.amazonaws.com/img.playingarts.com/www/podcast/ep17.jpg",
            episode: 17,
            youtube:
              "https://www.youtube.com/watch?v=ux60RkIdA08&list=PLhr51fAv2oZrgD0MreHVp8m9fdb7ETF4L",
            desc: "In this episode Jonathan discusses his journey from neuroscience to motion design.",
            time: "1h 35m",
          },
          {
            name: "Vini Naso",
            podcastName: "Vini Naso",
            image:
              "https://s3.amazonaws.com/img.playingarts.com/www/podcast/ep16.jpg",
            episode: 16,
            youtube:
              "https://www.youtube.com/watch?v=PsKAHq-L0zw&list=PLhr51fAv2oZrgD0MreHVp8m9fdb7ETF4L",
            apple:
              "https://podcasts.apple.com/es/podcast/playing-arts-podcast-ep16-vini-naso/id1605752620?i=1000576644956",
            spotify:
              "https://open.spotify.com/episode/2WhPf3dneX7rMkAwKweTsB?si=1e1738f9941f441b",
            desc: "In this episode Jonathan discusses his journey from neuroscience to motion design.",
            time: "1h 35m",
          },
          {
            name: "Josh Pierce",
            podcastName: "Josh Pierce",
            image:
              "https://s3.amazonaws.com/img.playingarts.com/www/podcast/ep15.jpg",
            episode: 15,
            youtube:
              "https://www.youtube.com/watch?v=P0J1zVFA-d4&list=PLhr51fAv2oZrgD0MreHVp8m9fdb7ETF4L",
            spotify:
              "https://open.spotify.com/episode/545habL2Q9sL6kDZUnmHPt?si=da9a0aeb102a4830",
            apple:
              "https://podcasts.apple.com/es/podcast/playing-arts-podcast-ep15-josh-pierce/id1605752620?i=1000571569683",
            desc: "In this episode Jonathan discusses his journey from neuroscience to motion design.",
            time: "1h 35m",
          },
          {
            name: "RWR2",
            podcastName: "Rodrigo Rezende",
            image:
              "https://s3.amazonaws.com/img.playingarts.com/www/podcast/ep14.jpg",
            episode: 14,
            youtube:
              "https://www.youtube.com/watch?v=BBtabPQJu_o&list=PLhr51fAv2oZrgD0MreHVp8m9fdb7ETF4L",
            spotify:
              "https://open.spotify.com/episode/7i1sv8HX2Ij02nRXkeQXvO?si=d022fd2eb2fe41e9",
            apple:
              "https://podcasts.apple.com/es/podcast/playing-arts-podcast-ep14-rodrigo-rezende/id1605752620?i=1000570806968",
            desc: "In this episode Jonathan discusses his journey from neuroscience to motion design.",
            time: "1h 35m",
          },
          {
            name: "Nicole Ruggiero",
            podcastName: "Nicole Ruggiero",
            image:
              "https://s3.amazonaws.com/img.playingarts.com/www/podcast/ep12.jpg",
            episode: 12,
            youtube:
              "https://www.youtube.com/watch?v=oS0gxCI-OVo&list=PLhr51fAv2oZrgD0MreHVp8m9fdb7ETF4L",
            spotify:
              "https://open.spotify.com/episode/54T7C8Grzr8jPLcHHxVRZY?si=1a7e8d8af36b47f1",
            apple:
              "https://podcasts.apple.com/es/podcast/playing-arts-podcast-ep12-nicole-ruggiero/id1605752620?i=1000570019324",
            desc: "In this episode Jonathan discusses his journey from neuroscience to motion design.",
            time: "1h 35m",
          },
          {
            name: "Velvet Spectrum",
            podcastName: "Luke Choice",
            image:
              "https://s3.amazonaws.com/img.playingarts.com/www/podcast/ep11.jpg",
            episode: 11,
            youtube:
              "https://www.youtube.com/watch?v=zOcsX3rWsEk&list=PLhr51fAv2oZrgD0MreHVp8m9fdb7ETF4L",
            spotify:
              "https://open.spotify.com/episode/2Mx5U0BQktSmV9gexSTB9p?si=7e3aa150a73a4942",
            apple:
              "https://podcasts.apple.com/es/podcast/playing-arts-podcast-ep11-velvet-spectrum/id1605752620?i=1000569260593",
            desc: "In this episode Jonathan discusses his journey from neuroscience to motion design.",
            time: "1h 35m",
          },
        ],
      },
    })
  ),

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
