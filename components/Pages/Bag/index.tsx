"use client";

import dynamic from "next/dynamic";
import { FC, HTMLAttributes } from "react";
import Header from "../../Header";
import Text from "../../Text";
import ArrowButton from "../../Buttons/ArrowButton";
import { withApollo } from "../../../source/apollo";
import Content from "./Content";
import Footer from "../../Footer";
import Link from "../../Link";
import { useBag } from "../../Contexts/bag";

// Lazy-load below-fold components
const Trust = dynamic(() => import("../Shop/Trust"), { ssr: true });

const CheckoutButton = () => {
  const { bag } = useBag();

  return (
    <Link
      href={
        !bag
          ? "/"
          : `https://secure.playingarts.com/cart/${Object.entries(bag)
              .map(([id, quantity]) => `${parseInt(id, 10)}:${quantity}`)
              .join(",")}`
      }
      target="_blank"
      rel="noopener"
      css={[{ marginLeft: "auto" }]}
    >
      <ArrowButton>Check out</ArrowButton>
    </Link>
  );
};

const Bag: FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => {
  return (
    <>
      <Header
        customCTA={<CheckoutButton />}
        customMiddle={
          <Text
            typography="paragraphSmall"
            css={[
              {
                display: "flex",
                alignItems: "center",
                justifyContent: "end",
                paddingRight: 19,
              },
            ]}
          >
            Free shipping for orders over $50!
          </Text>
        }
      />
      <Content />
      <Trust css={(theme) => [{ backgroundColor: theme.colors.soft_gray }]} />
      <Footer />
    </>
  );
};

// Named export for App Router (without withApollo wrapper)
export { Bag };

// Default export with Apollo HOC for Pages Router backward compatibility
export default withApollo(Bag, { ssr: false });
