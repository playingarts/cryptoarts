import { ComponentStory, ComponentMeta } from "@storybook/react";
import ComposedCardContent from ".";
import { CardsQuery } from "../../../hooks/card";
import { mockDeck } from "../../../mocks/deck";

export default {
  title: "old/Composed/CardContent",
  component: ComposedCardContent,
} as ComponentMeta<typeof ComposedCardContent>;

const Template: ComponentStory<typeof ComposedCardContent> = (args) => (
  <ComposedCardContent {...args} />
);

const artist: GQL.Artist = {
  _id: "artistId",
  slug: "artistSlug",
  name: "Leonardoworx",
  userpic:
    "https://s3.amazonaws.com/img.playingarts.com/crypto/upics/leonardoworx.jpg",
  info: "Leonardo Betti, better known as Leonardoworx, is a…tions in international art galleries and museums.",
  podcast: {
    name: "Jason Naylor",
    podcastName: "Jason Naylor",
    image: "https://s3.amazonaws.com/img.playingarts.com/www/podcast/ep1.jpg",
    youtube:
      "https://www.youtube.com/watch?v=i78vXb2d06w&list=PLhr51fAv2oZrgD0MreHVp8m9fdb7ETF4L",
    spotify:
      "https://open.spotify.com/episode/5gUf4nI9UqEXvlUyzAz1zW?si=788c9cb6870c4ba5",
    apple:
      "https://podcasts.apple.com/es/podcast/playing-arts-podcast-ep01-jason-naylor/id1605752620?i=1000548214960",
    episode: 1,
  },
  website: "website",
  country: "country",
  social: {
    website: "",
    instagram: "https://www.instagram.com/leonardoworx/",
    facebook: "",
    twitter: "https://twitter.com/leonardoworx",
    behance: "https://www.behance.net/leonardoworx",
    dribbble: "",
    foundation: "https://foundation.app/@leonardoworx",
    superrare: "",
    makersplace: "",
    knownorigin: "",
    rarible: "",
    niftygateway: "",
    showtime: "",
  },
};

export const Primary = Template.bind({});
Primary.args = {
  deck: mockDeck,
  artistId: "artistId",
};
Primary.parameters = {
  nextRouter: {
    query: { cardId: "cardId" },
  },
  apolloClient: {
    mocks: [
      {
        delay: 1000,
        request: {
          query: CardsQuery,
          variables: {
            deck: mockDeck._id,
          },
        },
        result: {
          data: {
            cards: [
              {
                deck: mockDeck,
                artist,
                value: "",
                _id: "0",
                img: "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/2-s-7Tw67g2w.jpg",
                info: "“The idea behind this 2 of spades is to contain a hidden (crypto) story in a big structure. This structure (or sculpture) is a oneline Bold typographic TWO. Many things happen inside it. There are strange monocles creatures (2 of them with the head of spades logo), others, like worms that move around the sculpture. And abstract eyes that try to follow all the things are happening around them. The artwork Is colorful and full of harmonious shapes in order to remind that FUN is the key when you play with friends, even with a crypto card and a crypto story like this :)”",
                video:
                  "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/2-s-7Tw67g2w.mp4",
                opensea: "opensea",
                background: "background",
                erc1155: {
                  contractAddress: "1",
                  token_id: "1",
                },
              },
              {
                deck: mockDeck,
                artist: {
                  ...artist,
                  slug: Primary.args.artistId,
                },
                value: "",
                _id: "cardId",
                img: "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/2-s-7Tw67g2w.jpg",
                info: "“The idea behind this 2 of spades is to contain a hidden (crypto) story in a big structure. This structure (or sculpture) is a oneline Bold typographic TWO. Many things happen inside it. There are strange monocles creatures (2 of them with the head of spades logo), others, like worms that move around the sculpture. And abstract eyes that try to follow all the things are happening around them. The artwork Is colorful and full of harmonious shapes in order to remind that FUN is the key when you play with friends, even with a crypto card and a crypto story like this :)”",
                video:
                  "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/2-s-7Tw67g2w.mp4",
                opensea: "opensea",
                background: "background",
                erc1155: {
                  contractAddress: "1",
                  token_id: "1",
                },
              },
              {
                deck: mockDeck,
                artist,
                value: "",
                suit: "",
                _id: "2",
                img: "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/2-s-7Tw67g2w.jpg",
                info: "“The idea behind this 2 of spades is to contain a hidden (crypto) story in a big structure. This structure (or sculpture) is a oneline Bold typographic TWO. Many things happen inside it. There are strange monocles creatures (2 of them with the head of spades logo), others, like worms that move around the sculpture. And abstract eyes that try to follow all the things are happening around them. The artwork Is colorful and full of harmonious shapes in order to remind that FUN is the key when you play with friends, even with a crypto card and a crypto story like this :)”",
                video:
                  "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/2-s-7Tw67g2w.mp4",
                opensea: "opensea",
                background: "background",
                erc1155: {
                  contractAddress: "1",
                  token_id: "1",
                },
              },
            ],
          },
        },
      },
    ],
  },
};

export const First = Template.bind({});
First.args = {
  deck: mockDeck,
  artistId: "artistId",
};
First.parameters = {
  nextRouter: {
    query: { cardId: "cardId" },
  },
  apolloClient: {
    mocks: [
      {
        delay: 1000,
        request: {
          query: CardsQuery,
          variables: {
            deck: mockDeck._id,
          },
        },
        result: {
          data: {
            cards: [
              {
                deck: mockDeck,
                artist: {
                  ...artist,
                  slug: Primary.args.artistId,
                },
                value: "",
                suit: "",
                _id: "cardId",
                img: "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/2-s-7Tw67g2w.jpg",
                info: "“The idea behind this 2 of spades is to contain a hidden (crypto) story in a big structure. This structure (or sculpture) is a oneline Bold typographic TWO. Many things happen inside it. There are strange monocles creatures (2 of them with the head of spades logo), others, like worms that move around the sculpture. And abstract eyes that try to follow all the things are happening around them. The artwork Is colorful and full of harmonious shapes in order to remind that FUN is the key when you play with friends, even with a crypto card and a crypto story like this :)”",
                video:
                  "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/2-s-7Tw67g2w.mp4",
                opensea: "opensea",
                background: "background",
              },
              {
                deck: mockDeck,
                artist,
                value: "",
                suit: "",
                _id: "2",
                img: "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/2-s-7Tw67g2w.jpg",
                info: "“The idea behind this 2 of spades is to contain a hidden (crypto) story in a big structure. This structure (or sculpture) is a oneline Bold typographic TWO. Many things happen inside it. There are strange monocles creatures (2 of them with the head of spades logo), others, like worms that move around the sculpture. And abstract eyes that try to follow all the things are happening around them. The artwork Is colorful and full of harmonious shapes in order to remind that FUN is the key when you play with friends, even with a crypto card and a crypto story like this :)”",
                video:
                  "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/2-s-7Tw67g2w.mp4",
                opensea: "opensea",
                background: "background",
              },
            ],
          },
        },
      },
    ],
  },
};

export const Last = Template.bind({});
Last.args = {
  deck: mockDeck,
  artistId: "artistId",
};
Last.parameters = {
  nextRouter: {
    query: { cardId: "cardId" },
  },
  apolloClient: {
    mocks: [
      {
        delay: 1000,
        request: {
          query: CardsQuery,
          variables: {
            deck: mockDeck._id,
          },
        },
        result: {
          data: {
            cards: [
              {
                deck: mockDeck,
                artist,
                value: "",
                _id: "2",
                img: "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/2-s-7Tw67g2w.jpg",
                info: "“The idea behind this 2 of spades is to contain a hidden (crypto) story in a big structure. This structure (or sculpture) is a oneline Bold typographic TWO. Many things happen inside it. There are strange monocles creatures (2 of them with the head of spades logo), others, like worms that move around the sculpture. And abstract eyes that try to follow all the things are happening around them. The artwork Is colorful and full of harmonious shapes in order to remind that FUN is the key when you play with friends, even with a crypto card and a crypto story like this :)”",
                video:
                  "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/2-s-7Tw67g2w.mp4",
                opensea: "opensea",
                background: "background",
              },
              {
                deck: mockDeck,
                artist: {
                  ...artist,
                  slug: Primary.args.artistId,
                },
                value: "jack",
                _id: "cardId",
                img: "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/2-s-7Tw67g2w.jpg",
                info: "“The idea behind this 2 of spades is to contain a hidden (crypto) story in a big structure. This structure (or sculpture) is a oneline Bold typographic TWO. Many things happen inside it. There are strange monocles creatures (2 of them with the head of spades logo), others, like worms that move around the sculpture. And abstract eyes that try to follow all the things are happening around them. The artwork Is colorful and full of harmonious shapes in order to remind that FUN is the key when you play with friends, even with a crypto card and a crypto story like this :)”",
                video:
                  "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/2-s-7Tw67g2w.mp4",
                opensea: "opensea",
                background: "background",
              },
            ],
          },
        },
      },
    ],
  },
};

export const NoCard = Template.bind({});
NoCard.args = {
  deck: mockDeck,
  artistId: "artistId",
};
NoCard.parameters = {
  nextRouter: {
    query: { cardId: "cardId" },
  },
  apolloClient: {
    mocks: [
      {
        delay: 1000,
        request: {
          query: CardsQuery,
          variables: {
            deck: mockDeck._id,
          },
        },
        result: {
          data: {
            cards: [],
          },
        },
      },
    ],
  },
};
