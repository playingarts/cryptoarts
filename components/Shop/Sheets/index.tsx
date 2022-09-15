import { FC, Fragment, HTMLAttributes, useState } from "react";
import { breakpoints } from "../../../source/enums";
import AddToBagButton from "../../AddToBagButton";
import Button from "../../Button";
import Grid from "../../Grid";
import Bag from "../../Icons/Bag";
import Line from "../../Line";
import SelectButton from "../../SelectButton";
import { useSize } from "../../SizeProvider";
import Text from "../../Text";

interface Props extends HTMLAttributes<HTMLElement> {
  products: GQL.Product[];
}

const ShopSheets: FC<Props> = ({ products, ...props }) => {
  const notSoldout = ({ status }: GQL.Product) => status !== "soldout";
  const [product, setProduct] = useState(
    products.find(notSoldout) || products[0]
  );

  const changeProduct = (selected: string) => {
    setProduct(products.find(({ title }) => title === selected) || products[0]);
  };

  const image = (
    <img
      src={product.image}
      alt={product.title}
      css={(theme) => ({
        borderRadius: theme.spacing(1),
        [theme.maxMQ.sm]: {
          maxHeight: theme.spacing(34),
        },
        maxHeight: "100%",
        maxWidth: "100%",
      })}
    />
  );
  const { width } = useSize();
  return (
    <Grid
      {...props}
      css={{
        gridColumn: "1/-1",
        alignItems: "center",
      }}
    >
      {width >= breakpoints.sm && (
        <div
          css={(theme) => ({
            gridColumn: "span 4",
            [theme.mq.md]: {
              gridColumn: "span 5",
            },
          })}
        >
          {image}
        </div>
      )}
      <div
        css={(theme) => ({
          gridColumn: "span 4 / -1",
          [theme.mq.md]: { gridColumn: "7 / span 5" },
          [theme.maxMQ.sm]: {
            gridColumn: "1/-1",
          },
        })}
      >
        <Text css={{ margin: 0 }} component="h3">
          Uncut Sheets
        </Text>
        {width >= breakpoints.sm && (
          <Fragment>
            <Text css={[{ margin: 0, opacity: 0.5 }]} variant="body2">
              €{product.price}
            </Text>
            <Line spacing={3} />
          </Fragment>
        )}

        <Text
          css={(theme) => [
            {
              [theme.maxMQ.sm]: {
                fontSize: 16,
              },
            },
          ]}
        >
          An uncut sheet is a normal deck of playing cards - uncut. Just before
          the sheets were cut into decks at USPCC, some were removed - destined
          for display on your wall.
        </Text>
        <Text
          css={(theme) => [
            {
              [theme.maxMQ.sm]: {
                fontSize: 16,
              },
              margin: 0,
              opacity: 0.5,
            },
          ]}
        >
          Size: 22x26,5 inches. Frame not included.
        </Text>
        <Line spacing={3} />
        {width < breakpoints.sm && (
          <div
            css={(theme) => [
              {
                [theme.maxMQ.sm]: {
                  display: "flex",
                  justifyContent: "center",
                  paddingRight: theme.spacing(2.5),
                  paddingLeft: theme.spacing(2.5),
                  paddingBottom: theme.spacing(2.5),
                },
              },
            ]}
          >
            {image}
          </div>
        )}
        <div
          css={(theme) => ({
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: theme.spacing(2),
            [theme.maxMQ.sm]: {
              paddingRight: theme.spacing(2.5),
              paddingLeft: theme.spacing(2.5),
            },
          })}
        >
          {notSoldout(product) ? (
            <AddToBagButton
              productId={product._id}
              Icon={Bag}
              color="black"
              css={(theme) => [
                {
                  [theme.mq.sm]: { alignSelf: "flex-end" },
                  [theme.maxMQ.sm]: {
                    color: theme.colors.page_bg_light,
                    background: theme.colors.page_bg_dark,
                  },
                  width: "fit-content",
                },
              ]}
            >
              {width >= breakpoints.sm ? "Add to bag" : "Add"}
            </AddToBagButton>
          ) : (
            <Button disabled={true} color="black">
              sold out
            </Button>
          )}
          {width < breakpoints.sm && (
            <Text css={[{ margin: 0, opacity: 0.5 }]} variant="body4">
              €{product.price}
            </Text>
          )}
          <SelectButton
            keepOrder={true}
            css={(theme) => ({
              zIndex: 1,
              height: "var(--buttonHeight)",
              overflow: "visible",
              [theme.maxMQ.md]: {
                width: "100%",
                order: -1,
              },
            })}
            value={product.title}
            states={products.map(({ title }) => ({ children: title }))}
            setter={changeProduct}
          />
        </div>
      </div>
    </Grid>
  );
};

export default ShopSheets;
