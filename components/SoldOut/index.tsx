import { CSSObject } from "@emotion/serialize";
import throttle from "just-throttle";
import { FC, HTMLAttributes, useEffect, useRef, useState } from "react";
import Button from "../Button";
import Card from "../Card";
import Chevron from "../Icons/Chevron";
import Line from "../Line";
import Text from "../Text";

interface Props extends HTMLAttributes<HTMLElement> {
  title: string;
  cards: [GQL.Card, GQL.Card, GQL.Card, GQL.Card, GQL.Card];
}

const SoldOut: FC<Props> = ({ title, cards, ...props }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [spread, setSpread] = useState(1);
  const getPercent = (top: number, height: number, offset = 1) =>
    1 -
    Math.max(
      0,
      Math.min(1, (top + (height / 2) * offset) / (window.innerHeight / 2) - 1)
    );

  useEffect(() => {
    const calculateSpread = throttle(() => {
      if (!ref.current) {
        return;
      }

      const { top, height } = ref.current.getBoundingClientRect();

      setSpread(1 + getPercent(top, height, getPercent(top, height)));
    }, 25);

    document.addEventListener("scroll", calculateSpread);
    calculateSpread();

    return () => document.removeEventListener("scroll", calculateSpread);
  }, []);

  return (
    <div
      {...props}
      css={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div
        css={(theme) => ({
          width: theme.spacing(39),
        })}
      >
        <Text component="h3" css={{ margin: 0 }}>
          {title}
        </Text>
        <Text
          variant="body2"
          css={{
            margin: 0,
            opacity: 0.5,
          }}
        >
          Sold out
        </Text>
        <Line spacing={3} />
        <Text>
          Leave your email and we will let you know when this deck is back in
          stock!
        </Text>
        <form
          css={(theme) => ({
            display: "flex",
            background: "rgba(0, 0, 0, 0.05)",
            borderRadius: theme.spacing(1),
            marginTop: theme.spacing(2),
          })}
        >
          <input
            type="email"
            placeholder="Your email"
            css={(theme) => ({
              ...(theme.typography.body2 as CSSObject),
              paddingLeft: theme.spacing(2),
              height: theme.spacing(5),
              flexGrow: 1,
            })}
          />
          <Button
            type="submit"
            Icon={Chevron}
            iconProps={{
              css: (theme) => ({
                height: theme.spacing(2),
                width: theme.spacing(1.2),
              }),
            }}
          />
        </form>
      </div>
      <div
        css={(theme) => ({
          position: "relative",
          marginRight: theme.spacing(18),
          marginLeft: theme.spacing(18),
        })}
        ref={ref}
      >
        {cards.map((card, index) => {
          index = index - Math.floor(cards.length / 2);

          return (
            <Card
              key={card._id}
              card={card}
              isStatic={true}
              noInfo={true}
              interactive={true}
              css={{
                top: 0,
                position: index === 0 ? "relative" : "absolute",
                zIndex: cards.length - 1 * index,
                transform: `translate3d(${index * 15 * spread}%, ${
                  Math.abs(index) * 4
                }%, 0) rotate3d(0, 0, 1, ${index * 2.5 * spread}deg)`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};
export default SoldOut;
