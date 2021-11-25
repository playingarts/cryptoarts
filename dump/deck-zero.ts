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

  const cards = [
    {
      img:
        "https://s3.amazonaws.com/img.playingarts.com/zero-small-hd/2-of-clubs-timba-smits.jpg",
    },

    {
      img:
        "https://s3.amazonaws.com/img.playingarts.com/zero-small-hd/2-of-diamonds-jonathan-foerster.jpg",
    },

    {
      img:
        "https://s3.amazonaws.com/img.playingarts.com/zero-small-hd/2-of-hearts-sara-blake.jpg",
    },

    {
      img:
        "https://s3.amazonaws.com/img.playingarts.com/zero-small-hd/2-of-spades-raul-urias.jpg",
    },

    {
      img:
        "https://s3.amazonaws.com/img.playingarts.com/zero-small-hd/3-of-clubs-your-majesty.jpg",
    },

    {
      img:
        "https://s3.amazonaws.com/img.playingarts.com/zero-small-hd/3-of-diamonds-2advanced-studios.jpg",
    },

    {
      img:
        "https://s3.amazonaws.com/img.playingarts.com/zero-small-hd/3-of-hearts-joshua-davis.jpg",
    },

    {
      img:
        "https://s3.amazonaws.com/img.playingarts.com/zero-small-hd/3-of-spades-raphael-vicenzi.jpg",
    },

    {
      img:
        "https://s3.amazonaws.com/img.playingarts.com/zero-small-hd/4-of-clubs-brosmind.jpg",
    },

    {
      img:
        "https://s3.amazonaws.com/img.playingarts.com/zero-small-hd/4-of-diamonds-kervin-w-brisseaux.jpg",
    },

    {
      img:
        "https://s3.amazonaws.com/img.playingarts.com/zero-small-hd/4-of-hearts-loic-sattler.jpg",
    },

    {
      img:
        "https://s3.amazonaws.com/img.playingarts.com/zero-small-hd/4-of-spades-anton-repponen.jpg",
    },

    {
      img:
        "https://s3.amazonaws.com/img.playingarts.com/zero-small-hd/5-of-clubs-sorin-bechira.jpg",
    },

    {
      img:
        "https://s3.amazonaws.com/img.playingarts.com/zero-small-hd/5-of-diamonds-evgeny-kiselev.jpg",
    },

    {
      img:
        "https://s3.amazonaws.com/img.playingarts.com/zero-small-hd/5-of-hearts-matt-jones-aka-lunartik.jpg",
    },

    {
      img:
        "https://s3.amazonaws.com/img.playingarts.com/zero-small-hd/5-of-spades-rubens-cantuni.jpg",
    },

    {
      img:
        "https://s3.amazonaws.com/img.playingarts.com/zero-small-hd/6-of-clubs-vitalik-sheptuhin.jpg",
    },

    {
      img:
        "https://s3.amazonaws.com/img.playingarts.com/zero-small-hd/6-of-diamonds-matei-apostolescu.jpg",
    },

    {
      img:
        "https://s3.amazonaws.com/img.playingarts.com/zero-small-hd/6-of-hearts-pat-perry.jpg",
    },

    {
      img:
        "https://s3.amazonaws.com/img.playingarts.com/zero-small-hd/6-of-spades-design-is-dead.jpg",
    },

    {
      img:
        "https://s3.amazonaws.com/img.playingarts.com/zero-small-hd/7-of-clubs-sebastian-onufszak.jpg",
    },

    {
      img:
        "https://s3.amazonaws.com/img.playingarts.com/zero-small-hd/7-of-diamonds-iv-orlov.jpg",
    },

    {
      img:
        "https://s3.amazonaws.com/img.playingarts.com/zero-small-hd/7-of-hearts-saad-moosajee.jpg",
    },

    {
      img:
        "https://s3.amazonaws.com/img.playingarts.com/zero-small-hd/7-of-spades-brand-nu.jpg",
    },

    {
      img:
        "https://s3.amazonaws.com/img.playingarts.com/zero-small-hd/8-of-clubs-andreas-preis.jpg",
    },

    {
      img:
        "https://s3.amazonaws.com/img.playingarts.com/zero-small-hd/8-of-diamonds-valp.jpg",
    },

    {
      img:
        "https://s3.amazonaws.com/img.playingarts.com/zero-small-hd/8-of-hearts-geraldine-georges.jpg",
    },

    {
      img:
        "https://s3.amazonaws.com/img.playingarts.com/zero-small-hd/8-of-spades-justin-maller.jpg",
    },

    {
      img:
        "https://s3.amazonaws.com/img.playingarts.com/zero-small-hd/9-of-clubs-lucas-camargo-aka-flash.jpg",
    },

    {
      img:
        "https://s3.amazonaws.com/img.playingarts.com/zero-small-hd/9-of-diamonds-ari-weinkle.jpg",
    },

    {
      img:
        "https://s3.amazonaws.com/img.playingarts.com/zero-small-hd/9-of-hearts-hello-monday.jpg",
    },

    {
      img:
        "https://s3.amazonaws.com/img.playingarts.com/zero-small-hd/9-of-spades-kdlig.jpg",
    },

    {
      img:
        "https://s3.amazonaws.com/img.playingarts.com/zero-small-hd/10-of-clubs-magomed-dovjenko.jpg",
    },

    {
      img:
        "https://s3.amazonaws.com/img.playingarts.com/zero-small-hd/10-of-diamonds-fabian-ciraolo.jpg",
    },

    {
      img:
        "https://s3.amazonaws.com/img.playingarts.com/zero-small-hd/10-of-hearts-adhemas-batista.jpg",
    },

    {
      img:
        "https://s3.amazonaws.com/img.playingarts.com/zero-small-hd/10-of-spades-simplevector.jpg",
    },

    {
      img:
        "https://s3.amazonaws.com/img.playingarts.com/zero-small-hd/jack-of-clubs-mr-flurry.jpg",
    },

    {
      img:
        "https://s3.amazonaws.com/img.playingarts.com/zero-small-hd/jack-of-diamonds-nate-coonrod.jpg",
    },

    {
      img:
        "https://s3.amazonaws.com/img.playingarts.com/zero-small-hd/jack-of-hearts-jonathan-wong.jpg",
    },

    {
      img:
        "https://s3.amazonaws.com/img.playingarts.com/zero-small-hd/jack-of-spades-si-clark.jpg",
    },

    {
      img:
        "https://s3.amazonaws.com/img.playingarts.com/zero-small-hd/queen-of-clubs-lucas-de-alcantara.jpg",
    },

    {
      img:
        "https://s3.amazonaws.com/img.playingarts.com/zero-small-hd/queen-of-diamonds-michael-cina.jpg",
    },

    {
      img:
        "https://s3.amazonaws.com/img.playingarts.com/zero-small-hd/queen-of-hearts-jules.jpg",
    },

    {
      img:
        "https://s3.amazonaws.com/img.playingarts.com/zero-small-hd/queen-of-spades-michael-molloy.jpg",
    },

    {
      img:
        "https://s3.amazonaws.com/img.playingarts.com/zero-small-hd/king-of-clubs-james-white.jpg",
    },

    {
      img:
        "https://s3.amazonaws.com/img.playingarts.com/zero-small-hd/king-of-diamonds-olly-howe.jpg",
    },

    {
      img:
        "https://s3.amazonaws.com/img.playingarts.com/zero-small-hd/king-of-hearts-joao-oliveira.jpg",
    },

    {
      img:
        "https://s3.amazonaws.com/img.playingarts.com/zero-small-hd/king-of-spades-mr-kone.jpg",
    },

    {
      img:
        "https://s3.amazonaws.com/img.playingarts.com/zero-small-hd/ace-of-clubs-david-delin.jpg",
    },

    {
      img:
        "https://s3.amazonaws.com/img.playingarts.com/zero-small-hd/ace-of-diamonds-mike-harrison.jpg",
    },

    {
      img:
        "https://s3.amazonaws.com/img.playingarts.com/zero-small-hd/ace-of-hearts-zutto.jpg",
    },

    {
      img:
        "https://s3.amazonaws.com/img.playingarts.com/zero-small-hd/ace-of-spades-fill-ryabchikov.jpg",
    },

    {
      img:
        "https://s3.amazonaws.com/img.playingarts.com/zero-small-hd/joker-shotopop.jpg",
    },

    {
      img:
        "https://s3.amazonaws.com/img.playingarts.com/zero-small-hd/_backside-giga-kobidze.jpg",
    },

    {
      img:
        "https://s3.amazonaws.com/img.playingarts.com/zero-small-hd/joker-kenny-lindstrom.jpg",
    },
  ];

  await Card.insertMany(cards.map((card) => ({ ...card, deck: newDeck._id })));
};

export default dump;
