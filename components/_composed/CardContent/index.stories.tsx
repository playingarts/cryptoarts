import { ComponentStory, ComponentMeta } from "@storybook/react";
import ComposedCardContent from ".";

export default {
  title: "Composed/CardContent",
  component: ComposedCardContent,
} as ComponentMeta<typeof ComposedCardContent>;

const Template: ComponentStory<typeof ComposedCardContent> = (args) => (
  <ComposedCardContent {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  deck: {
    _id: "_id",
    title: "title",
    info: "info",
    slug: "slug",
  },
  cardId: "cardId",
  cards: [
    {
      deck: {
        _id: "deckId",
        title: "deckTitle",
        info: "deckInfo",
        slug: "deckSlug",
      },
      _id: "0",
      artist: {
        _id: "artistId",
        slug: "artistSlug",
        name: "Leonardoworx",
        userpic:
          "https://s3.amazonaws.com/img.playingarts.com/crypto/upics/leonardoworx.jpg",
        info:
          "Leonardo Betti, better known as Leonardoworx, is a…tions in international art galleries and museums.",
        social: { facebook: "" },
      },
      img:
        "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/2-s-7Tw67g2w.jpg",
      info:
        "“The idea behind this 2 of spades is to contain a hidden (crypto) story in a big structure. This structure (or sculpture) is a oneline Bold typographic TWO. Many things happen inside it. There are strange monocles creatures (2 of them with the head of spades logo), others, like worms that move around the sculpture. And abstract eyes that try to follow all the things are happening around them. The artwork Is colorful and full of harmonious shapes in order to remind that FUN is the key when you play with friends, even with a crypto card and a crypto story like this :)”",
      video:
        "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/2-s-7Tw67g2w.mp4",
    },
    {
      deck: {
        _id: "deckId",
        title: "deckTitle",
        info: "deckInfo",
        slug: "deckSlug",
      },
      _id: "cardId",
      artist: {
        _id: "artistId",
        slug: "artistSlug",
        name: "Leonardoworx",
        userpic:
          "https://s3.amazonaws.com/img.playingarts.com/crypto/upics/leonardoworx.jpg",
        info:
          "Leonardo Betti, better known as Leonardoworx, is a…tions in international art galleries and museums.",
        social: { facebook: "" },
      },
      img:
        "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/2-s-7Tw67g2w.jpg",
      info:
        "“The idea behind this 2 of spades is to contain a hidden (crypto) story in a big structure. This structure (or sculpture) is a oneline Bold typographic TWO. Many things happen inside it. There are strange monocles creatures (2 of them with the head of spades logo), others, like worms that move around the sculpture. And abstract eyes that try to follow all the things are happening around them. The artwork Is colorful and full of harmonious shapes in order to remind that FUN is the key when you play with friends, even with a crypto card and a crypto story like this :)”",
      video:
        "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/2-s-7Tw67g2w.mp4",
    },
    {
      deck: {
        _id: "deckId",
        title: "deckTitle",
        info: "deckInfo",
        slug: "deckSlug",
      },
      _id: "2",
      artist: {
        _id: "artistId",
        slug: "artistSlug",
        name: "Leonardoworx",
        userpic:
          "https://s3.amazonaws.com/img.playingarts.com/crypto/upics/leonardoworx.jpg",
        info:
          "Leonardo Betti, better known as Leonardoworx, is a…tions in international art galleries and museums.",
        social: { facebook: "" },
      },
      img:
        "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/2-s-7Tw67g2w.jpg",
      info:
        "“The idea behind this 2 of spades is to contain a hidden (crypto) story in a big structure. This structure (or sculpture) is a oneline Bold typographic TWO. Many things happen inside it. There are strange monocles creatures (2 of them with the head of spades logo), others, like worms that move around the sculpture. And abstract eyes that try to follow all the things are happening around them. The artwork Is colorful and full of harmonious shapes in order to remind that FUN is the key when you play with friends, even with a crypto card and a crypto story like this :)”",
      video:
        "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/2-s-7Tw67g2w.mp4",
    },
  ],
};

export const First = Template.bind({});
First.args = {
  deck: {
    _id: "_id",
    title: "title",
    info: "info",
    slug: "slug",
  },
  cardId: "cardId",
  cards: [
    {
      deck: {
        _id: "deckId",
        title: "deckTitle",
        info: "deckInfo",
        slug: "deckSlug",
      },
      _id: "cardId",
      artist: {
        _id: "artistId",
        slug: "artistSlug",
        name: "Leonardoworx",
        userpic:
          "https://s3.amazonaws.com/img.playingarts.com/crypto/upics/leonardoworx.jpg",
        info:
          "Leonardo Betti, better known as Leonardoworx, is a…tions in international art galleries and museums.",
        social: { facebook: "" },
      },
      img:
        "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/2-s-7Tw67g2w.jpg",
      info:
        "“The idea behind this 2 of spades is to contain a hidden (crypto) story in a big structure. This structure (or sculpture) is a oneline Bold typographic TWO. Many things happen inside it. There are strange monocles creatures (2 of them with the head of spades logo), others, like worms that move around the sculpture. And abstract eyes that try to follow all the things are happening around them. The artwork Is colorful and full of harmonious shapes in order to remind that FUN is the key when you play with friends, even with a crypto card and a crypto story like this :)”",
      video:
        "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/2-s-7Tw67g2w.mp4",
    },
    {
      deck: {
        _id: "deckId",
        title: "deckTitle",
        info: "deckInfo",
        slug: "deckSlug",
      },
      _id: "2",
      artist: {
        _id: "artistId",
        slug: "artistSlug",
        name: "Leonardoworx",
        userpic:
          "https://s3.amazonaws.com/img.playingarts.com/crypto/upics/leonardoworx.jpg",
        info:
          "Leonardo Betti, better known as Leonardoworx, is a…tions in international art galleries and museums.",
        social: { facebook: "" },
      },
      img:
        "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/2-s-7Tw67g2w.jpg",
      info:
        "“The idea behind this 2 of spades is to contain a hidden (crypto) story in a big structure. This structure (or sculpture) is a oneline Bold typographic TWO. Many things happen inside it. There are strange monocles creatures (2 of them with the head of spades logo), others, like worms that move around the sculpture. And abstract eyes that try to follow all the things are happening around them. The artwork Is colorful and full of harmonious shapes in order to remind that FUN is the key when you play with friends, even with a crypto card and a crypto story like this :)”",
      video:
        "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/2-s-7Tw67g2w.mp4",
    },
  ],
};

export const Last = Template.bind({});
Last.args = {
  deck: {
    _id: "_id",
    title: "title",
    info: "info",
    slug: "slug",
  },
  cardId: "cardId",
  cards: [
    {
      deck: {
        _id: "deckId",
        title: "deckTitle",
        info: "deckInfo",
        slug: "deckSlug",
      },
      _id: "2",
      artist: {
        _id: "artistId",
        slug: "artistSlug",
        name: "Leonardoworx",
        userpic:
          "https://s3.amazonaws.com/img.playingarts.com/crypto/upics/leonardoworx.jpg",
        info:
          "Leonardo Betti, better known as Leonardoworx, is a…tions in international art galleries and museums.",
        social: { facebook: "" },
      },
      img:
        "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/2-s-7Tw67g2w.jpg",
      info:
        "“The idea behind this 2 of spades is to contain a hidden (crypto) story in a big structure. This structure (or sculpture) is a oneline Bold typographic TWO. Many things happen inside it. There are strange monocles creatures (2 of them with the head of spades logo), others, like worms that move around the sculpture. And abstract eyes that try to follow all the things are happening around them. The artwork Is colorful and full of harmonious shapes in order to remind that FUN is the key when you play with friends, even with a crypto card and a crypto story like this :)”",
      video:
        "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/2-s-7Tw67g2w.mp4",
    },
    {
      deck: {
        _id: "deckId",
        title: "deckTitle",
        info: "deckInfo",
        slug: "deckSlug",
      },
      _id: "cardId",
      artist: {
        _id: "artistId",
        slug: "artistSlug",
        name: "Leonardoworx",
        userpic:
          "https://s3.amazonaws.com/img.playingarts.com/crypto/upics/leonardoworx.jpg",
        info:
          "Leonardo Betti, better known as Leonardoworx, is a…tions in international art galleries and museums.",
        social: { facebook: "" },
      },
      img:
        "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/2-s-7Tw67g2w.jpg",
      info:
        "“The idea behind this 2 of spades is to contain a hidden (crypto) story in a big structure. This structure (or sculpture) is a oneline Bold typographic TWO. Many things happen inside it. There are strange monocles creatures (2 of them with the head of spades logo), others, like worms that move around the sculpture. And abstract eyes that try to follow all the things are happening around them. The artwork Is colorful and full of harmonious shapes in order to remind that FUN is the key when you play with friends, even with a crypto card and a crypto story like this :)”",
      video:
        "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/2-s-7Tw67g2w.mp4",
    },
  ],
};

export const NoCard = Template.bind({});
NoCard.args = {
  deck: {
    _id: "_id",
    title: "title",
    info: "info",
    slug: "slug",
  },
  cardId: "cardId",
  cards: [],
};
