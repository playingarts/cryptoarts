import { FC, Fragment } from "react";
import { socialLinks } from "../../../source/consts";
import { breakpoints } from "../../../source/enums";
import Charts from "../../Charts";
import Line from "../../Line";
import { useSize } from "../../SizeProvider";
import Stat from "../../Stat";
import StatBlock, { Props as StatBlockProps } from "../../StatBlock";
import Text from "../../Text";

interface Props extends StatBlockProps {
  opensea?: GQL.Opensea;
}

const Content: FC<GQL.Opensea["stats"]> = ({ onSale, total_supply }) => {
  const { width } = useSize();
  return (
    <Fragment>
      {total_supply && (
        <Stat value={total_supply.toLocaleString()} label="Total nft supply" />
      )}
      {total_supply && onSale && (
        <div
          css={(theme) => [
            {
              display: "flex",
              gap: theme.spacing(2),
              marginBottom: theme.spacing(1.5),
              marginTop: theme.spacing(1.5),
              height: "100%",
            },
          ]}
        >
          <Charts
            type="pie"
            withTooltip={true}
            css={(theme) => ({
              flexGrow: 1,
              alignItems: "flex-end",
              [theme.maxMQ.sm]: {
                width: theme.spacing(15),
                height: theme.spacing(15),
              },
            })}
            dataPoints={[
              { name: "onSale", value: onSale },
              {
                name: "off sale",
                value: total_supply - onSale,
                color: "charcoal_gray",
              },
            ]}
          />

          {width < breakpoints.sm && (
            <div
              css={[
                {
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  flexGrow: 1,
                  justifyContent: "center",
                },
              ]}
            >
              <Text
                variant="h6"
                css={(theme) => [
                  {
                    margin: 0,
                    background: theme.colors.eth,
                    backgroundClip: "text",
                    color: "transparent",
                  },
                ]}
              >
                {onSale} on sale
              </Text>
              <Text
                variant="h6"
                css={(theme) => [
                  {
                    margin: 0,
                    [theme.maxMQ.sm]: {
                      color: theme.colors.text_subtitle_light,
                    },
                  },
                ]}
              >
                {total_supply - onSale} off sale
              </Text>
            </div>
          )}
        </div>
      )}
    </Fragment>
  );
};

const ComposedSupply: FC<Props> = ({ opensea, ...props }) => {
  return (
    <StatBlock
      {...props}
      title="supply"
      action={{
        href: socialLinks.onSale,
        children: `On Sale ${opensea ? opensea.stats.onSale : ""}`,
        target: "_blank",
      }}
    >
      <div
        css={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        {opensea && <Content {...opensea.stats} />}
        <div>
          <Line palette="dark" spacing={0} />
        </div>
      </div>
    </StatBlock>
  );
};

export default ComposedSupply;
