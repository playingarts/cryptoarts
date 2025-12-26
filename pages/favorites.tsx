import { connect } from "../source/mongoose";

export { default } from "../new/Pages/Favorites";

export const getServerSideProps = async () => {
  await connect();
  return {
    props: {},
  };
};
