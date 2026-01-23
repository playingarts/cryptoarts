"use client";

import dynamic from "next/dynamic";
import Head from "next/head";
import { FC, HTMLAttributes, useEffect, useState, useMemo } from "react";
import Header from "../../Header";
import Footer from "../../Footer";
import LazySection from "../../LazySection";
import { withApollo } from "../../../source/apollo";
import { BagButton } from "../Shop";
import Text from "../../Text";
import Link from "../../Link";
import NavButton from "../../Buttons/NavButton";
import { useProducts } from "../../../hooks/product";
import { useRouter } from "next/router";
import Hero from "./Hero";
import CollectionSkeleton from "./Collection/CollectionSkeleton";

// Lazy-load below-fold sections (SSR disabled for progressive loading)
const About = dynamic(() => import("./About"), { ssr: false });
const Collection = dynamic(() => import("./Collection"), { ssr: false });
const Trust = dynamic(() => import("../Shop/Trust"), { ssr: false });
const Bundles = dynamic(() => import("../Shop/Bundles"), { ssr: false });

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

  // Find current product for structured data
  const currentProduct = useMemo(() => {
    if (!products || !pId || typeof pId !== "string") return null;
    return products.find(
      (prod) => prod.short.toLowerCase().split(" ").join("") === pId
    ) || null;
  }, [products, pId]);

  useEffect(() => {
    if (currentProduct?.deck?.slug) {
      setDeckSlug(currentProduct.deck.slug);
    }
  }, [currentProduct]);

  // JSON-LD structured data for e-commerce SEO
  const structuredData = currentProduct ? {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": currentProduct.title,
    "description": currentProduct.description || currentProduct.info,
    "image": currentProduct.image2 || currentProduct.image,
    "brand": {
      "@type": "Brand",
      "name": "Playing Arts",
    },
    "offers": {
      "@type": "Offer",
      "price": currentProduct.price.usd,
      "priceCurrency": "USD",
      "availability": currentProduct.status === "soldout"
        ? "https://schema.org/OutOfStock"
        : currentProduct.status === "low"
        ? "https://schema.org/LimitedAvailability"
        : "https://schema.org/InStock",
    },
  } : null;

  return (
    <>
      {structuredData && (
        <Head>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          />
        </Head>
      )}
      <Header customCTA={<BagButton />} customMiddle={<CustomMiddle />} links={["Product", "Related", "Bundles", "Reviews", "FAQ"]} />
      <div id="product">
        <Hero key={pId as string} />
      </div>

      {/* About section - lazy load on scroll */}
      <LazySection rootMargin="300px" minHeight={400}>
        <About />
      </LazySection>

      {/* Related products carousel - lazy load with skeleton */}
      <div id="related">
        <LazySection rootMargin="300px" minHeight={600} skeleton={<CollectionSkeleton />}>
          <Collection />
        </LazySection>
      </div>

      {/* Trust badges section */}
      <LazySection rootMargin="300px" minHeight={300}>
        <Trust />
      </LazySection>

      {/* Bundles section */}
      <div id="bundles">
        <LazySection rootMargin="300px" minHeight={400}>
          <Bundles />
        </LazySection>
      </div>

      {/* Footer with reviews/FAQ */}
      <div id="reviews">
        <LazySection rootMargin="100px" minHeight={600}>
          <Footer deckSlug={deckSlug} />
        </LazySection>
      </div>
    </>
  );
};

// Named export for App Router (without withApollo wrapper)
export { ProductPage };

// Default export with Apollo HOC for Pages Router backward compatibility
export default withApollo(ProductPage, { ssr: false });
