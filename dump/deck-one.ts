import { Card } from "../source/graphql/schemas/card";
import { Deck } from "../source/graphql/schemas/deck";
import { connect } from "../source/mongoose";
import { createDeck } from "./_utils";

const dump = async () => {
  await connect();

  const slug = "one";
  const currentDeck = await Deck.findOne({ slug });

  if (currentDeck) {
    await Deck.deleteMany({ slug });
    await Card.deleteMany({ deck: currentDeck._id });
  }

  const deck = {
    title: "Edition One",
    slug,
    info:
      "From the two of clubs to the ace of spades, each card in this deck has been individually designed by one of the 55 selected international artists in their distinct style and technique.",
  };

  const cards = [
    {
      artist: "tang-yau-hoong",
      info: "",
      suit: "clubs",
      value: "2",
      deck: "one",
      opensea: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/2-of-clubs-tang-yau-hoong.jpg",
      video: "",
    },
    {
      artist: "yema-yema",
      info: "",
      suit: "diamonds",
      value: "2",
      deck: "one",
      opensea: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/2-of-diamonds-yemayema.jpg",
      video: "",
    },
    {
      artist: "peter-tarka",
      info: "",
      suit: "hearts",
      value: "2",
      deck: "one",
      opensea: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/2-of-hearts-peter-tarka.jpg",
      video: "",
    },
    {
      artist: "mattias-adolfsson",
      info: "",
      suit: "spades",
      value: "2",
      deck: "one",
      opensea: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/2-of-spades-mattias-adolfsson.jpg",
      video: "",
    },
    {
      artist: "fernando-chamarelli",
      info: "",
      suit: "clubs",
      value: "3",
      deck: "one",
      opensea: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/3-of-clubs-fernando-chamarelli.jpg",
      video: "",
    },
    {
      artist: "carne-griffiths",
      info: "",
      suit: "diamonds",
      value: "3",
      deck: "one",
      opensea: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/3-of-diamonds-carne-griffiths.jpg",
      video: "",
    },
    {
      artist: "mercedes-debellard",
      info: "",
      suit: "hearts",
      value: "3",
      deck: "one",
      opensea: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/3-of-hearts-mercedes-debellard.jpg",
      video: "",
    },
    {
      artist: "teagan-white",
      info: "",
      suit: "spades",
      value: "3",
      deck: "one",
      opensea: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/3-of-spades-teagan-white.jpg",
      video: "",
    },
    {
      artist: "muti",
      info: "",
      suit: "clubs",
      value: "4",
      deck: "one",
      opensea: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/4-of-clubs-muti.jpg",
      video: "",
    },
    {
      artist: "peter-olschinsky",
      info: "",
      suit: "diamonds",
      value: "4",
      deck: "one",
      opensea: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/4-of-diamonds-peter-olschinsky.jpg",
      video: "",
    },
    {
      artist: "ruben-ireland",
      info: "",
      suit: "hearts",
      value: "4",
      deck: "one",
      opensea: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/4-of-hearts-ruben-ireland.jpg",
      video: "",
    },
    {
      artist: "serial-cut™",
      info: "",
      suit: "spades",
      value: "4",
      deck: "one",
      opensea: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/4-of-spades-serial-cut.jpg",
      video: "",
    },
    {
      artist: "valerie-ann-chua",
      info: "",
      suit: "clubs",
      value: "5",
      deck: "one",
      opensea: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/5-of-clubs-valerie-ann-chua.jpg",
      video: "",
    },
    {
      artist: "fab-ciraolo",
      info: "",
      suit: "diamonds",
      value: "5",
      deck: "one",
      opensea: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/5-of-diamonds-fab-ciraolo.jpg",
      video: "",
    },
    {
      artist: "aitch",
      info: "",
      suit: "hearts",
      value: "5",
      deck: "one",
      opensea: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/5-of-hearts-aitch.jpg",
      video: "",
    },
    {
      artist: "musketon",
      info: "",
      suit: "spades",
      value: "5",
      deck: "one",
      opensea: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/5-of-spades-musketon.jpg",
      video: "",
    },
    {
      artist: "tobias-van-schneider",
      info: "",
      suit: "clubs",
      value: "6",
      deck: "one",
      opensea: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/6-of-clubs-tobias-van-schneider.jpg",
      video: "",
    },
    {
      artist: "vasava",
      info: "",
      suit: "diamonds",
      value: "6",
      deck: "one",
      opensea: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/6-of-diamonds-vasava.jpg",
      video: "",
    },
    {
      artist: "javier-medellin-puyou",
      info: "",
      suit: "hearts",
      value: "6",
      deck: "one",
      opensea: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/6-of-hearts-javier-medellin-puyou.jpg",
      video: "",
    },
    {
      artist: "fernando-volken-togni",
      info: "",
      suit: "spades",
      value: "6",
      deck: "one",
      opensea: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/6-of-spades-fernando-volken-togni.jpg",
      video: "",
    },
    {
      artist: "krzysztof-chkn-nowak",
      info: "",
      suit: "clubs",
      value: "7",
      deck: "one",
      opensea: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/7-of-clubs-krzysztof-nowak.jpg",
      video: "",
    },
    {
      artist: "matt-w.-moore",
      info: "",
      suit: "diamonds",
      value: "7",
      deck: "one",
      opensea: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/7-of-diamonds-matt-w-moore.jpg",
      video: "",
    },
    {
      artist: "felix-laflamme",
      info: "",
      suit: "hearts",
      value: "7",
      deck: "one",
      opensea: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/7-of-hearts-felix-laflamme.jpg",
      video: "",
    },
    {
      artist: "muxxi",
      info: "",
      suit: "spades",
      value: "7",
      deck: "one",
      opensea: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/7-of-spades-muxxi.jpg",
      video: "",
    },
    {
      artist: "el-grand-chamaco",
      info: "",
      suit: "clubs",
      value: "8",
      deck: "one",
      opensea: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/8-of-clubs-el-grand-chamaco.jpg",
      video: "",
    },
    {
      artist: "jthree-concepts",
      info: "",
      suit: "diamonds",
      value: "8",
      deck: "one",
      opensea: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/8-of-diamonds-jthree-concepts.jpg",
      video: "",
    },
    {
      artist: "raul-urias",
      info: "",
      suit: "hearts",
      value: "8",
      deck: "one",
      opensea: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/8-of-hearts-raul-urias.jpg",
      video: "",
    },
    {
      artist: "gary-fernández",
      info: "",
      suit: "spades",
      value: "8",
      deck: "one",
      opensea: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/8-of-spades-gary-fernandez.jpg",
      video: "",
    },
    {
      artist: "chuck-anderson",
      info: "",
      suit: "clubs",
      value: "9",
      deck: "one",
      opensea: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/9-of-clubs-chuck-anderson.jpg",
      video: "",
    },
    {
      artist: "pirecco",
      info: "",
      suit: "diamonds",
      value: "9",
      deck: "one",
      opensea: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/9-of-diamonds-pirecco.jpg",
      video: "",
    },
    {
      artist: "carlos-lerma",
      info: "",
      suit: "hearts",
      value: "9",
      deck: "one",
      opensea: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/9-of-hearts-carlos-lerma.jpg",
      video: "",
    },
    {
      artist: "anton-repponen",
      info: "",
      suit: "spades",
      value: "9",
      deck: "one",
      opensea: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/9-of-spades-anton-repponen.jpg",
      video: "",
    },
    {
      artist: "hey",
      info: "",
      suit: "clubs",
      value: "10",
      deck: "one",
      opensea: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/10-of-clubs-hey.jpg",
      video: "",
    },
    {
      artist: "lei-melendres",
      info: "",
      suit: "diamonds",
      value: "10",
      deck: "one",
      opensea: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/10-of-diamonds-lei-melendres.jpg",
      video: "",
    },
    {
      artist: "caramelaw",
      info: "",
      suit: "hearts",
      value: "10",
      deck: "one",
      opensea: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/10-of-hearts-caramelaw.jpg",
      video: "",
    },
    {
      artist: "bicicleta-sem-freio",
      info: "",
      suit: "spades",
      value: "10",
      deck: "one",
      opensea: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/10-of-spades-bicicleta-sem-freio.jpg",
      video: "",
    },
    {
      artist: "bakea",
      info: "",
      suit: "clubs",
      value: "j",
      deck: "one",
      opensea: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/jack-of-clubs-bakea.jpg",
      video: "",
    },
    {
      artist: "newfren",
      info: "",
      suit: "diamonds",
      value: "j",
      deck: "one",
      opensea: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/jack-of-diamonds-newfren.jpg",
      video: "",
    },
    {
      artist: "steve-simpson",
      info: "",
      suit: "hearts",
      value: "j",
      deck: "one",
      opensea: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/jack-of-hearts-steve-simpson.jpg",
      video: "",
    },
    {
      artist: "seb-niark1",
      info: "",
      suit: "spades",
      value: "j",
      deck: "one",
      opensea: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/jack-of-spades-seb-niark1.jpg",
      video: "",
    },
    {
      artist: "ise-ananphada",
      info: "",
      suit: "clubs",
      value: "q",
      deck: "one",
      opensea: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/queen-of-clubs-ise-ananphada.jpg",
      video: "",
    },
    {
      artist: "agnes-cecile",
      info: "",
      suit: "diamonds",
      value: "q",
      deck: "one",
      opensea: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/queen-of-diamonds-agnes-cecile.jpg",
      video: "",
    },
    {
      artist: "conrad-roset",
      info: "",
      suit: "hearts",
      value: "q",
      deck: "one",
      opensea: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/queen-of-hearts-conrad-roset.jpg",
      video: "",
    },
    {
      artist: "david-mack",
      info: "",
      suit: "spades",
      value: "q",
      deck: "one",
      opensea: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/queen-of-spades-david-mack.jpg",
      video: "",
    },
    {
      artist: "james-white",
      info: "",
      suit: "clubs",
      value: "k",
      deck: "one",
      opensea: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/king-of-clubs-james-white.jpg",
      video: "",
    },
    {
      artist: "saturno-(the-creatter)",
      info: "",
      suit: "diamonds",
      value: "k",
      deck: "one",
      opensea: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/king-of-diamonds-saturno-the-creatter.jpg",
      video: "",
    },
    {
      artist: "zso-(sara-blake)",
      info: "",
      suit: "hearts",
      value: "k",
      deck: "one",
      opensea: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/king-of-hearts-sara-blake.jpg",
      video: "",
    },
    {
      artist: "yulia-brodskaya",
      info: "",
      suit: "spades",
      value: "k",
      deck: "one",
      opensea: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/king-of-spades-yulia-brodskaya.jpg",
      video: "",
    },
    {
      artist: "andreas-preis",
      info: "",
      suit: "clubs",
      value: "a",
      deck: "one",
      opensea: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/ace-of-clubs-andreas-preis.jpg",
      video: "",
    },
    {
      artist: "jordan-debney",
      info: "",
      suit: "diamonds",
      value: "a",
      deck: "one",
      opensea: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/ace-of-diamonds-jordan-debney.jpg",
      video: "",
    },
    {
      artist: "mr.-kone",
      info: "",
      suit: "hearts",
      value: "a",
      deck: "one",
      opensea: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/ace-of-hearts-mr-kone.jpg",
      video: "",
    },
    {
      artist: "iain-macarthur",
      info: "",
      suit: "spades",
      value: "a",
      deck: "one",
      opensea: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/ace-of-spades-iain-macarthur.jpg",
      video: "",
    },
    {
      artist: "mike-friedrich",
      info: "",
      suit: "black",
      value: "joker",
      deck: "one",
      opensea: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/joker-mike-friedrich.jpg",
      video: "",
      name: "Black Joker",
    },
    {
      artist: "evgeny-kiselev",
      info: "",
      suit: "",
      value: "",
      deck: "one",
      opensea: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/_backside-evgeny-kiselev.jpg",
      video: "",
      name: "Backside",
    },
    {
      artist: "joshua-davis",
      info: "",
      suit: "red",
      value: "joker",
      deck: "one",
      opensea: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/joker-joshua-davis.jpg",
      video: "",
      name: "Red Joker",
    },
  ];

  await createDeck(deck, cards);
};

export default dump;
