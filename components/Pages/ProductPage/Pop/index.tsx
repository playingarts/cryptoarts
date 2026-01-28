import { FC, HTMLAttributes, useEffect, useState, useRef } from "react";
import { keyframes } from "@emotion/react";
import { convertToProductSlug } from "..";
import { useProducts } from "../../../../hooks/product";
import AddToBag from "../../../Buttons/AddToBag";
import SoldOut from "../../../Buttons/SoldOut";
import ArrowButton from "../../../Buttons/ArrowButton";
import Button from "../../../Buttons/Button";
import NavButton from "../../../Buttons/NavButton";
import Plus from "../../../Icons/Plus";
import Label from "../../../Label";
import Link from "../../../Link";
import Text from "../../../Text";
import { useFlyingFav } from "../../../Contexts/flyingFav";

/** Fade animation for photo transitions */
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

/** Min interval between photo changes (ms) */
const MIN_INTERVAL = 6000;
/** Max interval between photo changes (ms) */
const MAX_INTERVAL = 12000;

/** Get random interval between min and max */
const getRandomInterval = () => MIN_INTERVAL + Math.random() * (MAX_INTERVAL - MIN_INTERVAL);

// Desktop: navigate between products
const ProductNavigation: FC<{
  productState: GQL.Product;
  setProductState: (arg0: GQL.Product | undefined) => void;
}> = ({ productState, setProductState }) => {
  const { products } = useProducts();
  const [counter, setCounter] = useState(0);

  // Filter out bundles from navigation - only show deck products
  const deckProducts = products?.filter((p) => p.type === "deck") ?? [];

  useEffect(() => {
    if (!deckProducts.length) {
      return;
    }
    setCounter(
      deckProducts.findIndex((product) => product.short === productState.short)
    );
  }, [deckProducts, productState]);

  return deckProducts.length ? (
    <Text
      typography="p-s"
      css={(theme) => [
        {
          display: "flex",
          alignItems: "center",
          paddingRight: 66,
          justifyContent: "end",
          [theme.maxMQ.xsm]: {
            display: "none",
          },
        },
      ]}
    >
      <NavButton
        onClick={() =>
          setProductState(
            counter > 0 ? deckProducts[counter - 1] : deckProducts[deckProducts.length - 1]
          )
        }
        css={[{ transform: "rotate(180deg)" }]}
      />
      <NavButton
        onClick={() =>
          setProductState(
            counter < deckProducts.length - 1 ? deckProducts[counter + 1] : deckProducts[0]
          )
        }
      />
    </Text>
  ) : null;
};

// Navigate between product photos (positioned on photo)
const PhotoNavigation: FC<{
  photos: string[];
  photoIndex: number;
  onPhotoChange: (index: number) => void;
}> = ({ photos, photoIndex, onPhotoChange }) => {
  if (photos.length <= 1) return null;

  return (
    <div
      className="photo-nav"
      css={(theme) => [
        {
          position: "absolute",
          bottom: 15,
          left: 15,
          display: "flex",
          alignItems: "center",
          gap: 5,
          zIndex: 2,
          opacity: 0,
          transition: "opacity 0.2s ease",
          [theme.maxMQ.xsm]: {
            opacity: 1,
            left: "auto",
            right: 15,
          },
        },
      ]}
    >
      <NavButton
        onClick={() =>
          onPhotoChange(photoIndex > 0 ? photoIndex - 1 : photos.length - 1)
        }
        css={(theme) => [{ transform: "rotate(180deg)", backgroundColor: theme.colors.white }]}
      />
      <NavButton
        onClick={() =>
          onPhotoChange(photoIndex < photos.length - 1 ? photoIndex + 1 : 0)
        }
        css={(theme) => [{ backgroundColor: theme.colors.white }]}
      />
    </div>
  );
};

const Pop: FC<
  HTMLAttributes<HTMLElement> & {
    close: () => void;
    product: GQL.Product;
    show?: boolean;
    onViewBag?: () => void;
  }
> = ({ close, product, show = true, onViewBag, ...props }) => {
  const { setPopupOpen } = useFlyingFav();

  // Lock body scroll and notify floating button when popup is open
  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
      setPopupOpen(true);
    } else {
      document.body.style.overflow = "";
      setPopupOpen(false);
    }
    return () => {
      setPopupOpen(false);
    };
  }, [show, setPopupOpen]);

  const [productState, setProductState] = useState<GQL.Product>();
  const [photoIndex, setPhotoIndex] = useState(0);
  const [previousPhoto, setPreviousPhoto] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const autoRotateTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (product) {
      setProductState(product);
      setPhotoIndex(0); // Reset photo index when product changes
      setPreviousPhoto(null);
      setIsTransitioning(false);
    }
  }, [product]);

  // Get photos array with product image first
  const photos = productState?.image2
    ? [productState.image2, ...(productState.photos || [])]
    : productState?.photos || [];
  const currentPhoto = photos[photoIndex] || productState?.image2;

  // Auto-rotate photos with random intervals (same as product page)
  useEffect(() => {
    if (!show || photos.length <= 1) return;

    const scheduleNext = () => {
      const interval = getRandomInterval();
      return setTimeout(() => {
        setPhotoIndex((prev) => {
          const nextIndex = (prev + 1) % photos.length;
          // Trigger crossfade
          setPreviousPhoto(photos[prev]);
          setIsTransitioning(true);
          setTimeout(() => setIsTransitioning(false), 500);
          return nextIndex;
        });
        autoRotateTimerRef.current = scheduleNext();
      }, interval);
    };

    autoRotateTimerRef.current = scheduleNext();

    return () => {
      if (autoRotateTimerRef.current) {
        clearTimeout(autoRotateTimerRef.current);
        autoRotateTimerRef.current = null;
      }
    };
  }, [show, photos.length]);

  // Handle manual photo navigation - reset auto-rotate timer
  const handlePhotoChange = (newIndex: number) => {
    if (autoRotateTimerRef.current) {
      clearTimeout(autoRotateTimerRef.current);
    }
    setPreviousPhoto(currentPhoto || null);
    setIsTransitioning(true);
    setPhotoIndex(newIndex);
    setTimeout(() => setIsTransitioning(false), 500);

    // Restart auto-rotate after manual change
    if (photos.length > 1) {
      const interval = getRandomInterval();
      autoRotateTimerRef.current = setTimeout(() => {
        setPhotoIndex((prev) => {
          const nextIndex = (prev + 1) % photos.length;
          setPreviousPhoto(photos[prev] || null);
          setIsTransitioning(true);
          setTimeout(() => setIsTransitioning(false), 500);
          return nextIndex;
        });
      }, interval);
    }
  };

  return (
    <div
      css={(theme) => [
        {
          background: theme.colors.black50,
          width: "100%",
          position: "fixed",
          inset: 0,
          zIndex: 9999,

          overflow: "scroll",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        },
      ]}
      onClick={(e) => {
        e.stopPropagation();
        close();
      }}
      {...props}
    >
      <div
        css={(theme) => [
          {
            width: "100%",
            maxWidth: 1130,
            padding: theme.spacing(3),
            backgroundColor: theme.colors.pale_gray,
            display: "flex",
            gap: theme.spacing(3),
            borderRadius: theme.spacing(1.5),
            margin: "0 auto",
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            [theme.maxMQ.sm]: {
              flexDirection: "column",
              marginTop: theme.spacing(3),
              marginBottom: theme.spacing(3),
              marginLeft: theme.spacing(1.5),
              marginRight: theme.spacing(1.5),
              width: `calc(100% - ${theme.spacing(3)}px)`,
            },
            [theme.maxMQ.xsm]: {
              padding: 0,
              margin: theme.spacing(1.5),
              marginTop: theme.spacing(3),
              width: `calc(100% - ${theme.spacing(3)}px)`,
              borderRadius: theme.spacing(1.5),
              overflow: "hidden",
              gap: theme.spacing(2),
              position: "relative",
            },
          },
        ]}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div
          css={(theme) => [
            {
              flex: "0 0 600px",
              maxWidth: 600,
              [theme.maxMQ.sm]: {
                flex: "1 1 auto",
                maxWidth: "100%",
              },
            },
          ]}
        >
          <div
            css={(theme) => [
              {
                width: "100%",
                background: theme.colors.white30,
                aspectRatio: "1",
                position: "relative",
                borderRadius: theme.spacing(2),
                "&:hover .photo-nav": {
                  opacity: 1,
                },
                [theme.maxMQ.xsm]: {
                  borderRadius: 0,
                },
              },
            ]}
          >
            {productState ? (
              <>
                {/* Previous photo for crossfade */}
                {isTransitioning && previousPhoto && (
                  <img
                    src={previousPhoto}
                    alt=""
                    css={(theme) => [
                      {
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        borderRadius: theme.spacing(2),
                        zIndex: 0,
                        [theme.maxMQ.xsm]: {
                          borderRadius: 0,
                        },
                      },
                    ]}
                  />
                )}
                <img
                  key={currentPhoto}
                  src={currentPhoto}
                  alt={`${productState.title} product image`}
                  css={(theme) => [
                    {
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      borderRadius: theme.spacing(2),
                      position: "relative",
                      zIndex: 1,
                      animation: isTransitioning ? `${fadeIn} 0.5s ease-out` : "none",
                      [theme.maxMQ.xsm]: {
                        borderRadius: 0,
                      },
                    },
                  ]}
                />
                {productState.deck && (
                  <div
                    css={(theme) => [
                      {
                        position: "absolute",
                        top: 15,
                        left: 15,
                        display: "flex",
                        gap: 3,
                        zIndex: 2,
                      },
                    ]}
                  >
                    {productState.deck.labels &&
                      productState.deck.labels.map((label) => (
                        <Label key={label}>{label}</Label>
                      ))}
                  </div>
                )}
                <PhotoNavigation
                  photos={photos}
                  photoIndex={photoIndex}
                  onPhotoChange={handlePhotoChange}
                />
              </>
            ) : null}
          </div>
        </div>
        <div
          css={(theme) => [
            {
              flex: 1,
              height: 600,
              display: "flex",
              flexDirection: "column",
              position: "sticky",
              top: 30,
              [theme.maxMQ.sm]: {
                width: "100%",
                height: "auto",
                position: "static",
              },
              [theme.maxMQ.xsm]: {
                padding: theme.spacing(3),
                paddingTop: theme.spacing(1),
              },
            },
          ]}
        >
          <div
            css={(theme) => [
              {
                display: "flex",
                justifyContent: "space-between",
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 10,
                [theme.maxMQ.xsm]: {
                  top: 15,
                  left: 15,
                  right: 15,
                },
              },
            ]}
          >
            {productState ? (
              <ProductNavigation
                productState={productState}
                setProductState={setProductState}
              />
            ) : null}
            <Button
              css={(theme) => [
                {
                  borderRadius: "100%",
                  padding: 0,
                  width: 45,
                  justifyContent: "center",
                  display: "flex",
                  alignItems: "center",
                  [theme.maxMQ.xsm]: {
                    marginLeft: "auto",
                  },
                },
              ]}
              onClick={close}
              aria-label="Close popup"
            >
              <Plus css={[{ rotate: "45deg" }]} />
            </Button>
          </div>
          {productState ? (
            <div
              css={(theme) => [
                {
                  display: "grid",
                  alignContent: "center",
                  flex: 1,
                },
              ]}
            >
              {productState.type !== "bundle" ? (
                <Link
                  href={
                    (process.env.NEXT_PUBLIC_BASELINK || "") +
                    "/shop/" +
                    (productState.slug || convertToProductSlug(productState.short))
                  }
                  onClick={() => {
                    document.body.style.overflow = "";
                    close();
                  }}
                >
                  <Text typography="h2" css={(theme) => ({ whiteSpace: "pre-line", [theme.maxMQ.xsm]: { whiteSpace: "normal" } })}>{productState.title.replace("Future Chapter", "Future\nChapter")}</Text>
                </Link>
              ) : (
                <Text typography="h2" css={(theme) => ({ whiteSpace: "pre-line", [theme.maxMQ.xsm]: { whiteSpace: "normal" } })}>{productState.title.replace("Future Chapter", "Future\nChapter")}</Text>
              )}
              <Text typography="p-s" css={(theme) => ({ marginTop: 15, [theme.maxMQ.xsm]: { ...theme.typography["p-m"], marginTop: theme.spacing(1) } })}>{productState.description || productState.info}</Text>
              {productState.deck?.slug !== "crypto" && <Text typography="h4" css={(theme) => ({ marginTop: 15, [theme.maxMQ.xsm]: { marginTop: theme.spacing(1) } })}>${productState.price.usd}</Text>}
              <div
                css={(theme) => [
                  {
                    marginTop: 15,
                    display: "flex",
                    gap: theme.spacing(3),
                    alignItems: "center",
                  },
                ]}
              >
                {productState.deck?.slug === "crypto" ? (
                  <Button size="small" bordered>
                    Info
                  </Button>
                ) : productState.status === "soldout" || productState.status === "soon" ? (
                  <SoldOut status={productState.status} />
                ) : (
                  <AddToBag productId={productState._id} onViewBag={onViewBag} />
                )}

{productState.type !== "bundle" && (
                  <Link
                    href={
                      (process.env.NEXT_PUBLIC_BASELINK || "") +
                      "/shop/" +
                      (productState.slug || convertToProductSlug(productState.short))
                    }
                    onClick={() => {
                      document.body.style.overflow = "";
                      close();
                    }}
                    css={{ display: "flex", alignItems: "center" }}
                  >
                    <ArrowButton noColor base size="small">
                      Product details
                    </ArrowButton>
                  </Link>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Pop;
