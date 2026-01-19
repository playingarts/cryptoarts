"use client";

import dynamic from "next/dynamic";
import { FC, HTMLAttributes, useEffect, useState } from "react";
import Header from "../../Header";
import Footer from "../../Footer";
import { withApollo } from "../../../source/apollo";
import { BagButton } from "../Shop";
import Text from "../../Text";
import Link from "../../Link";
import NavButton from "../../Buttons/NavButton";
import { useProducts } from "../../../hooks/product";
import { useRouter } from "next/router";
import Hero from "./Hero";

// Lazy-load below-fold sections
const About = dynamic(() => import("./About"), { ssr: true });
const Collection = dynamic(() => import("./Collection"), { ssr: true });
const Trust = dynamic(() => import("../Shop/Trust"), { ssr: true });
const Bundles = dynamic(() => import("../Shop/Bundles"), { ssr: true });

export const convertToProductSlug = (short: string) => {
  return short.toLowerCase().split(" ").join("");
};

const CustomMiddle = () => {
  const { products: allProducts } = useProducts();

  const {
    query: { pId },
  } = useRouter();

  const [counter, setCounter] = useState(0);

  // Filter out bundles from navigation
  const products = allProducts?.filter((p) => p.type !== "bundle");

  useEffect(() => {
    if (!products || !pId || typeof pId !== "string") {
      return;
    }
    setCounter(
      products.findIndex(
        (product) => convertToProductSlug(product.short) === pId
      )
    );
  }, [pId, products]);

  return products ? (
    <Text
      typography="paragraphSmall"
      css={[
        {
          display: "flex",
          alignItems: "center",
          paddingRight: 66,
          justifyContent: "end",
        },
      ]}
    >
      <Link
        css={[{ marginRight: 5 }]}
        href={
          counter > 0
            ? convertToProductSlug(products[counter - 1].short)
            : convertToProductSlug(products[products.length - 1].short)
        }
        shallow={true}
      >
        <NavButton css={[{ transform: "rotate(180deg)" }]} />
      </Link>
      <Link
        css={[{ marginRight: 5 }]}
        href={
          counter < products.length - 1
            ? convertToProductSlug(products[counter + 1].short)
            : convertToProductSlug(products[0].short)
        }
        shallow={true}
      >
        <NavButton />
      </Link>
      <span css={[{ marginLeft: 30 }]}>
        Product {(counter + 1).toString().padStart(2, "0") + " "}/
        {" " + products.length.toString().padStart(2, "0")}
      </span>
    </Text>
  ) : null;
};

const ProductPage: FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => {
  const { products } = useProducts();
  const { query: { pId } } = useRouter();

  const [deckSlug, setDeckSlug] = useState<string | undefined>();

  useEffect(() => {
    if (!products || !pId || typeof pId !== "string") {
      return;
    }
    const product = products.find(
      (prod) => prod.short.toLowerCase().split(" ").join("") === pId
    );
    if (product?.deck?.slug) {
      setDeckSlug(product.deck.slug);
    }
  }, [pId, products]);

  return (
    <>
      <Header customCTA={<BagButton />} customMiddle={<CustomMiddle />} links={["Product", "Related", "Bundles", "Reviews", "FAQ"]} />
      <Hero />
      <About />
      <Collection />
      <Trust />
      <Bundles />
      <Footer deckSlug={deckSlug} />
    </>
  );
};

// Named export for App Router (without withApollo wrapper)
export { ProductPage };

// Default export with Apollo HOC for Pages Router backward compatibility
export default withApollo(ProductPage, { ssr: false });
