import { connect } from "../source/mongoose";

export { default } from "@/components/Pages/Shop";

export const getServerSideProps = async () => {
  await connect();
  return {
    props: {},
  };
};
