import { connect } from "../source/mongoose";

export { default } from "../new/Pages/Shop";

export const getServerSideProps = async () => {
  await connect();
  return {
    props: {},
  };
};
