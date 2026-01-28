"use client";

import dynamic from "next/dynamic";
import Head from "next/head";
import { FC, HTMLAttributes, useEffect, useState, useMemo, useCallback } from "react";
import Header from "../../Header";
import Footer from "../../Footer";
import LazySection from "../../LazySection";
import { withApollo } from "../../../source/apollo";
import { BagButton } from "../Shop";
import Text from "../../Text";
import Link from "../../Link";
import NavButton from "../../Buttons/NavButton";
import AddToBag from "../../Buttons/AddToBag";
import SoldOut from "../../Buttons/SoldOut";
import { useProducts } from "../../../hooks/product";
import { useRouter } from "next/router";
import Hero from "./Hero";
import CollectionSkeleton from "./Collection/CollectionSkeleton";
import { colord } from "colord";

// Lazy-load below-fold sections (SSR disabled for progressive loading)
const About = dynamic(() => import("./About"), { ssr: false });
const Collection = dynamic(() => import("./Collection"), { ssr: false });
const Trust = dynamic(() => import("../Shop/Trust"), { ssr: false });
const Bundles = dynamic(() => import("../Shop/Bundles"), { ssr: false });
const Testimonials = dynamic(() => import("../Home/Testimonials"), { ssr: false });
const FAQ = dynamic(() => import("../../Footer/Faq"), { ssr: false });
const Newsletter = dynamic(() => import("../../Newsletter"), { ssr: false });

export const convertToProductSlug = (short: string) => {
  return short.toLowerCase().split(" ").join("");
};

export const getProductSlug = (product: GQL.Product) => {
  return product.slug || convertToProductSlug(product.short);
};

const CustomMiddle = () => {
  const { products: allProducts } = useProducts();
  const router = useRouter();
  const { query: { pId } } = router;

  const [counter, setCounter] = useState(0);

  // Filter out bundles from navigation
  const products = allProducts?.filter((p) => p.type !== "bundle");

  useEffect(() => {
    if (!products || !pId || typeof pId !== "string") {
      return;
    }
    setCounter(
      products.findIndex(
        (product) => getProductSlug(product) === pId
      )
    );
  }, [pId, products]);

  // Get prev/next product slugs
  const prevSlug = products && products.length > 0
    ? getProductSlug(products[counter > 0 ? counter - 1 : products.length - 1])
    : null;
  const nextSlug = products && products.length > 0
    ? getProductSlug(products[counter < products.length - 1 ? counter + 1 : 0])
    : null;

  // Keyboard navigation (left/right arrows)
  useEffect(() => {
    if (!products || products.length === 0) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Skip if user is typing in an input/textarea
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (e.key === "ArrowLeft" && prevSlug) {
        e.preventDefault();
        router.push(`/shop/${prevSlug}`, undefined, { shallow: true });
      } else if (e.key === "ArrowRight" && nextSlug) {
        e.preventDefault();
        router.push(`/shop/${nextSlug}`, undefined, { shallow: true });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [products, prevSlug, nextSlug, router]);

  return products ? (
    <Text
      typography="p-s"
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
            ? getProductSlug(products[counter - 1])
            : getProductSlug(products[products.length - 1])
        }
        shallow={true}
      >
        <NavButton css={[{ transform: "rotate(180deg)" }]} />
      </Link>
      <Link
        css={[{ marginRight: 5 }]}
        href={
          counter < products.length - 1
            ? getProductSlug(products[counter + 1])
            : getProductSlug(products[0])
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
  const [showBottomBar, setShowBottomBar] = useState(false);

  // Find current product for structured data
  const currentProduct = useMemo(() => {
    if (!products || !pId || typeof pId !== "string") return null;
    return products.find(
      (prod) => prod.slug === pId || prod.short.toLowerCase().split(" ").join("") === pId
    ) || null;
  }, [products, pId]);

  useEffect(() => {
    if (currentProduct?.deck?.slug) {
      setDeckSlug(currentProduct.deck.slug);
    }
  }, [currentProduct]);

  // Show mobile bottom bar only when scrolled past the CTA section
  useEffect(() => {
    const handleScroll = () => {
      const productCta = document.getElementById("product-cta");
      if (productCta) {
        const rect = productCta.getBoundingClientRect();
        // Show when CTA bottom is above the viewport (user has scrolled past it)
        setShowBottomBar(rect.bottom < 0);
      } else {
        // CTA not found yet, don't show bar
        setShowBottomBar(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Delay initial check to ensure DOM is ready
    const timeout = setTimeout(handleScroll, 100);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeout);
    };
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

      {/* Reviews section */}
      <LazySection id="reviews" rootMargin="100px" minHeight={500}>
        <Testimonials />
      </LazySection>

      {/* FAQ section */}
      <LazySection id="faq" rootMargin="100px" minHeight={600}>
        <FAQ deckSlug={deckSlug} />
      </LazySection>

      {/* Newsletter section */}
      <LazySection id="newsletter" rootMargin="100px" minHeight={200}>
        <Newsletter />
      </LazySection>

      {/* Footer (links, copyright, etc.) */}
      <LazySection rootMargin="100px" minHeight={400}>
        <Footer />
      </LazySection>

      {/* Mobile sticky bottom bar */}
      {currentProduct && currentProduct.deck?.slug !== "crypto" && (
        <div
          css={(theme) => ({
            display: "none",
            [theme.maxMQ.xsm]: {
              display: "flex",
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 100,
              height: 60,
              paddingLeft: theme.spacing(2),
              paddingRight: theme.spacing(2),
              justifyContent: "space-between",
              alignItems: "center",
              background: colord("#FFFFFF").alpha(0.9).toRgbString(),
              backdropFilter: "blur(10px)",
              transform: showBottomBar ? "translateY(0)" : "translateY(100%)",
              transition: "transform 0.15s ease-out",
            },
          })}
        >
          <Text
            typography="p-m"
            css={{ flex: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", marginRight: 10, paddingTop: 5, cursor: "pointer" }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            {currentProduct.short || currentProduct.title}
          </Text>
          <div css={{ display: "flex", alignItems: "center", gap: 20, height: "100%" }}>
            <Text typography="h4" css={{ paddingTop: 5 }}>${currentProduct.price.usd}</Text>
            {currentProduct.status === "soldout" || currentProduct.status === "soon" ? (
              <SoldOut status={currentProduct.status} />
            ) : (
              <AddToBag productId={currentProduct._id} />
            )}
          </div>
        </div>
      )}
    </>
  );
};

// Named export for App Router (without withApollo wrapper)
export { ProductPage };

// Default export with Apollo HOC for Pages Router backward compatibility
export default withApollo(ProductPage, { ssr: false });
