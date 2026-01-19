import { FC, HTMLAttributes, useEffect, useState, useMemo, useCallback, useRef } from "react";
import Grid from "../../../Grid";

import Item from "../../Home/Testimonials/Item";
import Button from "../../../Buttons/Button";
import ArrowedButton from "../../../Buttons/ArrowedButton";
import { useProducts } from "../../../../hooks/product";
import { useRatings } from "../../../../hooks/ratings";
import { useLoadCollectionCards } from "../../../../hooks/card";
import { useRouter } from "next/router";
import Label from "../../../Label";
import Text from "../../../Text";
import { useBag } from "../../../Contexts/bag";
import SoldOut from "../../../Buttons/SoldOut";
import ContinueShopping from "../../../Buttons/ContinueShopping";
import Lock from "../../../Icons/Lock";
import Visa from "../../../Icons/Visa";
import Mastercard from "../../../Icons/Mastercard";
import PayPal from "../../../Icons/PayPal";
import ApplePay from "../../../Icons/ApplePay";
import GooglePay from "../../../Icons/GooglePay";
import AddToBag from "../../../Buttons/AddToBag";
import ScandiBlock from "../../../ScandiBlock";
import Point from "../../../Icons/Point";
import { default as FaqItem } from "../../../Footer/NewFAQ/Item";
import Card from "../../../Card";
import NavButton from "../../../Buttons/NavButton";
import MenuPortal from "../../../Header/MainMenu/MenuPortal";
import Pop from "../../CardPage/Pop";
import Link from "../../../Link";

const points = [
  "55 hand-picked winning designs meticulously selected from an exciting global design contest.",
  "Funded in under an hour on Kickstarter, proudly showcasing its undeniable artistic appeal.",
  "A perfect and timeless gift choice for art lovers, card players, and dedicated collectors.",
  "Carefully crafted in the USA with precision and utmost care, ensuring exceptional top-notch quality.",
  "Sustainably produced with care, actively minimizing its environmental and ecological impact.",
];

const FLIP_TRANSITION_DURATION = 600;

export const CardPreview: FC<{ deckId: string; deckObjectId: string }> = ({
  deckId,
  deckObjectId,
}) => {
  const [show, setShow] = useState(false);
  const [allCards, setAllCards] = useState<GQL.Card[]>([]);
  const [frontCard, setFrontCard] = useState<GQL.Card | null>(null);
  const [backCard, setBackCard] = useState<GQL.Card | null>(null);
  const [rotation, setRotation] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isTabVisible, setIsTabVisible] = useState(true);
  const rotationRef = useRef(0);
  const shownIndicesRef = useRef<Set<number>>(new Set());

  const { loadCollectionCards } = useLoadCollectionCards();

  // Load all cards from deck on mount
  useEffect(() => {
    if (deckObjectId) {
      loadCollectionCards({
        variables: {
          deck: deckObjectId,
          shuffle: true,
        },
      }).then((result) => {
        if (result.data?.cards) {
          const cards = result.data.cards as GQL.Card[];
          setAllCards(cards);
          if (cards.length > 0) {
            const initialIndex = Math.floor(Math.random() * cards.length);
            setFrontCard(cards[initialIndex]);
            setBackCard(cards[initialIndex]);
            shownIndicesRef.current = new Set([initialIndex]);
          }
        }
      });
    }
  }, [deckObjectId, loadCollectionCards]);

  // Pause when tab is not visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsTabVisible(!document.hidden);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // Auto flip
  useEffect(() => {
    if (allCards.length <= 1 || isHovered || !isTabVisible) return;

    const getNextIndex = () => {
      if (shownIndicesRef.current.size >= allCards.length) {
        const isShowingFront = (rotationRef.current / 180) % 2 === 0;
        const currentCard = isShowingFront ? frontCard : backCard;
        const currentIdx = currentCard ? allCards.indexOf(currentCard) : 0;
        shownIndicesRef.current = new Set([currentIdx >= 0 ? currentIdx : 0]);
      }

      const availableIndices: number[] = [];
      for (let i = 0; i < allCards.length; i++) {
        if (!shownIndicesRef.current.has(i)) {
          availableIndices.push(i);
        }
      }

      if (availableIndices.length === 0) return 0;
      const newIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
      shownIndicesRef.current.add(newIndex);
      return newIndex;
    };

    const flip = () => {
      const newIndex = getNextIndex();
      const isShowingFront = (rotationRef.current / 180) % 2 === 0;

      if (isShowingFront) {
        setBackCard(allCards[newIndex]);
      } else {
        setFrontCard(allCards[newIndex]);
      }

      requestAnimationFrame(() => {
        rotationRef.current += 180;
        setRotation(rotationRef.current);
      });
    };

    const interval = setInterval(() => {
      flip();
    }, 4000 + Math.random() * 4000);

    return () => clearInterval(interval);
  }, [allCards, isHovered, isTabVisible, frontCard, backCard]);

  const handleClick = () => {
    // Flip on click
    if (allCards.length > 1) {
      const getNextIndex = () => {
        if (shownIndicesRef.current.size >= allCards.length) {
          shownIndicesRef.current = new Set();
        }
        const availableIndices: number[] = [];
        for (let i = 0; i < allCards.length; i++) {
          if (!shownIndicesRef.current.has(i)) {
            availableIndices.push(i);
          }
        }
        if (availableIndices.length === 0) return 0;
        const newIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
        shownIndicesRef.current.add(newIndex);
        return newIndex;
      };

      const newIndex = getNextIndex();
      const isShowingFront = (rotationRef.current / 180) % 2 === 0;

      if (isShowingFront) {
        setBackCard(allCards[newIndex]);
      } else {
        setFrontCard(allCards[newIndex]);
      }

      requestAnimationFrame(() => {
        rotationRef.current += 180;
        setRotation(rotationRef.current);
      });
    }
  };

  const handlePopupOpen = () => {
    setShow(true);
  };

  const currentCard = (rotationRef.current / 180) % 2 === 0 ? frontCard : backCard;

  if (!frontCard || !backCard) return null;

  return (
    <div css={[{ position: "relative", margin: "30px 0", display: "flex", alignItems: "center", justifyContent: "center", gap: 30 }]}>
      <NavButton
        css={[{ rotate: "180deg" }]}
        onClick={handleClick}
      />
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onDoubleClick={handlePopupOpen}
        css={{
          perspective: "1000px",
          cursor: "pointer",
        }}
      >
        <div
          css={{
            transformStyle: "preserve-3d",
            transition: `transform ${FLIP_TRANSITION_DURATION}ms ease-in-out`,
          }}
          style={{
            transform: `rotateY(${rotation}deg)`,
          }}
        >
          {/* Front face */}
          <div
            css={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
          >
            <Card
              noArtist
              noFavorite
              interactive={false}
              card={frontCard}
              size="preview"
              onClick={handleClick}
            />
          </div>
          {/* Back face */}
          <div
            css={{
              position: "absolute",
              top: 0,
              left: 0,
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <Card
              noArtist
              noFavorite
              interactive={false}
              card={backCard}
              size="preview"
              onClick={handleClick}
            />
          </div>
        </div>
      </div>
      <NavButton onClick={handleClick} />
      <MenuPortal show={show}>
        <Pop
          cardSlug={currentCard?.artist.slug || ""}
          deckId={deckId}
          close={() => setShow(false)}
          initialImg={currentCard?.img}
          initialVideo={currentCard?.video}
          showNavigation={false}
        />
      </MenuPortal>
    </div>
  );
};

const About: FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => {
  const {
    query: { pId },
  } = useRouter();

  const { products } = useProducts();
  const { ratings } = useRatings({ variables: { shuffle: true, limit: 20 } });

  const { getPrice } = useBag();

  const [product, setProduct] = useState<GQL.Product>();
  const [reviewIndex, setReviewIndex] = useState(0);

  // Shuffle ratings on mount
  const shuffledRatings = useMemo(() => {
    if (!ratings || ratings.length === 0) return [];
    const startIndex = Math.floor(Math.random() * ratings.length);
    return [...ratings.slice(startIndex), ...ratings.slice(0, startIndex)];
  }, [ratings]);

  const currentRating = shuffledRatings[reviewIndex];

  const navigateReview = useCallback((direction: 1 | -1) => {
    if (shuffledRatings.length === 0) return;
    setReviewIndex((prev) => {
      const next = prev + direction;
      if (next < 0) return shuffledRatings.length - 1;
      if (next >= shuffledRatings.length) return 0;
      return next;
    });
  }, [shuffledRatings.length]);

  useEffect(() => {
    if (!products || !pId || typeof pId !== "string") {
      return;
    }
    const product = products.find(
      (product) => product.short.toLowerCase().split(" ").join("") === pId
    );
    if (product) {
      setProduct(product);
    }
  }, [products, pId]);

  return (
    <Grid
      id="the-product"
      css={(theme) => [
        {
          paddingTop: 60,
          paddingBottom: 60,
          backgroundColor: theme.colors.soft_gray,
        },
      ]}
    >
      <div
        css={[
          {
            gridColumn: "span 6",
            paddingRight: 30,
            display: "grid",
            gap: 30,
            img: {
              width: "100%",
              borderRadius: 15,
              aspectRatio: "1",
            },
          },
        ]}
      >
        <div css={(theme) => ({ background: theme.colors.white50, borderRadius: 15, aspectRatio: "1" })} />
        {currentRating && (
          <div
            css={(theme) => [
              {
                background: theme.colors.white50,
                width: "100%",
                aspectRatio: "1",
                borderRadius: 20,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              },
            ]}
          >
            <Text css={{ padding: 30 }}>1,000+ reviews</Text>
            <Item
              rating={currentRating}
              customButton={
                <div css={{ marginTop: 30, display: "flex", gap: 5 }}>
                  <NavButton
                    css={{ transform: "rotate(180deg)" }}
                    onClick={() => navigateReview(-1)}
                  />
                  <NavButton onClick={() => navigateReview(1)} />
                </div>
              }
              css={{
                width: "100%",
                maxWidth: "100%",
                minWidth: "100%",
                background: "transparent",
              }}
            />
          </div>
        )}
        <div css={(theme) => ({ background: theme.colors.white50, borderRadius: 15, aspectRatio: "1" })} />
        <div css={(theme) => ({ background: theme.colors.white50, borderRadius: 15, aspectRatio: "1" })} />
        {/* {product ? (
          product.status === "soldout" ? (
            <SoldOut css={[{ textAlign: "center" }]} />
          ) : (
            <AddToBag css={[{ textAlign: "center" }]} productId={product._id} />
          )
        ) : null} */}
        {product && product.deck ? (
          <CardPreview
            deckId={product.deck.slug}
            deckObjectId={product.deck._id}
          />
        ) : null}
      </div>
      <div
        css={[
          {
            gridColumn: "span 6",
            display: "grid",
            gap: 30,
            position: "sticky",
            top: 70,
            height: "fit-content",
            paddingBottom: 60,
          },
        ]}
      >
        <Link href="#the-product">
          <ArrowedButton css={[{ marginBottom: 90, justifyContent: "flex-start" }]}>
            The product
          </ArrowedButton>
        </Link>
        {product && product.deck && product.deck.labels && (
          <div css={[{ display: "flex", gap: 3 }]}>
            {product.deck.labels.map((label, index) => (
              <Label key={label + index}>{label}</Label>
            ))}
          </div>
        )}
        <Text>
          {product?.deck?.info || "Created from a global design contest, this deck features 55 hand-picked artworks, voted on by enthusiasts worldwide. Whether for display or play, each card in this deck is a conversation starter, bringing joy and creativity to any gathering."}
        </Text>
        <div
          css={(theme) => [
            {
              borderRadius: 20,
              background: theme.colors.white75,
              padding: "30px 30px",
            },
          ]}
          style={product ? {} : { height: 232 }}
        >
          {product && (
            <>
              <Text typography="newh3">${product.price.usd}</Text>
              <div css={[{ marginTop: 15, display: "flex", alignItems: "center", gap: 30 }]}>
                {product.status === "soldout" ? (
                  <SoldOut size="big" css={{ fontSize: 20 }} />
                ) : (
                  <AddToBag productId={product._id} size="big" css={{ fontSize: 20 }} />
                )}
                <ContinueShopping css={{ fontSize: 20 }} />
              </div>
              <Text
                css={(theme) => [
                  {
                    color: theme.colors.black30,
                    marginTop: 30,
                    fontSize: 15,
                    display: "flex",
                    alignItems: "center",
                  },
                ]}
              >
                <Lock css={[{ marginRight: 10 }]} />
                100% secure check-out powered by Shopify.
              </Text>
            </>
          )}
        </div>
        <div
          css={(theme) => [
            {
              gap: 30,
              display: "flex",
              alignItems: "center",
              color: "rgba(0,0,0,20%)",
            },
          ]}
        >
          <Visa css={[{ width: 62.67 }]} />
          <Mastercard css={[{ width: 53.71 }]} />
          <PayPal css={[{ width: 76.09 }]} />
          <ApplePay css={[{ width: 67.14 }]} />
          <GooglePay css={[{ width: 69.89 }]} />
        </div>
        <ScandiBlock id="why-this-deck" css={[{ marginTop: 60, paddingTop: 15 }]}>
          <Link href="#why-this-deck">
            <ArrowedButton>Why this deck</ArrowedButton>
          </Link>
        </ScandiBlock>
        <div
          css={[{ margin: "60px 0", display: "grid", maxWidth: 520, gap: 30 }]}
        >
          {points.map((point, index) => (
            <div key={point + index} css={[{ display: "flex", gap: 30 }]}>
              <Point css={[{ padding: 4, boxSizing: "content-box" }]} />
              <Text
                typography="paragraphSmall"
                css={[{ flexBasis: 0, flexGrow: 1 }]}
              >
                {point}
              </Text>
            </div>
          ))}
        </div>
        <FaqItem
          question="What's in the box"
          answer={
            <div css={[{ display: "grid", gap: 30 }]}>
              {[
                "55 cards (52 playing cards plus two jokers, and one info card with the list of the artists).",
                "Premium Bicycle® paper stock for unparalleled artistry, tactile quality and durability.",
                "Poker-sized (9 x 6.5 x 2 cm). Weight ~110g.",
              ].map((point, index) => (
                <div key={point + index} css={[{ display: "flex", gap: 30 }]}>
                  <Point css={[{ padding: 4, boxSizing: "content-box" }]} />
                  <Text
                    typography="paragraphSmall"
                    css={[{ flexBasis: 0, flexGrow: 1 }]}
                  >
                    {point}
                  </Text>
                </div>
              ))}
            </div>
          }
        />
        <FaqItem
          question="Shipping & returns"
          answer="Please allow 2—5 business days for orders to be processed after your purchase is complete. The estimated shipping time is 5—10 business days for Europe and USA, and up to 20 business days for the rest of the world."
        />
      </div>
    </Grid>
  );
};

export default About;
