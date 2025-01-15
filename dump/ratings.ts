import { Rating } from "../source/graphql/schemas/rating";
import { connect } from "../source/mongoose";

export const ratings: Omit<GQL.Rating, "_id">[] = [
  {
    review: "Gorgeous.",
    who: "Matthew V. from Florida, USA",
    title: "Edition One",
  },
  {
    review:
      "Thank you for the smooth handling of getting the playing cards I ordered to me; not only are they little gems by their own right, they are also a perfect way to discover new talented artists, who I may otherwise never come across.",
    who: "Matthew V. from Florida, USA",
    title: "Special Edition",
  },
  {
    review:
      "I’ve never seen anything like this! Its like a gallery in a deck. Just stuning.",
    who: "Matthew V. from Florida, USA",
    title: "Edition Two",
  },
  {
    review: "Amazing concept.”",
    who: "Matthew V. from Florida, USA",
    title: "Edition Two",
  },
];

const dump = async () => {
  await connect();

  await Rating.deleteMany();

  await Rating.insertMany(ratings);
};

export default dump;
