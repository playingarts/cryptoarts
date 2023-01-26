import { FC, HTMLAttributes } from "react";
import Card from "../../Card";
import Link, { Props as LinkProps } from "../../Link";

export interface Props extends HTMLAttributes<HTMLElement> {
  // status?:
  //   | "initializing"
  //   | "unavailable"
  //   | "notConnected"
  //   | "connecting"
  //   | "connected";
  // metamaskProps?: {
  //   account: string | null;
  //   ownedCards: OwnedCard[];
  // };
  cards: (GQL.Card & Pick<LinkProps, "href"> & { owned?: boolean })[];
  sorted?: boolean;
  // dark: boolean;
  palette?: "light" | "dark";
}

const CardList: FC<Props> = ({
  palette = "light",
  cards,
  sorted,
  // status,
  ...props
}) => (
  <div
    {...props}
    css={(theme) => ({
      gridColumn: "1/-1",
      display: "flex",
      gap: theme.spacing(4.2),
      rowGap: theme.spacing(6),
      flexWrap: "wrap",
      justifyContent: "center",

      [theme.maxMQ.sm]: {
        gap: theme.spacing(2.5),
        rowGap: theme.spacing(3),
      },
    })}
  >
    {cards.map((card) => (
      <Link key={card._id} href={card.href}>
        <Card
          sorted={sorted}
          interactive={true}
          css={(theme) => ({
            color:
              // status === "connected" && metamaskProps
              palette === "dark"
                ? theme.colors.text_subtitle_light
                : theme.colors.text_subtitle_dark,
            [theme.mq.sm]: {
              ":hover": {
                color:
                  // status === "connected" && metamaskProps
                  palette === "dark"
                    ? theme.colors.text_title_light
                    : theme.colors.text_title_dark,
              },
            },
          })}
          card={card}
          owned={card.owned}
        />
      </Link>
    ))}
  </div>
);

export default CardList;
