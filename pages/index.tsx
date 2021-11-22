import Link from "next/link";
import Head from "next/head";
import { Fragment } from "react";
import { NextPage } from "next";
import { withApollo } from "../source/apollo";
import { useUser } from "../hooks/useUser";
import Header from "../components/Header";
import { css } from "@emotion/css";
import Layout from "../components/Layout";
import Hero from "../components/Hero";

const Home: NextPage = () => {
  const { user } = useUser();

  console.log("user", user);

  return (
    <Fragment>
      <Head>
        <title>Crypto Arts</title>
      </Head>
      <Header
        palette="dark"
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
      <Layout
        className={css`
          background: #000;
          padding-top: 220px;
        `}
      >
        <Hero
          title="Collective Art Project"
          text="For creative people who are into graphic design, illustration, playing
          cards and sometimes magic."
          style={{ padding: "85px 200px", width: "75%", color: "#fff" }}
          // style={{ marginTop: 70 }}
        />
      </Layout>
      <Layout
        className={css`
          height: 3000px;
        `}
      >
        {JSON.stringify(user)}
        <Link href="/about">ABOUT</Link>
      </Layout>
    </Fragment>
  );
};

export default withApollo(Home);
