import Head from "next/head";
import Link from "next/link";
import { Fragment } from "react";
import { NextPage } from "next";
import { withApollo } from "../source/apollo";
import { useUser, useUser2 } from "../hooks/useUser";
import Layout from "../components/Layout";
import Header from "../components/Header";
import { css } from "@emotion/css";

const Home: NextPage = () => {
  const { user: user2 } = useUser2();
  const { user } = useUser();

  console.log("user222", user2);

  return (
    <Fragment>
      <Head>
        <title>Crypto Arts</title>
      </Head>
      <Header
        className={css`
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
        {JSON.stringify(user2)}
        <Link href="/">HOME</Link>
        {JSON.stringify(user)}
      </Layout>
    </Fragment>
  );
};

export default withApollo(Home);
