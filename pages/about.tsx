import Head from "next/head";
import Link from "next/link";
import { Fragment } from "react";
import { NextPage } from "next";
import { withApollo } from "../source/apollo";
import Layout from "../components/Layout";
import Header from "../components/Header";
import { css } from "@emotion/react";

const Home: NextPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Crypto Arts</title>
      </Head>

      <Header
        palette="dark"
        css={css`
          position: fixed;
          left: 10px;
          right: 10px;
          top: 10px;
          z-index: 1;

          @media (min-width: 1440px) {
            max-width: 1420px;
            left: 50%;
            transform: translate(-50%, 0);
            width: 100%;
          }
        `}
      />

      <Layout>
        <Link href="/">HOME</Link>
      </Layout>
    </Fragment>
  );
};

export default withApollo(Home);
