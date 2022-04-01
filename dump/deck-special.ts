import { connect } from "../source/mongoose";
import { createDeck } from "./_utils";

export const slug = "special";

export const deck: Omit<GQL.Deck, "_id"> = {
  title: "Special Edition",
  short: "Special",
  slug,
  info:
    "537 artists from 67 countries participated in design contest, showing their vision of the custom playing cards. Each contestant was asked to create an artwork for one particular card in their distinct style.",
  image:
    "https://s3.amazonaws.com/img.playingarts.com/www/decks/deck_special.jpg",
  backgroundImage:
    "https://s3.amazonaws.com/img.playingarts.com/www/static/deck_special_bg.jpg",
  properties: {
    size: "Poker, 88.9 × 63.5mm",
    inside: "52 Playing cards + 2 Jokers + Info card",
    material: "Bicycle® paper with Air-cushion finish",
  },
  description:
    "Enjoy colorful, original artwork from 55 todays leading international illustrators, all in the palm of your hand!",
};

export const cards = [
  {
    video: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/contest/retina/433.jpg",
    value: "2",
    suit: "clubs",
    info: "",
    deck: "special",
    artist: "bonnie-pang",
    opensea: "",
    winner: true,
  },
  {
    video: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/contest/retina/382.jpg",
    value: "2",
    suit: "diamonds",
    info: "",
    deck: "special",
    artist: "giselle-vitali",
    opensea: "",
    winner: true,
  },
  {
    video: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/contest/retina/164.jpg",
    value: "2",
    suit: "hearts",
    info: "",
    deck: "special",
    artist: "alexander-grahovsky",
    opensea: "",
    winner: true,
  },
  {
    video: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/contest/retina/651.jpg",
    value: "2",
    suit: "spades",
    info: "",
    deck: "special",
    artist: "elia-s.martín",
    opensea: "",
    winner: true,
  },
  {
    video: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/contest/retina/113.jpg",
    value: "3",
    suit: "clubs",
    info: "",
    deck: "special",
    artist: "ivan-belikov",
    opensea: "",
    winner: true,
  },
  {
    video: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/contest/retina/883.jpg",
    value: "3",
    suit: "diamonds",
    info: "",
    deck: "special",
    artist: "dang-trong-khanh",
    opensea: "",
    winner: true,
  },
  {
    video: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/contest/retina/006.jpg",
    value: "3",
    suit: "hearts",
    info: "",
    deck: "special",
    artist: "konstantin-shalev",
    opensea: "",
    winner: true,
  },
  {
    video: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/contest/retina/601.jpg",
    value: "3",
    suit: "spades",
    info: "",
    deck: "special",
    artist: "ian-trajlov",
    opensea: "",
    winner: true,
  },
  {
    video: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/contest/retina/225.jpg",
    value: "4",
    suit: "clubs",
    info: "",
    deck: "special",
    artist: "adam-mccausland",
    opensea: "",
    winner: true,
  },
  {
    video: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/contest/retina/444.jpg",
    value: "4",
    suit: "diamonds",
    info: "",
    deck: "special",
    artist: "beto-garza-helbetico",
    opensea: "",
    winner: true,
  },
  {
    video: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/contest/retina/388.jpg",
    value: "4",
    suit: "hearts",
    info: "",
    deck: "special",
    artist: "chiara-vercesi",
    opensea: "",
    winner: true,
  },
  {
    video: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/contest/retina/065.jpg",
    value: "4",
    suit: "spades",
    info: "",
    deck: "special",
    artist: "emi-haze",
    opensea: "",
    winner: true,
  },
  {
    video: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/contest/retina/823.jpg",
    value: "5",
    suit: "clubs",
    info: "",
    deck: "special",
    artist: "polina-fearon",
    opensea: "",
    winner: true,
  },
  {
    video: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/contest/retina/232.jpg",
    value: "5",
    suit: "diamonds",
    info: "",
    deck: "special",
    artist: "chamo-san",
    opensea: "",
    winner: true,
  },
  {
    video: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/contest/retina/068.jpg",
    value: "5",
    suit: "hearts",
    info: "",
    deck: "special",
    artist: "six-n-five",
    opensea: "",
    winner: true,
  },
  {
    video: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/contest/retina/015.jpg",
    value: "5",
    suit: "spades",
    info: "",
    deck: "special",
    artist: "umberto-daina",
    opensea: "",
    winner: true,
  },
  {
    video: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/contest/retina/017.jpg",
    value: "6",
    suit: "clubs",
    info: "",
    deck: "special",
    artist: "thibault-daumain",
    opensea: "",
    winner: true,
  },
  {
    video: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/contest/retina/128.jpg",
    value: "6",
    suit: "diamonds",
    info: "",
    deck: "special",
    artist: "katlego-phatlane",
    opensea: "",
    winner: true,
  },
  {
    video: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/contest/retina/234.jpg",
    value: "6",
    suit: "hearts",
    info: "",
    deck: "special",
    artist: "tano-bonfanti",
    opensea: "",
    winner: true,
  },
  {
    video: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/contest/retina/181.jpg",
    value: "6",
    suit: "spades",
    info: "",
    deck: "special",
    artist: "ryogo-toyoda",
    opensea: "",
    winner: true,
  },
  {
    video: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/contest/retina/075.jpg",
    value: "7",
    suit: "clubs",
    info: "",
    deck: "special",
    artist: "michele-durazzi",
    opensea: "",
    winner: true,
  },
  {
    video: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/contest/retina/294.jpg",
    value: "7",
    suit: "diamonds",
    info: "",
    deck: "special",
    artist: "peter-gutierrez",
    opensea: "",
    winner: true,
  },
  {
    video: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/contest/retina/562.jpg",
    value: "7",
    suit: "hearts",
    info: "",
    deck: "special",
    artist: "rob-snow",
    opensea: "",
    winner: true,
  },
  {
    video: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/contest/retina/239.jpg",
    value: "7",
    suit: "spades",
    info: "",
    deck: "special",
    artist: "elina-vg",
    opensea: "",
    winner: true,
  },
  {
    video: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/contest/retina/403.jpg",
    value: "8",
    suit: "clubs",
    info: "",
    deck: "special",
    artist: "redmer-hoekstra",
    opensea: "",
    winner: true,
  },
  {
    video: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/contest/retina/298.jpg",
    value: "8",
    suit: "diamonds",
    info: "",
    deck: "special",
    artist: "maria-suarez-inclan",
    opensea: "",
    winner: true,
  },
  {
    video: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/contest/retina/026.jpg",
    value: "8",
    suit: "hearts",
    info: "",
    deck: "special",
    artist: "david-perez",
    opensea: "",
    winner: true,
  },
  {
    video: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/contest/retina/405.jpg",
    value: "8",
    suit: "spades",
    info: "",
    deck: "special",
    artist: "nico-castro",
    opensea: "",
    winner: true,
  },
  {
    video: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/contest/retina/245.jpg",
    value: "9",
    suit: "clubs",
    info: "",
    deck: "special",
    artist: "danya-dolotov",
    opensea: "",
    winner: true,
  },
  {
    video: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/contest/retina/464.jpg",
    value: "9",
    suit: "diamonds",
    info: "",
    deck: "special",
    artist: "inkration-studio",
    opensea: "",
    winner: true,
  },
  {
    video: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/contest/retina/678.jpg",
    value: "9",
    suit: "hearts",
    info: "",
    deck: "special",
    artist: "nandita-pal",
    opensea: "",
    winner: true,
  },
  {
    video: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/contest/retina/463.jpg",
    value: "9",
    suit: "spades",
    info: "",
    deck: "special",
    artist: "uma-brand-studio",
    opensea: "",
    winner: true,
  },
  {
    video: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/contest/retina/195.jpg",
    value: "10",
    suit: "clubs",
    info: "",
    deck: "special",
    artist: "don-carson",
    opensea: "",
    winner: true,
  },
  {
    video: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/contest/retina/792.jpg",
    value: "10",
    suit: "diamonds",
    info: "",
    deck: "special",
    artist: "yana-moskaluk",
    opensea: "",
    winner: true,
  },
  {
    video: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/contest/retina/412.jpg",
    value: "10",
    suit: "hearts",
    info: "",
    deck: "special",
    artist: "roman-novak",
    opensea: "",
    winner: true,
  },
  {
    video: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/contest/retina/845.jpg",
    value: "10",
    suit: "spades",
    info: "",
    deck: "special",
    artist: "carolyn-duan",
    opensea: "",
    winner: true,
  },
  {
    video: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/contest/retina/199.jpg",
    value: "jack",
    suit: "clubs",
    info: "",
    deck: "special",
    artist: "gemma-gould",
    opensea: "",
    winner: true,
  },
  {
    video: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/contest/retina/256.jpg",
    value: "jack",
    suit: "diamonds",
    info: "",
    deck: "special",
    artist: "olga",
    opensea: "",
    winner: true,
  },
  {
    video: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/contest/retina/578.jpg",
    value: "jack",
    suit: "hearts",
    info: "",
    deck: "special",
    artist: "gladys-creative-studio",
    opensea: "",
    winner: true,
  },
  {
    video: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/contest/retina/147.jpg",
    value: "jack",
    suit: "spades",
    info: "",
    deck: "special",
    artist: "mitt-roshin",
    opensea: "",
    winner: true,
  },
  {
    video: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/contest/retina/743.jpg",
    value: "queen",
    suit: "clubs",
    info: "",
    deck: "special",
    artist: "osvaldo-casanova",
    opensea: "",
    winner: true,
  },
  {
    video: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/contest/retina/098.jpg",
    value: "queen",
    suit: "diamonds",
    info: "",
    deck: "special",
    artist: "davide-magliacano",
    opensea: "",
    winner: true,
  },
  {
    video: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/contest/retina/852.jpg",
    value: "queen",
    suit: "hearts",
    info: "",
    deck: "special",
    artist: "kaloian-toshev",
    opensea: "",
    winner: true,
  },
  {
    video: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/contest/retina/691.jpg",
    value: "queen",
    suit: "spades",
    info: "",
    deck: "special",
    artist: "andre-pires",
    opensea: "",
    winner: true,
  },
  {
    video: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/contest/retina/747.jpg",
    value: "king",
    suit: "clubs",
    info: "",
    deck: "special",
    artist: "bart-miko",
    opensea: "",
    winner: true,
  },
  {
    video: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/contest/retina/372.jpg",
    value: "king",
    suit: "diamonds",
    info: "",
    deck: "special",
    artist: "mark-oliver",
    opensea: "",
    winner: true,
  },
  {
    video: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/contest/retina/208.jpg",
    value: "king",
    suit: "hearts",
    info: "",
    deck: "special",
    artist: "gaby-zermeno",
    opensea: "",
    winner: true,
  },
  {
    video: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/contest/retina/371.jpg",
    value: "king",
    suit: "spades",
    info: "",
    deck: "special",
    artist: "kevin-davis",
    opensea: "",
    winner: true,
  },
  {
    video: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/contest/retina/319.jpg",
    value: "ace",
    suit: "clubs",
    info: "",
    deck: "special",
    artist: "elen-winata",
    opensea: "",
    winner: true,
  },
  {
    video: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/contest/retina/430.jpg",
    value: "ace",
    suit: "diamonds",
    info: "",
    deck: "special",
    artist: "vincent-rhafael-aseo",
    opensea: "",
    winner: true,
  },
  {
    video: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/contest/retina/104.jpg",
    value: "ace",
    suit: "hearts",
    info: "",
    deck: "special",
    artist: "polina-chemeris",
    opensea: "",
    winner: true,
  },
  {
    video: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/contest/retina/213.jpg",
    value: "ace",
    suit: "spades",
    info: "",
    deck: "special",
    artist: "mr-lemonade",
    opensea: "",
    winner: true,
  },
  {
    video: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/contest/retina/215.jpg",
    value: "joker",
    suit: "black",
    info: "",
    deck: "special",
    artist: "konstantin-alekyan",
    opensea: "",
    winner: true,
  },
  {
    video: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/contest/retina/000.jpg",
    value: "backside",
    suit: "",
    info: "",
    deck: "special",
    artist: "sebastian-onufszak",
    opensea: "",
    winner: true,
  },
  {
    video: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/contest/retina/486.jpg",
    value: "joker",
    suit: "red",
    info: "",
    deck: "special",
    artist: "zack-anderson",
    opensea: "",
    winner: true,
  },
  {
    value: "2",
    suit: "clubs",
    artist: "naniii",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/001.jpg?2",
    winner: false,
  },
  {
    value: "2",
    suit: "hearts",
    artist: "yasir-b.-eryilmaz",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/002.jpg?2",
    winner: false,
  },
  {
    value: "jack",
    suit: "diamonds",
    artist: "christian-jade-sabado",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/742.jpg?2",
    winner: false,
  },
  {
    value: "2",
    suit: "diamonds",
    artist: "wes-l-cockx",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/004.jpg?2",
    winner: false,
  },
  {
    value: "3",
    suit: "clubs",
    artist: "juan-molinet",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/005.jpg?2",
    winner: false,
  },
  {
    value: "3",
    suit: "spades",
    artist: "nicolas-gazut",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/007.jpg?2",
    winner: false,
  },
  {
    value: "3",
    suit: "diamonds",
    artist: "nacho-rojo",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/008.jpg?2",
    winner: false,
  },
  {
    value: "4",
    suit: "hearts",
    artist: "john-karlsson",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/010.jpg?2",
    winner: false,
  },
  {
    value: "4",
    suit: "spades",
    artist: "julian-mayerhofer",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/011.jpg?2",
    winner: false,
  },
  {
    value: "4",
    suit: "diamonds",
    artist: "essi-kimpimaki",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/012.jpg?2",
    winner: false,
  },
  {
    value: "5",
    suit: "clubs",
    artist: "douard-paul",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/013.jpg?2",
    winner: false,
  },
  {
    value: "6",
    suit: "hearts",
    artist: "mark-gmehling",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/018.jpg?2",
    winner: false,
  },
  {
    value: "7",
    suit: "clubs",
    artist: "marta-rojas",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/021.jpg?2",
    winner: false,
  },
  {
    value: "7",
    suit: "hearts",
    artist: "elvis-benicio",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/022.jpg?2",
    winner: false,
  },
  {
    value: "10",
    suit: "clubs",
    artist: "frederico-birchal",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/789.jpg?2",
    winner: false,
  },
  {
    value: "7",
    suit: "diamonds",
    artist: "yuriy-skorohod",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/024.jpg?2",
    winner: false,
  },
  {
    value: "8",
    suit: "clubs",
    artist: "hugo-santos",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/025.jpg?2",
    winner: false,
  },
  {
    value: "8",
    suit: "spades",
    artist: "antigoon",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/027.jpg?2",
    winner: false,
  },
  {
    value: "6",
    suit: "hearts",
    artist: "chow-hon-lam",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/180.jpg?2",
    winner: false,
  },
  {
    value: "9",
    suit: "clubs",
    artist: "antónio-segurado",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/029.jpg?2",
    winner: false,
  },
  {
    value: "9",
    suit: "spades",
    artist: "sasha-prood",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/031.jpg?2",
    winner: false,
  },
  {
    value: "9",
    suit: "diamonds",
    artist: "phil.-m",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/032.jpg?2",
    winner: false,
  },
  {
    value: "10",
    suit: "clubs",
    artist: "dmitriy",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/033.jpg?2",
    winner: false,
  },
  {
    value: "10",
    suit: "spades",
    artist: "luis-nessi",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/035.jpg?2",
    winner: false,
  },
  {
    value: "10",
    suit: "diamonds",
    artist: "marie-bergeron",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/036.jpg?2",
    winner: false,
  },
  {
    value: "jack",
    suit: "hearts",
    artist: "flüke",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/038.jpg?2",
    winner: false,
  },
  {
    value: "jack",
    suit: "diamonds",
    artist: "daniel-osses",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/040.jpg?2",
    winner: false,
  },
  {
    value: "queen",
    suit: "hearts",
    artist: "domenico-sellaro",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/042.jpg?2",
    winner: false,
  },
  {
    value: "queen",
    suit: "spades",
    artist: "marco-pichardo",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/043.jpg?2",
    winner: false,
  },
  {
    value: "king",
    suit: "clubs",
    artist: "nicolas-monin-baroille",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/045.jpg?2",
    winner: false,
  },
  {
    value: "9",
    suit: "spades",
    artist: "dimitrios-sakkas",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/787.jpg?2",
    winner: false,
  },
  {
    value: "king",
    suit: "spades",
    artist: "roman-dementev",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/047.jpg?2",
    winner: false,
  },
  {
    value: "king",
    suit: "diamonds",
    artist: "toni-lópez",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/048.jpg?2",
    winner: false,
  },
  {
    value: "ace",
    suit: "hearts",
    artist: "helen-kaur",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/050.jpg?2",
    winner: false,
  },
  {
    value: "ace",
    suit: "spades",
    artist: "angel-alejandro",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/051.jpg?2",
    winner: false,
  },
  {
    value: "ace",
    suit: "diamonds",
    artist: "monika-mitkute",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/052.jpg?2",
    winner: false,
  },
  {
    value: "joker",
    suit: "black",
    artist: "hardi-lim",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/053.jpg?2",
    winner: false,
  },
  {
    value: "joker",
    suit: "red",
    artist: "oscar-moctezuma",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/054.jpg?2",
    winner: false,
  },
  {
    value: "2",
    suit: "clubs",
    artist: "nikita-abakumov",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/055.jpg?2",
    winner: false,
  },
  {
    value: "2",
    suit: "diamonds",
    artist: "eakkarlak's",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/058.jpg?2",
    winner: false,
  },
  {
    value: "3",
    suit: "clubs",
    artist: "lucas-suancha",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/059.jpg?2",
    winner: false,
  },
  {
    value: "3",
    suit: "hearts",
    artist: "anastasia-kochetkova",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/060.jpg?2",
    winner: false,
  },
  {
    value: "3",
    suit: "spades",
    artist: "mgng",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/061.jpg?2",
    winner: false,
  },
  {
    value: "4",
    suit: "clubs",
    artist: "penko-gelev",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/063.jpg?2",
    winner: false,
  },
  {
    value: "4",
    suit: "hearts",
    artist: "ángel-daniel-puente-ramirez",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/064.jpg?2",
    winner: false,
  },
  {
    value: "6",
    suit: "spades",
    artist: "wayne-danting-langdale",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/073.jpg?2",
    winner: false,
  },
  {
    value: "6",
    suit: "diamonds",
    artist: "mete-kaplan-eker",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/074.jpg?2",
    winner: false,
  },
  {
    value: "7",
    suit: "hearts",
    artist: "furkan-şener",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/076.jpg?2",
    winner: false,
  },
  {
    value: "7",
    suit: "spades",
    artist: "kayankwok",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/077.jpg?2",
    winner: false,
  },
  {
    value: "8",
    suit: "spades",
    artist: "cristian-boian",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/081.jpg?2",
    winner: false,
  },
  {
    value: "9",
    suit: "clubs",
    artist: "joanna-forrester",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/083.jpg?2",
    winner: false,
  },
  {
    value: "9",
    suit: "hearts",
    artist: "esmeraldii",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/624.jpg?2",
    winner: false,
  },
  {
    value: "9",
    suit: "hearts",
    artist: "lett-yice",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/084.jpg?2",
    winner: false,
  },
  {
    value: "9",
    suit: "spades",
    artist: "tianhua-mao",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/085.jpg?2",
    winner: false,
  },
  {
    value: "10",
    suit: "clubs",
    artist: "g.-haller",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/087.jpg?2",
    winner: false,
  },
  {
    value: "10",
    suit: "hearts",
    artist: "tita-wong-argenzio",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/088.jpg?2",
    winner: false,
  },
  {
    value: "jack",
    suit: "spades",
    artist: "chan-yee-von",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/093.jpg?2",
    winner: false,
  },
  {
    value: "queen",
    suit: "clubs",
    artist: "knysh-ksenya",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/095.jpg?2",
    winner: false,
  },
  {
    value: "queen",
    suit: "hearts",
    artist: "bnomio",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/096.jpg?2",
    winner: false,
  },
  {
    value: "queen",
    suit: "spades",
    artist: "victor-bregante",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/097.jpg?2",
    winner: false,
  },
  {
    value: "king",
    suit: "spades",
    artist: "mart-biemans",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/101.jpg?2",
    winner: false,
  },
  {
    value: "ace",
    suit: "clubs",
    artist: "teis-albers",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/103.jpg?2",
    winner: false,
  },
  {
    value: "ace",
    suit: "diamonds",
    artist: "murat-kalkavan",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/106.jpg?2",
    winner: false,
  },
  {
    value: "2",
    suit: "spades",
    artist: "sebastien-morales",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/111.jpg?2",
    winner: false,
  },
  {
    value: "3",
    suit: "hearts",
    artist: "tom-kitchen",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/114.jpg?2",
    winner: false,
  },
  {
    value: "3",
    suit: "diamonds",
    artist: "flavio-morais",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/116.jpg?2",
    winner: false,
  },
  {
    value: "4",
    suit: "clubs",
    artist: "nuria-madrid",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/117.jpg?2",
    winner: false,
  },
  {
    value: "4",
    suit: "hearts",
    artist: "jæn",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/118.jpg?2",
    winner: false,
  },
  {
    value: "4",
    suit: "diamonds",
    artist: "donough-o'malley",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/120.jpg?2",
    winner: false,
  },
  {
    value: "5",
    suit: "hearts",
    artist: "slava-levanovich",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/122.jpg?2",
    winner: false,
  },
  {
    value: "5",
    suit: "spades",
    artist: "yukai-du",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/123.jpg?2",
    winner: false,
  },
  {
    value: "6",
    suit: "clubs",
    artist: "josé-bernabé",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/125.jpg?2",
    winner: false,
  },
  {
    value: "6",
    suit: "spades",
    artist: "cecilia-botta",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/127.jpg?2",
    winner: false,
  },
  {
    value: "7",
    suit: "clubs",
    artist: "chervelle-fryer",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/129.jpg?2",
    winner: false,
  },
  {
    value: "7",
    suit: "hearts",
    artist: "zarja-menart",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/130.jpg?2",
    winner: false,
  },
  {
    value: "7",
    suit: "diamonds",
    artist: "cecilia-pettersson",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/132.jpg?2",
    winner: false,
  },
  {
    value: "8",
    suit: "clubs",
    artist: "enisaurus",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/133.jpg?2",
    winner: false,
  },
  {
    value: "8",
    suit: "spades",
    artist: "lorena-g",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/135.jpg?2",
    winner: false,
  },
  {
    value: "8",
    suit: "diamonds",
    artist: "laura-be",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/136.jpg?2",
    winner: false,
  },
  {
    value: "9",
    suit: "clubs",
    artist: "burak-beceren",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/137.jpg?2",
    winner: false,
  },
  {
    value: "9",
    suit: "hearts",
    artist: "tarin-yuangtrakul",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/138.jpg?2",
    winner: false,
  },
  {
    value: "9",
    suit: "diamonds",
    artist: "rodrigo-ico",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/140.jpg?2",
    winner: false,
  },
  {
    value: "10",
    suit: "clubs",
    artist: "léonard-dupond",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/141.jpg?2",
    winner: false,
  },
  {
    value: "10",
    suit: "hearts",
    artist: "pablo-alvarez",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/142.jpg?2",
    winner: false,
  },
  {
    value: "jack",
    suit: "clubs",
    artist: "asione",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/145.jpg?2",
    winner: false,
  },
  {
    value: "queen",
    suit: "diamonds",
    artist: "flavio-melchiorre",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/152.jpg?2",
    winner: false,
  },
  {
    value: "king",
    suit: "hearts",
    artist: "benkee-chang",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/154.jpg?2",
    winner: false,
  },
  {
    value: "king",
    suit: "diamonds",
    artist: "fonzy-nils",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/156.jpg?2",
    winner: false,
  },
  {
    value: "ace",
    suit: "clubs",
    artist: "nacho-huizar",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/157.jpg?2",
    winner: false,
  },
  {
    value: "ace",
    suit: "hearts",
    artist: "avita-flit",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/158.jpg?2",
    winner: false,
  },
  {
    value: "ace",
    suit: "diamonds",
    artist: "jelena-vasiljevic",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/160.jpg?2",
    winner: false,
  },
  {
    value: "joker",
    suit: "black",
    artist: "giannis-georgantas",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/161.jpg?2",
    winner: false,
  },
  {
    value: "joker",
    suit: "red",
    artist: "evan-raditya-pratomo",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/162.jpg?2",
    winner: false,
  },
  {
    value: "2",
    suit: "clubs",
    artist: "naka",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/163.jpg?2",
    winner: false,
  },
  {
    value: "2",
    suit: "diamonds",
    artist: "lauren-sebastian",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/166.jpg?2",
    winner: false,
  },
  {
    value: "4",
    suit: "clubs",
    artist: "patrick-seymour",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/171.jpg?2",
    winner: false,
  },
  {
    value: "4",
    suit: "spades",
    artist: "katerina-murysina",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/173.jpg?2",
    winner: false,
  },
  {
    value: "6",
    suit: "clubs",
    artist: "wojciech-pijecki",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/179.jpg?2",
    winner: false,
  },
  {
    value: "6",
    suit: "diamonds",
    artist: "emory-allen",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/182.jpg?2",
    winner: false,
  },
  {
    value: "7",
    suit: "clubs",
    artist: "cornelia-li",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/183.jpg?2",
    winner: false,
  },
  {
    value: "7",
    suit: "hearts",
    artist: "milica-golubovic",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/184.jpg?2",
    winner: false,
  },
  {
    value: "7",
    suit: "spades",
    artist: "fireye",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/185.jpg?2",
    winner: false,
  },
  {
    value: "8",
    suit: "clubs",
    artist: "giulia-santopadre",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/187.jpg?2",
    winner: false,
  },
  {
    value: "8",
    suit: "hearts",
    artist: "arthur-coppens",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/188.jpg?2",
    winner: false,
  },
  {
    value: "9",
    suit: "spades",
    artist: "petr-kollarcik",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/193.jpg?2",
    winner: false,
  },
  {
    value: "9",
    suit: "diamonds",
    artist: "anna-aniskina",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/194.jpg?2",
    winner: false,
  },
  {
    value: "jack",
    suit: "spades",
    artist: "sara-gonzalez",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/201.jpg?2",
    winner: false,
  },
  {
    value: "jack",
    suit: "diamonds",
    artist: "cyla-costa",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/202.jpg?2",
    winner: false,
  },
  {
    value: "queen",
    suit: "spades",
    artist: "fabio-mancini",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/205.jpg?2",
    winner: false,
  },
  {
    value: "queen",
    suit: "diamonds",
    artist: "ricardo-bracho",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/206.jpg?2",
    winner: false,
  },
  {
    value: "king",
    suit: "diamonds",
    artist: "tommy-chandra",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/210.jpg?2",
    winner: false,
  },
  {
    value: "ace",
    suit: "clubs",
    artist: "kurt-chang",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/211.jpg?2",
    winner: false,
  },
  {
    value: "2",
    suit: "clubs",
    artist: "alexis-feniser",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/217.jpg?2",
    winner: false,
  },
  {
    value: "2",
    suit: "spades",
    artist: "tu-bui",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/219.jpg?2",
    winner: false,
  },
  {
    value: "2",
    suit: "diamonds",
    artist: "sam-seoane",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/220.jpg?2",
    winner: false,
  },
  {
    value: "3",
    suit: "diamonds",
    artist: "jérémy-schiavo",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/224.jpg?2",
    winner: false,
  },
  {
    value: "4",
    suit: "spades",
    artist: "mojo-wang",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/227.jpg?2",
    winner: false,
  },
  {
    value: "5",
    suit: "hearts",
    artist: "olivier-bonhomme",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/230.jpg?2",
    winner: false,
  },
  {
    value: "5",
    suit: "spades",
    artist: "anna-katharina-jansen",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/231.jpg?2",
    winner: false,
  },
  {
    value: "6",
    suit: "spades",
    artist: "peachmunkey",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/235.jpg?2",
    winner: false,
  },
  {
    value: "6",
    suit: "diamonds",
    artist: "roberto-hikimi-blefari",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/236.jpg?2",
    winner: false,
  },
  {
    value: "7",
    suit: "hearts",
    artist: "tomasz-usyk",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/238.jpg?2",
    winner: false,
  },
  {
    value: "8",
    suit: "hearts",
    artist: "luisa-rivera",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/242.jpg?2",
    winner: false,
  },
  {
    value: "8",
    suit: "spades",
    artist: "artiom-branchel-(a.bran)",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/243.jpg?2",
    winner: false,
  },
  {
    value: "9",
    suit: "hearts",
    artist: "jorge-parra-velez",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/246.jpg?2",
    winner: false,
  },
  {
    value: "9",
    suit: "diamonds",
    artist: "jean-balogh-(gyöngyi)",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/248.jpg?2",
    winner: false,
  },
  {
    value: "10",
    suit: "clubs",
    artist: "alexandru-nimurad",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/249.jpg?2",
    winner: false,
  },
  {
    value: "10",
    suit: "hearts",
    artist: "alain-daniel-husson",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/250.jpg?2",
    winner: false,
  },
  {
    value: "queen",
    suit: "diamonds",
    artist: "alberto-antoniazzi",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/260.jpg?2",
    winner: false,
  },
  {
    value: "king",
    suit: "clubs",
    artist: "sharm-murugiah",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/261.jpg?2",
    winner: false,
  },
  {
    value: "king",
    suit: "spades",
    artist: "stefan-chinoff",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/263.jpg?2",
    winner: false,
  },
  {
    value: "king",
    suit: "diamonds",
    artist: "laura-redburn",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/264.jpg?2",
    winner: false,
  },
  {
    value: "ace",
    suit: "clubs",
    artist: "luis-guizado-aka-guizo",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/265.jpg?2",
    winner: false,
  },
  {
    value: "ace",
    suit: "hearts",
    artist: "olga-shtonda",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/266.jpg?2",
    winner: false,
  },
  {
    value: "ace",
    suit: "diamonds",
    artist: "alejandro-lópez",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/268.jpg?2",
    winner: false,
  },
  {
    value: "joker",
    suit: "black",
    artist: "annika-de-korte",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/269.jpg?2",
    winner: false,
  },
  {
    value: "2",
    suit: "clubs",
    artist: "victor-vergara",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/271.jpg?2",
    winner: false,
  },
  {
    value: "2",
    suit: "hearts",
    artist: "ola-szpunar",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/272.jpg?2",
    winner: false,
  },
  {
    value: "2",
    suit: "spades",
    artist: "cloiseau-alan",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/273.jpg?2",
    winner: false,
  },
  {
    value: "2",
    suit: "diamonds",
    artist: "lucía-gómez",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/274.jpg?2",
    winner: false,
  },
  {
    value: "3",
    suit: "clubs",
    artist: "buba-viedma",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/275.jpg?2",
    winner: false,
  },
  {
    value: "3",
    suit: "hearts",
    artist: "yido",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/276.jpg?2",
    winner: false,
  },
  {
    value: "4",
    suit: "clubs",
    artist: "morgan-ramberg",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/279.jpg?2",
    winner: false,
  },
  {
    value: "4",
    suit: "spades",
    artist: "sergio-ingravalle",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/281.jpg?2",
    winner: false,
  },
  {
    value: "4",
    suit: "diamonds",
    artist: "sandra-suy",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/282.jpg?2",
    winner: false,
  },
  {
    value: "5",
    suit: "spades",
    artist: "birgit-palma",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/285.jpg?2",
    winner: false,
  },
  {
    value: "5",
    suit: "diamonds",
    artist: "felipe-navarro",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/286.jpg?2",
    winner: false,
  },
  {
    value: "6",
    suit: "hearts",
    artist: "ion-lucin",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/288.jpg?2",
    winner: false,
  },
  {
    value: "6",
    suit: "spades",
    artist: "koivo",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/289.jpg?2",
    winner: false,
  },
  {
    value: "6",
    suit: "diamonds",
    artist: "oscar-diodoro",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/290.jpg?2",
    winner: false,
  },
  {
    value: "7",
    suit: "hearts",
    artist: "daniel-vidal",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/292.jpg?2",
    winner: false,
  },
  {
    value: "7",
    suit: "spades",
    artist: "pau-molas",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/293.jpg?2",
    winner: false,
  },
  {
    value: "8",
    suit: "clubs",
    artist: "elena-pancorbo",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/295.jpg?2",
    winner: false,
  },
  {
    value: "8",
    suit: "hearts",
    artist: "jim-wong",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/296.jpg?2",
    winner: false,
  },
  {
    value: "9",
    suit: "hearts",
    artist: "miguel-dias",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/300.jpg?2",
    winner: false,
  },
  {
    value: "10",
    suit: "clubs",
    artist: "lucas-doerre",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/303.jpg?2",
    winner: false,
  },
  {
    value: "10",
    suit: "hearts",
    artist: "stefano-agabio",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/304.jpg?2",
    winner: false,
  },
  {
    value: "10",
    suit: "spades",
    artist: "bart-van-delft",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/305.jpg?2",
    winner: false,
  },
  {
    value: "10",
    suit: "diamonds",
    artist: "dmitry-stolz",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/306.jpg?2",
    winner: false,
  },
  {
    value: "jack",
    suit: "clubs",
    artist: "patrícia-mafra",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/307.jpg?2",
    winner: false,
  },
  {
    value: "jack",
    suit: "spades",
    artist: "iryna-korshak",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/309.jpg?2",
    winner: false,
  },
  {
    value: "jack",
    suit: "diamonds",
    artist: "anna-caban",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/310.jpg?2",
    winner: false,
  },
  {
    value: "queen",
    suit: "clubs",
    artist: "jérôme-masi",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/311.jpg?2",
    winner: false,
  },
  {
    value: "queen",
    suit: "hearts",
    artist: "nuttaphon-suriyavarakul",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/312.jpg?2",
    winner: false,
  },
  {
    value: "queen",
    suit: "spades",
    artist: "diego-riselli",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/313.jpg?2",
    winner: false,
  },
  {
    value: "queen",
    suit: "diamonds",
    artist: "meni-chatzipanagiotou",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/314.jpg?2",
    winner: false,
  },
  {
    value: "king",
    suit: "clubs",
    artist: "matteo-ruisi",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/315.jpg?2",
    winner: false,
  },
  {
    value: "king",
    suit: "spades",
    artist: "karolina-szymkiewicz",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/317.jpg?2",
    winner: false,
  },
  {
    value: "ace",
    suit: "hearts",
    artist: "sun-lee-siew-loo",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/320.jpg?2",
    winner: false,
  },
  {
    value: "ace",
    suit: "diamonds",
    artist: "swindler-&-swindler",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/322.jpg?2",
    winner: false,
  },
  {
    value: "joker",
    suit: "red",
    artist: "adi",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/324.jpg?2",
    winner: false,
  },
  {
    value: "2",
    suit: "clubs",
    artist: "ladislas-chachignot",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/325.jpg?2",
    winner: false,
  },
  {
    value: "2",
    suit: "hearts",
    artist: "andreas-wikström",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/326.jpg?2",
    winner: false,
  },
  {
    value: "2",
    suit: "diamonds",
    artist: "siggeir",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/328.jpg?2",
    winner: false,
  },
  {
    value: "3",
    suit: "clubs",
    artist: "alexis-gérard",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/329.jpg?2",
    winner: false,
  },
  {
    value: "3",
    suit: "hearts",
    artist: "sara-penco",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/330.jpg?2",
    winner: false,
  },
  {
    value: "3",
    suit: "spades",
    artist: "nicoletta-pagano",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/331.jpg?2",
    winner: false,
  },
  {
    value: "4",
    suit: "clubs",
    artist: "8:00-am",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/333.jpg?2",
    winner: false,
  },
  {
    value: "4",
    suit: "spades",
    artist: "laranoia",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/335.jpg?2",
    winner: false,
  },
  {
    value: "5",
    suit: "spades",
    artist: "matteo-cuccato",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/339.jpg?2",
    winner: false,
  },
  {
    value: "5",
    suit: "diamonds",
    artist: "marcos-navarro",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/340.jpg?2",
    winner: false,
  },
  {
    value: "6",
    suit: "clubs",
    artist: "nick-kumbari",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/341.jpg?2",
    winner: false,
  },
  {
    value: "6",
    suit: "hearts",
    artist: "pavel",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/342.jpg?2",
    winner: false,
  },
  {
    value: "6",
    suit: "spades",
    artist: "stelios-spanoudakis",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/343.jpg?2",
    winner: false,
  },
  {
    value: "7",
    suit: "diamonds",
    artist: "gui-zamarioli",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/348.jpg?2",
    winner: false,
  },
  {
    value: "8",
    suit: "spades",
    artist: "eduardo-dosuá",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/351.jpg?2",
    winner: false,
  },
  {
    value: "9",
    suit: "clubs",
    artist: "michael-wandelmaier",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/353.jpg?2",
    winner: false,
  },
  {
    value: "9",
    suit: "hearts",
    artist: "sabeena-karnik",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/354.jpg?2",
    winner: false,
  },
  {
    value: "9",
    suit: "diamonds",
    artist: "brent-black",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/356.jpg?2",
    winner: false,
  },
  {
    value: "10",
    suit: "hearts",
    artist: "shinyoung-kim",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/358.jpg?2",
    winner: false,
  },
  {
    value: "10",
    suit: "diamonds",
    artist: "paul-mcmahon",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/360.jpg?2",
    winner: false,
  },
  {
    value: "jack",
    suit: "clubs",
    artist: "rudo-company",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/361.jpg?2",
    winner: false,
  },
  {
    value: "jack",
    suit: "hearts",
    artist: "craig-halili",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/362.jpg?2",
    winner: false,
  },
  {
    value: "jack",
    suit: "diamonds",
    artist: "victor-c-castilvz",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/364.jpg?2",
    winner: false,
  },
  {
    value: "queen",
    suit: "clubs",
    artist: "riccardo-corda",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/365.jpg?2",
    winner: false,
  },
  {
    value: "queen",
    suit: "spades",
    artist: "alberto-vacca-lepri-(vacaliebres)",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/367.jpg?2",
    winner: false,
  },
  {
    value: "king",
    suit: "hearts",
    artist: "charlie-valderrama",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/370.jpg?2",
    winner: false,
  },
  {
    value: "ace",
    suit: "clubs",
    artist: "roberto-saldaña",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/373.jpg?2",
    winner: false,
  },
  {
    value: "ace",
    suit: "hearts",
    artist: "randy-amoakohene",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/374.jpg?2",
    winner: false,
  },
  {
    value: "ace",
    suit: "spades",
    artist: "bazak",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/375.jpg?2",
    winner: false,
  },
  {
    value: "ace",
    suit: "diamonds",
    artist: "douala-sophie",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/376.jpg?2",
    winner: false,
  },
  {
    value: "joker",
    suit: "red",
    artist: "felix_勺子",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/378.jpg?2",
    winner: false,
  },
  {
    value: "2",
    suit: "clubs",
    artist: "joël-cohen",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/379.jpg?2",
    winner: false,
  },
  {
    value: "3",
    suit: "spades",
    artist: "jacopo-ferretti",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/385.jpg?2",
    winner: false,
  },
  {
    value: "4",
    suit: "spades",
    artist: "claire-o'brien",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/389.jpg?2",
    winner: false,
  },
  {
    value: "5",
    suit: "clubs",
    artist: "lloyd-de-guzman",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/391.jpg?2",
    winner: false,
  },
  {
    value: "5",
    suit: "hearts",
    artist: "edu-rubio",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/392.jpg?2",
    winner: false,
  },
  {
    value: "5",
    suit: "diamonds",
    artist: "joseph-veazey",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/394.jpg?2",
    winner: false,
  },
  {
    value: "6",
    suit: "spades",
    artist: "janusz-jurek",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/397.jpg?2",
    winner: false,
  },
  {
    value: "7",
    suit: "clubs",
    artist: "josh-thomas",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/399.jpg?2",
    winner: false,
  },
  {
    value: "7",
    suit: "diamonds",
    artist: "javier-pérez",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/402.jpg?2",
    winner: false,
  },
  {
    value: "8",
    suit: "hearts",
    artist: "nadzeya-lebedzeva",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/404.jpg?2",
    winner: false,
  },
  {
    value: "9",
    suit: "clubs",
    artist: "vet-orso",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/407.jpg?2",
    winner: false,
  },
  {
    value: "9",
    suit: "diamonds",
    artist: "elina-novak",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/410.jpg?2",
    winner: false,
  },
  {
    value: "10",
    suit: "spades",
    artist: "black-madre",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/413.jpg?2",
    winner: false,
  },
  {
    value: "10",
    suit: "diamonds",
    artist: "giovanna-giuliano",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/414.jpg?2",
    winner: false,
  },
  {
    value: "jack",
    suit: "clubs",
    artist: "mirko-càmia",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/415.jpg?2",
    winner: false,
  },
  {
    value: "jack",
    suit: "hearts",
    artist: "pat-simons",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/416.jpg?2",
    winner: false,
  },
  {
    value: "jack",
    suit: "spades",
    artist: "eva-vilhelmiina-eskelinen",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/417.jpg?2",
    winner: false,
  },
  {
    value: "queen",
    suit: "clubs",
    artist: "sílfide-oscura",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/419.jpg?2",
    winner: false,
  },
  {
    value: "queen",
    suit: "hearts",
    artist: "bryan-gallardo",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/420.jpg?2",
    winner: false,
  },
  {
    value: "queen",
    suit: "spades",
    artist: "igor-kozak",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/421.jpg?2",
    winner: false,
  },
  {
    value: "queen",
    suit: "diamonds",
    artist: "alessandro-monaco",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/422.jpg?2",
    winner: false,
  },
  {
    value: "king",
    suit: "spades",
    artist: "gabriel-villena",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/425.jpg?2",
    winner: false,
  },
  {
    value: "ace",
    suit: "spades",
    artist: "sharon-farrow",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/429.jpg?2",
    winner: false,
  },
  {
    value: "joker",
    suit: "black",
    artist: "andy-pallavicini",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/431.jpg?2",
    winner: false,
  },
  {
    value: "2",
    suit: "spades",
    artist: "shiffa",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/435.jpg?2",
    winner: false,
  },
  {
    value: "4",
    suit: "diamonds",
    artist: "pelayo-rodríguez",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/336.jpg?2",
    winner: false,
  },
  {
    value: "3",
    suit: "spades",
    artist: "makers-company",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/439.jpg?2",
    winner: false,
  },
  {
    value: "3",
    suit: "diamonds",
    artist: "kuchu-pack",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/440.jpg?2",
    winner: false,
  },
  {
    value: "4",
    suit: "clubs",
    artist: "massimiliano-panzironi",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/441.jpg?2",
    winner: false,
  },
  {
    value: "4",
    suit: "spades",
    artist: "pliska-dasha",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/443.jpg?2",
    winner: false,
  },
  {
    value: "5",
    suit: "clubs",
    artist: "isabel-albertos",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/445.jpg?2",
    winner: false,
  },
  {
    value: "5",
    suit: "hearts",
    artist: "onasup",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/446.jpg?2",
    winner: false,
  },
  {
    value: "5",
    suit: "spades",
    artist: "aleksei-goferman",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/447.jpg?2",
    winner: false,
  },
  {
    value: "5",
    suit: "diamonds",
    artist: "reno-nogaj",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/448.jpg?2",
    winner: false,
  },
  {
    value: "6",
    suit: "clubs",
    artist: "nadzeya",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/449.jpg?2",
    winner: false,
  },
  {
    value: "6",
    suit: "hearts",
    artist: "anton-kostenko",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/450.jpg?2",
    winner: false,
  },
  {
    value: "6",
    suit: "spades",
    artist: "petros-afshar",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/451.jpg?2",
    winner: false,
  },
  {
    value: "7",
    suit: "diamonds",
    artist: "raylau",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/456.jpg?2",
    winner: false,
  },
  {
    value: "8",
    suit: "clubs",
    artist: "charlotte",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/457.jpg?2",
    winner: false,
  },
  {
    value: "8",
    suit: "hearts",
    artist: "davide-mazzuchin",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/458.jpg?2",
    winner: false,
  },
  {
    value: "8",
    suit: "diamonds",
    artist: "daniel-morgenstern",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/460.jpg?2",
    winner: false,
  },
  {
    value: "9",
    suit: "hearts",
    artist: "andrey-kokorin",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/462.jpg?2",
    winner: false,
  },
  {
    value: "10",
    suit: "clubs",
    artist: "luca&sinem",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/465.jpg?2",
    winner: false,
  },
  {
    value: "10",
    suit: "spades",
    artist: "maria-paula-moreno-quintero",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/467.jpg?2",
    winner: false,
  },
  {
    value: "10",
    suit: "diamonds",
    artist: "sr.reny",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/468.jpg?2",
    winner: false,
  },
  {
    value: "jack",
    suit: "clubs",
    artist: "tempzey",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/469.jpg?2",
    winner: false,
  },
  {
    value: "jack",
    suit: "hearts",
    artist: "matt-sloe",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/470.jpg?2",
    winner: false,
  },
  {
    value: "jack",
    suit: "spades",
    artist: "ahmed-sidky-a.k.a.-kenny-poppins",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/471.jpg?2",
    winner: false,
  },
  {
    value: "queen",
    suit: "clubs",
    artist: "tamar-dovrat",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/473.jpg?2",
    winner: false,
  },
  {
    value: "queen",
    suit: "diamonds",
    artist: "kate-huang",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/476.jpg?2",
    winner: false,
  },
  {
    value: "king",
    suit: "hearts",
    artist: "anderson-koyama",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/478.jpg?2",
    winner: false,
  },
  {
    value: "king",
    suit: "spades",
    artist: "roberto-morales",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/479.jpg?2",
    winner: false,
  },
  {
    value: "king",
    suit: "diamonds",
    artist: "daniel-ramos",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/480.jpg?2",
    winner: false,
  },
  {
    value: "ace",
    suit: "spades",
    artist: "henrique-barone",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/483.jpg?2",
    winner: false,
  },
  {
    value: "ace",
    suit: "diamonds",
    artist: "james-gifford",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/484.jpg?2",
    winner: false,
  },
  {
    value: "2",
    suit: "clubs",
    artist: "geraldine-sy",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/487.jpg?2",
    winner: false,
  },
  {
    value: "2",
    suit: "spades",
    artist: "jaebum-joo",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/489.jpg?2",
    winner: false,
  },
  {
    value: "3",
    suit: "hearts",
    artist: "omar-shammah",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/492.jpg?2",
    winner: false,
  },
  {
    value: "3",
    suit: "spades",
    artist: "flou",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/493.jpg?2",
    winner: false,
  },
  {
    value: "3",
    suit: "diamonds",
    artist: "cristiana-fasano",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/494.jpg?2",
    winner: false,
  },
  {
    value: "4",
    suit: "hearts",
    artist: "fabrizio-morra",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/496.jpg?2",
    winner: false,
  },
  {
    value: "4",
    suit: "diamonds",
    artist: "andré-fernandes-trindade",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/498.jpg?2",
    winner: false,
  },
  {
    value: "5",
    suit: "clubs",
    artist: "the-woork-co",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/499.jpg?2",
    winner: false,
  },
  {
    value: "5",
    suit: "hearts",
    artist: "rudi-de-wet",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/500.jpg?2",
    winner: false,
  },
  {
    value: "5",
    suit: "spades",
    artist: "ivan-blazetic-|-sumski",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/501.jpg?2",
    winner: false,
  },
  {
    value: "5",
    suit: "diamonds",
    artist: "nevena-katalina",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/502.jpg?2",
    winner: false,
  },
  {
    value: "6",
    suit: "clubs",
    artist: "razvan-cornici",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/503.jpg?2",
    winner: false,
  },
  {
    value: "8",
    suit: "hearts",
    artist: "reeo-zerkos",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/512.jpg?2",
    winner: false,
  },
  {
    value: "9",
    suit: "hearts",
    artist: "sean-lee",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/516.jpg?2",
    winner: false,
  },
  {
    value: "9",
    suit: "spades",
    artist: "bárbara-perdiguera",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/517.jpg?2",
    winner: false,
  },
  {
    value: "9",
    suit: "diamonds",
    artist: "mikolaj-cielniak",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/518.jpg?2",
    winner: false,
  },
  {
    value: "10",
    suit: "clubs",
    artist: "raf-banzuela",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/519.jpg?2",
    winner: false,
  },
  {
    value: "10",
    suit: "hearts",
    artist: "livia-coloji",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/520.jpg?2",
    winner: false,
  },
  {
    value: "10",
    suit: "spades",
    artist: "luis-pinto",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/521.jpg?2",
    winner: false,
  },
  {
    value: "jack",
    suit: "clubs",
    artist: "ausra-kiudulaite",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/523.jpg?2",
    winner: false,
  },
  {
    value: "jack",
    suit: "diamonds",
    artist: "eli-garcía",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/526.jpg?2",
    winner: false,
  },
  {
    value: "queen",
    suit: "hearts",
    artist: "ahmet-ozcan",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/528.jpg?2",
    winner: false,
  },
  {
    value: "queen",
    suit: "spades",
    artist: "hellofreaks",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/529.jpg?2",
    winner: false,
  },
  {
    value: "queen",
    suit: "diamonds",
    artist: "sergey-snurnik",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/530.jpg?2",
    winner: false,
  },
  {
    value: "king",
    suit: "clubs",
    artist: "jisook-park",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/531.jpg?2",
    winner: false,
  },
  {
    value: "king",
    suit: "spades",
    artist: "vinicius-santos",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/533.jpg?2",
    winner: false,
  },
  {
    value: "king",
    suit: "diamonds",
    artist: "pinchepasha",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/534.jpg?2",
    winner: false,
  },
  {
    value: "ace",
    suit: "diamonds",
    artist: "alongkorn-sanguansook",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/538.jpg?2",
    winner: false,
  },
  {
    value: "joker",
    suit: "red",
    artist: "luca-di-battista",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/540.jpg?2",
    winner: false,
  },
  {
    value: "2",
    suit: "hearts",
    artist: "simone-hodgskiss-aka-pearly-yon",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/542.jpg?2",
    winner: false,
  },
  {
    value: "2",
    suit: "diamonds",
    artist: "mohammad-azad",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/544.jpg?2",
    winner: false,
  },
  {
    value: "3",
    suit: "clubs",
    artist: "rodrigo-bento-almeida",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/545.jpg?2",
    winner: false,
  },
  {
    value: "3",
    suit: "hearts",
    artist: "noem9-studio",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/546.jpg?2",
    winner: false,
  },
  {
    value: "3",
    suit: "spades",
    artist: "erwin-kho",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/547.jpg?2",
    winner: false,
  },
  {
    value: "4",
    suit: "clubs",
    artist: "inga-dagilė",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/549.jpg?2",
    winner: false,
  },
  {
    value: "4",
    suit: "hearts",
    artist: "giulio-bonasera",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/550.jpg?2",
    winner: false,
  },
  {
    value: "4",
    suit: "spades",
    artist: "yana-beylinson",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/551.jpg?2",
    winner: false,
  },
  {
    value: "4",
    suit: "diamonds",
    artist: "joão-gomes",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/552.jpg?2",
    winner: false,
  },
  {
    value: "6",
    suit: "hearts",
    artist: "anna-kostiv",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/558.jpg?2",
    winner: false,
  },
  {
    value: "6",
    suit: "spades",
    artist: "dean-falsify-cook",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/559.jpg?2",
    winner: false,
  },
  {
    value: "7",
    suit: "clubs",
    artist: "joaquin-aldeguer",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/561.jpg?2",
    winner: false,
  },
  {
    value: "7",
    suit: "spades",
    artist: "matthias",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/563.jpg?2",
    winner: false,
  },
  {
    value: "8",
    suit: "clubs",
    artist: "jacinto-caetano",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/565.jpg?2",
    winner: false,
  },
  {
    value: "8",
    suit: "hearts",
    artist: "zuco",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/566.jpg?2",
    winner: false,
  },
  {
    value: "8",
    suit: "spades",
    artist: "robin-gillet",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/567.jpg?2",
    winner: false,
  },
  {
    value: "8",
    suit: "diamonds",
    artist: "vinicius-gut",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/568.jpg?2",
    winner: false,
  },
  {
    value: "9",
    suit: "clubs",
    artist: "le-funky",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/569.jpg?2",
    winner: false,
  },
  {
    value: "9",
    suit: "spades",
    artist: "andres-morales",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/571.jpg?2",
    winner: false,
  },
  {
    value: "10",
    suit: "clubs",
    artist: "eva-saranova",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/573.jpg?2",
    winner: false,
  },
  {
    value: "10",
    suit: "hearts",
    artist: "shycheeks",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/574.jpg?2",
    winner: false,
  },
  {
    value: "10",
    suit: "spades",
    artist: "gavilán",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/575.jpg?2",
    winner: false,
  },
  {
    value: "jack",
    suit: "clubs",
    artist: "ion-oprea",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/577.jpg?2",
    winner: false,
  },
  {
    value: "jack",
    suit: "spades",
    artist: "giovanny-zapata",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/579.jpg?2",
    winner: false,
  },
  {
    value: "jack",
    suit: "diamonds",
    artist: "riccardo-fano",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/580.jpg?2",
    winner: false,
  },
  {
    value: "queen",
    suit: "clubs",
    artist: "maufield-(mauricio-molina)",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/581.jpg?2",
    winner: false,
  },
  {
    value: "queen",
    suit: "diamonds",
    artist: "louise-hubbard",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/584.jpg?2",
    winner: false,
  },
  {
    value: "king",
    suit: "hearts",
    artist: "sophie-light",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/586.jpg?2",
    winner: false,
  },
  {
    value: "king",
    suit: "spades",
    artist: "fernando-fuentes",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/587.jpg?2",
    winner: false,
  },
  {
    value: "king",
    suit: "diamonds",
    artist: "rob-peters",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/588.jpg?2",
    winner: false,
  },
  {
    value: "ace",
    suit: "clubs",
    artist: "hansel",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/589.jpg?2",
    winner: false,
  },
  {
    value: "ace",
    suit: "spades",
    artist: "mickael-brana",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/591.jpg?2",
    winner: false,
  },
  {
    value: "joker",
    suit: "red",
    artist: "józsef-vass",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/594.jpg?2",
    winner: false,
  },
  {
    value: "2",
    suit: "spades",
    artist: "brady-scott",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/597.jpg?2",
    winner: false,
  },
  {
    value: "2",
    suit: "diamonds",
    artist: "maria-elisabeta-cucu",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/598.jpg?2",
    winner: false,
  },
  {
    value: "3",
    suit: "clubs",
    artist: "angie-brown",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/599.jpg?2",
    winner: false,
  },
  {
    value: "3",
    suit: "hearts",
    artist: "alex-sander",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/600.jpg?2",
    winner: false,
  },
  {
    value: "4",
    suit: "clubs",
    artist: "aero-tagura",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/603.jpg?2",
    winner: false,
  },
  {
    value: "4",
    suit: "hearts",
    artist: "moritz-adam-schmitt",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/604.jpg?2",
    winner: false,
  },
  {
    value: "4",
    suit: "diamonds",
    artist: "billy-french",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/606.jpg?2",
    winner: false,
  },
  {
    value: "5",
    suit: "clubs",
    artist: "marcelo-jesus",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/607.jpg?2",
    winner: false,
  },
  {
    value: "6",
    suit: "diamonds",
    artist: "joana-arieiro",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/614.jpg?2",
    winner: false,
  },
  {
    value: "7",
    suit: "clubs",
    artist: "bosquet",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/615.jpg?2",
    winner: false,
  },
  {
    value: "7",
    suit: "hearts",
    artist: "amber-morgan",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/616.jpg?2",
    winner: false,
  },
  {
    value: "7",
    suit: "spades",
    artist: "daksheeta-pattni",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/617.jpg?2",
    winner: false,
  },
  {
    value: "7",
    suit: "diamonds",
    artist: "riddhi",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/618.jpg?2",
    winner: false,
  },
  {
    value: "8",
    suit: "clubs",
    artist: "fahad-karim",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/619.jpg?2",
    winner: false,
  },
  {
    value: "10",
    suit: "hearts",
    artist: "max-morlock",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/628.jpg?2",
    winner: false,
  },
  {
    value: "10",
    suit: "spades",
    artist: "eddy-ymeri",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/629.jpg?2",
    winner: false,
  },
  {
    value: "jack",
    suit: "diamonds",
    artist: "jo-jacobs",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/634.jpg?2",
    winner: false,
  },
  {
    value: "queen",
    suit: "hearts",
    artist: "kim-zeluck",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/636.jpg?2",
    winner: false,
  },
  {
    value: "king",
    suit: "clubs",
    artist: "stefan-große-halbuer",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/639.jpg?2",
    winner: false,
  },
  {
    value: "king",
    suit: "hearts",
    artist: "suraj-barthy",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/640.jpg?2",
    winner: false,
  },
  {
    value: "king",
    suit: "spades",
    artist: "mayka-ienova",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/641.jpg?2",
    winner: false,
  },
  {
    value: "king",
    suit: "diamonds",
    artist: "daniel-viberg",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/642.jpg?2",
    winner: false,
  },
  {
    value: "ace",
    suit: "clubs",
    artist: "fernando-palma---volkana-design",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/643.jpg?2",
    winner: false,
  },
  {
    value: "ace",
    suit: "hearts",
    artist: "olivia-ariferiani",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/644.jpg?2",
    winner: false,
  },
  {
    value: "ace",
    suit: "diamonds",
    artist: "marco-arlotti",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/646.jpg?2",
    winner: false,
  },
  {
    value: "joker",
    suit: "black",
    artist: "david-campbell",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/647.jpg?2",
    winner: false,
  },
  {
    value: "joker",
    suit: "red",
    artist: "edzel-rubite",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/648.jpg?2",
    winner: false,
  },
  {
    value: "2",
    suit: "hearts",
    artist: "anouck-sessa",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/650.jpg?2",
    winner: false,
  },
  {
    value: "2",
    suit: "diamonds",
    artist: "joseph-catimbang",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/652.jpg?2",
    winner: false,
  },
  {
    value: "3",
    suit: "clubs",
    artist: "rimantas-juskaitis",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/653.jpg?2",
    winner: false,
  },
  {
    value: "3",
    suit: "spades",
    artist: "sylvain-weiss",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/655.jpg?2",
    winner: false,
  },
  {
    value: "3",
    suit: "diamonds",
    artist: "stewart-harris",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/656.jpg?2",
    winner: false,
  },
  {
    value: "4",
    suit: "hearts",
    artist: "valentin-lachayze",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/658.jpg?2",
    winner: false,
  },
  {
    value: "4",
    suit: "diamonds",
    artist: "philipp-jungwirth",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/660.jpg?2",
    winner: false,
  },
  {
    value: "5",
    suit: "clubs",
    artist: "sasita-samarnpharb",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/661.jpg?2",
    winner: false,
  },
  {
    value: "5",
    suit: "hearts",
    artist: "jeff-langevin",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/662.jpg?2",
    winner: false,
  },
  {
    value: "5",
    suit: "spades",
    artist: "aren-vandenburgh",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/663.jpg?2",
    winner: false,
  },
  {
    value: "6",
    suit: "clubs",
    artist: "maria-fedoseeva",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/665.jpg?2",
    winner: false,
  },
  {
    value: "6",
    suit: "hearts",
    artist: "mantas-tumosa",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/666.jpg?2",
    winner: false,
  },
  {
    value: "7",
    suit: "hearts",
    artist: "jocelyn-gardner",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/670.jpg?2",
    winner: false,
  },
  {
    value: "7",
    suit: "diamonds",
    artist: "andre-levy-a.k.a.-zhion",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/672.jpg?2",
    winner: false,
  },
  {
    value: "8",
    suit: "hearts",
    artist: "marco-aguirre",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/674.jpg?2",
    winner: false,
  },
  {
    value: "8",
    suit: "spades",
    artist: "shayom",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/675.jpg?2",
    winner: false,
  },
  {
    value: "9",
    suit: "clubs",
    artist: "luis-paulo-bonadio",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/677.jpg?2",
    winner: false,
  },
  {
    value: "10",
    suit: "clubs",
    artist: "shreya-gupta",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/681.jpg?2",
    winner: false,
  },
  {
    value: "jack",
    suit: "clubs",
    artist: "marc-antoine-herrmann",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/685.jpg?2",
    winner: false,
  },
  {
    value: "jack",
    suit: "hearts",
    artist: "shakthi-hari--n-v",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/686.jpg?2",
    winner: false,
  },
  {
    value: "jack",
    suit: "spades",
    artist: "jatin-pandya",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/687.jpg?2",
    winner: false,
  },
  {
    value: "jack",
    suit: "diamonds",
    artist: "reda-el-mraki",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/688.jpg?2",
    winner: false,
  },
  {
    value: "queen",
    suit: "clubs",
    artist: "laura-palumbo",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/689.jpg?2",
    winner: false,
  },
  {
    value: "queen",
    suit: "hearts",
    artist: "debbie-kennedy",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/690.jpg?2",
    winner: false,
  },
  {
    value: "queen",
    suit: "diamonds",
    artist: "simona-bunardzhieva",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/692.jpg?2",
    winner: false,
  },
  {
    value: "king",
    suit: "clubs",
    artist: "bradley-mclaughlin",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/693.jpg?2",
    winner: false,
  },
  {
    value: "king",
    suit: "hearts",
    artist: "david",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/694.jpg?2",
    winner: false,
  },
  {
    value: "king",
    suit: "spades",
    artist: "jesper-bolther",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/695.jpg?2",
    winner: false,
  },
  {
    value: "king",
    suit: "diamonds",
    artist: "jhonny-núñez",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/696.jpg?2",
    winner: false,
  },
  {
    value: "ace",
    suit: "clubs",
    artist: "harris",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/697.jpg?2",
    winner: false,
  },
  {
    value: "ace",
    suit: "hearts",
    artist: "alberto-carbonell",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/698.jpg?2",
    winner: false,
  },
  {
    value: "joker",
    suit: "black",
    artist: "stefano-flonta",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/701.jpg?2",
    winner: false,
  },
  {
    value: "2",
    suit: "diamonds",
    artist: "lucy-yu",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/706.jpg?2",
    winner: false,
  },
  {
    value: "3",
    suit: "clubs",
    artist: "michel-martins",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/707.jpg?2",
    winner: false,
  },
  {
    value: "3",
    suit: "hearts",
    artist: "thodoris-pappas",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/708.jpg?2",
    winner: false,
  },
  {
    value: "3",
    suit: "spades",
    artist: "vladimir-stankovic",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/709.jpg?2",
    winner: false,
  },
  {
    value: "4",
    suit: "hearts",
    artist: "hunky-dunky",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/712.jpg?2",
    winner: false,
  },
  {
    value: "4",
    suit: "diamonds",
    artist: "sanuri-zulkefli",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/714.jpg?2",
    winner: false,
  },
  {
    value: "5",
    suit: "spades",
    artist: "irvin-ranada",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/717.jpg?2",
    winner: false,
  },
  {
    value: "6",
    suit: "clubs",
    artist: "mark-allender",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/719.jpg?2",
    winner: false,
  },
  {
    value: "6",
    suit: "hearts",
    artist: "christopher-wilson",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/720.jpg?2",
    winner: false,
  },
  {
    value: "6",
    suit: "spades",
    artist: "huihong-huang",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/721.jpg?2",
    winner: false,
  },
  {
    value: "6",
    suit: "diamonds",
    artist: "joshua-brancheau",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/722.jpg?2",
    winner: false,
  },
  {
    value: "7",
    suit: "clubs",
    artist: "shmakoff",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/723.jpg?2",
    winner: false,
  },
  {
    value: "7",
    suit: "hearts",
    artist: "mariela-di-nardo",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/724.jpg?2",
    winner: false,
  },
  {
    value: "7",
    suit: "spades",
    artist: "black-fury",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/725.jpg?2",
    winner: false,
  },
  {
    value: "7",
    suit: "diamonds",
    artist: "yuliia-bahniuk",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/726.jpg?2",
    winner: false,
  },
  {
    value: "8",
    suit: "clubs",
    artist: "prathmesh-wadekar",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/727.jpg?2",
    winner: false,
  },
  {
    value: "8",
    suit: "hearts",
    artist: "andonasty",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/728.jpg?2",
    winner: false,
  },
  {
    value: "8",
    suit: "diamonds",
    artist: "kolcsar-sz.-zsolt",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/730.jpg?2",
    winner: false,
  },
  {
    value: "9",
    suit: "spades",
    artist: "sophia-murray",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/733.jpg?2",
    winner: false,
  },
  {
    value: "9",
    suit: "diamonds",
    artist: "daniela-sosa",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/734.jpg?2",
    winner: false,
  },
  {
    value: "10",
    suit: "clubs",
    artist: "waqas-maqsood",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/735.jpg?2",
    winner: false,
  },
  {
    value: "10",
    suit: "hearts",
    artist: "miran-nudell",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/736.jpg?2",
    winner: false,
  },
  {
    value: "10",
    suit: "diamonds",
    artist: "hussein",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/738.jpg?2",
    winner: false,
  },
  {
    value: "jack",
    suit: "clubs",
    artist: "jorik-van-ruiswijk",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/739.jpg?2",
    winner: false,
  },
  {
    value: "jack",
    suit: "hearts",
    artist: "patty-scott",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/740.jpg?2",
    winner: false,
  },
  {
    value: "queen",
    suit: "hearts",
    artist: "francesco-bonvecchio",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/744.jpg?2",
    winner: false,
  },
  {
    value: "queen",
    suit: "diamonds",
    artist: "milionis-stefanos",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/746.jpg?2",
    winner: false,
  },
  {
    value: "king",
    suit: "hearts",
    artist: "niall-grant",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/748.jpg?2",
    winner: false,
  },
  {
    value: "king",
    suit: "spades",
    artist: "olga",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/749.jpg?2",
    winner: false,
  },
  {
    value: "king",
    suit: "diamonds",
    artist: "gerome-jean",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/750.jpg?2",
    winner: false,
  },
  {
    value: "ace",
    suit: "clubs",
    artist: "martin-rossouw",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/751.jpg?2",
    winner: false,
  },
  {
    value: "ace",
    suit: "diamonds",
    artist: "dean-ira",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/754.jpg?2",
    winner: false,
  },
  {
    value: "joker",
    suit: "black",
    artist: "alexander-jackson",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/755.jpg?2",
    winner: false,
  },
  {
    value: "2",
    suit: "hearts",
    artist: "marko-vuleta-djukanov",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/758.jpg?2",
    winner: false,
  },
  {
    value: "2",
    suit: "spades",
    artist: "brian-omolo",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/759.jpg?2",
    winner: false,
  },
  {
    value: "2",
    suit: "diamonds",
    artist: "jose-carcavilla",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/760.jpg?2",
    winner: false,
  },
  {
    value: "3",
    suit: "clubs",
    artist: "andrea-dudgeon",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/761.jpg?2",
    winner: false,
  },
  {
    value: "3",
    suit: "spades",
    artist: "adelina-gavrila",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/763.jpg?2",
    winner: false,
  },
  {
    value: "3",
    suit: "diamonds",
    artist: "justas-cekauskas",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/764.jpg?2",
    winner: false,
  },
  {
    value: "4",
    suit: "clubs",
    artist: "antonios-antoniou",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/765.jpg?2",
    winner: false,
  },
  {
    value: "4",
    suit: "hearts",
    artist: "stephanie-landi",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/766.jpg?2",
    winner: false,
  },
  {
    value: "4",
    suit: "diamonds",
    artist: "liam-ball",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/768.jpg?2",
    winner: false,
  },
  {
    value: "5",
    suit: "hearts",
    artist: "tenbomb-artwork",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/770.jpg?2",
    winner: false,
  },
  {
    value: "5",
    suit: "spades",
    artist: "anna-stankevich",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/771.jpg?2",
    winner: false,
  },
  {
    value: "6",
    suit: "clubs",
    artist: "seva-mfn",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/773.jpg?2",
    winner: false,
  },
  {
    value: "6",
    suit: "hearts",
    artist: "daniel-ebert",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/774.jpg?2",
    winner: false,
  },
  {
    value: "6",
    suit: "spades",
    artist: "laura-facci",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/775.jpg?2",
    winner: false,
  },
  {
    value: "6",
    suit: "diamonds",
    artist: "paula-zuñiga",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/776.jpg?2",
    winner: false,
  },
  {
    value: "7",
    suit: "clubs",
    artist: "hannah-bess-ross",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/777.jpg?2",
    winner: false,
  },
  {
    value: "7",
    suit: "hearts",
    artist: "anna-mckay",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/778.jpg?2",
    winner: false,
  },
  {
    value: "7",
    suit: "spades",
    artist: "tahnee-vitrian",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/779.jpg?2",
    winner: false,
  },
  {
    value: "7",
    suit: "diamonds",
    artist: "angelyn-de-jesus",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/780.jpg?2",
    winner: false,
  },
  {
    value: "9",
    suit: "hearts",
    artist: "maki-kawakami",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/786.jpg?2",
    winner: false,
  },
  {
    value: "10",
    suit: "hearts",
    artist: "lilly-friedeberg-aka-elfriedes",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/790.jpg?2",
    winner: false,
  },
  {
    value: "10",
    suit: "spades",
    artist: "tomas-brechler",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/791.jpg?2",
    winner: false,
  },
  {
    value: "jack",
    suit: "hearts",
    artist: "iain-glynn",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/794.jpg?2",
    winner: false,
  },
  {
    value: "jack",
    suit: "diamonds",
    artist: "hugo-russell",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/796.jpg?2",
    winner: false,
  },
  {
    value: "queen",
    suit: "clubs",
    artist: "rodrock",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/797.jpg?2",
    winner: false,
  },
  {
    value: "queen",
    suit: "hearts",
    artist: "ren-vasiliev",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/798.jpg?2",
    winner: false,
  },
  {
    value: "queen",
    suit: "diamonds",
    artist: "picciotto-giuliano",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/800.jpg?2",
    winner: false,
  },
  {
    value: "king",
    suit: "diamonds",
    artist: "jade-ormsby",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/804.jpg?2",
    winner: false,
  },
  {
    value: "ace",
    suit: "spades",
    artist: "natalia-grezina",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/807.jpg?2",
    winner: false,
  },
  {
    value: "joker",
    suit: "black",
    artist: "fernando-fom",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/809.jpg?2",
    winner: false,
  },
  {
    value: "joker",
    suit: "red",
    artist: "javaria-m.-rafiq",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/810.jpg?2",
    winner: false,
  },
  {
    value: "2",
    suit: "spades",
    artist: "victor-beltrán",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/813.jpg?2",
    winner: false,
  },
  {
    value: "3",
    suit: "spades",
    artist: "harry-lewis-irlam",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/817.jpg?2",
    winner: false,
  },
  {
    value: "3",
    suit: "diamonds",
    artist: "mateusz-krol",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/818.jpg?2",
    winner: false,
  },
  {
    value: "4",
    suit: "hearts",
    artist: "mongo-gushi",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/820.jpg?2",
    winner: false,
  },
  {
    value: "4",
    suit: "spades",
    artist: "susana-téllez-montoro",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/821.jpg?2",
    winner: false,
  },
  {
    value: "4",
    suit: "diamonds",
    artist: "kevin-ruda",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/822.jpg?2",
    winner: false,
  },
  {
    value: "5",
    suit: "hearts",
    artist: "james-kendall",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/824.jpg?2",
    winner: false,
  },
  {
    value: "6",
    suit: "hearts",
    artist: "daria-golab",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/828.jpg?2",
    winner: false,
  },
  {
    value: "6",
    suit: "diamonds",
    artist: "marta-sorte",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/830.jpg?2",
    winner: false,
  },
  {
    value: "7",
    suit: "clubs",
    artist: "francesco-amorosino",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/831.jpg?2",
    winner: false,
  },
  {
    value: "7",
    suit: "hearts",
    artist: "giulia-baratella",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/832.jpg?2",
    winner: false,
  },
  {
    value: "7",
    suit: "spades",
    artist: "aneliya-barenska",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/833.jpg?2",
    winner: false,
  },
  {
    value: "7",
    suit: "diamonds",
    artist: "christopher-bowden",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/834.jpg?2",
    winner: false,
  },
  {
    value: "8",
    suit: "clubs",
    artist: "janine-kocher",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/835.jpg?2",
    winner: false,
  },
  {
    value: "8",
    suit: "spades",
    artist: "diego-l.-rodríguez",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/837.jpg?2",
    winner: false,
  },
  {
    value: "9",
    suit: "hearts",
    artist: "nico-lc",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/840.jpg?2",
    winner: false,
  },
  {
    value: "9",
    suit: "spades",
    artist: "julien-grunhagel",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/841.jpg?2",
    winner: false,
  },
  {
    value: "10",
    suit: "clubs",
    artist: "ollanski",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/843.jpg?2",
    winner: false,
  },
  {
    value: "jack",
    suit: "spades",
    artist: "fausto-gallego",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/849.jpg?2",
    winner: false,
  },
  {
    value: "jack",
    suit: "diamonds",
    artist: "robert-lövgren",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/850.jpg?2",
    winner: false,
  },
  {
    value: "queen",
    suit: "clubs",
    artist: "danilo-agutoli",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/851.jpg?2",
    winner: false,
  },
  {
    value: "queen",
    suit: "spades",
    artist: "yana",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/853.jpg?2",
    winner: false,
  },
  {
    value: "queen",
    suit: "diamonds",
    artist: "giovanni-maisto",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/854.jpg?2",
    winner: false,
  },
  {
    value: "king",
    suit: "clubs",
    artist: "verónica-llinares-benadero",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/855.jpg?2",
    winner: false,
  },
  {
    value: "king",
    suit: "hearts",
    artist: "ben-barter",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/856.jpg?2",
    winner: false,
  },
  {
    value: "king",
    suit: "spades",
    artist: "valentina-pelizziari",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/857.jpg?2",
    winner: false,
  },
  {
    value: "ace",
    suit: "clubs",
    artist: "neuneu-wu",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/859.jpg?2",
    winner: false,
  },
  {
    value: "ace",
    suit: "hearts",
    artist: "cédric-delahaye",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/860.jpg?2",
    winner: false,
  },
  {
    value: "joker",
    suit: "black",
    artist: "diego-fernandez",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/863.jpg?2",
    winner: false,
  },
  {
    value: "joker",
    suit: "red",
    artist: "mathias-doblhammer",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/864.jpg?2",
    winner: false,
  },
  {
    value: "2",
    suit: "clubs",
    artist: "alexandru-atanasiu-(-tokyotoys-)",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/865.jpg?2",
    winner: false,
  },
  {
    value: "2",
    suit: "diamonds",
    artist: "mayank",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/868.jpg?2",
    winner: false,
  },
  {
    value: "3",
    suit: "clubs",
    artist: "kanak-mishra",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/869.jpg?2",
    winner: false,
  },
  {
    value: "3",
    suit: "hearts",
    artist: "igor-šćekić",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/870.jpg?2",
    winner: false,
  },
  {
    value: "3",
    suit: "diamonds",
    artist: "daniel-dobleu",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/872.jpg?2",
    winner: false,
  },
  {
    value: "4",
    suit: "clubs",
    artist: "sam-thielemans",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/873.jpg?2",
    winner: false,
  },
  {
    value: "4",
    suit: "hearts",
    artist: "marcela-lanna",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/874.jpg?2",
    winner: false,
  },
  {
    value: "4",
    suit: "diamonds",
    artist: "ja-hale",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/876.jpg?2",
    winner: false,
  },
  {
    value: "5",
    suit: "spades",
    artist: "mariya-li",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/879.jpg?2",
    winner: false,
  },
  {
    value: "6",
    suit: "clubs",
    artist: "cristian-eres",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/881.jpg?2",
    winner: false,
  },
  {
    value: "2",
    suit: "hearts",
    artist: "stefano-pietramala",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/884.jpg?2",
    winner: false,
  },
  {
    value: "2",
    suit: "clubs",
    artist: "maría-fernanda-castro",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/normal/885.jpg?2",
    winner: false,
  },
];

const dump = async () => {
  await connect();
  await createDeck(slug, deck, cards);
};

export default dump;
