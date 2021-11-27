import { FC, HTMLAttributes } from "react";
import Button from "../Button";
import Android from "../Icons/Android";
import Apple from "../Icons/Apple";
import Hand from "./hand.png";

const AugmentedReality: FC<HTMLAttributes<HTMLElement>> = (props) => {
  return (
    <div
      {...props}
      css={(theme) => ({
        padding: theme.spacing(10),
        borderRadius: theme.spacing(2),
        background: `${theme.colors.darkGray} url(${Hand}) bottom right no-repeat`,
      })}
    >
      <div css={{ width: "50%" }}>
        <h3
          css={(theme) => ({
            color: theme.colors.whiteish,
          })}
        >
          Augmented Reality
        </h3>
        <p
          css={(theme) => ({
            color: theme.colors.whiteish,
            fontSize: 22,
            lineHeight: 1.5,
          })}
        >
          Hover the card to see animation. Click to read the story behind the
          artwork. Playing Arts is a collective art project for creative people
          who are into Art, Playing Cards, NFTs and sometimes magic.
        </p>
        <div
          css={(theme) => ({
            color: theme.colors.gray,
            fontSize: 18,
            lineHeight: "30px",
            textTransform: "uppercase",
            paddingTop: theme.spacing(3),
            marginTop: theme.spacing(3),
            borderTop: "2px solid rgba(255, 255, 255, 0.07)",
          })}
        >
          Download the app
        </div>
        <div
          css={(theme) => ({ marginTop: theme.spacing(2), display: "flex" })}
        >
          <Button
            Icon={Android}
            text="Android"
            css={(theme) => ({ marginRight: theme.spacing(2) })}
          />
          <Button
            Icon={Apple}
            iconProps={{ css: { marginTop: -3 } }}
            text="IOS"
          />
        </div>
      </div>
    </div>
  );
};

export default AugmentedReality;
