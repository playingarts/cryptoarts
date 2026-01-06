import { FC, HTMLAttributes } from "react";
import Text from "../../../Text";
import Grid from "../../../Grid";
import ScandiBlock from "../../../ScandiBlock";
import ArrowedButton from "../../../Buttons/ArrowedButton";
import { useProducts } from "../../../../hooks/product";
import Countdown from "react-countdown";
import { useBag } from "../../../Contexts/bag";
import Suggestions from "./Suggestions";
import CTA from "./CTA";
import Product from "./Product";

const Content: FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => {
  const { bag } = useBag();

  const { products } = useProducts(
    bag
      ? {
          variables: {
            ids: Object.keys(bag),
          },
        }
      : {}
  );

  return (
    <Grid
      css={(theme) => [
        {
          paddingTop: 235,
          paddingBottom: 60,
          backgroundColor: theme.colors.soft_gray,
        },
      ]}
    >
      <div css={[{ gridColumn: "span 8" }]}>
        <div css={[{ marginRight: 110 }]}>
          <Text typography="newh3">Your bag is ready!</Text>
          {products && (
            <ScandiBlock
              css={[
                {
                  paddingTop: 15,
                  marginTop: 30,
                  flexDirection: "column",
                  alignItems: "start",
                  rowGap: 30,
                },
              ]}
            >
              <ArrowedButton css={[{ marginBottom: 30 }]}>
                {products.length} items are reserved for&nbsp;
                <Countdown date={Date.now() + 599000} />
                &nbsp;minutes...
              </ArrowedButton>

              {/* Items */}
              {bag &&
                products.map((product) => {
                  return (
                    <Product key={product._id + "Product"} product={product} />
                  );
                })}
            </ScandiBlock>
          )}
          <ScandiBlock css={[{ marginTop: 60, paddingTop: 15 }]}>
            <Text typography="paragraphBig" css={[{ marginRight: 110 }]}>
              You are on your way to owning an exclusive art piece!
            </Text>
          </ScandiBlock>
        </div>
        <Suggestions css={[{ marginTop: 120 }]}></Suggestions>
      </div>
      <CTA css={[{ gridColumn: "span 4/-1" }]}></CTA>
    </Grid>
  );
};

export default Content;
