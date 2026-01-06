import { connect } from "../source/mongoose";

export { default } from "@/components/Pages/Home";

export const getServerSideProps = async () => {
  await connect();
  return {
    props: {},
  };
};
