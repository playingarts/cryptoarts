import { connect } from "../source/mongoose";
import { createDeck } from "./_utils";

const dump = async () => {
  await connect();

  const slug = "two";

  const deck = {
    title: "Edition Two",
    slug,
    info:
      "From the two of clubs to the ace of spades, each card in this deck has been individually designed by one of the 55 selected international artists in their distinct style and technique.",
  };

  const cards = [
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/2-of-clubs-jonathan-calugi.jpg",
      artist: "jonathan-calugi",
      value: "2",
      suit: "clubs",
      info: "",
      deck: "two",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/2-of-diamonds-jon-lau.jpg",
      artist: "jon-lau",
      value: "2",
      suit: "diamonds",
      info: "",
      deck: "two",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/2-of-hearts-maria-gronlund.jpg",
      artist: "maria-grønlund",
      value: "2",
      suit: "hearts",
      info: "",
      deck: "two",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/2-of-spades-fictive-artist.jpg",
      artist: "fictive-artist",
      value: "2",
      suit: "spades",
      info: "",
      deck: "two",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/3-of-clubs-tamer-koseli.jpg",
      artist: "tamer-köseli",
      value: "3",
      suit: "clubs",
      info: "",
      deck: "two",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/two-big-hd/3-of-diamonds-zipeng-zhu.gif.jpg",
      artist: "zipeng-zhu",
      value: "3",
      suit: "diamonds",
      info: "",
      deck: "two",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/3-of-hearts-oscar-ramos.jpg",
      artist: "oscar-ramos",
      value: "3",
      suit: "hearts",
      info: "",
      deck: "two",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/3-of-spades-steven-wilson.jpg",
      artist: "steven-wilson",
      value: "3",
      suit: "spades",
      info: "",
      deck: "two",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/4-of-clubs-jeff-rogers.jpg",
      artist: "jeff-rogers",
      value: "4",
      suit: "clubs",
      info: "",
      deck: "two",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/4-of-diamonds-foreal.jpg",
      artist: "foreal™",
      value: "4",
      suit: "diamonds",
      info: "",
      deck: "two",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/4-of-hearts-steve-simpson.jpg",
      artist: "steve-simpson",
      value: "4",
      suit: "hearts",
      info: "",
      deck: "two",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/4-of-spades-anton-repponen.jpg",
      artist: "anton-repponen",
      value: "4",
      suit: "spades",
      info: "",
      deck: "two",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/5-of-clubs-mikey-burton.jpg",
      artist: "mikey-burton",
      value: "5",
      suit: "clubs",
      info: "",
      deck: "two",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/5-of-diamonds-patrick-seymour.jpg",
      artist: "patrick-seymour",
      value: "5",
      suit: "diamonds",
      info: "",
      deck: "two",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/5-of-hearts-charles-williams.jpg",
      artist: "charles-williams",
      value: "5",
      suit: "hearts",
      info: "",
      deck: "two",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/5-of-spades-gabriel-moreno.jpg",
      artist: "gabriel-moreno",
      value: "5",
      suit: "spades",
      info: "",
      deck: "two",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/6-of-clubs-migthy-short.jpg",
      artist: "mighty-short",
      value: "6",
      suit: "clubs",
      info: "",
      deck: "two",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/6-of-diamonds-ian-jepson.jpg",
      artist: "ian-jepson",
      value: "6",
      suit: "diamonds",
      info: "",
      deck: "two",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/6-of-hearts-freak-city.jpg",
      artist: "freak-city",
      value: "6",
      suit: "hearts",
      info: "",
      deck: "two",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/6-of-spades-zansky.jpg",
      artist: "zansky",
      value: "6",
      suit: "spades",
      info: "",
      deck: "two",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/7-of-clubs-adhemas-batista.jpg",
      artist: "adhemas-batista",
      value: "7",
      suit: "clubs",
      info: "",
      deck: "two",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/7-of-diamonds-sakiroo.jpg",
      artist: "sakiroo",
      value: "7",
      suit: "diamonds",
      info: "",
      deck: "two",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/7-of-hearts-antoni-tudisco.jpg",
      artist: "antoni-tudisco",
      value: "7",
      suit: "hearts",
      info: "",
      deck: "two",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/7-of-spades-chocotoy.jpg",
      artist: "choco-toy",
      value: "7",
      suit: "spades",
      info: "",
      deck: "two",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/8-of-clubs-zutto.jpg",
      artist: "zutto",
      value: "8",
      suit: "clubs",
      info: "",
      deck: "two",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/8-of-diamonds-mathis-rekowski.jpg",
      artist: "mathis-rekowski",
      value: "8",
      suit: "diamonds",
      info: "",
      deck: "two",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/8-of-hearts-van-orton-design.jpg",
      artist: "van-orton-design",
      value: "8",
      suit: "hearts",
      info: "",
      deck: "two",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/8-of-spades-rubens-scarelli.jpg",
      artist: "rubens-scarelli",
      value: "8",
      suit: "spades",
      info: "",
      deck: "two",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/9-of-clubs-skinpop-studio.jpg",
      artist: "skinpop-studio",
      value: "9",
      suit: "clubs",
      info: "",
      deck: "two",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/9-of-diamonds-viktor-miller-gausa.jpg",
      artist: "viktor-miller-gausa",
      value: "9",
      suit: "diamonds",
      info: "",
      deck: "two",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/9-of-hearts-irina-vinnik.jpg",
      artist: "irina-vinnik",
      value: "9",
      suit: "hearts",
      info: "",
      deck: "two",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/9-of-spades-pichet-rujivararat.jpg",
      artist: "pichet-rujivararat",
      value: "9",
      suit: "spades",
      info: "",
      deck: "two",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/10-of-clubs-mike-creative-mints.jpg",
      artist: "mike-/-creative-mints",
      value: "10",
      suit: "clubs",
      info: "",
      deck: "two",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/10-of-diamonds-kerby-rosanes.jpg",
      artist: "kerby-rosanes",
      value: "10",
      suit: "diamonds",
      info: "",
      deck: "two",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/10-of-hearts-david-sossella.jpg",
      artist: "david-sossella",
      value: "10",
      suit: "hearts",
      info: "",
      deck: "two",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/10-of-spades-marcelo-schultz.jpg",
      artist: "marcelo-schultz",
      value: "10",
      suit: "spades",
      info: "",
      deck: "two",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/jack-of-clubs-yury-ustsinau.jpg",
      artist: "yury-ustsinau",
      value: "j",
      suit: "clubs",
      info: "",
      deck: "two",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/jack-of-diamonds-stavros-damos.jpg",
      artist: "stavros-damos",
      value: "j",
      suit: "diamonds",
      info: "",
      deck: "two",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/jack-of-hearts-julian-ardila.jpg",
      artist: "julian-ardila",
      value: "j",
      suit: "hearts",
      info: "",
      deck: "two",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/jack-of-spades-peter-donnelly.jpg",
      artist: "peter-donnelly",
      value: "j",
      suit: "spades",
      info: "",
      deck: "two",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/queen-of-clubs-raphael-vicenzi.jpg",
      artist: "raphael-vicenzi",
      value: "q",
      suit: "clubs",
      info: "",
      deck: "two",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/queen-of-diamonds-pablo-jurado-ruiz.jpg",
      artist: "pablo-jurado-ruiz",
      value: "q",
      suit: "diamonds",
      info: "",
      deck: "two",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/queen-of-hearts-orlando-arocena.jpg",
      artist: "orlando-arocena",
      value: "q",
      suit: "hearts",
      info: "",
      deck: "two",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/queen-of-spades-zso-sara-blake.jpg",
      artist: "zso-(sara-blake)",
      value: "q",
      suit: "spades",
      info: "",
      deck: "two",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/king-of-clubs-burak-senturk.jpg",
      artist: "burak-sentürk",
      value: "k",
      suit: "clubs",
      info: "",
      deck: "two",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/king-of-diamonds-alexis-marcou.jpg",
      artist: "alexis-marcou",
      value: "k",
      suit: "diamonds",
      info: "",
      deck: "two",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/king-of-hearts-yoaz.jpg",
      artist: "yoaz",
      value: "k",
      suit: "hearts",
      info: "",
      deck: "two",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/king-of-spades-yeaaah-studio.jpg",
      artist: "yeaaah!-studio",
      value: "k",
      suit: "spades",
      info: "",
      deck: "two",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/ace-of-clubs-andreas-preis.jpg",
      artist: "andreas-preis",
      value: "a",
      suit: "clubs",
      info: "",
      deck: "two",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/ace-of-diamonds-joshua-davis.jpg",
      artist: "joshua-davis",
      value: "a",
      suit: "diamonds",
      info: "",
      deck: "two",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/ace-of-hearts-studio-blup.jpg",
      artist: "studio-blup",
      value: "a",
      suit: "hearts",
      info: "",
      deck: "two",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/ace-of-spades-ars-thanea.jpg",
      artist: "ars-thanea",
      value: "a",
      suit: "spades",
      info: "",
      deck: "two",
    },
    {
      video: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/joker-zombie-yeti.jpg",
      artist: "zombie-yeti",
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
      artist: "danny-ivan",
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
      artist: "amrei-hofstätter",
      value: "joker",
      suit: "red",
      info: "",
      deck: "two",
      name: "Red Joker",
    },
  ];

  await createDeck(slug, deck, cards);
};

export default dump;
