"use client";

import dynamic from "next/dynamic";
import { FC, HTMLAttributes, useState, useEffect } from "react";
import Header from "../../Header";
import Text from "../../Text";
import ArrowButton from "../../Buttons/ArrowButton";
import { withApollo } from "../../../source/apollo";
import Content from "./Content";
import Footer from "../../Footer";
import Link from "../../Link";
import { useBag } from "../../Contexts/bag";
import { FREE_SHIPPING_MESSAGE } from "../../../source/consts";

// Lazy-load below-fold components
const Trust = dynamic(() => import("../Shop/Trust"), { ssr: true });

const CheckoutButton = () => {
  const { bag } = useBag();
  const [loading, setLoading] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY >= 400);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    setLoading(true);
  };

  return (
    <Link
      href={
        !bag
          ? "/"
          : `https://secure.playingarts.com/cart/${Object.entries(bag)
              .map(([id, quantity]) => `${parseInt(id, 10)}:${quantity}`)
              .join(",")}`
      }
      css={[{ marginLeft: "auto" }]}
      onClick={handleClick}
    >
      <ArrowButton color={scrolled ? "accent" : undefined} css={[{ fontSize: 20 }, loading && { opacity: 0.7, cursor: "wait" }]}>
        {loading ? "Loading..." : "Check out"}
      </ArrowButton>
    </Link>
  );
};

const Bag: FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => {
  return (
    <>
      <Header
        customCTA={<CheckoutButton />}
        links={["Items", "Related", "Reviews", "FAQ"]}
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
            {FREE_SHIPPING_MESSAGE}
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
