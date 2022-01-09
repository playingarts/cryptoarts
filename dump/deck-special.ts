import { Card } from "../source/graphql/schemas/card";
import { Deck } from "../source/graphql/schemas/deck";
import { connect } from "../source/mongoose";
import { createDeck } from "./_utils";

const dump = async () => {
  await connect();

  const slug = "special";
  const currentDeck = await Deck.findOne({ slug });

  if (currentDeck) {
    await Deck.deleteMany({ slug });
    await Card.deleteMany({ deck: currentDeck._id });
  }

  const deck = {
    title: "Special Edition",
    slug,
    info:
      "537 artists from 67 countries participated in design contest, showing their vision of the custom playing cards. Each contestant was asked to create an artwork for one particular card in their distinct style.",
  };

  const cards = [
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/contest/retina/433.jpg",
      value: "2",
      suit: "clubs",
      info: "",
      deck: "two",
      artist: "bonnie-pang",
      opensea: "",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/contest/retina/382.jpg",
      value: "2",
      suit: "diamonds",
      info: "",
      deck: "two",
      artist: "giselle-vitali",
      opensea: "",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/contest/retina/164.jpg",
      value: "2",
      suit: "hearts",
      info: "",
      deck: "two",
      artist: "alexander-grahovsky",
      opensea: "",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/contest/retina/651.jpg",
      value: "2",
      suit: "spades",
      info: "",
      deck: "two",
      artist: "elia-s.martín",
      opensea: "",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/contest/retina/113.jpg",
      value: "3",
      suit: "clubs",
      info: "",
      deck: "two",
      artist: "ivan-belikov",
      opensea: "",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/contest/retina/883.jpg",
      value: "3",
      suit: "diamonds",
      info: "",
      deck: "two",
      artist: "đặng-trọng-khanh",
      opensea: "",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/contest/retina/006.jpg",
      value: "3",
      suit: "hearts",
      info: "",
      deck: "two",
      artist: "konstantin-shalev",
      opensea: "",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/contest/retina/601.jpg",
      value: "3",
      suit: "spades",
      info: "",
      deck: "two",
      artist: "ian-trajlov",
      opensea: "",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/contest/retina/225.jpg",
      value: "4",
      suit: "clubs",
      info: "",
      deck: "two",
      artist: "adam-mccausland",
      opensea: "",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/contest/retina/444.jpg",
      value: "4",
      suit: "diamonds",
      info: "",
      deck: "two",
      artist: "beto-garza-'helbetico'",
      opensea: "",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/contest/retina/388.jpg",
      value: "4",
      suit: "hearts",
      info: "",
      deck: "two",
      artist: "chiara-vercesi",
      opensea: "",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/contest/retina/065.jpg",
      value: "4",
      suit: "spades",
      info: "",
      deck: "two",
      artist: "emi-haze",
      opensea: "",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/contest/retina/823.jpg",
      value: "5",
      suit: "clubs",
      info: "",
      deck: "two",
      artist: "polina-fearon",
      opensea: "",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/contest/retina/232.jpg",
      value: "5",
      suit: "diamonds",
      info: "",
      deck: "two",
      artist: "chamo-san",
      opensea: "",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/contest/retina/068.jpg",
      value: "5",
      suit: "hearts",
      info: "",
      deck: "two",
      artist: "six-n.-five",
      opensea: "",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/contest/retina/015.jpg",
      value: "5",
      suit: "spades",
      info: "",
      deck: "two",
      artist: "umberto-daina",
      opensea: "",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/contest/retina/017.jpg",
      value: "6",
      suit: "clubs",
      info: "",
      deck: "two",
      artist: "thibault-daumain",
      opensea: "",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/contest/retina/128.jpg",
      value: "6",
      suit: "diamonds",
      info: "",
      deck: "two",
      artist: "katlego-phatlane",
      opensea: "",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/contest/retina/234.jpg",
      value: "6",
      suit: "hearts",
      info: "",
      deck: "two",
      artist: "tano-bonfanti",
      opensea: "",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/contest/retina/181.jpg",
      value: "6",
      suit: "spades",
      info: "",
      deck: "two",
      artist: "ryogo-toyoda",
      opensea: "",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/contest/retina/075.jpg",
      value: "7",
      suit: "clubs",
      info: "",
      deck: "two",
      artist: "michele-durazzi",
      opensea: "",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/contest/retina/294.jpg",
      value: "7",
      suit: "diamonds",
      info: "",
      deck: "two",
      artist: "peter-gutierrez",
      opensea: "",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/contest/retina/562.jpg",
      value: "7",
      suit: "hearts",
      info: "",
      deck: "two",
      artist: "rob-snow",
      opensea: "",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/contest/retina/239.jpg",
      value: "7",
      suit: "spades",
      info: "",
      deck: "two",
      artist: "elina-v.g.",
      opensea: "",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/contest/retina/403.jpg",
      value: "8",
      suit: "clubs",
      info: "",
      deck: "two",
      artist: "redmer-hoekstra",
      opensea: "",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/contest/retina/298.jpg",
      value: "8",
      suit: "diamonds",
      info: "",
      deck: "two",
      artist: "maría-suarez-inclan",
      opensea: "",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/contest/retina/026.jpg",
      value: "8",
      suit: "hearts",
      info: "",
      deck: "two",
      artist: "david-perez",
      opensea: "",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/contest/retina/405.jpg",
      value: "8",
      suit: "spades",
      info: "",
      deck: "two",
      artist: "nico-castro",
      opensea: "",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/contest/retina/245.jpg",
      value: "9",
      suit: "clubs",
      info: "",
      deck: "two",
      artist: "danya-dolotov",
      opensea: "",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/contest/retina/464.jpg",
      value: "9",
      suit: "diamonds",
      info: "",
      deck: "two",
      artist: "inkration-studio",
      opensea: "",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/contest/retina/678.jpg",
      value: "9",
      suit: "hearts",
      info: "",
      deck: "two",
      artist: "nandita-pal",
      opensea: "",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/contest/retina/463.jpg",
      value: "9",
      suit: "spades",
      info: "",
      deck: "two",
      artist: "uma-brand-studio",
      opensea: "",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/contest/retina/195.jpg",
      value: "10",
      suit: "clubs",
      info: "",
      deck: "two",
      artist: "don-carson",
      opensea: "",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/contest/retina/792.jpg",
      value: "10",
      suit: "diamonds",
      info: "",
      deck: "two",
      artist: "yana-moskaluk",
      opensea: "",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/contest/retina/412.jpg",
      value: "10",
      suit: "hearts",
      info: "",
      deck: "two",
      artist: "roman-novak",
      opensea: "",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/contest/retina/845.jpg",
      value: "10",
      suit: "spades",
      info: "",
      deck: "two",
      artist: "carolyn-duan",
      opensea: "",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/contest/retina/199.jpg",
      value: "j",
      suit: "clubs",
      info: "",
      deck: "two",
      artist: "gemma-gould",
      opensea: "",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/contest/retina/256.jpg",
      value: "j",
      suit: "diamonds",
      info: "",
      deck: "two",
      artist: "olga",
      opensea: "",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/contest/retina/578.jpg",
      value: "j",
      suit: "hearts",
      info: "",
      deck: "two",
      artist: "gladys-creative-studio",
      opensea: "",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/contest/retina/147.jpg",
      value: "j",
      suit: "spades",
      info: "",
      deck: "two",
      artist: "mitt-roshin",
      opensea: "",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/contest/retina/743.jpg",
      value: "q",
      suit: "clubs",
      info: "",
      deck: "two",
      artist: "osvaldo-casanova",
      opensea: "",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/contest/retina/098.jpg",
      value: "q",
      suit: "diamonds",
      info: "",
      deck: "two",
      artist: "davide-magliacano",
      opensea: "",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/contest/retina/852.jpg",
      value: "q",
      suit: "hearts",
      info: "",
      deck: "two",
      artist: "kaloian-toshev",
      opensea: "",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/contest/retina/691.jpg",
      value: "q",
      suit: "spades",
      info: "",
      deck: "two",
      artist: "andré-pires",
      opensea: "",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/contest/retina/747.jpg",
      value: "k",
      suit: "clubs",
      info: "",
      deck: "two",
      artist: "bart-miko",
      opensea: "",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/contest/retina/372.jpg",
      value: "k",
      suit: "diamonds",
      info: "",
      deck: "two",
      artist: "mark-oliver",
      opensea: "",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/contest/retina/208.jpg",
      value: "k",
      suit: "hearts",
      info: "",
      deck: "two",
      artist: "gaby-zermeño",
      opensea: "",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/contest/retina/371.jpg",
      value: "k",
      suit: "spades",
      info: "",
      deck: "two",
      artist: "kevin-davis",
      opensea: "",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/contest/retina/319.jpg",
      value: "a",
      suit: "clubs",
      info: "",
      deck: "two",
      artist: "elen-winata",
      opensea: "",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/contest/retina/430.jpg",
      value: "a",
      suit: "diamonds",
      info: "",
      deck: "two",
      artist: "vincent-rhafael-aseo",
      opensea: "",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/contest/retina/104.jpg",
      value: "a",
      suit: "hearts",
      info: "",
      deck: "two",
      artist: "polina-chemeris",
      opensea: "",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/contest/retina/213.jpg",
      value: "a",
      suit: "spades",
      info: "",
      deck: "two",
      artist: "mr-lemonade",
      opensea: "",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/contest/retina/215.jpg",
      value: "joker",
      suit: "black",
      info: "",
      deck: "two",
      artist: "konstantin-alekyan",
      opensea: "",
      name: "Black Joker",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/contest/retina/000.jpg",
      value: "",
      suit: "",
      info: "",
      deck: "two",
      artist: "sebastian-onufszak",
      opensea: "",
      name: "Backside",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/contest/retina/486.jpg",
      value: "joker",
      suit: "red",
      info: "",
      deck: "two",
      artist: "zack-anderson",
      opensea: "",
      name: "Red Joker",
    },
  ];

  await createDeck(deck, cards);
};

export default dump;
