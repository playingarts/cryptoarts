import { FC, HTMLAttributes } from "react";
import Intro from "../../Intro";
import ButtonTemplate from "../../Buttons/Button";
import Grid from "../../../components/Grid";
import Item from "./Item";
import { mockCard } from "../../../mocks/card";

const faq = {
  "Are these physical decks?":
    "Playing Arts brings together artists from around the world, transforming traditional playing cards into a diverse gallery of creative expression.",
};

const FAQ: FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => (
  <div css={(theme) => [{ background: theme.colors.soft_gray }]}>
    <Intro
      arrowedText="FAQ"
      paragraphText="All your questions, dealt."
      linkNewText="Read full FAQ"
      beforeLinkNew={
        <ButtonTemplate bordered={true} size="small">
          Leave a review
        </ButtonTemplate>
      }
    />
    <Grid>
      <div
        css={[
          {
            gridColumn: "span 6",
            position: "relative",
          },
        ]}
      >
        <div
          css={[
            {
              position: "absolute",
              top: "50%",
              left: "50%",
              "> *": {
                width: 250,
                height: 350,
                borderRadius: 15,
                position: "absolute",
                transform: "translate(-50%,-70%)",
                top: 0,
                left: 0,
              },
            },
          ]}
        >
          <img
            src="https://s3.amazonaws.com/img.playingarts.com/contest/retina/000.jpg"
            alt=""
            css={[{ rotate: "-8deg", transformOrigin: "bottom left" }]}
          />
          <img
            src="https://s3.amazonaws.com/img.playingarts.com/future/cards/card-mitt-roshin.jpg"
            alt=""
            css={[{ rotate: "8deg", transformOrigin: "left" }]}
          />
        </div>
      </div>
      <div
        css={[
          {
            gridColumn: "span 6",
            display: "grid",
            height: 525,
            marginTop: 15,
            paddingTop: 120,
            paddingBottom: 120,
            paddingRight: 30,
          },
        ]}
      >
        <div>
          {Object.keys(faq).map((item) => (
            <Item
              key={item}
              question={item}
              answer={faq[item as unknown as keyof typeof faq]}
            />
          ))}
        </div>
      </div>
    </Grid>
  </div>
);

export default FAQ;
