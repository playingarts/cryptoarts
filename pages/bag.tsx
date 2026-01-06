import { connect } from "../source/mongoose";

export { default } from "@/components/Pages/Bag";

export const getServerSideProps = async () => {
  await connect();
  return {
    props: {},
  };
};
