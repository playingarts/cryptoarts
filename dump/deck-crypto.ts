import { connect } from "../source/mongoose";
import { createDeck } from "./_utils";

export const slug = "crypto";

export const deck: Omit<GQL.Deck, "_id"> = {
  title: "Crypto Edition",
  short: "Crypto",
  slug,
  info: "A deck of playing cards featuring works of 55 leading artists. Unique digital art collectibles living on the Ethereum blockchain.",
  openseaCollection: "cryptoedition",
  openseaContract: "0xC22616E971a670E72F35570337e562c3E515FBFE",
  cardBackground: "#181818",
  image:
    "https://s3.amazonaws.com/img.playingarts.com/www/decks/deck_crypto.jpg",
  backgroundImage:
    "https://s3.amazonaws.com/img.playingarts.com/www/static/deck_crypto_bg.jpg",
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
    artist: "leonardoworx",
    info:
      "“The idea behind this 2 of spades is to contain a hidden (crypto) story in a big structure. This structure (or sculpture) is a oneline Bold typographic TWO. Many things happen inside it. There are strange monocles creatures (2 of them with the head of spades logo), others, like worms that move around the sculpture. And abstract eyes that try to follow all the things are happening around them. The artwork Is colorful and full of harmonious shapes in order to remind that FUN is the key when you play with friends, even with a crypto card and a crypto story like this :)”",
    suit: "spades",
    value: "2",
    deck: "crypto",
    opensea:
      "https://opensea.io/collection/cryptoedition?search[sortAscending]=true&search[sortBy]=PRICE&search[stringTraits][0][name]=Value&search[stringTraits][0][values][0]=2&search[stringTraits][1][name]=Suit&search[stringTraits][1][values][0]=Spades&search[toggles][0]=BUY_NOW",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/2-s-7Tw67g2w.jpg",
    video:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/2-s-7Tw67g2w.mp4",
  },

  {
    artist: "khyati-trehan",
    info:
      "“I used the metaphor of collaging, which is an assemblage of independent forms that create a new whole, to echo a key tenet of decentralisation: distribution. In that same spirit, two partners exist as fragments of themselves; as limbs, and still find themselves connected to each other.”",
    suit: "hearts",
    value: "2",
    deck: "crypto",
    opensea:
      "https://opensea.io/collection/cryptoedition?search[sortAscending]=true&search[sortBy]=PRICE&search[stringTraits][0][name]=Value&search[stringTraits][0][values][0]=2&search[stringTraits][1][name]=Suit&search[stringTraits][1][values][0]=Hearts&search[toggles][0]=BUY_NOW",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/2-h-4si4nh43.jpg",
    video:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/2-h-4si4nh43.mp4",
  },

  {
    artist: "totemical",
    info:
      "“Two figures bound together by flow and light create an iridescent manifestation reflecting the duality of life.”",
    suit: "clubs",
    value: "2",
    deck: "crypto",
    opensea:
      "https://opensea.io/collection/cryptoedition?search[sortAscending]=true&search[sortBy]=PRICE&search[stringTraits][0][name]=Value&search[stringTraits][0][values][0]=2&search[stringTraits][1][name]=Suit&search[stringTraits][1][values][0]=Clubs&search[toggles][0]=BUY_NOW",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/2-c-jpi8Q728.jpg",
    video:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/2-c-jpi8Q728.mp4",
  },

  {
    artist: "reo",
    info:
      "“Two is a sign of union. And diamonds are a sign of prosperity. I wanted to show the duality using my Ugly character wearing a twofaced mask. I put the diamonds in pineal gland to show that two of diamonds represent people who have a great mind for success and financial security.”",
    suit: "diamonds",
    value: "2",
    deck: "crypto",
    opensea:
      "https://opensea.io/collection/cryptoedition?search[sortAscending]=true&search[sortBy]=PRICE&search[stringTraits][0][name]=Value&search[stringTraits][0][values][0]=2&search[stringTraits][1][name]=Suit&search[stringTraits][1][values][0]=Diamonds&search[toggles][0]=BUY_NOW",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/2-d-QK444t2B.jpg",
    video:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/2-d-QK444t2B.mp4?3",
  },

  {
    artist: "arbenl1berateme",
    info:
      "“I tried to visualize how deep this ”space” is (infinite). But I also made it kind of hypnotic and mesmerizing to watch.”",
    suit: "spades",
    value: "3",
    deck: "crypto",
    opensea:
      "https://opensea.io/collection/cryptoedition?search[sortAscending]=true&search[sortBy]=PRICE&search[stringTraits][0][name]=Value&search[stringTraits][0][values][0]=3&search[stringTraits][1][name]=Suit&search[stringTraits][1][values][0]=Spades&search[toggles][0]=BUY_NOW",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/3-s-i8m8y6K6.jpg",
    video:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/3-s-i8m8y6K6.mp4",
  },

  {
    artist: "victor-vector",
    info:
      "“3 Hearts Card is a digital kinetic sculpture driven by multiple independent connections. All the parts are launching in motion on a single platform to bring us the hypnotizing effect and unparalleled visual delight.”",
    suit: "hearts",
    value: "3",
    deck: "crypto",
    opensea:
      "https://opensea.io/collection/cryptoedition?search[sortAscending]=true&search[sortBy]=PRICE&search[stringTraits][0][name]=Value&search[stringTraits][0][values][0]=3&search[stringTraits][1][name]=Suit&search[stringTraits][1][values][0]=Hearts&search[toggles][0]=BUY_NOW",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/3-h-4J4x76NB.jpg",
    video:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/3-h-4J4x76NB.mp4",
  },

  {
    artist: "velvet-spectrum",
    info:
      "“A mergance with the digital world, where ideas become the currency.”",
    suit: "clubs",
    value: "3",
    deck: "crypto",
    opensea:
      "https://opensea.io/collection/cryptoedition?search[sortAscending]=true&search[sortBy]=PRICE&search[stringTraits][0][name]=Value&search[stringTraits][0][values][0]=3&search[stringTraits][1][name]=Suit&search[stringTraits][1][values][0]=Clubs&search[toggles][0]=BUY_NOW",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/3-c-74h8P8ea.jpg",
    video:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/3-c-74h8P8ea.mp4",
  },

  {
    artist: "oscar-pettersson",
    info: "“Ethereum blockchain on repeat, forever.”",
    suit: "diamonds",
    value: "3",
    deck: "crypto",
    opensea:
      "https://opensea.io/collection/cryptoedition?search[sortAscending]=true&search[sortBy]=PRICE&search[stringTraits][0][name]=Value&search[stringTraits][0][values][0]=3&search[stringTraits][1][name]=Suit&search[stringTraits][1][values][0]=Diamonds&search[toggles][0]=BUY_NOW",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/3-d-49uM72Vj.jpg",
    video:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/3-d-49uM72Vj.mp4",
  },

  {
    artist: "igor-garybaldi",
    info:
      "“Decentralization is not only freedom, it is also power concentrated in the hands of many, not just one. A system where everyone is responsible for everyone, built on total transparency and honesty. This is the future.”",
    suit: "spades",
    value: "4",
    deck: "crypto",
    opensea:
      "https://opensea.io/collection/cryptoedition?search[sortAscending]=true&search[sortBy]=PRICE&search[stringTraits][0][name]=Value&search[stringTraits][0][values][0]=4&search[stringTraits][1][name]=Suit&search[stringTraits][1][values][0]=Spades&search[toggles][0]=BUY_NOW",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/4-s-23Yoz7D8.jpg",
    video:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/4-s-23Yoz7D8.mp4",
  },

  {
    artist: "eloh",
    info:
      "“The 4 of Hearts offers the prospect of release. It is a positive talisman for those who seek to dissolve the hardness of their own hearts in order to fully love.”",
    suit: "hearts",
    value: "4",
    deck: "crypto",
    opensea:
      "https://opensea.io/collection/cryptoedition?search[sortAscending]=true&search[sortBy]=PRICE&search[stringTraits][0][name]=Value&search[stringTraits][0][values][0]=4&search[stringTraits][1][name]=Suit&search[stringTraits][1][values][0]=Hearts&search[toggles][0]=BUY_NOW",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/4-h-sB7393iz.jpg",
    video:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/4-h-sB7393iz.mp4",
  },

  {
    artist: "igor-scekic",
    info:
      "“Organic alien structure from the Multiverse of Love. All parts of the system are independent of other parts and acts on their own but they are all parts of one big mechanism. The system will continue to work even after some parts are removed or became non-functional.”",
    suit: "clubs",
    value: "4",
    deck: "crypto",
    opensea:
      "https://opensea.io/collection/cryptoedition?search[sortAscending]=true&search[sortBy]=PRICE&search[stringTraits][0][name]=Value&search[stringTraits][0][values][0]=4&search[stringTraits][1][name]=Suit&search[stringTraits][1][values][0]=Clubs&search[toggles][0]=BUY_NOW",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/4-c-977Jh2ML.jpg",
    video:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/4-c-977Jh2ML.mp4",
  },

  {
    artist: "prateek-vatash",
    info:
      "“The idea of the congruence of four shiny diamonds – creator, owner, blockchain and safe value transfer – is an idea whose time has come. NFT has opened this bright new gateway to challenge the notion of traditional ownership.”",
    suit: "diamonds",
    value: "4",
    deck: "crypto",
    opensea:
      "https://opensea.io/collection/cryptoedition?search[sortAscending]=true&search[sortBy]=PRICE&search[stringTraits][0][name]=Value&search[stringTraits][0][values][0]=4&search[stringTraits][1][name]=Suit&search[stringTraits][1][values][0]=Diamonds&search[toggles][0]=BUY_NOW",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/4-d-9Egv9F37.jpg",
    video:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/4-d-9Egv9F37.mp4",
  },

  {
    artist: "bram-vanhaeren",
    info:
      "“Virtutis Praemium — Virtue is its own reward. When we do good, we don’t need any reward. The knowledge we have done good, is the reward.”",
    suit: "spades",
    value: "5",
    deck: "crypto",
    opensea:
      "https://opensea.io/collection/cryptoedition?search[sortAscending]=true&search[sortBy]=PRICE&search[stringTraits][0][name]=Value&search[stringTraits][0][values][0]=5&search[stringTraits][1][name]=Suit&search[stringTraits][1][values][0]=Spades&search[toggles][0]=BUY_NOW",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/5-s-gd8kN968.jpg",
    video:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/5-s-gd8kN968.mp4",
  },

  {
    artist: "jonathan-monaghan",
    info:
      "“A bitcoin ATM is fused with baroque regalia, taking on otherworldly presence. The piece hints at a future markedly different from the current financial centers of power.”",
    suit: "hearts",
    value: "5",
    deck: "crypto",
    opensea:
      "https://opensea.io/collection/cryptoedition?search[sortAscending]=true&search[sortBy]=PRICE&search[stringTraits][0][name]=Value&search[stringTraits][0][values][0]=5&search[stringTraits][1][name]=Suit&search[stringTraits][1][values][0]=Hearts&search[toggles][0]=BUY_NOW",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/5-h-4zt6a92h.jpg",
    video:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/5-h-4zt6a92h.mp4",
  },

  {
    artist: "rwr2",
    info:
      "“We converge in the metaverse, we are diverse, we have the right for privacy and we will create a new world together. Power to the people.”",
    suit: "clubs",
    value: "5",
    deck: "crypto",
    opensea:
      "https://opensea.io/collection/cryptoedition?search[sortAscending]=true&search[sortBy]=PRICE&search[stringTraits][0][name]=Value&search[stringTraits][0][values][0]=5&search[stringTraits][1][name]=Suit&search[stringTraits][1][values][0]=Clubs&search[toggles][0]=BUY_NOW",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/5-c-k44Q6m9v.jpg",
    video:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/5-c-k44Q6m9v.mp4",
  },

  {
    artist: "fesq",
    info: "“Dispersed thoughts circle around waiting for alignment.”",
    suit: "diamonds",
    value: "5",
    deck: "crypto",
    opensea:
      "https://opensea.io/collection/cryptoedition?search[sortAscending]=true&search[sortBy]=PRICE&search[stringTraits][0][name]=Value&search[stringTraits][0][values][0]=5&search[stringTraits][1][name]=Suit&search[stringTraits][1][values][0]=Diamonds&search[toggles][0]=BUY_NOW",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/5-d-2Yb48c3D.jpg",
    video:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/5-d-2Yb48c3D.mp4",
  },

  {
    artist: "magdiel-lopez",
    info:
      "“Six is considered by many as the number of men. Human nature is full of cycles of beauty, ambition, clarity, and darkness. What better way to describe ourselves than with the idea of a never-ending cycle of ups and downs, success and failures, even life and death. The person we are today is only a temporary image that stops existing whenever we make the next decision. It’s up to you to determine the next move, but we all know how the story ends. At the end of the day, we are only Sixes.”",
    suit: "spades",
    value: "6",
    deck: "crypto",
    opensea:
      "https://opensea.io/collection/cryptoedition?search[sortAscending]=true&search[sortBy]=PRICE&search[stringTraits][0][name]=Value&search[stringTraits][0][values][0]=6&search[stringTraits][1][name]=Suit&search[stringTraits][1][values][0]=Spades&search[toggles][0]=BUY_NOW",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/6-s-sx39U4U8.jpg",
    video:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/6-s-sx39U4U8.mp4",
  },

  {
    artist: "andy-needham",
    info:
      "“The animation focuses on a central abstract “heart” which has six energy cores inside it. Energy that is emitted from the main element is decentralized, flowing away from the hub as six beating hearts orbit the central heart. I used hexagons as a basis to build out the surfaces. Stylistically, I explored the interplay of light and reflective materials. A lot of secondary movement is provided by the energetic light sources which dance over the metallic surfaces creating a digital network of colour.”",
    suit: "hearts",
    value: "6",
    deck: "crypto",
    opensea:
      "https://opensea.io/collection/cryptoedition?search[sortAscending]=true&search[sortBy]=PRICE&search[stringTraits][0][name]=Value&search[stringTraits][0][values][0]=6&search[stringTraits][1][name]=Suit&search[stringTraits][1][values][0]=Hearts&search[toggles][0]=BUY_NOW",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/6-h-8d9idu23.jpg",
    video:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/6-h-8d9idu23.mp4",
  },

  {
    artist: "nicoleruggiero",
    info:
      "“This card represents leaving behind the tangles of the old world and finding freedom, power, and control in the new digital world of decentralization.”",
    suit: "clubs",
    value: "6",
    deck: "crypto",
    opensea:
      "https://opensea.io/collection/cryptoedition?search[sortAscending]=true&search[sortBy]=PRICE&search[stringTraits][0][name]=Value&search[stringTraits][0][values][0]=6&search[stringTraits][1][name]=Suit&search[stringTraits][1][values][0]=Clubs&search[toggles][0]=BUY_NOW",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/6-c-in3B49g6.jpg",
    video:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/6-c-in3B49g6.mp4",
  },

  {
    artist: "kidmograph",
    info:
      "“The main idea for this piece was to play with a surrealistic scenery, where a hidden human figure reveals behind the diamonds. Like a timeless place, or a broken space, this symmetry play endlessly throguh a vast and desolated landscape.”",
    suit: "diamonds",
    value: "6",
    deck: "crypto",
    opensea:
      "https://opensea.io/collection/cryptoedition?search[sortAscending]=true&search[sortBy]=PRICE&search[stringTraits][0][name]=Value&search[stringTraits][0][values][0]=6&search[stringTraits][1][name]=Suit&search[stringTraits][1][values][0]=Diamonds&search[toggles][0]=BUY_NOW",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/6-d-6mH3F99H.jpg",
    video:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/6-d-6mH3F99H.mp4",
  },

  {
    artist: "markinducil",
    info:
      "“I wanted to have fun with this piece and merge the old with the new inside a fantastic surreal setting. Inspired by tarot card illustrations and modern symbols along with some usual NFT art tropes; these objects surround St. Matthew, the patron saint of tax collectors and accountants.”",
    suit: "spades",
    value: "7",
    deck: "crypto",
    opensea:
      "https://opensea.io/collection/cryptoedition?search[sortAscending]=true&search[sortBy]=PRICE&search[stringTraits][0][name]=Value&search[stringTraits][0][values][0]=7&search[stringTraits][1][name]=Suit&search[stringTraits][1][values][0]=Spades&search[toggles][0]=BUY_NOW",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/7-s-4293BgEn.jpg",
    video:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/7-s-4293BgEn.mp4",
  },

  {
    artist: "gabriel-punsalang",
    info:
      "“Freedom of form with precise intentions can manifest a new universe of opportunities.”",
    suit: "hearts",
    value: "7",
    deck: "crypto",
    opensea:
      "https://opensea.io/collection/cryptoedition?search[sortAscending]=true&search[sortBy]=PRICE&search[stringTraits][0][name]=Value&search[stringTraits][0][values][0]=7&search[stringTraits][1][name]=Suit&search[stringTraits][1][values][0]=Hearts&search[toggles][0]=BUY_NOW",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/7-h-XW4Qx464.jpg",
    video:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/7-h-XW4Qx464.mp4",
  },

  {
    artist: "david-ariew",
    info:
      "“I love the complexity and beauty of infinite mirror rooms, as well as creating impossibly distorted lens effects and data visualization. This is the combination of all of those ideas.”",
    suit: "clubs",
    value: "7",
    deck: "crypto",
    opensea:
      "https://opensea.io/collection/cryptoedition?search[sortAscending]=true&search[sortBy]=PRICE&search[stringTraits][0][name]=Value&search[stringTraits][0][values][0]=7&search[stringTraits][1][name]=Suit&search[stringTraits][1][values][0]=Clubs&search[toggles][0]=BUY_NOW",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/7-c-D8q934nr.jpg",
    video:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/7-c-D8q934nr.mp4",
  },

  {
    artist: "renderfruit",
    info:
      "“This piece of jewelry is made of seven diamonds set against a unique flesh flower gland.”",
    suit: "diamonds",
    value: "7",
    deck: "crypto",
    opensea:
      "https://opensea.io/collection/cryptoedition?search[sortAscending]=true&search[sortBy]=PRICE&search[stringTraits][0][name]=Value&search[stringTraits][0][values][0]=7&search[stringTraits][1][name]=Suit&search[stringTraits][1][values][0]=Diamonds&search[toggles][0]=BUY_NOW",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/7-d-3H4G33ZA.jpg",
    video:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/7-d-3H4G33ZA.mp4",
  },

  {
    artist: "josh-pierce",
    info:
      "“For this project, I have created one of my signature forest nature scenes. I have creatively modified so my typical geometric forms create the shape of the 8 and leaves of the forest form the shape of the spade. It maintains my overarching motif of quiet contemplation and serenity.”",
    suit: "spades",
    value: "8",
    deck: "crypto",
    opensea:
      "https://opensea.io/collection/cryptoedition?search[sortAscending]=true&search[sortBy]=PRICE&search[stringTraits][0][name]=Value&search[stringTraits][0][values][0]=8&search[stringTraits][1][name]=Suit&search[stringTraits][1][values][0]=Spades&search[toggles][0]=BUY_NOW",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/8-s-n2B4b6T3.jpg",
    video:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/8-s-n2B4b6T3.mp4",
  },

  {
    artist: "eleven",
    info:
      "“The focal point of this artwork is the growth of creative, independent output caused by decentralization that ensures the protection of artists rights: obtaining and keeping control of their work and verifying authenticity and provenance. Thus inducing a change in the (digital) art world.”",
    suit: "hearts",
    value: "8",
    deck: "crypto",
    opensea:
      "https://opensea.io/collection/cryptoedition?search[sortAscending]=true&search[sortBy]=PRICE&search[stringTraits][0][name]=Value&search[stringTraits][0][values][0]=8&search[stringTraits][1][name]=Suit&search[stringTraits][1][values][0]=Hearts&search[toggles][0]=BUY_NOW",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/8-h-V3AR64f2.jpg",
    video:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/8-h-V3AR64f2.mp4",
  },

  {
    artist: "ryan-hawthorne",
    info: "“NFTs | The bubble that bends but won’t burst.”",
    suit: "clubs",
    value: "8",
    deck: "crypto",
    opensea:
      "https://opensea.io/collection/cryptoedition?search[sortAscending]=true&search[sortBy]=PRICE&search[stringTraits][0][name]=Value&search[stringTraits][0][values][0]=8&search[stringTraits][1][name]=Suit&search[stringTraits][1][values][0]=Clubs&search[toggles][0]=BUY_NOW",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/8-c-cZ76N43Z.jpg",
    video:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/8-c-cZ76N43Z.mp4",
  },

  {
    artist: "kideight",
    info: "“EVOL doesn’t play games, he wins them.”",
    suit: "diamonds",
    value: "8",
    deck: "crypto",
    opensea:
      "https://opensea.io/collection/cryptoedition?search[sortAscending]=true&search[sortBy]=PRICE&search[stringTraits][0][name]=Value&search[stringTraits][0][values][0]=8&search[stringTraits][1][name]=Suit&search[stringTraits][1][values][0]=Diamonds&search[toggles][0]=BUY_NOW",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/8-d-6Z3H92Kv.jpg",
    video:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/8-d-6Z3H92Kv.mp4",
  },

  {
    artist: "omaraqil",
    info:
      "“Visual reconstruction of a block node in the meta space floating in the data fields”",
    suit: "spades",
    value: "9",
    deck: "crypto",
    opensea:
      "https://opensea.io/collection/cryptoedition?search[sortAscending]=true&search[sortBy]=PRICE&search[stringTraits][0][name]=Value&search[stringTraits][0][values][0]=9&search[stringTraits][1][name]=Suit&search[stringTraits][1][values][0]=Spades&search[toggles][0]=BUY_NOW",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/9-s-g43c26dj.jpg",
    video:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/9-s-g43c26dj.mp4",
  },

  {
    artist: "marterium",
    info:
      "“Focusing on the general theme of the project, I was trying to capture a sense of connection and data that flows through a system of interconnected splines around the main shape(9). Capturing an abstraction of the system that powers the process of decentralization. The floating colors also translate to energy that’s powering a never ending system of automation. Obviously, I also wanted to display one of my favorite personal styles and bring it together with this project as well.”",
    suit: "hearts",
    value: "9",
    deck: "crypto",
    opensea:
      "https://opensea.io/collection/cryptoedition?search[sortAscending]=true&search[sortBy]=PRICE&search[stringTraits][0][name]=Value&search[stringTraits][0][values][0]=9&search[stringTraits][1][name]=Suit&search[stringTraits][1][values][0]=Hearts&search[toggles][0]=BUY_NOW",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/9-h-Hj4nb676.jpg",
    video:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/9-h-Hj4nb676.mp4",
  },

  {
    artist: "rolzay",
    info:
      "“A group of cyber-hackers, using their implanted interface systems, are linked into the decentralized Metaverse network, roaming its endless depths, in search of valuable data that could help them achieve the upper hand among their foes in the two-century-long cyber war.”",
    suit: "clubs",
    value: "9",
    deck: "crypto",
    opensea:
      "https://opensea.io/collection/cryptoedition?search[sortAscending]=true&search[sortBy]=PRICE&search[stringTraits][0][name]=Value&search[stringTraits][0][values][0]=9&search[stringTraits][1][name]=Suit&search[stringTraits][1][values][0]=Clubs&search[toggles][0]=BUY_NOW",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/9-c-y6x3v47U.jpg",
    video:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/9-c-y6x3v47U.mp4",
  },

  {
    artist: "trippyogi",
    info:
      "“Extracting lifeforce from their data vessels, the oracles merge all visions to construct a new machination of consciousness. With the plasma of existence pulsing through its silver veins, we witness the final unification of creation, existence, and the void.”",
    suit: "diamonds",
    value: "9",
    deck: "crypto",
    opensea:
      "https://opensea.io/collection/cryptoedition?search[sortAscending]=true&search[sortBy]=PRICE&search[stringTraits][0][name]=Value&search[stringTraits][0][values][0]=9&search[stringTraits][1][name]=Suit&search[stringTraits][1][values][0]=Diamonds&search[toggles][0]=BUY_NOW",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/9-d-8w3v6JM6.jpg",
    video:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/9-d-8w3v6JM6.mp4",
  },

  {
    artist: "tim-riopelle",
    info:
      "“My work deals with the concept of ’holding’ cryptocurrency and the symbology of my card number. 10 can symbolize the end of one cycle and the beginning of another. I represented this by building these cycles into the textures and animations occurring in the piece.”",
    suit: "spades",
    value: "10",
    deck: "crypto",
    opensea:
      "https://opensea.io/collection/cryptoedition?search[sortAscending]=true&search[sortBy]=PRICE&search[stringTraits][0][name]=Value&search[stringTraits][0][values][0]=10&search[stringTraits][1][name]=Suit&search[stringTraits][1][values][0]=Spades&search[toggles][0]=BUY_NOW",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/10-s-239yn6fp.jpg",
    video:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/10-s-239yn6fp.mp4",
  },

  {
    artist: "kaloian-toshev",
    info:
      "“Decentralized Angel depicts the building blocks of blockchain technology in the center and all its applications as different scattered layers around it. Every application is different, constantly changing and acting independently. Every layer is partly missing information, but still contributing to form the whole, as in a decentralized network. This is my very first successful attempt at mixing my 2D artworks with 3D world.”",
    suit: "hearts",
    value: "10",
    deck: "crypto",
    opensea:
      "https://opensea.io/collection/cryptoedition?search[sortAscending]=true&search[sortBy]=PRICE&search[stringTraits][0][name]=Value&search[stringTraits][0][values][0]=10&search[stringTraits][1][name]=Suit&search[stringTraits][1][values][0]=Hearts&search[toggles][0]=BUY_NOW",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/10-h-383VH3zR.jpg",
    video:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/10-h-383VH3zR.mp4",
  },

  {
    artist: "sebastian-onufszak",
    info:
      "“Everything flows. Change is the only constant, it’s on, it’s off — I 0.”",
    suit: "clubs",
    value: "10",
    deck: "crypto",
    opensea:
      "https://opensea.io/collection/cryptoedition?search[sortAscending]=true&search[sortBy]=PRICE&search[stringTraits][0][name]=Value&search[stringTraits][0][values][0]=10&search[stringTraits][1][name]=Suit&search[stringTraits][1][values][0]=Clubs&search[toggles][0]=BUY_NOW",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/10-c-okp7333D.jpg",
    video:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/10-c-okp7333D.mp4",
  },

  {
    artist: "vansdesign",
    info:
      "“Visual reconstruction of a block node in the meta space floating in the data fields”",
    suit: "diamonds",
    value: "10",
    deck: "crypto",
    opensea:
      "https://opensea.io/collection/cryptoedition?search[sortAscending]=true&search[sortBy]=PRICE&search[stringTraits][0][name]=Value&search[stringTraits][0][values][0]=10&search[stringTraits][1][name]=Suit&search[stringTraits][1][values][0]=Diamonds&search[toggles][0]=BUY_NOW",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/10-d-49RMR27K.jpg",
    video:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/10-d-49RMR27K.mp4",
  },

  {
    artist: "marubu",
    info:
      "“Say hello to Jack of Spades, your next generation virtual alter ego. It can effortlessly handle all tasks in the digital realm and is juiced up with enough artificial intelligence to be whatever you want it to be. Party animal, art collector, king slayer, you name it. Made so you can peacefully sleep forever in your hybernation pod. ;-)”",
    suit: "spades",
    value: "jack",
    deck: "crypto",
    opensea:
      "https://opensea.io/collection/cryptoedition?search[sortAscending]=true&search[sortBy]=PRICE&search[stringTraits][0][name]=Value&search[stringTraits][0][values][0]=Jack&search[stringTraits][1][name]=Suit&search[stringTraits][1][values][0]=Spades&search[toggles][0]=BUY_NOW",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/j-s-3NE4b2t4.jpg",
    video:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/j-s-3NE4b2t4.mp4",
  },

  {
    artist: "auguste-lefou",
    info:
      "“I wanted to illustrate my character in an old and mystical mood while respecting certain visual codes of the valet. The daggers oscillate between trapped or trapper which gives it power and at the same time the fragility of a soul that knows itself condemned”",
    suit: "hearts",
    value: "jack",
    deck: "crypto",
    opensea:
      "https://opensea.io/collection/cryptoedition?search[sortAscending]=true&search[sortBy]=PRICE&search[stringTraits][0][name]=Value&search[stringTraits][0][values][0]=Jack&search[stringTraits][1][name]=Suit&search[stringTraits][1][values][0]=Hearts&search[toggles][0]=BUY_NOW",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/j-h-2H49J7bj.jpg",
    video:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/j-h-2H49J7bj.mp4",
  },

  {
    artist: "mr-misang",
    info:
      "“This mushroom head guy is a man in my another big work ’Empathy Machine’ that will be revealed in future. He can spread his fungus ego to all of the world. He doesn’t know if it’s good or bad for him. He just knows he can do it.”",
    suit: "clubs",
    value: "jack",
    deck: "crypto",
    opensea:
      "https://opensea.io/collection/cryptoedition?search[sortAscending]=true&search[sortBy]=PRICE&search[stringTraits][0][name]=Value&search[stringTraits][0][values][0]=Jack&search[stringTraits][1][name]=Suit&search[stringTraits][1][values][0]=Clubs&search[toggles][0]=BUY_NOW",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/j-c-93y2dRL8.jpg",
    video:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/j-c-93y2dRL8.mp4",
  },

  {
    artist: "exitsimulation",
    info:
      "“For my interpretation of the Jack of Diamonds card I wanted to create an abstract creature that is representing two sides of a pole as an infinite and ever repeating cycle, like depicting a mythical creature or deity that is in constant shift.”",
    suit: "diamonds",
    value: "jack",
    deck: "crypto",
    opensea:
      "https://opensea.io/collection/cryptoedition?search[sortAscending]=true&search[sortBy]=PRICE&search[stringTraits][0][name]=Value&search[stringTraits][0][values][0]=Jack&search[stringTraits][1][name]=Suit&search[stringTraits][1][values][0]=Diamonds&search[toggles][0]=BUY_NOW",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/j-d-X37rjw98.jpg",
    video:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/j-d-X37rjw98.mp4",
  },

  {
    artist: "diberkato",
    info:
      "“This illustration represents the greatest value transfer there is, the one between the Sun and the Moon. With the Queen representing the everlasting transaction of giving and receiving.”",
    suit: "spades",
    value: "queen",
    deck: "crypto",
    opensea:
      "https://opensea.io/collection/cryptoedition?search[sortAscending]=true&search[sortBy]=PRICE&search[stringTraits][0][name]=Value&search[stringTraits][0][values][0]=Queen&search[stringTraits][1][name]=Suit&search[stringTraits][1][values][0]=Spades&search[toggles][0]=BUY_NOW",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/q-s-4F8hN98q.jpg",
    video:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/q-s-4F8hN98q.mp4",
  },

  {
    artist: "beryl-bilici",
    info:
      "“Queen of Hearts is the card of beauty, magnetism, affection, and idealism. She judges and rules by the principles of Love. Promotes the dreams, conceives the desires, sees the visions of the world of joy and peace in the union of kindred hearts. Decentralized Love is all we need to make our CryptoArt universe more powerful and build a family around it.”",
    suit: "hearts",
    value: "queen",
    deck: "crypto",
    opensea:
      "https://opensea.io/collection/cryptoedition?search[sortAscending]=true&search[sortBy]=PRICE&search[stringTraits][0][name]=Value&search[stringTraits][0][values][0]=Queen&search[stringTraits][1][name]=Suit&search[stringTraits][1][values][0]=Hearts&search[toggles][0]=BUY_NOW",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/q-h-9m4cg37g.jpg",
    video:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/q-h-9m4cg37g.mp4",
  },

  {
    artist: "skio",
    info:
      "“Queen In The City is a creative process that tends to question the place of man in the modern urban landscape and the virtual landscape. It is a surreal and graphic transcription of the urban and virtual space in which a face, a body is partially and realistically integrated, his gaze disappears to make way for yours, what you are in your environment. Skio creates a discussion between Man, his presence and his anonymity in the public space.”",
    suit: "clubs",
    value: "queen",
    deck: "crypto",
    opensea:
      "https://opensea.io/collection/cryptoedition?search[sortAscending]=true&search[sortBy]=PRICE&search[stringTraits][0][name]=Value&search[stringTraits][0][values][0]=Queen&search[stringTraits][1][name]=Suit&search[stringTraits][1][values][0]=Clubs&search[toggles][0]=BUY_NOW",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/q-c-jE72m69y.jpg",
    video:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/q-c-jE72m69y.mp4",
  },

  {
    artist: "ghost-girl",
    info: "“Royalty always gets remembered, but you know legends never die.”",
    suit: "diamonds",
    value: "queen",
    deck: "crypto",
    opensea:
      "https://opensea.io/collection/cryptoedition?search[sortAscending]=true&search[sortBy]=PRICE&search[stringTraits][0][name]=Value&search[stringTraits][0][values][0]=Queen&search[stringTraits][1][name]=Suit&search[stringTraits][1][values][0]=Diamonds&search[toggles][0]=BUY_NOW",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/q-d-4N4a42sM.jpg",
    video:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/q-d-4N4a42sM.mp4",
  },

  {
    artist: "peter-mohrbacher",
    info:
      "“If you like to gamble, I tell you I’m your man. You win some, lose some, all the same to me. The pleasure is to play, makes no difference what you say. I don’t share your greed, the only card I need...”",
    suit: "spades",
    value: "king",
    deck: "crypto",
    opensea:
      "https://opensea.io/collection/cryptoedition?search[sortAscending]=true&search[sortBy]=PRICE&search[stringTraits][0][name]=Value&search[stringTraits][0][values][0]=King&search[stringTraits][1][name]=Suit&search[stringTraits][1][values][0]=Spades&search[toggles][0]=BUY_NOW",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/k-s-b2dD263P.jpg",
    video:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/k-s-b2dD263P.mp4",
  },

  {
    artist: "odious",
    info:
      "“Kings have a responsibility to fill, kings have to lead, kings don’t have time to be sad, so kings fall to greed.”",
    suit: "hearts",
    value: "king",
    deck: "crypto",
    opensea:
      "https://opensea.io/collection/cryptoedition?search[sortAscending]=true&search[sortBy]=PRICE&search[stringTraits][0][name]=Value&search[stringTraits][0][values][0]=King&search[stringTraits][1][name]=Suit&search[stringTraits][1][values][0]=Hearts&search[toggles][0]=BUY_NOW",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/k-h-36QTB8R9.jpg",
    video:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/k-h-36QTB8R9.mp4",
  },

  {
    artist: "vini-naso",
    info:
      "“Decentralized King of Clubs is the embodiment of the Hivemind.What if in the near future we could integrate our collective thoughts, ideas and opinions into a decentralized blockchain network to create a mind of minds? This would have benefits for both artificial intelligence and human enhancement and their potential integration.”",
    suit: "clubs",
    value: "king",
    deck: "crypto",
    opensea:
      "https://opensea.io/collection/cryptoedition?search[sortAscending]=true&search[sortBy]=PRICE&search[stringTraits][0][name]=Value&search[stringTraits][0][values][0]=King&search[stringTraits][1][name]=Suit&search[stringTraits][1][values][0]=Clubs&search[toggles][0]=BUY_NOW",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/k-c-w47o9Vp8.jpg",
    video:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/k-c-w47o9Vp8.mp4",
  },

  {
    artist: "seerlight",
    info:
      "“The king of diamonds is an ethereal celestial being. He is royalty which governs the celestial space’s brightest diamonds: stars.”",
    suit: "diamonds",
    value: "king",
    deck: "crypto",
    opensea:
      "https://opensea.io/collection/cryptoedition?search[sortAscending]=true&search[sortBy]=PRICE&search[stringTraits][0][name]=Value&search[stringTraits][0][values][0]=King&search[stringTraits][1][name]=Suit&search[stringTraits][1][values][0]=Diamonds&search[toggles][0]=BUY_NOW",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/k-d-9ex8HW27.jpg",
    video:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/k-d-9ex8HW27.mp4",
  },

  {
    artist: "jason-naylor",
    info:
      "“In world of expectation, constraint, and limitation, we often forget that deep down we are bursting with life, color and excitement. Decentralization frees us to be exactly who we want to be, how we want to be it, and the truth is, there is much more to each of us than meets the eye. So feel free to feel free, and let your colors fly. We have so much to bring to the world, and no one is stopping us now…”",
    suit: "spades",
    value: "ace",
    deck: "crypto",
    opensea:
      "https://opensea.io/collection/cryptoedition?search[sortAscending]=true&search[sortBy]=PRICE&search[stringTraits][0][name]=Value&search[stringTraits][0][values][0]=Ace&search[stringTraits][1][name]=Suit&search[stringTraits][1][values][0]=Spades&search[toggles][0]=BUY_NOW",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/a-s-26vr86EL.jpg",
    video:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/a-s-26vr86EL.mp4",
  },

  {
    artist: "chuck-anderson",
    info:
      "“I wanted to build on my ongoing ’INFINITE PRESSURE’ series that plays with a hybrid of generative art and handcrafted design. I rely half on the unknown and half on my own decision-making to build the final composition, much like the way we are navigating this new decentralized world.”",
    suit: "hearts",
    value: "ace",
    deck: "crypto",
    opensea:
      "https://opensea.io/collection/cryptoedition?search[sortAscending]=true&search[sortBy]=PRICE&search[stringTraits][0][name]=Value&search[stringTraits][0][values][0]=Ace&search[stringTraits][1][name]=Suit&search[stringTraits][1][values][0]=Hearts&search[toggles][0]=BUY_NOW",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/a-h-x89CxW27.jpg",
    video:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/a-h-x89CxW27.mp4",
  },

  {
    artist: "robbie-trevino",
    info:
      "“In traditional cartomancy, the Ace of Clubs is the card of marriage. I want to depict the marriage or joining of ideas in the form of multiple hands. Ideas, like hands, can reach out to us and take hold like a deep and never ending well. Thoughts endlessly intertwined and connected, linked infinitely and taking hold.”",
    suit: "clubs",
    value: "ace",
    deck: "crypto",
    opensea:
      "https://opensea.io/collection/cryptoedition?search[sortAscending]=true&search[sortBy]=PRICE&search[stringTraits][0][name]=Value&search[stringTraits][0][values][0]=Ace&search[stringTraits][1][name]=Suit&search[stringTraits][1][values][0]=Clubs&search[toggles][0]=BUY_NOW",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/a-c-R22N86fN.jpg",
    video:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/a-c-R22N86fN.mp4",
  },

  {
    artist: "baugasm",
    info:
      "“This is an interpretation of the Ethereum blockchain as a 5 Dimensional environment where everything moves and has a lot of mirrors data reflecting everything is visible and nothing is centralized.”",
    suit: "diamonds",
    value: "ace",
    deck: "crypto",
    opensea:
      "https://opensea.io/collection/cryptoedition?search[sortAscending]=true&search[sortBy]=PRICE&search[stringTraits][0][name]=Value&search[stringTraits][0][values][0]=Ace&search[stringTraits][1][name]=Suit&search[stringTraits][1][values][0]=Diamonds&search[toggles][0]=BUY_NOW",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/a-d-Mk33LV47.jpg",
    video:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/a-d-Mk33LV47.mp4",
  },

  {
    artist: "glasscrane",
    info: "“An unemployed jester is nobody’s fool.”",
    suit: "black",
    value: "joker",
    deck: "crypto",
    opensea:
      "https://opensea.io/collection/cryptoedition?search[sortAscending]=true&search[sortBy]=PRICE&search[stringTraits][0][name]=Color&search[stringTraits][0][values][0]=Black&search[stringTraits][1][name]=Value&search[stringTraits][1][values][0]=Joker&search[toggles][0]=BUY_NOW",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/joker-PQy3C426.jpg",
    video:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/joker-PQy3C426.mp4",
  },

  {
    artist: "stu-ballinger",
    info: "",
    suit: "crystal",
    value: "backside",
    deck: "crypto",
    opensea:
      "https://opensea.io/assets/0x495f947276749ce646f68ac8c248420045cb7b5e/60343876818614931036759583401419826937339570281218946026720664961069625638921",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/crystal-back.jpg",
    video:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/crystal-back.mp4",
  },

  {
    artist: "stu-ballinger-2",
    info:
      "“An experiment in kaleidoscopic refractions, produced by forming a lens out of an array of prisms.”",
    suit: "",
    value: "backside",
    deck: "crypto",
    opensea:
      "https://opensea.io/assets/0x495f947276749ce646f68ac8c248420045cb7b5e/60343876818614931036759583401419826937339570281218946026720664959970114011172",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/back-iV67Z67p.jpg",
    video:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/back-iV67Z67p.mp4",
  },

  {
    artist: "bakaarts",
    info:
      "“The image represents the ascension of humans to the next stage of evolution. The cubes in the image represent individual AI devices that communicate with each other to take care of various shared tasks such as crowdsourcing ideas and distribution of funds.”",
    suit: "red",
    value: "joker",
    deck: "crypto",
    opensea:
      "https://opensea.io/collection/cryptoedition?search[sortAscending]=true&search[sortBy]=PRICE&search[stringTraits][0][name]=Color&search[stringTraits][0][values][0]=Red&search[stringTraits][1][name]=Value&search[stringTraits][1][values][0]=Joker&search[toggles][0]=BUY_NOW",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/joker2-aB2fC925.jpg",
    video:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/joker2-aB2fC925.mp4",
  },
];

const dump = async () => {
  await connect();
  await createDeck(slug, deck, cards);
};

export default dump;
