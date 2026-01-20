import { FC, HTMLAttributes } from "react";
import dynamic from "next/dynamic";
import Text from "../../../Text";
import Grid from "../../../Grid";
import ScandiBlock from "../../../ScandiBlock";
import ArrowedButton from "../../../Buttons/ArrowedButton";
import ArrowButton from "../../../Buttons/ArrowButton";
import { useProducts } from "../../../../hooks/product";
import { useBag } from "../../../Contexts/bag";

// Lazy load Countdown to reduce bundle (~8.7kB)
const Countdown = dynamic(() => import("react-countdown"), {
  ssr: false,
  loading: () => <span>10:00</span>,
});
import Suggestions from "./Suggestions";
import CTA from "./CTA";
import Product from "./Product";

const Content: FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => {
  const { bag } = useBag();

  const bagItemIds = bag ? Object.keys(bag) : [];
  const isEmpty = bagItemIds.length === 0;

  const { products } = useProducts(
    !isEmpty
      ? {
          variables: {
            ids: bagItemIds,
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
          <Text typography="newh3">{isEmpty ? "Your bag is empty!" : "Your bag is ready!"}</Text>
          {isEmpty && (
            <ArrowButton color="accent" css={{ marginTop: 30, marginBottom: 120, fontSize: 20 }} href="/shop">Go shopping</ArrowButton>
          )}
          {!isEmpty && products && (
            <ScandiBlock
              id="items"
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
                {(() => {
                  const totalItems = Object.values(bag || {}).reduce((sum, qty) => sum + qty, 0);
                  return `${totalItems} ${totalItems === 1 ? "item is" : "items are"}`;
                })()} reserved for&nbsp;
                <Countdown
                  date={Date.now() + 599000}
                  renderer={({ minutes, seconds }) => (
                    <span>{String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}</span>
                  )}
                />
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
        </div>
        {!isEmpty && <Suggestions id="related" css={[{ marginTop: 120, paddingTop: 60 }]}></Suggestions>}
      </div>
      {!isEmpty && <CTA css={[{ gridColumn: "span 4/-1" }]}></CTA>}
    </Grid>
  );
};

export default Content;
