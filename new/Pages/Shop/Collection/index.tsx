import { FC, HTMLAttributes } from "react";
import { useProducts } from "../../../../hooks/product";
import Grid from "../../../../components/Grid";
import Text from "../../../Text";
import ArrowedButton from "../../../Buttons/ArrowedButton";
import Link from "../../../Link";
import ButtonTemplate from "../../../Buttons/Templates/ButtonTemplate";
import Plus from "../../../Icons/Plus";
import Rating from "../../../Icons/Rating";
import NewLink from "../../../Link/NewLink";

const Collection: FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => {
  const { products } = useProducts();

  return (
    <Grid
      css={(theme) => [
        {
          background: theme.colors.pale_gray,
          paddingBottom: 60,
          paddingTop: 60,
        },
      ]}
    >
      <ArrowedButton css={[{ gridColumn: "1/-1" }]}>
        Discover your next deck
      </ArrowedButton>
      <div
        css={(theme) => [
          {
            gridColumn: "1/-1",
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            // flexWrap: "wrap",
            gap: 3,
            marginTop: 60,
            " > *": {
              //   flex: "1 0 30%",
              //   height: 450,
              background: theme.colors.soft_gray,
              borderRadius: 16,
            },
          },
        ]}
      >
        {
          //   const arr = [];
          //   const deckProducts =
          products &&
            products.map(
              (product, index) =>
                product.type === "deck" && (
                  <>
                    {index === 2 && (
                      <div
                        css={[
                          { display: "grid", alignContent: "space-between" },
                        ]}
                      >
                        <Text css={[{ margin: 30 }]}>1,000+ reviews</Text>
                        <div css={[{ margin: 30 }]}>
                          <Rating />
                          <Rating />
                          <Rating />
                          <Rating />
                          <Rating />
                          <Text css={[{ marginTop: 30 }]}>
                            “Not only are they little gems by their own right,
                            they are also a perfect way to discover new talented
                            artists.”
                          </Text>
                          <Text
                            typography="paragraphSmall"
                            css={[{ marginTop: 15 }]}
                          >
                            Matthew V. from Florida, USA
                          </Text>
                          <NewLink css={[{ marginTop: 15 }]} href="">
                            Edition One
                          </NewLink>
                          <div>
                            <ButtonTemplate
                              css={(theme) => [
                                {
                                  marginTop: 30,
                                  // color: "white",
                                  color: theme.colors.dark_gray,
                                  border: `${theme.colors.dark_gray} solid 1px`,
                                  "&:hover": {
                                    color: "white",
                                    background: theme.colors.dark_gray,
                                  },
                                },
                              ]}
                            >
                              View all reviews
                            </ButtonTemplate>
                          </div>
                        </div>
                      </div>
                    )}
                    <div>
                      <Link href="">
                        <img
                          src={product.image2}
                          alt="deck image"
                          css={[
                            {
                              objectFit: "contain",
                              width: "100%",
                              aspectRatio: "1/1",
                            },
                          ]}
                        />
                      </Link>
                      <div css={[{ margin: 30 }]}>
                        <Text>{product.title}</Text>
                        <Text
                          typography="paragraphSmall"
                          css={[{ marginTop: 10 }]}
                        >
                          The bold beginning, reimagined with AR.
                        </Text>
                        <div
                          css={[{ marginTop: 30, display: "flex", gap: 30 }]}
                        >
                          <ButtonTemplate
                            css={(theme) => [
                              {
                                // color: "white",

                                color: "white",
                                background: theme.colors.accent,
                                paddingRight: 15,
                                "&:hover": {},
                              },
                            ]}
                          >
                            <Plus /> Add to bag
                          </ButtonTemplate>
                          <Text typography="linkNewTypography">
                            ${product.price.usd}
                          </Text>
                        </div>
                      </div>
                    </div>
                  </>
                )
            )
          // <div css={[{ padding: 30 }]}>
          //   <Text typography="paragraphBig">
          //     Eight editions.
          //     <br />
          //     Endless inspiration.
          //   </Text>
          //   <Text typography="linkNewTypography">Discover the journey</Text>
          // </div>
        }
      </div>
    </Grid>
  );
};

export default Collection;
