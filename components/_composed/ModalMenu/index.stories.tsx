import { ComponentMeta, ComponentStory } from "@storybook/react";
import { MetaMaskProvider } from "metamask-react";
import Component from ".";
import { DecksQuery } from "../../../hooks/deck";
import SizeProvider from "../../SizeProvider";

export default {
  title: "old/Modals/ModalMenu",
  component: Component,
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => (
  <SizeProvider>
    <MetaMaskProvider>
      <Component
        {...args}
        css={(theme) => [{ background: theme.colors.page_bg_dark }]}
      />
    </MetaMaskProvider>
  </SizeProvider>
);

export const Primary = Template.bind({});
Primary.parameters = {
  apolloClient: {
    mocks: [
      {
        request: {
          variables: { withProduct: true },
          query: DecksQuery,
        },
        result: {
          data: {
            decks: [
              {
                _id: "62c47dc62f15503d16da50c9",
                info: "Originally called Creative Cards, this deck have been completely sold out for about five years now. We are bringing it back in a new and improved version!",
                title: "Edition Zero",
                slug: "zero",
                openseaCollection: null,
                editions: null,
                short: "Zero",
                image:
                  "https://s3.amazonaws.com/img.playingarts.com/www/decks/deck_zero.jpg",
                properties: {
                  size: "Poker, 88.9 × 63.5mm",
                  inside: "52 Playing cards + 2 Jokers + Info card",
                  material: "Bicycle® paper with Air-cushion finish",
                },
                description:
                  "Enjoy colorful, original artwork from 55 todays leading international illustrators, all in the palm of your hand!",
                backgroundImage:
                  "https://s3.amazonaws.com/img.playingarts.com/www/static/deck_zero_bg.jpg",
                __typename: "Deck",
                product: {
                  image:
                    "https://s3.amazonaws.com/img.playingarts.com/www/products/deck-zero.png",
                  __typename: "Product",
                },
              },
              {
                _id: "62c47dc92f15503d16da513d",
                info: "From the two of clubs to the ace of spades, each card in this deck has been individually designed by one of the 55 selected international artists in their distinct style and technique.",
                title: "Edition One",
                slug: "one",
                openseaCollection: null,
                editions: null,
                short: "One",
                image:
                  "https://s3.amazonaws.com/img.playingarts.com/www/decks/deck_one.jpg",
                properties: {
                  size: "Poker, 88.9 × 63.5mm",
                  inside: "52 Playing cards + 2 Jokers + Info card",
                  material: "Bicycle® paper with Air-cushion finish",
                },
                description:
                  "Enjoy colorful, original artwork from 55 todays leading international illustrators, all in the palm of your hand!",
                backgroundImage:
                  "https://s3.amazonaws.com/img.playingarts.com/www/static/deck_one_bg.jpg",
                __typename: "Deck",
                product: {
                  image:
                    "https://s3.amazonaws.com/img.playingarts.com/www/products/deck-one.png",
                  __typename: "Product",
                },
              },
              {
                _id: "62c47dcb2f15503d16da51b1",
                info: "From the two of clubs to the ace of spades, each card in this deck has been individually designed by one of the 55 selected international artists in their distinct style and technique.",
                title: "Edition Two",
                slug: "two",
                openseaCollection: null,
                editions: null,
                short: "Two",
                image:
                  "https://s3.amazonaws.com/img.playingarts.com/www/decks/deck_two.jpg",
                properties: {
                  size: "Poker, 88.9 × 63.5mm",
                  inside: "52 Playing cards + 2 Jokers + Info card",
                  material: "Bicycle® paper with Air-cushion finish",
                },
                description:
                  "Enjoy colorful, original artwork from 55 todays leading international illustrators, all in the palm of your hand!",
                backgroundImage:
                  "https://s3.amazonaws.com/img.playingarts.com/www/static/deck_two_bg.jpg",
                __typename: "Deck",
                product: {
                  image:
                    "https://s3.amazonaws.com/img.playingarts.com/www/products/deck-two.png",
                  __typename: "Product",
                },
              },
              {
                _id: "62c47dcc2f15503d16da5225",
                info: "From the two of clubs to the ace of spades, each card in this deck has been individually designed by one of the 55 selected international artists in their distinct style and technique.",
                title: "Edition Three",
                slug: "three",
                openseaCollection: null,
                editions: null,
                short: "Three",
                image:
                  "https://s3.amazonaws.com/img.playingarts.com/www/decks/deck_three.jpg",
                properties: {
                  size: "Poker, 88.9 × 63.5mm",
                  inside: "52 Playing cards + 3 Jokers + Info card",
                  material: "Bicycle® paper with Air-cushion finish",
                },
                description:
                  "Enjoy colorful, original artwork from 55 todays leading international illustrators, all in the palm of your hand!",
                backgroundImage:
                  "https://s3.amazonaws.com/img.playingarts.com/www/static/deck_three_bg.jpg",
                __typename: "Deck",
                product: {
                  image:
                    "https://s3.amazonaws.com/img.playingarts.com/www/products/deck-three.png",
                  __typename: "Product",
                },
              },
              {
                _id: "62c47dce2f15503d16da529b",
                info: "537 artists from 67 countries participated in design contest, showing their vision of the custom playing cards. Each contestant was asked to create an artwork for one particular card in their distinct style.",
                title: "Special Edition",
                slug: "special",
                openseaCollection: null,
                editions: null,
                short: "Special",
                image:
                  "https://s3.amazonaws.com/img.playingarts.com/www/decks/deck_special.jpg",
                properties: {
                  size: "Poker, 88.9 × 63.5mm",
                  inside: "52 Playing cards + 2 Jokers + Info card",
                  material: "Bicycle® paper with Air-cushion finish",
                },
                description:
                  "Enjoy colorful, original artwork from 55 todays leading international illustrators, all in the palm of your hand!",
                backgroundImage:
                  "https://s3.amazonaws.com/img.playingarts.com/www/static/deck_special_bg.jpg",
                __typename: "Deck",
                product: {
                  image:
                    "https://s3.amazonaws.com/img.playingarts.com/www/products/deck-special.png",
                  __typename: "Product",
                },
              },
              {
                _id: "62c47dd02f15503d16da530f",
                info: "299 international artists, designers and studios were using playing card as a canvas to illustrate their vision of what the world will look like 100 years from now. Selected artworks formed two Future Edition decks.",
                title: "Future Edition",
                slug: "future",
                openseaCollection: null,
                editions: [
                  {
                    img: null,
                    name: "chapter i",
                    url: "future",
                    __typename: "Edition",
                  },
                  {
                    img: null,
                    name: "chapter ii",
                    url: "future2",
                    __typename: "Edition",
                  },
                ],
                short: "Future",
                image:
                  "https://s3.amazonaws.com/img.playingarts.com/www/products/bundle-02.png",
                properties: {
                  size: "Poker, 88.9 × 63.5mm",
                  inside: "52 Playing cards + 2 Jokers + Info card",
                  material: "Bicycle® paper with Air-cushion finish",
                },
                description:
                  "Enjoy colorful, original artwork from 55 todays leading international illustrators, all in the palm of your hand!",
                backgroundImage:
                  "https://s3.amazonaws.com/img.playingarts.com/www/static/deck_future-i_bg.jpg",
                __typename: "Deck",
                product: {
                  image:
                    "https://s3.amazonaws.com/img.playingarts.com/www/products/deck-future-i.png",
                  __typename: "Product",
                },
              },
              {
                _id: "62c47dd32f15503d16da53f7",
                info: "A deck of playing cards featuring works of 55 leading artists. Unique digital art collectibles living on the Ethereum blockchain.",
                title: "Crypto Edition",
                slug: "crypto",
                openseaCollection: {
                  name: "cryptoedition",
                  address: "0xc22616e971a670e72f35570337e562c3e515fbfe",
                  __typename: "OpenseaCollection",
                },
                editions: null,
                short: "Crypto",
                image:
                  "https://s3.amazonaws.com/img.playingarts.com/www/decks/deck_crypto.jpg",
                properties: {
                  size: "Poker, 88.9 × 63.5mm",
                  inside: "52 Playing cards + 2 Jokers + Info card",
                  material: "Bicycle® paper with Air-cushion finish",
                },
                description:
                  "Enjoy colorful, original artwork from 55 todays leading international illustrators, all in the palm of your hand!",
                backgroundImage:
                  "https://s3.amazonaws.com/img.playingarts.com/www/static/deck_crypto_bg.jpg",
                __typename: "Deck",
                product: {
                  image:
                    "https://s3.amazonaws.com/img.playingarts.com/www/products/deck-crypto.png",
                  __typename: "Product",
                },
              },
            ],
          },
        },
      },
    ],
  },
};
