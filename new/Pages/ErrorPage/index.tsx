import { FC } from "react";
import Head from "next/head";
import Grid from "../../Grid";
import Text from "../../Text";
import ArrowButton from "../../Buttons/ArrowButton";
import Link from "../../Link";
import Logo from "../../Icons/Logo";

interface Props {
  code?: string;
  message?: string;
}

/**
 * Minimal error page without Header/Footer.
 * This page is statically generated at build time, so it cannot
 * use components that depend on Apollo (Header, Footer use Apollo hooks).
 */
const ErrorPage: FC<Props> = ({ code = "404", message = "Page not found" }) => {
  return (
    <>
      <Head>
        <title>{code} - Playing Arts</title>
      </Head>
      <Grid
        css={(theme) => ({
          minHeight: "100vh",
          alignItems: "center",
          justifyContent: "center",
          background: theme.colors.soft_gray,
        })}
      >
        <div
          css={(theme) => ({
            gridColumn: "1 / -1",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: theme.spacing(3),
          })}
        >
          <Link href="/" css={{ marginBottom: 30 }}>
            <Logo css={(theme) => ({ color: theme.colors.dark_gray })} />
          </Link>
          <Text
            typography="newh1"
            css={(theme) => ({
              color: theme.colors.dark_gray,
              margin: 0,
            })}
          >
            {code}
          </Text>
          <Text
            typography="newParagraph"
            css={(theme) => ({
              color: theme.colors.black50,
              margin: 0,
            })}
          >
            {message}
          </Text>
          <Link href="/" css={{ textDecoration: "none", marginTop: 15 }}>
            <ArrowButton color="accent">Back to Home</ArrowButton>
          </Link>
        </div>
      </Grid>
    </>
  );
};

export default ErrorPage;
