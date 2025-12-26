import { connect } from "../source/mongoose";

export { default } from "../new/Pages/Bag";

export const getServerSideProps = async () => {
  await connect();
  return {
    props: {},
  };
};
