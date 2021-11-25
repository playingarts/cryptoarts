import { Artist } from "../source/graphql/schemas/artist";
import { connect } from "../source/mongoose";

const dump = async () => {
  await connect();

  await Artist.deleteMany();

  const artists = [
    {
      name: "Name",
      info: "Info",
      userpic: "userPic",
      website: "Website",
      shop: "Shop",
      social: {},
    },
  ];

  await Artist.insertMany(artists);
};

export default dump;
