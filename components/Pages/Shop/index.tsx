"use client";

import { FC, HTMLAttributes, useEffect, useState } from "react";
import { withApollo } from "../../../source/apollo";
import Hero from "./Hero";
import Header from "../../Header";
import Collection from "./Collection";
import Footer from "../../Footer";
import Trust from "./Trust";
import AugmentedReality from "../Home/AugmentedReality";
import Bundles from "./Bundles";
import ArrowButton from "../../Buttons/ArrowButton";
import Text from "../../Text";
import Link from "../../Link";
import { useBag } from "../../Contexts/bag";
import MenuPortal from "../../Header/MainMenu/MenuPortal";
import Subscribe from "../../Popups/Subscribe";

export const BagButton = () => {
  const { bag } = useBag();

  return (
    <Link
      href={(process.env.NEXT_PUBLIC_BASELINK || "") + "/bag"}
      css={[{ marginLeft: "auto" }]}
    >
      <ArrowButton>
        Bag
        {bag
          ? "—" +
            Object.values(bag).reduce((prev, cur) => {
              return prev + cur;
            }, 0)
          : null}
      </ArrowButton>
    </Link>
  );
};

export const Popup = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(true);
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <MenuPortal show={show}>
      {show ? <Subscribe close={() => setShow(false)} /> : null}
    </MenuPortal>
  );
};

const Shop: FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => (
  <>
    <Header
      customCTA={<BagButton />}
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
    <Popup />
    <Hero />
    <Collection />
    <Trust />
    <Bundles />
    <AugmentedReality />
    <Footer />
  </>
);

// Named export for App Router (without withApollo wrapper)
export { Shop };

// Default export with Apollo HOC for Pages Router backward compatibility
export default withApollo(Shop, { ssr: false });
