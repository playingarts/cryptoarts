import { StoryObj } from "@storybook/react/*";
import { HttpResponse, graphql } from "msw";
import { mockDecks } from "../mocks/DecksQuery";

export const Templates: { [x: string]: StoryObj } = {
  zero: {
    parameters: {
      nextjs: {
        router: {
          pathname: "/[deckId]]",
          asPath: "/zero",
          query: {
            deckId: "zero",
          },
        },
      },
      msw: {
        handlers: [
          graphql.query("Deck", () =>
            HttpResponse.json({
              data: {
                deck: { ...mockDecks.find((item) => item.slug === "zero") },
              },
            })
          ),
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
        ],
      },
    },
  },
};
