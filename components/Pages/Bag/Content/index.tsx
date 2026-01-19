import { FC, HTMLAttributes } from "react";
import dynamic from "next/dynamic";
import Text from "../../../Text";
import Grid from "../../../Grid";
import ScandiBlock from "../../../ScandiBlock";
import ArrowedButton from "../../../Buttons/ArrowedButton";
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
                {products.length} items are reserved for&nbsp;
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
          <ScandiBlock css={[{ marginTop: 60, paddingTop: 15 }]}>
            <Text typography="paragraphBig" css={[{ marginRight: 110, fontSize: 25 }]}>
              You are on your way to owning an exclusive art piece!
            </Text>
          </ScandiBlock>
        </div>
        <Suggestions id="related" css={[{ marginTop: 120, paddingTop: 60 }]}></Suggestions>
      </div>
      <CTA css={[{ gridColumn: "span 4/-1" }]}></CTA>
    </Grid>
  );
};

export default Content;
