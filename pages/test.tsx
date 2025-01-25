import { FC, HTMLAttributes } from "react";
import { withApollo } from "../source/apollo";

const test: FC<HTMLAttributes<HTMLElement>> = () => {
  //   const cards = useCards({ variables: { deck: "zero" } });
  //   const products = useProducts();

  return <div></div>;
};

export function getStaticProps() {
  return {
    // returns the default 404 page with a status code of 404 in production
    props: {
      notFound: process.env.NODE_ENV !== "development",
    },
  };
}

export default withApollo(test, { ssr: false });
