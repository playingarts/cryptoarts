"use client";

import dynamic from "next/dynamic";
import { FC, HTMLAttributes, useEffect, useState } from "react";
import { withApollo } from "../../../source/apollo";
import Header from "../../Header";
import Footer from "../../Footer";
import LazySection from "../../LazySection";
import ArrowButton from "../../Buttons/ArrowButton";
import Link from "../../Link";
import Text from "../../Text";
import { useBag } from "../../Contexts/bag";
import MenuPortal from "../../Header/MainMenu/MenuPortal";
import { FREE_SHIPPING_MESSAGE } from "../../../source/consts";

// Hero loads immediately (above fold)
import Hero from "./Hero";

// Lazy-load below-fold sections (SSR disabled for progressive loading)
const Collection = dynamic(() => import("./Collection"), { ssr: false });
const Trust = dynamic(() => import("./Trust"), { ssr: false });
const Bundles = dynamic(() => import("./Bundles"), { ssr: false });
const AugmentedReality = dynamic(() => import("../Home/AugmentedReality"), {
  ssr: false,
});
const Testimonials = dynamic(() => import("../Home/Testimonials"), { ssr: false });
const FAQ = dynamic(() => import("../../Footer/Faq"), { ssr: false });
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

    {/* Collection with inline skeleton - lazy load on scroll */}
    <div id="playing-cards">
      <LazySection rootMargin="300px" minHeight={600}>
        <Collection />
      </LazySection>
    </div>

    {/* Trust badges - lazy load */}
    <LazySection rootMargin="300px" minHeight={200}>
      <Trust />
    </LazySection>

    {/* Bundles section - lazy load */}
    <div id="bundles">
      <LazySection rootMargin="300px" minHeight={500}>
        <Bundles />
      </LazySection>
    </div>

    {/* AR section - lazy load */}
    <div id="ar">
      <LazySection rootMargin="300px" minHeight={400}>
        <AugmentedReality />
      </LazySection>
    </div>

    {/* Reviews section */}
    <LazySection id="reviews" rootMargin="100px" minHeight={500}>
      <Testimonials />
    </LazySection>

    {/* FAQ section */}
    <LazySection id="faq" rootMargin="100px" minHeight={600}>
      <FAQ />
    </LazySection>

    {/* Footer (links, copyright, etc.) */}
    <LazySection rootMargin="100px" minHeight={400}>
      <Footer />
    </LazySection>
  </>
);

// Named export for App Router (without withApollo wrapper)
export { Shop };

// Default export with Apollo HOC for Pages Router backward compatibility
export default withApollo(Shop, { ssr: false });
