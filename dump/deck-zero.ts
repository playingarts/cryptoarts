import { connect } from "../source/mongoose";
import { createDeck } from "./_utils";
import { MongoDeck } from "../source/graphql/schemas/deck";

export const slug = "zero";

export const deck: Omit<MongoDeck, "_id"> = {
  title: "Edition Zero",
  short: "Zero",
  slug,
  info: "The deck that started it all. A groundbreaking collection of 55 unique artworks, paving the way for Playing Arts.",
  intro:
    "First launched in 2012, Edition Zero was where Playing Arts began. Featuring 55 stunning artworks from global artists, this deck set the stage for creativity and innovation in card design. Reissued in 2019 with Augmented Reality animations, it continues to inspire and push boundaries.",
  image: "https://s3.amazonaws.com/img.playingarts.com/www/decks/deck_zero.png",
  labels: ["AR-Enchanced", "Limited Edition"],
  backgroundImage:
    "https://s3.amazonaws.com/img.playingarts.com/www/static/deck_zero_bg.jpg",
  previewCards: [
    "https://s3.amazonaws.com/img.playingarts.com/zero-big-hd/2-of-hearts-sara-blake.jpg",
    "https://s3.amazonaws.com/img.playingarts.com/zero-big-hd/6-of-spades-design-is-dead.jpg",
    "https://s3.amazonaws.com/img.playingarts.com/zero-big-hd/10-of-spades-simplevector.jpg",
  ],
  properties: {
    size: "Poker, 88.9 × 63.5mm",
    material: "Bicycle® paper with Air-cushion finish",
    inside: "52 Playing cards + 2 Jokers + Info card",
  },
  description:
    "Enjoy colorful, original artwork from 55 todays leading international illustrators, all in the palm of your hand!",
};

export const cards = [
  {
    artist: "raul-urias",
    info: "",
    suit: "spades",
    value: "2",
    deck: "zero",
    opensea: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/zero-big-hd/2-of-spades-raul-urias.jpg",
    cardBackground: "#F2E5C3",
    video: "",
  },

  {
    artist: "sara-blake",
    info: "",
    suit: "hearts",
    value: "2",
    deck: "zero",
    opensea: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/zero-big-hd/2-of-hearts-sara-blake.jpg",
    cardBackground: "#F4EAE3",
    video: "",
  },

  {
    artist: "timba-smits",
    animator: "katya-khimenets",
    info: "",
    suit: "clubs",
    value: "2",
    deck: "zero",
    opensea: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/zero-big-hd/2-of-clubs-timba-smits.jpg",
    cardBackground: "#DDE3D7",
    video:
      "https://s3.amazonaws.com/img.playingarts.com/zero-video/2-clubs_02.mp4",
  },

  {
    artist: "jonathan-foerster",
    info: "",
    suit: "diamonds",
    value: "2",
    deck: "zero",
    opensea: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/zero-big-hd/2-of-diamonds-jonathan-foerster.jpg",
    cardBackground: "#D9D9D9",
    video: "",
  },

  {
    artist: "raphael-vicenzi",
    info: "",
    suit: "spades",
    value: "3",
    deck: "zero",
    opensea: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/zero-big-hd/3-of-spades-raphael-vicenzi.jpg",
    cardBackground: "#E5DADA",
    video: "",
  },

  {
    artist: "joshua-davis",
    animator: "luca-wist-ferrario",
    info: "",
    suit: "hearts",
    value: "3",
    deck: "zero",
    opensea: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/zero-big-hd/3-of-hearts-joshua-davis.jpg",
    cardBackground: "#DAD8D3",
    video:
      "https://s3.amazonaws.com/img.playingarts.com/zero-video/3-hearts_01.mp4",
  },

  {
    artist: "your-majesty",
    info: "",
    suit: "clubs",
    value: "3",
    deck: "zero",
    opensea: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/zero-big-hd/3-of-clubs-your-majesty.jpg",
    cardBackground: "#E7E2DD",
    video: "",
  },

  {
    artist: "2advanced-studios",
    animator: "ilya-cvetkov",
    info: "",
    suit: "diamonds",
    value: "3",
    deck: "zero",
    opensea: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/zero-big-hd/3-of-diamonds-2advanced-studios.jpg",
    cardBackground: "#E2E6E6",
    video:
      "https://s3.amazonaws.com/img.playingarts.com/zero-video/3-diamonds_01.mp4",
  },

  {
    artist: "anton-repponen",
    animator: "ion-lucin",
    info: "",
    suit: "spades",
    value: "4",
    deck: "zero",
    opensea: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/zero-big-hd/4-of-spades-anton-repponen.jpg",
    cardBackground: "#D9DEE0",
    video:
      "https://s3.amazonaws.com/img.playingarts.com/zero-video/4-spades_02.mp4",
  },

  {
    artist: "loic-sattler",
    info: "",
    suit: "hearts",
    value: "4",
    deck: "zero",
    opensea: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/zero-big-hd/4-of-hearts-loic-sattler.jpg",
    cardBackground: "#E8D2D6",
    video: "",
  },

  {
    artist: "brosmind",
    animator: "amatita-studio",
    info: "",
    suit: "clubs",
    value: "4",
    deck: "zero",
    opensea: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/zero-big-hd/4-of-clubs-brosmind.jpg",
    cardBackground: "#D2E1CC",
    video:
      "https://s3.amazonaws.com/img.playingarts.com/zero-video/4-clubs_01.mp4",
  },

  {
    artist: "kervin-w-brisseaux",
    info: "",
    suit: "diamonds",
    value: "4",
    deck: "zero",
    opensea: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/zero-big-hd/4-of-diamonds-kervin-w-brisseaux.jpg",
    cardBackground: "#E5E6EA",
    video: "",
  },

  {
    artist: "rubens-cantuni",
    info: "",
    suit: "spades",
    value: "5",
    deck: "zero",
    opensea: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/zero-big-hd/5-of-spades-rubens-cantuni.jpg",
    cardBackground: "#E8D7CE",
    video: "",
  },

  {
    artist: "matt-jones-aka-lunartik",
    animator: "illustrescu",
    info: "",
    suit: "hearts",
    value: "5",
    deck: "zero",
    opensea: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/zero-big-hd/5-of-hearts-matt-jones-aka-lunartik.jpg",
    cardBackground: "#DDE7EA",
    video:
      "https://s3.amazonaws.com/img.playingarts.com/zero-video/5-hearts_02.mp4",
  },

  {
    artist: "sorin-bechira",
    info: "",
    suit: "clubs",
    value: "5",
    deck: "zero",
    opensea: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/zero-big-hd/5-of-clubs-sorin-bechira.jpg",
    cardBackground: "#DAD4CD",
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
    cardBackground: "#D8E7DC",
    video:
      "https://s3.amazonaws.com/img.playingarts.com/zero-video/5-diamonds_01.mp4",
  },

  {
    artist: "design-is-dead",
    info: "",
    suit: "spades",
    value: "6",
    deck: "zero",
    opensea: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/zero-big-hd/6-of-spades-design-is-dead.jpg",
    cardBackground: "#E6E8EB",
    video: "",
  },

  {
    artist: "pat-perry",
    info: "",
    suit: "hearts",
    value: "6",
    deck: "zero",
    opensea: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/zero-big-hd/6-of-hearts-pat-perry.jpg",
    cardBackground: "#E8E1D6",
    video: "",
  },

  {
    artist: "vitalik-sheptuhin",
    info: "",
    suit: "clubs",
    value: "6",
    deck: "zero",
    opensea: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/zero-big-hd/6-of-clubs-vitalik-sheptuhin.jpg",
    cardBackground: "#E5E3DE",
    video: "",
  },

  {
    artist: "matei-apostolescu",
    animator: "joana-goncalves",
    info: "",
    suit: "diamonds",
    value: "6",
    deck: "zero",
    opensea: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/zero-big-hd/6-of-diamonds-matei-apostolescu.jpg",
    cardBackground: "#F3ECE2",
    video:
      "https://s3.amazonaws.com/img.playingarts.com/zero-video/6-diamonds_01.mp4",
  },

  {
    artist: "brand-nu",
    info: "",
    suit: "spades",
    value: "7",
    deck: "zero",
    opensea: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/zero-big-hd/7-of-spades-brand-nu.jpg",
    cardBackground: "#F3DADF",
    video: "",
  },

  {
    artist: "saad-moosajee",
    info: "",
    suit: "hearts",
    value: "7",
    deck: "zero",
    opensea: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/zero-big-hd/7-of-hearts-saad-moosajee.jpg",
    cardBackground: "#E4DAF0",
    video: "",
  },

  {
    artist: "sebastian-onufszak",
    animator: "skilz",
    info: "",
    suit: "clubs",
    value: "7",
    deck: "zero",
    opensea: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/zero-big-hd/7-of-clubs-sebastian-onufszak.jpg",
    cardBackground: "#F2EFDE",
    video:
      "https://s3.amazonaws.com/img.playingarts.com/zero-video/7-clubs_02.mp4",
  },

  {
    artist: "iv-orlov",
    animator: "spiro-bunster",
    info: "",
    suit: "diamonds",
    value: "7",
    deck: "zero",
    opensea: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/zero-big-hd/7-of-diamonds-iv-orlov.jpg",
    cardBackground: "#E9F1EC",
    video:
      "https://s3.amazonaws.com/img.playingarts.com/zero-video/7-diamonds_01.mp4",
  },

  {
    artist: "justin-maller",
    info: "",
    suit: "spades",
    value: "8",
    deck: "zero",
    opensea: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/zero-big-hd/8-of-spades-justin-maller.jpg",
    cardBackground: "#E4E4E4",
    video: "",
  },

  {
    artist: "geraldine-georges",
    info: "",
    suit: "hearts",
    value: "8",
    deck: "zero",
    opensea: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/zero-big-hd/8-of-hearts-geraldine-georges.jpg",
    cardBackground: "#EFE9E2",
    video: "",
  },

  {
    artist: "andreas-preis",
    info: "",
    suit: "clubs",
    value: "8",
    deck: "zero",
    opensea: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/zero-big-hd/8-of-clubs-andreas-preis.jpg",
    cardBackground: "#EAD9C2",
    video: "",
  },

  {
    artist: "valp",
    animator: "alex-maltsev",
    info: "",
    suit: "diamonds",
    value: "8",
    deck: "zero",
    opensea: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/zero-big-hd/8-of-diamonds-valp.jpg",
    cardBackground: "#DDE6E0",
    video:
      "https://s3.amazonaws.com/img.playingarts.com/zero-video/8-diamonds_01.mp4",
  },

  {
    artist: "kdlig",
    info: "",
    suit: "spades",
    value: "9",
    deck: "zero",
    opensea: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/zero-big-hd/9-of-spades-kdlig.jpg",
    cardBackground: "#F3E8D7",
    video: "",
  },

  {
    artist: "hello-monday",
    animator: "ignacio-vega",
    info: "",
    suit: "hearts",
    value: "9",
    deck: "zero",
    opensea: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/zero-big-hd/9-of-hearts-hello-monday.jpg",
    cardBackground: "#EADBD6",
    video:
      "https://s3.amazonaws.com/img.playingarts.com/zero-video/9-hearts_01.mp4",
  },

  {
    artist: "lucas-camargo-aka-flash",
    info: "",
    suit: "clubs",
    value: "9",
    deck: "zero",
    opensea: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/zero-big-hd/9-of-clubs-lucas-camargo-aka-flash.jpg",
    cardBackground: "#F6EAD2",
    video: "",
  },

  {
    artist: "ari-weinkle",
    animator: "skilz",
    info: "",
    suit: "diamonds",
    value: "9",
    deck: "zero",
    opensea: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/zero-big-hd/9-of-diamonds-ari-weinkle.jpg",
    cardBackground: "#E1E1E1",
    video:
      "https://s3.amazonaws.com/img.playingarts.com/zero-video/9-diamonds_01.mp4",
  },

  {
    artist: "simplevector",
    info: "",
    suit: "spades",
    value: "10",
    deck: "zero",
    opensea: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/zero-big-hd/10-of-spades-simplevector.jpg",
    cardBackground: "#E5F2EE",
    video: "",
  },

  {
    artist: "adhemas-batista",
    info: "",
    suit: "hearts",
    value: "10",
    deck: "zero",
    opensea: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/zero-big-hd/10-of-hearts-adhemas-batista.jpg",
    cardBackground: "#F2E6E9",
    video: "",
  },

  {
    artist: "magomed-dovjenko",
    info: "",
    suit: "clubs",
    value: "10",
    deck: "zero",
    opensea: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/zero-big-hd/10-of-clubs-magomed-dovjenko.jpg",
    cardBackground: "#ECECEC",
    video: "",
  },

  {
    artist: "fabian-ciraolo",
    info: "",
    suit: "diamonds",
    value: "10",
    deck: "zero",
    opensea: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/zero-big-hd/10-of-diamonds-fabian-ciraolo.jpg",
    cardBackground: "#EFE3D8",
    video: "",
  },

  {
    artist: "si-clark",
    info: "",
    suit: "spades",
    value: "jack",
    deck: "zero",
    opensea: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/zero-big-hd/jack-of-spades-si-clark.jpg",
    cardBackground: "#E7E2DA",
    video: "",
  },

  {
    artist: "jonathan-wong",
    animator: "ian-abraham",
    info: "",
    suit: "hearts",
    value: "jack",
    deck: "zero",
    opensea: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/zero-big-hd/jack-of-hearts-jonathan-wong.jpg",
    cardBackground: "#DCDCDC",
    video:
      "https://s3.amazonaws.com/img.playingarts.com/zero-video/j-hearts_01.mp4",
  },

  {
    artist: "mr-flurry",
    info: "",
    suit: "clubs",
    value: "jack",
    deck: "zero",
    opensea: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/zero-big-hd/jack-of-clubs-mr-flurry.jpg",
    cardBackground: "#F0ECE1",
    video: "",
  },

  {
    artist: "nate-coonrod",
    animator: "yup-nguyen",
    info: "",
    suit: "diamonds",
    value: "jack",
    deck: "zero",
    opensea: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/zero-big-hd/jack-of-diamonds-nate-coonrod.jpg",
    cardBackground: "#EDEDED",
    video:
      "https://s3.amazonaws.com/img.playingarts.com/zero-video/jack-diamonds_01.mp4",
  },

  {
    artist: "michael-molloy",
    info: "",
    suit: "spades",
    value: "queen",
    deck: "zero",
    opensea: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/zero-big-hd/queen-of-spades-michael-molloy.jpg",
    cardBackground: "#EDEDED",
    video: "",
  },

  {
    artist: "jules",
    info: "",
    suit: "hearts",
    value: "queen",
    deck: "zero",
    opensea: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/zero-big-hd/queen-of-hearts-jules.jpg",
    cardBackground: "#DCEEEA",
    video: "",
  },

  {
    artist: "lucas-de-alcantara",
    animator: "illustrescu",
    info: "",
    suit: "clubs",
    value: "queen",
    deck: "zero",
    opensea: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/zero-big-hd/queen-of-clubs-lucas-de-alcantara.jpg",
    cardBackground: "#EDE6E1",
    video:
      "https://s3.amazonaws.com/img.playingarts.com/zero-video/queen-clubs_01.mp4",
  },

  {
    artist: "michael-cina",
    animator: "marilisa-besana",
    info: "",
    suit: "diamonds",
    value: "queen",
    deck: "zero",
    opensea: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/zero-big-hd/queen-of-diamonds-michael-cina.jpg",
    cardBackground: "#F5E4E9",
    video:
      "https://s3.amazonaws.com/img.playingarts.com/zero-video/queen-diamonds_02.mp4",
  },

  {
    artist: "mr-kone",
    info: "",
    suit: "spades",
    value: "king",
    deck: "zero",
    opensea: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/zero-big-hd/king-of-spades-mr-kone.jpg",
    cardBackground: "#F3E8F4",
    video: "",
  },

  {
    artist: "joao-oliveira",
    info: "",
    suit: "hearts",
    value: "king",
    deck: "zero",
    opensea: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/zero-big-hd/king-of-hearts-joao-oliveira.jpg",
    cardBackground: "#E6D4C3",
    video: "",
  },

  {
    artist: "james-white",
    info: "",
    suit: "clubs",
    value: "king",
    deck: "zero",
    opensea: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/zero-big-hd/king-of-clubs-james-white.jpg",
    cardBackground: "#F6EEF8",
    video: "",
  },

  {
    artist: "olly-howe",
    info: "",
    suit: "diamonds",
    value: "king",
    deck: "zero",
    opensea: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/zero-big-hd/king-of-diamonds-olly-howe.jpg",
    cardBackground: "#F8EAFE",
    video: "",
  },

  {
    artist: "fill-ryabchikov",
    info: "",
    suit: "spades",
    value: "ace",
    deck: "zero",
    opensea: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/zero-big-hd/ace-of-spades-fill-ryabchikov.jpg",
    cardBackground: "#F3E6FD",
    video: "",
  },

  {
    artist: "zutto",
    animator: "david-sum",
    info: "",
    suit: "hearts",
    value: "ace",
    deck: "zero",
    opensea: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/zero-big-hd/ace-of-hearts-zutto.jpg",
    cardBackground: "#F3D1E7",
    video:
      "https://s3.amazonaws.com/img.playingarts.com/zero-video/ace-hearts_01.mp4",
  },

  {
    artist: "david-delin",
    info: "",
    suit: "clubs",
    value: "ace",
    deck: "zero",
    opensea: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/zero-big-hd/ace-of-clubs-david-delin.jpg",
    cardBackground: "#F4E1D2",
    video: "",
  },

  {
    artist: "mike-harrison",
    info: "",
    suit: "diamonds",
    value: "ace",
    deck: "zero",
    opensea: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/zero-big-hd/ace-of-diamonds-mike-harrison.jpg",
    cardBackground: "#F2F0F2",
    video: "",
  },

  {
    artist: "shotopop",
    animator: "arm-sattavorn",
    info: "",
    suit: "black",
    value: "joker",
    deck: "zero",
    opensea: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/zero-big-hd/joker-shotopop.jpg",
    cardBackground: "#D6E9E3",
    video:
      "https://s3.amazonaws.com/img.playingarts.com/zero-video/joker-1.mp4",
  },

  {
    artist: "giga-kobidze",
    animator: "igor-garybaldi",
    info: "",
    suit: "",
    value: "backside",
    deck: "zero",
    opensea: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/zero-big-hd/_backside-giga-kobidze.jpg",
    cardBackground: "#D9E1E3",
    video:
      "https://s3.amazonaws.com/img.playingarts.com/zero-video/backside_03.mp4",
  },

  {
    artist: "kenny-lindstrom",
    info: "",
    suit: "red",
    value: "joker",
    deck: "zero",
    opensea: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/zero-big-hd/joker-kenny-lindstrom.jpg",
    cardBackground: "#FDE9B8",
    video: "",
  },
];

const dump = async () => {
  await connect();
  await createDeck(slug, deck, cards as []);
};

export default dump;
