import { Artist } from "../source/graphql/schemas/artist";
import { Card } from "../source/graphql/schemas/card";
import { Deck } from "../source/graphql/schemas/deck";
import { connect } from "../source/mongoose";

const dump = async () => {
  await connect();

  const slug = "two";
  const currentDeck = await Deck.findOne({ slug });

  if (currentDeck) {
    await Deck.deleteMany({ slug });
    await Card.deleteMany({ deck: currentDeck._id });
  }

  const deck = {
    title: "Future Edition",
    slug,
    info:
      "299 international artists, designers and studios were using playing card as a canvas to illustrate their vision of what the world will look like 100 years from now. Selected artworks formed two Future Edition decks.",
  };

  const newDeck = await Deck.create(deck);

  let cards = [
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-gian-wong.jpg",
      artist: "gian-wong",
      opensea: "",
      suit: "clubs",
      deck: "three",
      info: "",
      value: "2",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/future/cards/diego-marmolejo.gif",
      artist: "diego-marmolejo",
      opensea: "",
      suit: "diamonds",
      deck: "three",
      info: "",
      value: "2",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/future/cards/olga-zalite.jpg",
      artist: "olga-zalite",
      opensea: "",
      suit: "hearts",
      deck: "three",
      info: "",
      value: "2",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-abraham-mast.jpg",
      artist: "abraham-mast",
      opensea: "",
      suit: "spades",
      deck: "three",
      info: "",
      value: "2",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/future/cards/antoine-goulet.jpg",
      artist: "antoine-goulet",
      opensea: "",
      suit: "clubs",
      deck: "three",
      info: "",
      value: "3",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/future/cards/el-diex.jpg",
      artist: "el-diex",
      opensea: "",
      suit: "diamonds",
      deck: "three",
      info: "",
      value: "3",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-mike-karolos.jpg",
      artist: "mike-karolos",
      opensea: "",
      suit: "hearts",
      deck: "three",
      info: "",
      value: "3",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/future/cards/angela-bardakjian.jpg",
      artist: "angela-bardakjian",
      opensea: "",
      suit: "spades",
      deck: "three",
      info: "",
      value: "3",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-toma-studio.jpg",
      artist: "toma-studio",
      opensea: "",
      suit: "clubs",
      deck: "three",
      info: "",
      value: "4",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/future/cards/maria-kulinskaya.jpg",
      artist: "maria-kulinskaya",
      opensea: "",
      suit: "diamonds",
      deck: "three",
      info: "",
      value: "4",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-luis-pinto.jpg",
      artist: "luis-pinto",
      opensea: "",
      suit: "hearts",
      deck: "three",
      info: "",
      value: "4",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-manuel-kilger.jpg",
      artist: "manuel-kilger",
      opensea: "",
      suit: "spades",
      deck: "three",
      info: "",
      value: "4",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/future/cards/illustrescu.jpg",
      artist: "illustrescu",
      opensea: "",
      suit: "clubs",
      deck: "three",
      info: "",
      value: "5",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/future/cards/amatita-studio.jpg",
      artist: "amatita-studio",
      opensea: "",
      suit: "diamonds",
      deck: "three",
      info: "",
      value: "5",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/future/cards/evgenia-makarova.jpg",
      artist: "evgenia-makarova",
      opensea: "",
      suit: "hearts",
      deck: "three",
      info: "",
      value: "5",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-antonio-uve.jpg",
      artist: "antonio-uve",
      opensea: "",
      suit: "spades",
      deck: "three",
      info: "",
      value: "5",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-javier-perez.jpg",
      artist: "javier-perez",
      opensea: "",
      suit: "clubs",
      deck: "three",
      info: "",
      value: "6",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-andrea-bojkovska.jpg",
      artist: "andrea-bojkovska",
      opensea: "",
      suit: "diamonds",
      deck: "three",
      info: "",
      value: "6",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/future/cards/ana-gomez-bernaus.jpg",
      artist: "ana-gomez-bernaus",
      opensea: "",
      suit: "hearts",
      deck: "three",
      info: "",
      value: "6",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-adriana-garcia.jpg",
      artist: "adriana-garcia",
      opensea: "",
      suit: "spades",
      deck: "three",
      info: "",
      value: "6",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-pj-offner.jpg",
      artist: "pj-offner",
      opensea: "",
      suit: "clubs",
      deck: "three",
      info: "",
      value: "7",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-ollie-hirst.jpg",
      artist: "ollie-hirst",
      opensea: "",
      suit: "diamonds",
      deck: "three",
      info: "",
      value: "7",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-marc-urtasun.jpg",
      artist: "marc-urtasun",
      opensea: "",
      suit: "hearts",
      deck: "three",
      info: "",
      value: "7",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-fran-labuschagne.jpg",
      artist: "fran-labuschagne",
      opensea: "",
      suit: "spades",
      deck: "three",
      info: "",
      value: "7",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/future/cards/ryan-coleman.jpg",
      artist: "ryan-coleman",
      opensea: "",
      suit: "clubs",
      deck: "three",
      info: "",
      value: "8",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/future/cards/long-vu.jpg",
      artist: "long-vu",
      opensea: "",
      suit: "diamonds",
      deck: "three",
      info: "",
      value: "8",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-peter-cobo.jpg",
      artist: "peter-cobo",
      opensea: "",
      suit: "hearts",
      deck: "three",
      info: "",
      value: "8",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/future/cards/noonmoon.jpg",
      artist: "noonmoon",
      opensea: "",
      suit: "spades",
      deck: "three",
      info: "",
      value: "8",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-laimute-varkalaite.jpg",
      artist: "laimutė-varkalaitė",
      opensea: "",
      suit: "clubs",
      deck: "three",
      info: "",
      value: "9",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-mildeo.jpg",
      artist: "mildeo",
      opensea: "",
      suit: "diamonds",
      deck: "three",
      info: "",
      value: "9",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-maria-fedoseeva.jpg",
      artist: "maria-fedoseeva",
      opensea: "",
      suit: "hearts",
      deck: "three",
      info: "",
      value: "9",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-victor-vergara.jpg",
      artist: "victor-vergara",
      opensea: "",
      suit: "spades",
      deck: "three",
      info: "",
      value: "9",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/future/cards/alex-pogrebniak.jpg",
      artist: "alex-pogrebniak",
      opensea: "",
      suit: "clubs",
      deck: "three",
      info: "",
      value: "10",
    },
    {
      video: "",
      img: "https://s3.amazonaws.com/img.playingarts.com/future/cards/xave.jpg",
      artist: "xave-(xavier-sánchez)",
      opensea: "",
      suit: "diamonds",
      deck: "three",
      info: "",
      value: "10",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/future/cards/ilyas-bentaleb.jpg",
      artist: "ilyas-bentaleb",
      opensea: "",
      suit: "hearts",
      deck: "three",
      info: "",
      value: "10",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-muti.jpg",
      artist: "muti",
      opensea: "",
      suit: "spades",
      deck: "three",
      info: "",
      value: "10",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-andra-popovici.jpg",
      artist: "andra-popovici",
      opensea: "",
      suit: "clubs",
      deck: "three",
      info: "",
      value: "j",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/future/cards/charlie-davis.jpg",
      artist: "charlie-davis",
      opensea: "",
      suit: "diamonds",
      deck: "three",
      info: "",
      value: "j",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/future/cards/daniel-shubin.jpg",
      artist: "daniel-shubin",
      opensea: "",
      suit: "hearts",
      deck: "three",
      info: "",
      value: "j",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-zinkete.jpg",
      artist: "zinkete",
      opensea: "",
      suit: "spades",
      deck: "three",
      info: "",
      value: "j",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-aleksandra-marchocka.jpg",
      artist: "aleksandra-marchocka",
      opensea: "",
      suit: "clubs",
      deck: "three",
      info: "",
      value: "q",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/future/cards/anna-kuptsova.jpg",
      artist: "anna-kuptsova",
      opensea: "",
      suit: "diamonds",
      deck: "three",
      info: "",
      value: "q",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-ruben-ireland.jpg",
      artist: "ruben-ireland",
      opensea: "",
      suit: "hearts",
      deck: "three",
      info: "",
      value: "q",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-one-horse-town.jpg",
      artist: "one-horse-town",
      opensea: "",
      suit: "spades",
      deck: "three",
      info: "",
      value: "q",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-renaud-lavency.jpg",
      artist: "renaud-lavency",
      opensea: "",
      suit: "clubs",
      deck: "three",
      info: "",
      value: "k",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/future/cards/raul-gil.jpg",
      artist: "raúl-gil",
      opensea: "",
      suit: "diamonds",
      deck: "three",
      info: "",
      value: "k",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-luna-buschinelli.jpg",
      artist: "luna-buschinelli",
      opensea: "",
      suit: "hearts",
      deck: "three",
      info: "",
      value: "k",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-marcelo-anache.jpg",
      artist: "marcelo-anache",
      opensea: "",
      suit: "spades",
      deck: "three",
      info: "",
      value: "k",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/future/cards/patrycja-krawczyk.jpg",
      artist: "patrycja-krawczyk",
      opensea: "",
      suit: "clubs",
      deck: "three",
      info: "",
      value: "a",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/future/cards/sergey-serebrennikov.jpg",
      artist: "sergey-serebrennikov",
      opensea: "",
      suit: "diamonds",
      deck: "three",
      info: "",
      value: "a",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/future/cards/iain-macarthur.jpg",
      artist: "iain-macarthur",
      opensea: "",
      suit: "hearts",
      deck: "three",
      info: "",
      value: "a",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/future/cards/dima-krab.jpg",
      artist: "dima-krab",
      opensea: "",
      suit: "spades",
      deck: "three",
      info: "",
      value: "a",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-mitt-roshin.jpg",
      artist: "mitt-roshin",
      opensea: "",
      suit: "black",
      deck: "three",
      info: "",
      value: "joker",
      name: "Black Joker",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/contest/retina/000.jpg",
      artist: "sebastian-onufszak",
      opensea: "",
      suit: "",
      deck: "three",
      info: "",
      value: "",
      name: "Backside",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/future/cards/adnan-ali.jpg",
      artist: "adnan-ali",
      opensea: "",
      suit: "blue",
      deck: "three",
      info: "",
      value: "joker",
      name: "Black Joker",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-dani-blazquez.jpg",
      artist: "dani-blázquez",
      opensea: "",
      suit: "red",
      deck: "three",
      info: "",
      value: "joker",
      name: "Red Joker",
    },
  ];

  cards = await Promise.all(
    cards.map(async (card) => {
      let artist = card.artist;

      if (card.artist) {
        const { _id } = (await Artist.findOne({ slug: card.artist })) || {
          _id: undefined,
        };

        artist = _id;
      }

      return { ...card, artist, deck: newDeck._id };
    })
  );

  await Card.insertMany(cards);
};

export default dump;
