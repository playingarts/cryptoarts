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
    title: "Edition Two",
    slug,
    info:
      "From the two of clubs to the ace of spades, each card in this deck has been individually designed by one of the 55 selected international artists in their distinct style and technique.",
  };

  const newDeck = await Deck.create(deck);

  let cards = [
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/2-of-clubs-jonathan-calugi.jpg",
      artist: "Jonathan Calugi",
      value: "2",
      suit: "clubs",
      info: "",
      deck: "two",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/2-of-diamonds-jon-lau.jpg",
      artist: "Jon Lau",
      value: "2",
      suit: "diamonds",
      info: "",
      deck: "two",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/2-of-hearts-maria-gronlund.jpg",
      artist: "Maria Grønlund",
      value: "2",
      suit: "hearts",
      info: "",
      deck: "two",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/2-of-spades-fictive-artist.jpg",
      artist: "Fictive Artist",
      value: "2",
      suit: "spades",
      info: "",
      deck: "two",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/3-of-clubs-tamer-koseli.jpg",
      artist: "Tamer Köseli",
      value: "3",
      suit: "clubs",
      info: "",
      deck: "two",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/two-big-hd/3-of-diamonds-zipeng-zhu.gif.jpg",
      artist: "Zipeng Zhu",
      value: "3",
      suit: "diamonds",
      info: "",
      deck: "two",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/3-of-hearts-oscar-ramos.jpg",
      artist: "Oscar Ramos",
      value: "3",
      suit: "hearts",
      info: "",
      deck: "two",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/3-of-spades-steven-wilson.jpg",
      artist: "Steven Wilson",
      value: "3",
      suit: "spades",
      info: "",
      deck: "two",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/4-of-clubs-jeff-rogers.jpg",
      artist: "Jeff Rogers",
      value: "4",
      suit: "clubs",
      info: "",
      deck: "two",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/4-of-diamonds-foreal.jpg",
      artist: "FOREAL™",
      value: "4",
      suit: "diamonds",
      info: "",
      deck: "two",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/4-of-hearts-steve-simpson.jpg",
      artist: "Steve Simpson",
      value: "4",
      suit: "hearts",
      info: "",
      deck: "two",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/4-of-spades-anton-repponen.jpg",
      artist: "Anton Repponen",
      value: "4",
      suit: "spades",
      info: "",
      deck: "two",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/5-of-clubs-mikey-burton.jpg",
      artist: "Mikey Burton",
      value: "5",
      suit: "clubs",
      info: "",
      deck: "two",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/5-of-diamonds-patrick-seymour.jpg",
      artist: "Patrick Seymour",
      value: "5",
      suit: "diamonds",
      info: "",
      deck: "two",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/5-of-hearts-charles-williams.jpg",
      artist: "Charles Williams",
      value: "5",
      suit: "hearts",
      info: "",
      deck: "two",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/5-of-spades-gabriel-moreno.jpg",
      artist: "Gabriel Moreno",
      value: "5",
      suit: "spades",
      info: "",
      deck: "two",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/6-of-clubs-migthy-short.jpg",
      artist: "MIGHTY SHORT",
      value: "6",
      suit: "clubs",
      info: "",
      deck: "two",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/6-of-diamonds-ian-jepson.jpg",
      artist: "Ian Jepson",
      value: "6",
      suit: "diamonds",
      info: "",
      deck: "two",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/6-of-hearts-freak-city.jpg",
      artist: "FREAK CITY",
      value: "6",
      suit: "hearts",
      info: "",
      deck: "two",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/6-of-spades-zansky.jpg",
      artist: "Zansky",
      value: "6",
      suit: "spades",
      info: "",
      deck: "two",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/7-of-clubs-adhemas-batista.jpg",
      artist: "Adhemas Batista",
      value: "7",
      suit: "clubs",
      info: "",
      deck: "two",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/7-of-diamonds-sakiroo.jpg",
      artist: "Sakiroo",
      value: "7",
      suit: "diamonds",
      info: "",
      deck: "two",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/7-of-hearts-antoni-tudisco.jpg",
      artist: "Antoni Tudisco",
      value: "7",
      suit: "hearts",
      info: "",
      deck: "two",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/7-of-spades-chocotoy.jpg",
      artist: "Choco Toy",
      value: "7",
      suit: "spades",
      info: "",
      deck: "two",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/8-of-clubs-zutto.jpg",
      artist: "Zutto",
      value: "8",
      suit: "clubs",
      info: "",
      deck: "two",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/8-of-diamonds-mathis-rekowski.jpg",
      artist: "Mathis Rekowski",
      value: "8",
      suit: "diamonds",
      info: "",
      deck: "two",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/8-of-hearts-van-orton-design.jpg",
      artist: "Van Orton Design",
      value: "8",
      suit: "hearts",
      info: "",
      deck: "two",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/8-of-spades-rubens-scarelli.jpg",
      artist: "Rubens Scarelli",
      value: "8",
      suit: "spades",
      info: "",
      deck: "two",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/9-of-clubs-skinpop-studio.jpg",
      artist: "SKINPOP STUDIO",
      value: "9",
      suit: "clubs",
      info: "",
      deck: "two",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/9-of-diamonds-viktor-miller-gausa.jpg",
      artist: "Viktor Miller-Gausa",
      value: "9",
      suit: "diamonds",
      info: "",
      deck: "two",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/9-of-hearts-irina-vinnik.jpg",
      artist: "Irina Vinnik",
      value: "9",
      suit: "hearts",
      info: "",
      deck: "two",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/9-of-spades-pichet-rujivararat.jpg",
      artist: "Pichet Rujivararat",
      value: "9",
      suit: "spades",
      info: "",
      deck: "two",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/10-of-clubs-mike-creative-mints.jpg",
      artist: "Mike / Creative Mints",
      value: "10",
      suit: "clubs",
      info: "",
      deck: "two",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/10-of-diamonds-kerby-rosanes.jpg",
      artist: "Kerby Rosanes",
      value: "10",
      suit: "diamonds",
      info: "",
      deck: "two",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/10-of-hearts-david-sossella.jpg",
      artist: "David Sossella",
      value: "10",
      suit: "hearts",
      info: "",
      deck: "two",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/10-of-spades-marcelo-schultz.jpg",
      artist: "Marcelo Schultz",
      value: "10",
      suit: "spades",
      info: "",
      deck: "two",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/jack-of-clubs-yury-ustsinau.jpg",
      artist: "Yury Ustsinau",
      value: "j",
      suit: "clubs",
      info: "",
      deck: "two",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/jack-of-diamonds-stavros-damos.jpg",
      artist: "Stavros Damos",
      value: "j",
      suit: "diamonds",
      info: "",
      deck: "two",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/jack-of-hearts-julian-ardila.jpg",
      artist: "Julian Ardila",
      value: "j",
      suit: "hearts",
      info: "",
      deck: "two",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/jack-of-spades-peter-donnelly.jpg",
      artist: "Peter Donnelly",
      value: "j",
      suit: "spades",
      info: "",
      deck: "two",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/queen-of-clubs-raphael-vicenzi.jpg",
      artist: "Raphaël Vicenzi",
      value: "q",
      suit: "clubs",
      info: "",
      deck: "two",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/queen-of-diamonds-pablo-jurado-ruiz.jpg",
      artist: "Pablo Jurado Ruiz",
      value: "q",
      suit: "diamonds",
      info: "",
      deck: "two",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/queen-of-hearts-orlando-arocena.jpg",
      artist: "Orlando Arocena",
      value: "q",
      suit: "hearts",
      info: "",
      deck: "two",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/queen-of-spades-zso-sara-blake.jpg",
      artist: "ZSO (Sara Blake)",
      value: "q",
      suit: "spades",
      info: "",
      deck: "two",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/king-of-clubs-burak-senturk.jpg",
      artist: "Burak Sentürk",
      value: "k",
      suit: "clubs",
      info: "",
      deck: "two",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/king-of-diamonds-alexis-marcou.jpg",
      artist: "Alexis Marcou",
      value: "k",
      suit: "diamonds",
      info: "",
      deck: "two",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/king-of-hearts-yoaz.jpg",
      artist: "YoAz",
      value: "k",
      suit: "hearts",
      info: "",
      deck: "two",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/king-of-spades-yeaaah-studio.jpg",
      artist: "Yeaaah! Studio",
      value: "k",
      suit: "spades",
      info: "",
      deck: "two",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/ace-of-clubs-andreas-preis.jpg",
      artist: "Andreas Preis",
      value: "a",
      suit: "clubs",
      info: "",
      deck: "two",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/ace-of-diamonds-joshua-davis.jpg",
      artist: "Joshua Davis",
      value: "a",
      suit: "diamonds",
      info: "",
      deck: "two",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/ace-of-hearts-studio-blup.jpg",
      artist: "STUDIO BLUP",
      value: "a",
      suit: "hearts",
      info: "",
      deck: "two",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/ace-of-spades-ars-thanea.jpg",
      artist: "Ars Thanea",
      value: "a",
      suit: "spades",
      info: "",
      deck: "two",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/joker-zombie-yeti.jpg",
      artist: "Zombie Yeti",
      value: "joker",
      suit: "black",
      info: "",
      deck: "two",
      name: "Black Joker",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/_backside-danny-ivan.jpg",
      artist: "Danny Ivan",
      value: "",
      suit: "",
      info: "",
      deck: "two",
      name: "Backside",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/joker-amrei-hofstatter.jpg",
      artist: "Amrei Hofstätter",
      value: "joker",
      suit: "red",
      info: "",
      deck: "two",
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
