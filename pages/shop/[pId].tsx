import { connect } from "../../source/mongoose";

export { default } from "@/components/Pages/ProductPage";

export const getServerSideProps = async () => {
  await connect();
  return {
    props: {},
  };
};
