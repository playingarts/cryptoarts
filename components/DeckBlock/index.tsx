import { FC, Fragment, HTMLAttributes } from "react";
import BlockTitle from "../BlockTitle";
import Button from "../Button";
import Bag from "../Icons/Bag";
import Line from "../Line";
import Link from "../Link";
import Text from "../Text";

export interface Props extends HTMLAttributes<HTMLDivElement> {
  deck: GQL.Deck;
}

const DeckBlock: FC<Props> = ({ deck, ...props }) => (
  <div
    {...props}
    css={(theme) => ({
      display: "flex",
      gap: theme.spacing(3),
    })}
  >
    <div
      css={{
        flexGrow: 1,
        flexBasis: "50%",
        display: "block",
        background: `url(${deck.image}) 50% 50% no-repeat`,
        backgroundSize: "contain",
      }}
    />
    <div
      css={(theme) => ({
        flexGrow: 1,
        flexBasis: "50%",
        [theme.mq.md]: {
          paddingRight: theme.spacing(10.5),
        },
      })}
    >
      <BlockTitle
        variant="h3"
        title={deck.title}
        subTitleText={deck.description}
        css={{
          gridColumn: "span 5",
          display: "block",
        }}
      />
      <dl
        css={(theme) => ({
          color: theme.colors.text_title_dark,
          margin: 0,
        })}
      >
        {Object.entries(deck.properties).map(([key, value]) => (
          <Fragment key={key}>
            <div
              css={(theme) => ({
                display: "grid",
                gap: theme.spacing(3),
                gridTemplateColumns: `repeat(auto-fit, ${theme.spacing(
                  7.5
                )}px) `,
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
                  gridColumn: "2 / -1",
                  margin: 0,
                }}
              >
                {value}
              </Text>
            </div>
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
  </div>
);

export default DeckBlock;
