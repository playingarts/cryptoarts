import { connect } from "../source/mongoose";

export { default } from "@/components/Pages/Favorites";

export const getServerSideProps = async () => {
  await connect();
  return {
    props: {},
  };
};
