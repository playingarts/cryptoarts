"use client";

import dynamic from "next/dynamic";
import { FC, HTMLAttributes, useEffect, useState } from "react";
import { withApollo } from "../../../source/apollo";
import Header from "../../Header";
import Footer from "../../Footer";
import ArrowButton from "../../Buttons/ArrowButton";
import Link from "../../Link";
import Text from "../../Text";
import { useBag } from "../../Contexts/bag";
import MenuPortal from "../../Header/MainMenu/MenuPortal";
import { FREE_SHIPPING_MESSAGE } from "../../../source/consts";

// Lazy-load all sections
const Hero = dynamic(() => import("./Hero"), { ssr: true });
const Collection = dynamic(() => import("./Collection"), { ssr: true });
const Trust = dynamic(() => import("./Trust"), { ssr: true });
const Bundles = dynamic(() => import("./Bundles"), { ssr: true });
const AugmentedReality = dynamic(() => import("../Home/AugmentedReality"), {
  ssr: true,
});
const Subscribe = dynamic(() => import("../../Popups/Subscribe"), {
  ssr: false,
});

export const BagButton = () => {
  const { bag } = useBag();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY >= 400);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Link
      href={(process.env.NEXT_PUBLIC_BASELINK || "") + "/bag"}
      css={[{ marginLeft: "auto" }]}
    >
      <ArrowButton color={scrolled ? "accent" : undefined} css={{ fontSize: 20 }}>
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
      links={["Playing Cards", "Bundles", "AR", "Reviews", "FAQ"]}
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
    {/* <Popup /> */}
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
