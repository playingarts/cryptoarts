import { connect } from "../../../source/mongoose";

export { default } from "../../../new/Pages/ProductPage";

export const getServerSideProps = async () => {
  await connect();
  return {
    // returns the default 404 page with a status code of 404 in production
    props: {
      notFound: process.env.SHOW_NEW !== "true",
    },
  };
};
