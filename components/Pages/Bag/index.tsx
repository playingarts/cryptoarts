"use client";

import dynamic from "next/dynamic";
import { FC, HTMLAttributes, useState, useEffect } from "react";
import Header from "../../Header";
import LazySection from "../../LazySection";
import Text from "../../Text";
import ArrowButton from "../../Buttons/ArrowButton";
import { withApollo } from "../../../source/apollo";
import Content from "./Content";
import Footer from "../../Footer";
import Link from "../../Link";
import { useBag } from "../../Contexts/bag";
import { FREE_SHIPPING_MESSAGE } from "../../../source/consts";

// Lazy-load below-fold components (SSR disabled for progressive loading)
const Trust = dynamic(() => import("../Shop/Trust"), { ssr: false });
const Testimonials = dynamic(() => import("../Home/Testimonials"), { ssr: false });
const FAQ = dynamic(() => import("../../Footer/Faq"), { ssr: false });

const CheckoutButton = () => {
  const { bag } = useBag();
  const [loading, setLoading] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const bagItemIds = bag ? Object.keys(bag) : [];
  const isEmpty = bagItemIds.length === 0;

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

  if (isEmpty) return null;

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
  const { bag } = useBag();
  const bagItemIds = bag ? Object.keys(bag) : [];
  const isEmpty = bagItemIds.length === 0;

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
      <div id="items">
        <Content />
      </div>

      {/* Trust badges - lazy load (hide when empty) */}
      {!isEmpty && (
        <LazySection rootMargin="300px" minHeight={200}>
          <Trust css={(theme) => [{ backgroundColor: theme.colors.soft_gray }]} />
        </LazySection>
      )}

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
};

// Named export for App Router (without withApollo wrapper)
export { Bag };

// Default export with Apollo HOC for Pages Router backward compatibility
export default withApollo(Bag, { ssr: false });
