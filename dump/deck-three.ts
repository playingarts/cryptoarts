import { connect } from "../source/mongoose";
import { createDeck } from "./_utils";

export const slug = "three";

export const deck = {
  title: "Edition Three",
  slug,
  info:
    "From the two of clubs to the ace of spades, each card in this deck has been individually designed by one of the 55 selected international artists in their distinct style and technique.",
};

export const cards = [
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/2-of-clubs-riccardo-guasco.jpg?2",
    video: "",
    opensea: "",
    artist: "riccardo-guasco",
    suit: "clubs",
    deck: "three",
    info: "",
    value: "2",
  },
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/2-of-dimonds-zooka.jpg?2",
    video: "",
    opensea: "",
    artist: "zooka",
    suit: "diamonds",
    deck: "three",
    info: "",
    value: "2",
  },
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/2-of-hearts-wade-jeffree.jpg?2",
    video: "",
    opensea: "",
    artist: "wade-jeffree",
    suit: "hearts",
    deck: "three",
    info: "",
    value: "2",
  },
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/2-of-spades-kate-ohara.jpg?2",
    video: "",
    opensea: "",
    artist: "kate-o’hara",
    suit: "spades",
    deck: "three",
    info: "",
    value: "2",
  },
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/3-of-clubs-david-mcleod.jpg?2",
    video: "",
    opensea: "",
    artist: "david-mcleod",
    suit: "clubs",
    deck: "three",
    info: "",
    value: "3",
  },
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/3-of-dimonds-burnt-toast-creative.jpg?2",
    video: "",
    opensea: "",
    artist: "burnt-toast-creative",
    suit: "diamonds",
    deck: "three",
    info: "",
    value: "3",
  },
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/3-of-hearts-dan-matutina.jpg?2",
    video: "",
    opensea: "",
    artist: "dan-matutina",
    suit: "hearts",
    deck: "three",
    info: "",
    value: "3",
  },
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/3-of-spades-antonio-rodrigues-jr.jpg?2",
    video: "",
    opensea: "",
    artist: "antonio-rodrigues-jr",
    suit: "spades",
    deck: "three",
    info: "",
    value: "3",
  },
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/4-of-clubs-victor-vergara.jpg?2",
    video: "",
    opensea: "",
    artist: "victor-vergara",
    suit: "clubs",
    deck: "three",
    info: "",
    value: "4",
  },
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/4-of-dimonds-edgar-rozo.jpg?2",
    video: "",
    opensea: "",
    artist: "edgar-rozo",
    suit: "diamonds",
    deck: "three",
    info: "",
    value: "4",
  },
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/4-of-hearts-tobias-hall.jpg?2",
    video: "",
    opensea: "",
    artist: "tobias-hall",
    suit: "hearts",
    deck: "three",
    info: "",
    value: "4",
  },
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/4-of-spades-inkration-studio.jpg?2",
    video: "",
    opensea: "",
    artist: "inkration-studio",
    suit: "spades",
    deck: "three",
    info: "",
    value: "4",
  },
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/5-of-clubs-justin-poulter.jpg?2",
    video: "",
    opensea: "",
    artist: "justin-poulter",
    suit: "clubs",
    deck: "three",
    info: "",
    value: "5",
  },
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/5-of-dimonds-leonardoworx.jpg?2",
    video: "",
    opensea: "",
    artist: "leonardoworx",
    suit: "diamonds",
    deck: "three",
    info: "",
    value: "5",
  },
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/5-of-hearts-bram-vanhaeren.jpg?2",
    video: "",
    opensea: "",
    artist: "bram-vanhaeren",
    suit: "hearts",
    deck: "three",
    info: "",
    value: "5",
  },
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/5-of-spades-leandro-castelao.jpg?2",
    video: "",
    opensea: "",
    artist: "leandro-castelao",
    suit: "spades",
    deck: "three",
    info: "",
    value: "5",
  },
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/6-of-clubs-middle-boop-gordon-reid.jpg?2",
    video: "",
    opensea: "",
    artist: "middle-boop-(gordon-reid)",
    suit: "clubs",
    deck: "three",
    info: "",
    value: "6",
  },
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/6-of-dimonds-francisco-miranda.jpg?2",
    video: "",
    opensea: "",
    artist: "francisco-miranda",
    suit: "diamonds",
    deck: "three",
    info: "",
    value: "6",
  },
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/6-of-hearts-man-tsun.jpg?2",
    video: "",
    opensea: "",
    artist: "man-tsun",
    suit: "hearts",
    deck: "three",
    info: "",
    value: "6",
  },
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/6-of-spades-charis-tsevis.jpg?2",
    video: "",
    opensea: "",
    artist: "charis-tsevis",
    suit: "spades",
    deck: "three",
    info: "",
    value: "6",
  },
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/7-of-clubs-saddo.jpg?2",
    video: "",
    opensea: "",
    artist: "saddo",
    suit: "clubs",
    deck: "three",
    info: "",
    value: "7",
  },
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/7-of-diamonds-rafael-mayani.jpg?2",
    video: "",
    opensea: "",
    artist: "rafael-mayani",
    suit: "diamonds",
    deck: "three",
    info: "",
    value: "7",
  },
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/7-of-hearts-velvet-spectrum.jpg?2",
    video: "",
    opensea: "",
    artist: "velvet-spectrum",
    suit: "hearts",
    deck: "three",
    info: "",
    value: "7",
  },
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/7-of-spades-aj-frena.jpg?2",
    video: "",
    opensea: "",
    artist: "aj-frena",
    suit: "spades",
    deck: "three",
    info: "",
    value: "7",
  },
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/8-of-clubs-andreas-preis.jpg?2",
    video: "",
    opensea: "",
    artist: "andreas-preis",
    suit: "clubs",
    deck: "three",
    info: "",
    value: "8",
  },
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/8-of-diamonds-pierre-kleinhouse.jpg?2",
    video: "",
    opensea: "",
    artist: "pierre-kleinhouse",
    suit: "diamonds",
    deck: "three",
    info: "",
    value: "8",
  },
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/8-of-hearts-amaia-arrazola.jpg?2",
    video: "",
    opensea: "",
    artist: "amaia-arrazola",
    suit: "hearts",
    deck: "three",
    info: "",
    value: "8",
  },
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/8-of-spades-mike-perry.jpg?2",
    video: "",
    opensea: "",
    artist: "mike-perry",
    suit: "spades",
    deck: "three",
    info: "",
    value: "8",
  },
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/9-of-clubs-karol-banach.jpg?2",
    video: "",
    opensea: "",
    artist: "karol-banach",
    suit: "clubs",
    deck: "three",
    info: "",
    value: "9",
  },
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/9-of-dimonds-ery-burns.jpg?2",
    video: "",
    opensea: "",
    artist: "ery-burns",
    suit: "diamonds",
    deck: "three",
    info: "",
    value: "9",
  },
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/9-of-hearts-will-scobie.jpg?2",
    video: "",
    opensea: "",
    artist: "will-scobie",
    suit: "hearts",
    deck: "three",
    info: "",
    value: "9",
  },
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/9-of-spades-jackson-alves.jpg?2",
    video: "",
    opensea: "",
    artist: "jackson-alves",
    suit: "spades",
    deck: "three",
    info: "",
    value: "9",
  },
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/10-of-clubs-jilipollo.jpg?2",
    video: "",
    opensea: "",
    artist: "jilipollo",
    suit: "clubs",
    deck: "three",
    info: "",
    value: "10",
  },
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/10-of-dimonds-justin-maller.jpg?2",
    video: "",
    opensea: "",
    artist: "justin-maller",
    suit: "diamonds",
    deck: "three",
    info: "",
    value: "10",
  },
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/10-of-hearts-daniel-shaffer.jpg?2",
    video: "",
    opensea: "",
    artist: "daniel-shaffer",
    suit: "hearts",
    deck: "three",
    info: "",
    value: "10",
  },
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/10-of-spades-bratislav-milenkovic.jpg?2",
    video: "",
    opensea: "",
    artist: "bratislav-milenkovic",
    suit: "spades",
    deck: "three",
    info: "",
    value: "10",
  },
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/jack-of-clubs-mister-thoms.jpg?2",
    video: "",
    opensea: "",
    artist: "mister-thoms",
    suit: "clubs",
    deck: "three",
    info: "",
    value: "j",
  },
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/jack-of-dimonds-alvaro-tapia-hidalgo.jpg?2",
    video: "",
    opensea: "",
    artist: "alvaro-tapia-hidalgo",
    suit: "diamonds",
    deck: "three",
    info: "",
    value: "j",
  },
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/jack-of-hearts-roman-klonek.jpg?2",
    video: "",
    opensea: "",
    artist: "roman-klonek",
    suit: "hearts",
    deck: "three",
    info: "",
    value: "j",
  },
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/jack-of-spades-grzegorz-domaradzki.jpg?2",
    video: "",
    opensea: "",
    artist: "grzegorz-domaradzki",
    suit: "spades",
    deck: "three",
    info: "",
    value: "j",
  },
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/queen-of-clubs-nikita-kaun.jpg?2",
    video: "",
    opensea: "",
    artist: "nikita-kaun",
    suit: "clubs",
    deck: "three",
    info: "",
    value: "q",
  },
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/queen-of-dimonds-nicolle-florian.jpg?2",
    video: "",
    opensea: "",
    artist: "nicolle-florian",
    suit: "diamonds",
    deck: "three",
    info: "",
    value: "q",
  },
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/queen-of-hearts-alessandro-pautasso.jpg?2",
    video: "",
    opensea: "",
    artist: "alessandro-pautasso",
    suit: "hearts",
    deck: "three",
    info: "",
    value: "q",
  },
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/queen-of-spades-david-vicente.jpg?2",
    video: "",
    opensea: "",
    artist: "d.vicente",
    suit: "spades",
    deck: "three",
    info: "",
    value: "q",
  },
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/king-of-clubs-angga-tantama.jpg?2",
    video: "",
    opensea: "",
    artist: "angga-tantama",
    suit: "clubs",
    deck: "three",
    info: "",
    value: "k",
  },
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/king-of-dimonds-skinpop-studio.jpg?2",
    video: "",
    opensea: "",
    artist: "skinpop-studio",
    suit: "diamonds",
    deck: "three",
    info: "",
    value: "k",
  },
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/king-of-hearts-denis-zilber.jpg?2",
    video: "",
    opensea: "",
    artist: "denis-zilber",
    suit: "hearts",
    deck: "three",
    info: "",
    value: "k",
  },
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/king-of-spades-jonny-wan.jpg?2",
    video: "",
    opensea: "",
    artist: "jonny-wan",
    suit: "spades",
    deck: "three",
    info: "",
    value: "k",
  },
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/ace-of-clubs-omaraqil.jpg?2",
    video: "",
    opensea: "",
    artist: "omaraqil",
    suit: "clubs",
    deck: "three",
    info: "",
    value: "a",
  },
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/ace-of-dimonds-joan-tarrago.jpg?2",
    video: "",
    opensea: "",
    artist: "joan-tarragó",
    suit: "diamonds",
    deck: "three",
    info: "",
    value: "a",
  },
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/ace-of-hearts-jesse-hernandez.jpg?2",
    video: "",
    opensea: "",
    artist: "jesse-hernandez",
    suit: "hearts",
    deck: "three",
    info: "",
    value: "a",
  },
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/ace-of-spades-gmunk.jpg?2",
    video: "",
    opensea: "",
    artist: "gmunk",
    suit: "spades",
    deck: "three",
    info: "",
    value: "a",
  },
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/joker-1-blackout-brother.jpg?2",
    video: "",
    opensea: "",
    artist: "blackout-brother",
    suit: "black",
    deck: "three",
    info: "",
    value: "joker",
  },
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/_backside-juan-diaz-faes.jpg?2",
    video: "",
    opensea: "",
    artist: "juan-díaz-faes",
    suit: "",
    deck: "three",
    info: "",
    value: "backside",
  },
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/joker-3-juan-diaz-faes.jpg?2",
    video: "",
    opensea: "",
    artist: "juan-díaz-faes",
    suit: "blue",
    deck: "three",
    info: "",
    value: "joker",
  },
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/joker-2-wes-art-studio.jpg?2",
    video: "",
    opensea: "",
    artist: "wes-art-studio",
    suit: "red",
    deck: "three",
    info: "",
    value: "joker",
  },
];

const dump = async () => {
  await connect();
  await createDeck(slug, deck, cards);
};

export default dump;
