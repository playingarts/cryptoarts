import { FC, HTMLAttributes, useEffect, useState } from "react";
import Grid from "../../../Grid";

import image2 from "../../../../mocks/images/ShopCollection/photo-big-1.png";
import image3 from "../../../../mocks/images/ShopCollection/photo-big-2.png";
import image1 from "../../../../mocks/images/ShopCollection/photo-big.png";
import Item from "../../Home/Testimonials/Item";
import Button from "../../../Buttons/Button";
import ArrowedButton from "../../../Buttons/ArrowedButton";
import { useProducts } from "../../../../hooks/product";
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
import Amex from "../../../Icons/Amex";
import AddToBag from "../../../Buttons/AddToBag";
import ScandiBlock from "../../../ScandiBlock";
import Point from "../../../Icons/Point";
import { default as FaqItem } from "../../../Footer/NewFAQ/Item";
import Card from "../../../Card";
import NavButton from "../../../Buttons/NavButton";
import MenuPortal from "../../../Header/MainMenu/MenuPortal";
import Pop from "../../CardPage/Pop";
import GalleryButton from "../../../Popups/Gallery/GalleryButton";

const points = [
  "55 hand-picked winning designs meticulously selected from an exciting global design contest.",
  "Funded in under an hour on Kickstarter, proudly showcasing its undeniable artistic appeal.",
  "A perfect and timeless gift choice for art lovers, card players, and dedicated collectors.",
  "Carefully crafted in the USA with precision and utmost care, ensuring exceptional top-notch quality.",
  "Sustainably produced with care, actively minimizing its environmental and ecological impact.",
];

export const CardPreview: FC<{ previewCards: GQL.Card[]; deckId: string }> = ({
  previewCards,
  deckId,
}) => {
  const [index, setIndex] = useState(0);

  const [show, setShow] = useState(false);

  return (
    <div css={[{ position: "relative", margin: "30px 0" }]}>
      <div
        css={[
          {
            position: "absolute",
            display: "flex",
            gap: 5,
            bottom: 55,
            left: 30,
          },
        ]}
      >
        <NavButton
          css={[
            {
              rotate: "180deg",
            },
          ]}
          onClick={() =>
            setIndex(index === 0 ? previewCards.length - 1 : index - 1)
          }
        />
        <NavButton
          onClick={() =>
            setIndex(index === previewCards.length - 1 ? 0 : index + 1)
          }
        />
      </div>
      <Card
        card={previewCards[index]}
        size="preview"
        css={[{ margin: "0 auto" }]}
        onClick={() => setShow(true)}
      />
      <MenuPortal show={show}>
        <Pop
          cardSlug={previewCards[index].artist.slug}
          deckId={deckId}
          close={() => setShow(false)}
          initialImg={previewCards[index].img}
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

  const { getPrice } = useBag();

  const [product, setProduct] = useState<GQL.Product>();

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
  }, [products]);

  return (
    <Grid
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
        <GalleryButton src={image1.src} alt="" />
        <Item
          rating={{
            who: "Matthew V. from Florida, USA",
            review:
              "I’ve never seen anything like this! Its like a gallery in a deck. Just stuning.",
            title: "",
            _id: "",
          }}
          customButton={
            <Button bordered css={[{ marginTop: 30 }]}>
              View all reviews
            </Button>
          }
          css={(theme) => [
            {
              background: theme.colors.white50,
              margin: "30px 0",
              width: "100%",
            },
          ]}
        />
        <GalleryButton src={image2.src} alt="" />
        <GalleryButton src={image3.src} alt="" />
        <Button
          css={(theme) => [
            {
              textAlign: "center",
              background: "rgba(0,0,0,0.05)",
              color: theme.colors.black50,
              "&:hover": {
                color: theme.colors.black50,
              },
            },
          ]}
        >
          Load more photos
        </Button>
        {/* {product ? (
          product.status === "soldout" ? (
            <SoldOut css={[{ textAlign: "center" }]} />
          ) : (
            <AddToBag css={[{ textAlign: "center" }]} productId={product._id} />
          )
        ) : null} */}
        {product && product.deck && product.deck.previewCards ? (
          <CardPreview
            previewCards={product.deck.previewCards}
            deckId={product.deck.slug}
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
            paddingBottom: 120,
          },
        ]}
      >
        <ArrowedButton css={[{ marginTop: 15, marginBottom: 90 }]}>
          The product
        </ArrowedButton>
        {product && product.deck && product.deck.labels && (
          <div css={[{ display: "flex", gap: 3 }]}>
            {product.deck.labels.map((label, index) => (
              <Label key={label + index}>{label}</Label>
            ))}
          </div>
        )}
        <Text>
          Created from a global design contest, this deck features 55
          hand-picked artworks, voted on by enthusiasts worldwide. Whether for
          display or play, each card in this deck is a conversation starter,
          bringing joy and creativity to any gathering.
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
              <Text typography="newh3">{getPrice(product.price)}</Text>
              <div css={[{ marginTop: 15 }]}>
                {product.status === "soldout" ? (
                  <SoldOut />
                ) : (
                  <AddToBag productId={product._id} />
                )}
                <ContinueShopping css={[{ marginLeft: 30 }]} />
              </div>
              <Text
                typography="paragraphSmall"
                css={(theme) => [
                  {
                    color: theme.colors.black30,
                    marginTop: 30,
                  },
                ]}
              >
                <Lock css={[{ marginRight: 10 }]} />
                100% secure powered by Shopify
              </Text>
            </>
          )}
        </div>
        <div
          css={(theme) => [
            {
              gap: 20,
              marginTop: 30,
              display: "flex",
              alignItems: "center",
              color: "rgba(0,0,0,20%)",
            },
          ]}
        >
          <Visa css={[{ width: 62.67 }]} />
          <Mastercard css={[{ width: 53.71 }]} />
          <Amex css={[{ width: 36.21 }]} />
          <PayPal css={[{ width: 76.09 }]} />
          <ApplePay css={[{ width: 67.14 }]} />
          <GooglePay css={[{ width: 69.89 }]} />
        </div>
        <ScandiBlock css={[{ marginTop: 60, paddingTop: 15 }]}>
          <ArrowedButton>Why this deck</ArrowedButton>
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
