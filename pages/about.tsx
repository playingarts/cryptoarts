import Head from "next/head";
import Link from "next/link";
import { Fragment } from "react";
import { NextPage } from "next";
import { withApollo } from "../source/apollo";
import Layout from "../components/Layout";
import Header from "../components/Header";

const Home: NextPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Crypto Arts</title>
      </Head>

      <Header
        palette="dark"
        css={(theme) => ({
          position: "fixed",
          left: theme.spacing(1),
          right: theme.spacing(1),
          top: theme.spacing(1),
          zIndex: 1,

          "@media (min-width: 1440px)": {
            maxWidth: theme.spacing(142),
            left: "50%",
            transform: "translate(-50%, 0)",
            width: "100%",
          },
        })}
      />

      <Layout css={{ height: 3000 }}>
        <Link href="/">HOME</Link>
      </Layout>
    </Fragment>
  );
};

export default withApollo(Home);
