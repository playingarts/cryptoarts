import { mockArtist } from "./artist";
import { mockDeck } from "./deck";

export const mockCard: GQL.Card = {
  deck: mockDeck,
  artist: mockArtist,
  suit: "suit",
  value: "value",
  _id: "_id",
  img:
    "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/2-s-7Tw67g2w.jpg",
  info:
    "“The idea behind this 2 of spades is to contain a hidden (crypto) story in a big structure. This structure (or sculpture) is a oneline Bold typographic TWO. Many things happen inside it. There are strange monocles creatures (2 of them with the head of spades logo), others, like worms that move around the sculpture. And abstract eyes that try to follow all the things are happening around them. The artwork Is colorful and full of harmonious shapes in order to remind that FUN is the key when you play with friends, even with a crypto card and a crypto story like this :)”",
  video:
    "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/2-s-7Tw67g2w.mp4",
  opensea: "opensea",
  background: "background",
};
