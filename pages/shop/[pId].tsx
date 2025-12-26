import { connect } from "../../source/mongoose";

export { default } from "../../new/Pages/ProductPage";

export const getServerSideProps = async () => {
  await connect();
  return {
    props: {},
  };
};
