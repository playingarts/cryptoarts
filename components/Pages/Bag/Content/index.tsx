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
import { HEADER_OFFSET } from "../../../../styles/theme";

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
          paddingTop: HEADER_OFFSET.desktop,
          paddingBottom: theme.spacing(6),
          backgroundColor: theme.colors.soft_gray,
          [theme.maxMQ.sm]: { paddingTop: HEADER_OFFSET.tablet },
          [theme.maxMQ.xsm]: { paddingTop: HEADER_OFFSET.mobile },
        },
      ]}
    >
      <div css={(theme) => [{ gridColumn: "span 8", [theme.maxMQ.sm]: { gridColumn: "1 / -1" } }]}>
        <div css={[{ marginRight: 110 }]}>
          <Text typography="newh3">{isEmpty ? "Your bag is empty!" : "Your bag is ready!"}</Text>
          {isEmpty && (
            <ArrowButton color="accent" size="medium" css={(theme) => ({ marginTop: theme.spacing(3), marginBottom: theme.spacing(12) })} href="/shop">Go shopping</ArrowButton>
          )}
          {!isEmpty && products && (
            <ScandiBlock
              id="items"
              css={(theme) => [
                {
                  paddingTop: 15,
                  marginTop: theme.spacing(3),
                  flexDirection: "column",
                  alignItems: "start",
                  rowGap: 30,
                },
              ]}
            >
              <ArrowedButton css={(theme) => [{ marginBottom: theme.spacing(3) }]}>
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
        {!isEmpty && <Suggestions id="related" css={(theme) => [{ marginTop: theme.spacing(12), paddingTop: theme.spacing(6) }]}></Suggestions>}
      </div>
      {!isEmpty && <CTA css={(theme) => [{ gridColumn: "span 4/-1", [theme.maxMQ.sm]: { gridColumn: "1 / -1" } }]}></CTA>}
    </Grid>
  );
};

export default Content;
