import Head from "next/head";
import Link from "next/link";
import { Fragment } from "react";
import { NextPage } from "next";
import { withApollo } from "../source/apollo";
import { useUser, useUser2 } from "../hooks/useUser";
import Layout from "../components/Layouts";

const Home: NextPage = () => {
  const { user: user2 } = useUser2();
  const { user } = useUser();

  console.log("user222", user2);

  return (
    <Fragment>
      <Head>
        <title>Crypto Arts</title>
      </Head>
      <Layout>
        {JSON.stringify(user2)}
        <Link href="/">HOME</Link>
        {JSON.stringify(user)}
      </Layout>
    </Fragment>
  );
};

export default withApollo(Home);
