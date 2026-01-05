import { FC } from "react";
import Grid from "../../../components/Grid";
import Header from "../../Header";
import Footer from "../../Footer";
import Text from "../../Text";
import ArrowButton from "../../Buttons/ArrowButton";
import Link from "../../Link";

interface Props {
  code?: string;
  message?: string;
}

const ErrorPage: FC<Props> = ({ code = "404", message = "Page not found" }) => {
  return (
    <>
      <Header />
      <Grid
        css={(theme) => ({
          minHeight: "60vh",
          alignItems: "center",
          justifyContent: "center",
          background: theme.colors.soft_gray,
          paddingTop: theme.spacing(20),
          paddingBottom: theme.spacing(20),
          [theme.maxMQ.sm]: {
            paddingTop: theme.spacing(15),
            paddingBottom: theme.spacing(15),
          },
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
          <Link href="/" css={{ textDecoration: "none" }}>
            <ArrowButton color="accent">Back to Home</ArrowButton>
          </Link>
        </div>
      </Grid>
      <Footer />
    </>
  );
};

export default ErrorPage;
