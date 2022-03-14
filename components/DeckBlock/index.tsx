import { FC, Fragment } from "react";
import BlockTitle from "../BlockTitle";
import Button from "../Button";
import Grid, { Props as GridProps } from "../Grid";
import Bag from "../Icons/Bag";
import Line from "../Line";
import Link from "../Link";
import Text from "../Text";

interface Props extends GridProps {
  deck: GQL.Deck;
}

const DeckBlock: FC<Props> = ({ deck, ...props }) => (
  <Grid {...props}>
    <div
      css={{
        gridColumn: "span 6",
        background: `url(${deck.image}) 50% 50% no-repeat`,
        backgroundSize: "contain",
      }}
    />
    <div
      css={{
        gridColumn: "7 / span 5",
      }}
    >
      <BlockTitle
        variant="h3"
        title={deck.title}
        subTitleText={deck.description}
        css={{
          display: "block",
        }}
      />
      <dl
        css={(theme) => ({
          color: theme.colors.text_title_dark,
          margin: 0,
          alignSelf: "center",
        })}
      >
        {Object.entries(deck.properties).map(([key, value]) => (
          <Fragment key={key}>
            <Grid
              css={(theme) => ({
                paddingTop: theme.spacing(2),
                paddingBottom: theme.spacing(2),
              })}
            >
              <Text
                component="dt"
                variant="h7"
                css={(theme) => ({ color: theme.colors.text_subtitle_dark })}
              >
                {key}
              </Text>
              <Text
                component="dd"
                css={{
                  gridColumn: "2 / span 4",
                  margin: 0,
                }}
              >
                {value}
              </Text>
            </Grid>
            <Line spacing={0} />
          </Fragment>
        ))}
      </dl>
      <Button
        color="black"
        component={Link}
        href="/shop"
        Icon={Bag}
        css={(theme) => ({ marginTop: theme.spacing(3.5) })}
      >
        Buy now
      </Button>
    </div>
  </Grid>
);

export default DeckBlock;
