import { FC, HTMLAttributes } from "react";
import { CardSuits } from "../../source/enums";
import Text from "../Text";

interface Props extends HTMLAttributes<HTMLElement> {
  Icon: FC<HTMLAttributes<SVGElement>>;
  note?: string;
  cardValue: string;
  suit?: CardSuits;
}

const AllEntriesCard: FC<Props> = ({
  Icon,
  note,
  cardValue,
  suit,
  ...props
}) => (
  <div
    css={{
      display: "inline-block",
      position: "relative",
    }}
    {...props}
  >
    <div
      css={(theme) => ({
        color: new RegExp(`${CardSuits.s}|${CardSuits.c}|${CardSuits.b}`).test(
          suit as string
        )
          ? theme.colors.text_title_dark
          : theme.colors.red,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: theme.spacing(1.5),
        paddingBottom: theme.spacing(1.5),
        borderRadius: theme.spacing(1),
        background: theme.colors.text_title_light,
        height: theme.spacing(10),
        width: theme.spacing(7.5),
        position: "relative",
        zIndex: 1,
      })}
    >
      {cardValue !== "joker" && (
        <Text component="div" variant="h4" css={{ textTransform: "uppercase" }}>
          {Number(cardValue) || cardValue[0]}
        </Text>
      )}

      <Icon css={{ margin: "auto" }} />
    </div>

    {note && (
      <Text
        variant="label"
        component="div"
        css={(theme) => ({
          transition: theme.transitions.fast([
            "opacity",
            "max-height",
            "margin-top",
          ]),
          marginTop: 0,
          opacity: 0,
          position: "absolute",
          top: "100%",
          maxHeight: 0,
          overflow: "hidden",
          left: "50%",
          transform: "translateX(-50%)",
          whiteSpace: "nowrap",
          "div:hover + &": {
            opacity: 0.5,
            maxHeight: theme.spacing(10),
            marginTop: theme.spacing(0.5),
          },
        })}
      >
        {note}
      </Text>
    )}
  </div>
);

export default AllEntriesCard;
