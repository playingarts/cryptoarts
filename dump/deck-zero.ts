import { Artist } from "../source/graphql/schemas/artist";
import { Card } from "../source/graphql/schemas/card";
import { Deck } from "../source/graphql/schemas/deck";
import { connect } from "../source/mongoose";

const dump = async () => {
  await connect();

  const slug = "zero";
  const currentDeck = await Deck.findOne({ slug });

  if (currentDeck) {
    await Deck.deleteMany({ slug });
    await Card.deleteMany({ deck: currentDeck._id });
  }

  const deck = {
    title: "Edition Zero",
    slug,
    info:
      "Edition Zero was released in 2012 and marked the beginning of Playing Arts series. Now we are bringing it back, powering by beautiful animations in Augmented Reality from today’s leading motion designers.",
  };

  const newDeck = await Deck.create(deck);

  let cards = [
    {
      artist: "Name",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/zero-small-hd/2-of-clubs-timba-smits.jpg",
    },

    {
      artist: "Name",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/zero-small-hd/2-of-diamonds-jonathan-foerster.jpg",
    },

    {
      artist: "Name",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/zero-small-hd/2-of-hearts-sara-blake.jpg",
    },

    {
      artist: "Name",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/zero-small-hd/2-of-spades-raul-urias.jpg",
    },

    {
      artist: "Name",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/zero-small-hd/3-of-clubs-your-majesty.jpg",
    },

    {
      artist: "Name",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/zero-small-hd/3-of-diamonds-2advanced-studios.jpg",
    },

    {
      artist: "Name",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/zero-small-hd/3-of-hearts-joshua-davis.jpg",
    },

    {
      artist: "Name",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/zero-small-hd/3-of-spades-raphael-vicenzi.jpg",
    },

    {
      artist: "Name",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/zero-small-hd/4-of-clubs-brosmind.jpg",
    },

    {
      artist: "Name",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/zero-small-hd/4-of-diamonds-kervin-w-brisseaux.jpg",
    },

    {
      artist: "Name",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/zero-small-hd/4-of-hearts-loic-sattler.jpg",
    },

    {
      artist: "Name",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/zero-small-hd/4-of-spades-anton-repponen.jpg",
    },

    {
      artist: "Name",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/zero-small-hd/5-of-clubs-sorin-bechira.jpg",
    },

    {
      artist: "Name",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/zero-small-hd/5-of-diamonds-evgeny-kiselev.jpg",
    },

    {
      artist: "Name",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/zero-small-hd/5-of-hearts-matt-jones-aka-lunartik.jpg",
    },

    {
      artist: "Name",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/zero-small-hd/5-of-spades-rubens-cantuni.jpg",
    },

    {
      artist: "Name",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/zero-small-hd/6-of-clubs-vitalik-sheptuhin.jpg",
    },

    {
      artist: "Name",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/zero-small-hd/6-of-diamonds-matei-apostolescu.jpg",
    },

    {
      artist: "Name",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/zero-small-hd/6-of-hearts-pat-perry.jpg",
    },

    {
      artist: "Name",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/zero-small-hd/6-of-spades-design-is-dead.jpg",
    },

    {
      artist: "Name",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/zero-small-hd/7-of-clubs-sebastian-onufszak.jpg",
    },

    {
      artist: "Name",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/zero-small-hd/7-of-diamonds-iv-orlov.jpg",
    },

    {
      artist: "Name",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/zero-small-hd/7-of-hearts-saad-moosajee.jpg",
    },

    {
      artist: "Name",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/zero-small-hd/7-of-spades-brand-nu.jpg",
    },

    {
      artist: "Name",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/zero-small-hd/8-of-clubs-andreas-preis.jpg",
    },

    {
      artist: "Name",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/zero-small-hd/8-of-diamonds-valp.jpg",
    },

    {
      artist: "Name",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/zero-small-hd/8-of-hearts-geraldine-georges.jpg",
    },

    {
      artist: "Name",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/zero-small-hd/8-of-spades-justin-maller.jpg",
    },

    {
      artist: "Name",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/zero-small-hd/9-of-clubs-lucas-camargo-aka-flash.jpg",
    },

    {
      artist: "Name",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/zero-small-hd/9-of-diamonds-ari-weinkle.jpg",
    },

    {
      artist: "Name",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/zero-small-hd/9-of-hearts-hello-monday.jpg",
    },

    {
      artist: "Name",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/zero-small-hd/9-of-spades-kdlig.jpg",
    },

    {
      artist: "Name",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/zero-small-hd/10-of-clubs-magomed-dovjenko.jpg",
    },

    {
      artist: "Name",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/zero-small-hd/10-of-diamonds-fabian-ciraolo.jpg",
    },

    {
      artist: "Name",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/zero-small-hd/10-of-hearts-adhemas-batista.jpg",
    },

    {
      artist: "Name",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/zero-small-hd/10-of-spades-simplevector.jpg",
    },

    {
      artist: "Name",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/zero-small-hd/jack-of-clubs-mr-flurry.jpg",
    },

    {
      artist: "Name",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/zero-small-hd/jack-of-diamonds-nate-coonrod.jpg",
    },

    {
      artist: "Name",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/zero-small-hd/jack-of-hearts-jonathan-wong.jpg",
    },

    {
      artist: "Name",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/zero-small-hd/jack-of-spades-si-clark.jpg",
    },

    {
      artist: "Name",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/zero-small-hd/queen-of-clubs-lucas-de-alcantara.jpg",
    },

    {
      artist: "Name",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/zero-small-hd/queen-of-diamonds-michael-cina.jpg",
    },

    {
      artist: "Name",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/zero-small-hd/queen-of-hearts-jules.jpg",
    },

    {
      artist: "Name",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/zero-small-hd/queen-of-spades-michael-molloy.jpg",
    },

    {
      artist: "Name",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/zero-small-hd/king-of-clubs-james-white.jpg",
    },

    {
      artist: "Name",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/zero-small-hd/king-of-diamonds-olly-howe.jpg",
    },

    {
      artist: "Name",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/zero-small-hd/king-of-hearts-joao-oliveira.jpg",
    },

    {
      artist: "Name",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/zero-small-hd/king-of-spades-mr-kone.jpg",
    },

    {
      artist: "Name",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/zero-small-hd/ace-of-clubs-david-delin.jpg",
    },

    {
      artist: "Name",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/zero-small-hd/ace-of-diamonds-mike-harrison.jpg",
    },

    {
      artist: "Name",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/zero-small-hd/ace-of-hearts-zutto.jpg",
    },

    {
      artist: "Name",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/zero-small-hd/ace-of-spades-fill-ryabchikov.jpg",
    },

    {
      artist: "Name",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/zero-small-hd/joker-shotopop.jpg",
    },

    {
      artist: "Name",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/zero-small-hd/_backside-giga-kobidze.jpg",
    },

    {
      artist: "Name",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/zero-small-hd/joker-kenny-lindstrom.jpg",
    },
  ];

  cards = await Promise.all(
    cards.map(async (card) => {
      let artist = card.artist;

      if (card.artist) {
        const { _id } = (await Artist.findOne({ name: card.artist })) || {
          _id: "",
        };

        artist = _id;
      }

      return { ...card, artist, deck: newDeck._id };
    })
  );

  await Card.insertMany(cards);
};

export default dump;
