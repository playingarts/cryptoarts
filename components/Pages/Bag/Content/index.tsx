import { FC, HTMLAttributes, useMemo } from "react";
import dynamic from "next/dynamic";
import Text from "../../../Text";
import Grid from "../../../Grid";
import ScandiBlock from "../../../ScandiBlock";
import ArrowedButton from "../../../Buttons/ArrowedButton";
import ArrowButton from "../../../Buttons/ArrowButton";
import { useProducts } from "../../../../hooks/product";
import { useBag } from "../../../Contexts/bag";
import { colord } from "colord";

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

  // Calculate total for mobile bottom bar
  const orderTotal = useMemo(() => {
    if (!products || !bag) return 0;
    const subtotal = products
      .filter((product) => bag[product._id])
      .reduce((prev, cur) => Number((prev + cur.price.usd * bag[cur._id]).toFixed(2)), 0);
    // Add shipping ($5) if subtotal < $45
    return subtotal + (subtotal >= 45 ? 0 : 5);
  }, [products, bag]);

  
  return (
    <>
    <Grid
      css={(theme) => [
        {
          paddingTop: 180,
          paddingBottom: theme.spacing(6),
          backgroundColor: theme.colors.soft_gray,
          [theme.maxMQ.sm]: { paddingTop: HEADER_OFFSET.tablet },
          [theme.maxMQ.xsm]: { paddingTop: HEADER_OFFSET.mobile, paddingBottom: 30 },
        },
      ]}
    >
      <div css={(theme) => [{ gridColumn: "span 8", [theme.maxMQ.sm]: { gridColumn: "1 / -1" } }]}>
        <div css={(theme) => [{ marginRight: 110, [theme.maxMQ.xsm]: { marginRight: 0 } }]}>
          <Text typography="h3">{isEmpty ? "Your bag is empty!" : "Your bag is ready!"}</Text>
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
                  rowGap: theme.spacing(3),
                },
              ]}
            >
              <ArrowedButton css={[{ whiteSpace: "nowrap", marginBottom: 20 }]}>
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
                <span css={(theme) => [{ [theme.maxMQ.xsm]: { display: "none" } }]}>&nbsp;minutes</span>...
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
        {!isEmpty && <Suggestions id="related" css={(theme) => [{ marginTop: theme.spacing(12), paddingTop: theme.spacing(6), [theme.maxMQ.xsm]: { marginTop: 0 } }]}></Suggestions>}
      </div>
      {!isEmpty && <CTA id="order-summary" css={(theme) => [{ gridColumn: "span 4/-1", [theme.maxMQ.sm]: { gridColumn: "1 / -1" } }]}></CTA>}
    </Grid>
    {/* Mobile sticky bottom bar */}
    {!isEmpty && (
      <div
        onClick={() => {
          document.getElementById("order-summary")?.scrollIntoView({ behavior: "smooth" });
        }}
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
            cursor: "pointer",
                      },
        })}
      >
        <Text typography="p-m" css={{ paddingTop: 5 }}>Order summary</Text>
        <Text typography="h4" css={{ paddingTop: 5 }}>${orderTotal.toFixed(2)}</Text>
      </div>
    )}
    </>
  );
};

export default Content;
