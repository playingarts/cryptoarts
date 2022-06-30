import { FC, HTMLAttributes, useState } from "react";
import { CardSuits } from "../../source/enums";
import Text from "../Text";

interface Props extends HTMLAttributes<HTMLElement> {
  Icon: FC<HTMLAttributes<SVGElement>>;
  note?: string;
  cardValue: string;
  suit?: CardSuits;
  viewed?: boolean;
}

const AllEntriesCard: FC<Props> = ({
  viewed,
  Icon,
  note,
  cardValue,
  suit,
  ...props
}) => {
  const [hovered, setHover] = useState(false);

  return (
    <div
      css={(theme) => [
        {
          display: "inline-block",
          position: "relative",
          transition: theme.transitions.fast("top"),
          top: 0,
        },
        hovered && {
          top: theme.spacing(-1),
        },
      ]}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      {...props}
    >
      <div
        css={(theme) => [
          {
            color: new RegExp(
              `${CardSuits.s}|${CardSuits.c}|${CardSuits.b}`
            ).test(suit as string)
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
          },
          viewed && {
            background: theme.colors.page_bg_light,
            color: theme.colors.text_subtitle_dark,
          },
        ]}
      >
        {cardValue !== "joker" && (
          <Text
            component="div"
            variant="h4"
            css={{ textTransform: "uppercase" }}
          >
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
            color: theme.colors.text_subtitle_dark,
            transition: theme.transitions.fast([
              "opacity",
              "max-height",
              "margin-top",
            ]),
            marginTop: 12,
            opacity: 0,
            fontSize: theme.spacing(1.5),
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
            },
          })}
        >
          {viewed ? "Viewed" : note}
        </Text>
      )}
    </div>
  );
};

export default AllEntriesCard;
