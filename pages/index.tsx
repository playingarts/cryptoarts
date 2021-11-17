import Link from "next/link";
import Head from "next/head";
import { Fragment } from "react";
import { NextPage } from "next";
import { withApollo } from "../source/apollo";
import { useUser } from "../hooks/useUser";
import Header from "../component/Header";
import { css } from "@emotion/css";
import Layout from "../component/Layouts";

const Home: NextPage = () => {
  const { user } = useUser();

  console.log("user", user);

  return (
    <Fragment>
      <Head>
        <title>Crypto Arts</title>
      </Head>
      <Layout>
        <Header
          className={css`
            position: sticky;
            top: 10px;
          `}
        />
        {JSON.stringify(user)}
        <Link href="/about">ABOUT</Link>
      </Layout>
    </Fragment>
  );
};

export default withApollo(Home);
