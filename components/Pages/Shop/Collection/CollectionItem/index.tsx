import { FC, HTMLAttributes, useEffect, useState, useCallback, useRef } from "react";
import { useRouter } from "next/router";

import image2 from "../../../../../mocks/images/ShopCollection/photo-big-1.png";
import image3 from "../../../../../mocks/images/ShopCollection/photo-big-2.png";
import image1 from "../../../../../mocks/images/ShopCollection/photo-big.png";
import Label from "../../../../Label";
import NavButton from "../../../../Buttons/NavButton";
import Text from "../../../../Text";
import Button from "../../../../Buttons/Button";
import AddToBag from "../../../../Buttons/AddToBag";
import SoldOut from "../../../../Buttons/SoldOut";
import Link from "../../../../Link";
import MenuPortal from "../../../../Header/MainMenu/MenuPortal";
import Pop from "../../../ProductPage/Pop";
import CardPop from "../../../CardPage/Pop";
import Card from "../../../../Card";
import { useLoadCollectionCards } from "../../../../../hooks/card";
const images = [image1.src, image2.src, image3.src];

// Minimal card type for our buffer
type BufferCard = Pick<GQL.Card, "_id" | "img" | "video"> & { artist: Pick<GQL.Artist, "slug" | "name" | "country"> };

// Helper to preload an image
const preloadImage = (src: string): Promise<void> =>
  new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = src;
  });

// Card skeleton component - matches cardSizes.nano (184x260)
const CardSkeleton: FC<{ palette: "light" | "dark" }> = ({ palette }) => (
  <div
    css={{
      width: 184,
      height: 260,
      borderRadius: 10,
      background:
        palette === "dark"
          ? "linear-gradient(45deg, #2d2d2d 0%, #3d3d3d 50%, #2d2d2d 100%)"
          : "linear-gradient(45deg, #e8e8e8 0%, #f5f5f5 50%, #e8e8e8 100%)",
      backgroundSize: "200% 200%",
      animation: "shimmer 1.5s ease-in-out infinite",
      "@keyframes shimmer": {
        "0%": { backgroundPosition: "200% 0%" },
        "100%": { backgroundPosition: "-200% 0%" },
      },
    }}
  />
);

const CollectionItem: FC<
  HTMLAttributes<HTMLDivElement> & { palette?: "dark"; product: GQL.Product; useAltImage?: boolean; onViewBag?: () => void; singleImage?: boolean }
> = ({ palette, product, useAltImage, onViewBag, singleImage, ...props }) => {
  const router = useRouter();
  const [hover, setHover] = useState(false);
  const [imageHover, setImageHover] = useState(false);
  const routePrefetchedRef = useRef(false);

  const [show, setShow] = useState(false);

  // Card preview state
  const [cardBuffer, setCardBuffer] = useState<BufferCard[]>([]);
  const [cardIndex, setCardIndex] = useState(0);
  const [readyIndices, setReadyIndices] = useState<Set<number>>(new Set());
  const preloadedIndicesRef = useRef<Set<number>>(new Set());
  const isFetchingRef = useRef(false);
  const seenCardIdsRef = useRef<Set<string>>(new Set());
  const hasInitializedRef = useRef(false);

  // Card popup state
  const [showCardPop, setShowCardPop] = useState(false);
  const [selectedCard, setSelectedCard] = useState<BufferCard | null>(null);

  // Lazy load cards
  const { loadCollectionCards } = useLoadCollectionCards();

  const [index, setIndex] = useState<number>();

  const increaseIndex = () =>
    index !== undefined
      ? index + 1 >= images.length
        ? setIndex(0)
        : setIndex(index + 1)
      : setIndex(0);

  const decreaseIndex = () =>
    index !== undefined
      ? index - 1 < 0
        ? setIndex(2)
        : setIndex(index - 1)
      : setIndex(images.length - 1);

  useEffect(() => {
    if (!imageHover) {
      setIndex(undefined);
    }
  }, [imageHover]);

  // Prefetch product page route on hover
  useEffect(() => {
    if (hover && !routePrefetchedRef.current && product?.short) {
      routePrefetchedRef.current = true;
      const productUrl = `/shop/${product.short.toLowerCase().split(" ").join("")}`;
      router.prefetch(productUrl);

      // Also prefetch hero image
      if (product.image2) {
        preloadImage(product.image2);
      }
    }
  }, [hover, product?.short, product?.image2, router]);

  // Fetch initial random cards when hovering
  useEffect(() => {
    if (hover && !hasInitializedRef.current && product?.deck?._id) {
      hasInitializedRef.current = true;

      const fetchInitialCards = async () => {
        isFetchingRef.current = true;
        try {
          const result = await loadCollectionCards({
            variables: {
              deck: product.deck?._id,
              limit: 6,
              shuffle: true,
            },
          });

          if (result.data?.cards) {
            const cards = result.data.cards as BufferCard[];
            cards.forEach((card) => seenCardIdsRef.current.add(card._id));
            setCardBuffer(cards);
          }
        } finally {
          isFetchingRef.current = false;
        }
      };

      fetchInitialCards();
    }
  }, [hover, product?.deck?._id, loadCollectionCards]);

  // Preload card images
  useEffect(() => {
    if (cardBuffer.length === 0) return;

    const preloadInitial = async () => {
      for (let i = 0; i < Math.min(3, cardBuffer.length); i++) {
        if (!preloadedIndicesRef.current.has(i) && cardBuffer[i]?.img) {
          await preloadImage(cardBuffer[i].img);
          preloadedIndicesRef.current.add(i);
          setReadyIndices((prev) => new Set(prev).add(i));
        }
      }
    };

    preloadInitial();
  }, [cardBuffer]);

  // Fetch more cards when needed
  const fetchMoreCards = useCallback(async () => {
    if (isFetchingRef.current || !product?.deck?._id) return;

    isFetchingRef.current = true;

    try {
      const result = await loadCollectionCards({
        variables: {
          deck: product.deck._id,
          limit: 6,
          shuffle: true,
        },
      });

      if (result.data?.cards) {
        const newCards = result.data.cards.filter(
          (card) => !seenCardIdsRef.current.has(card._id)
        ) as BufferCard[];

        if (newCards.length > 0) {
          newCards.forEach((card) => seenCardIdsRef.current.add(card._id));
          setCardBuffer((prev) => [...prev, ...newCards]);
        }
      }
    } finally {
      isFetchingRef.current = false;
    }
  }, [product?.deck?._id, loadCollectionCards]);

  // Preload next cards
  useEffect(() => {
    if (cardBuffer.length === 0) return;

    const preloadAhead = async () => {
      for (let i = 1; i <= 3; i++) {
        const targetIndex = cardIndex + i;
        if (targetIndex < cardBuffer.length && !preloadedIndicesRef.current.has(targetIndex)) {
          if (cardBuffer[targetIndex]?.img) {
            await preloadImage(cardBuffer[targetIndex].img);
            preloadedIndicesRef.current.add(targetIndex);
            setReadyIndices((prev) => new Set(prev).add(targetIndex));
          }
        }
      }

      const cardsAhead = cardBuffer.length - cardIndex - 1;
      if (cardsAhead < 3 && !isFetchingRef.current) {
        fetchMoreCards();
      }
    };

    preloadAhead();
  }, [cardIndex, cardBuffer, fetchMoreCards]);

  const handlePrevCard = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setCardIndex((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  const handleNextCard = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setCardIndex((prev) => (prev < cardBuffer.length - 1 ? prev + 1 : prev));
  }, [cardBuffer.length]);

  const handleCardClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    const currentCard = cardBuffer[cardIndex];
    if (currentCard) {
      setSelectedCard(currentCard);
      setShowCardPop(true);
    }
  }, [cardIndex, cardBuffer]);

  const currentCard = cardBuffer[cardIndex];
  const isCurrentCardReady = readyIndices.has(cardIndex);
  const canGoPrev = cardIndex > 0;
  const canGoNext = cardIndex < cardBuffer.length - 1 || !isFetchingRef.current;
  const currentPalette = palette === "dark" ? "dark" : "light";

  return (
    <div
      css={(theme) => [
        palette === "dark" && {
          "&:hover": {
            backgroundColor: theme.colors.black,
          },
        },
      ]}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      {...props}
    >
      <div
        onMouseEnter={() => setImageHover(true)}
        onMouseLeave={() => setImageHover(false)}
        css={[
          {
            position: "relative",
            "&:hover": { cursor: "pointer" },
          },
        ]}
        onClick={() => setShow(true)}
      >
        <MenuPortal show={show}>
          <Pop product={product} close={() => {
            document.body.style.overflow = "";
            setShow(false);
          }} show={show} onViewBag={onViewBag ? () => { setShow(false); onViewBag(); } : undefined} />
        </MenuPortal>
        {/* Card popup */}
        {showCardPop && selectedCard && product.deck && (
          <MenuPortal show={showCardPop}>
            <CardPop
              cardSlug={selectedCard.artist.slug}
              deckId={product.deck.slug}
              close={() => setShowCardPop(false)}
              initialImg={selectedCard.img}
              initialVideo={selectedCard.video}
              initialArtistName={selectedCard.artist.name}
              initialArtistCountry={selectedCard.artist.country}
            />
          </MenuPortal>
        )}
        {index === undefined && product.deck && (
          <div
            css={[
              {
                position: "absolute",
                top: 15,
                left: 15,
                display: "flex",
                gap: 3,
              },
            ]}
            style={{ opacity: hover ? 1 : 0 }}
          >
            {product.status === "low" ? (
              <Label css={[{ backgroundColor: "#FFF4CC" }]}>Low stock</Label>
            ) : product.status === "soldout" ? (
              <Label css={[{ backgroundColor: "#FFD6D6" }]}>Sold out</Label>
            ) : null}
            {product.deck.labels &&
              product.deck.labels.map((label) => (
                <Label
                  key={label + "ShopCollection" + product._id}
                  css={[
                    palette === "dark" && {
                      background: "#474747",
                      color: "white",
                    },
                  ]}
                >
                  {label}
                </Label>
              ))}
          </div>
        )}

        {/* Card preview on hover - temporarily hidden
        <div
          css={[
            {
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              display: "flex",
              alignItems: "center",
              gap: 10,
              zIndex: 10,
            },
          ]}
          style={{ opacity: hover ? 1 : 0, pointerEvents: hover ? "auto" : "none" }}
        >
          <NavButton
            palette={currentPalette}
            css={{ rotate: "180deg", opacity: canGoPrev ? 1 : 0.3 }}
            onClick={canGoPrev ? handlePrevCard : undefined}
          />
          {currentCard && isCurrentCardReady ? (
            <Card
              noArtist
              noFavorite
              size="nano"
              card={currentCard as GQL.Card}
              onClick={handleCardClick}
              palette={currentPalette}
            />
          ) : hover ? (
            <CardSkeleton palette={currentPalette} />
          ) : null}
          <NavButton
            palette={currentPalette}
            css={{ opacity: canGoNext ? 1 : 0.3 }}
            onClick={canGoNext ? handleNextCard : undefined}
          />
        </div>
        */}

        <div
          css={{
            position: "relative",
            width: "100%",
            aspectRatio: "1/1",
          }}
        >
          <img
            src={product.image2}
            alt="deck image"
            css={[
              {
                position: "absolute",
                top: 0,
                left: 0,
                objectFit: "contain",
                width: "100%",
                height: "100%",
                transition: "opacity 0.3s ease",
              },
            ]}
            style={{ opacity: index !== undefined ? 0 : (useAltImage ? 0 : 1) }}
          />
          <img
            src={product.image}
            alt="deck image alt"
            css={[
              {
                position: "absolute",
                top: 0,
                left: 0,
                objectFit: "contain",
                width: "100%",
                height: "100%",
                transition: "opacity 0.3s ease",
              },
            ]}
            style={{ opacity: index !== undefined ? 0 : (useAltImage ? 1 : 0) }}
          />
          {!singleImage && images.map((imgSrc, i) => (
            <img
              key={imgSrc}
              src={imgSrc}
              alt={`deck image ${i}`}
              css={[
                {
                  position: "absolute",
                  top: 0,
                  left: 0,
                  objectFit: "contain",
                  width: "100%",
                  height: "100%",
                  transition: "opacity 0.3s ease",
                },
              ]}
              style={{ opacity: index === i ? 1 : 0 }}
            />
          ))}
        </div>
        {!singleImage && (
          <div
            css={[
              {
                position: "absolute",
                bottom: 30,
                left: 30,
                ">*": {
                  backgroundColor: "white",
                },
              },
            ]}
            style={{ opacity: imageHover && !hover ? 1 : 0 }}
          >
            <NavButton
              css={[
                {
                  rotate: "180deg",
                  marginRight: 5,
                },
              ]}
              onClick={(e) => {
                e.stopPropagation();
                decreaseIndex();
              }}
            />
            <NavButton
              onClick={(e) => {
                e.stopPropagation();
                increaseIndex();
              }}
            />
          </div>
        )}
      </div>
      <div css={[{ margin: 30 }]}>
        <Link
          href={
            (process.env.NEXT_PUBLIC_BASELINK || "") +
            "/shop/" +
            product.short.toLowerCase().split(" ").join("")
          }
        >
          <Text typography="newh4" palette={hover ? palette : undefined}>
            {product.title}
          </Text>
          <Text
            typography="paragraphSmall"
            css={[{ marginTop: 10 }]}
            palette={hover ? palette : undefined}
          >
            {product.description || product.info}
          </Text>
        </Link>
        <div css={[{ marginTop: 30, display: "flex", gap: 30 }]}>
          {product.deck && product.deck.slug === "crypto" ? (
            hover && palette !== undefined ? (
              <Button
                key="darkExclusive"
                size="small"
                bordered={true}
                palette={palette}
                color="white"
              >
                Exclusive
              </Button>
            ) : (
              <Button size="small" bordered={true}>
                Exclusive
              </Button>
            )
          ) : (
            <>
              {product.status === "soldout" ? (
                <SoldOut />
              ) : (
                <AddToBag productId={product._id} />
              )}
              <Text typography="linkNewTypography">${product.price.usd}</Text>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CollectionItem;
