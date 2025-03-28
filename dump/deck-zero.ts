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
    cardBackground: "#F3E0E2",
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
    cardBackground: "#E8D6DE",
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
    cardBackground: "#F3D3C2",
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
    cardBackground: "#E4D6C5",
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
    cardBackground: "#EFD7DC",
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
    cardBackground: "#D9DFCB",
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
    cardBackground: "#EFD4C5",
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
    cardBackground: "#EED4C0",
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
    cardBackground: "#E0DCD4",
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
    cardBackground: "#F3DDDE",
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
    cardBackground: "#D8E2D0",
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
    cardBackground: "#F1D2C2",
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
    cardBackground: "#DDDEDC",
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
    cardBackground: "#F2DADC",
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
    cardBackground: "#D2E1D3",
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
    cardBackground: "#EED3BF",
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
    cardBackground: "#DFDBE0",
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
    cardBackground: "#F3DEE0",
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
    cardBackground: "#D2E0D1",
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
    cardBackground: "#F1D6C2",
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
    cardBackground: "#E1E1D9",
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
    cardBackground: "#F2D7DA",
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
    cardBackground: "#D3E3D6",
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
    cardBackground: "#F2D3C2",
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
    cardBackground: "#DADFD9",
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
    cardBackground: "#F3E0E2",
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
    cardBackground: "#D0E0D4",
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
    cardBackground: "#F0D5C1",
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
    cardBackground: "#DEDCD8",
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
    cardBackground: "#F4E0E2",
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
    cardBackground: "#D1E2D4",
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
    cardBackground: "#F2D6C2",
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
    cardBackground: "#DBDCE0",
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
    cardBackground: "#E3C8B7",
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
    cardBackground: "#D2E1D5",
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
    cardBackground: "#F1D4C2",
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
    cardBackground: "#DFE0DA",
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
    cardBackground: "#E5D2C5",
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
    cardBackground: "#D4E3D5",
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
    cardBackground: "#F1D2C3",
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
    cardBackground: "#DBDFDC",
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
    cardBackground: "#D1E1D6",
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
    cardBackground: "#F1D3C1",
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
    cardBackground: "#E0DFDD",
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
    cardBackground: "#F3DFE2",
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
    cardBackground: "#D2E2D4",
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
    cardBackground: "#F2D3C2",
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
    cardBackground: "#E0E0E0",
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
    cardBackground: "#DADADA",
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
    cardBackground: "#F0D2D5",
    video: "",
  },
];

const dump = async () => {
  await connect();
  await createDeck(slug, deck, cards as []);
};

export default dump;
