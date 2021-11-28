import { FC, HTMLAttributes } from "react";
import Button from "../../Button";
import Title from "../../Title";
import Eth from "../../Icons/Eth";
import Metamask from "../../Icons/Metamask";
import Share from "../../Icons/Share";

interface Props extends HTMLAttributes<HTMLDivElement> {
  author: string;
  location: string;
  price: number;
}

const CardInfo: FC<Props> = ({ author, location, price, ...props }) => {
  return (
    <div {...props}>
      <Title component="h2">{author}</Title>
      <Title
        css={(theme) => ({
          color: theme.colors.whiteish,
          textTransform: "uppercase",
        })}
      >
        {location}
      </Title>
      {price && (
        <div
          css={(theme) => ({
            borderTop: `2px solid ${theme.colors.dimWhite}`,
            width: "100%",
            display: "flex",
            marginTop: theme.spacing(3),
            paddingTop: theme.spacing(3),
            alignItems: "center",
          })}
        >
          <Button
            Icon={Metamask}
            css={(theme) => ({
              color: theme.colors.darkGray,
              background: theme.colors.eth,
              marginRight: theme.spacing(2),
            })}
          >
            Buy NFT
          </Button>
          <Button Icon={Share} variant="bordered" />
          <Title
            css={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "flex-end",
              fontSize: 30,
              alignItems: "baseline",
            }}
          >
            <span>{price}</span>
            <Eth
              css={(theme) => ({
                marginLeft: theme.spacing(1),
                color: theme.colors.dimWhite,
              })}
            />
          </Title>
        </div>
      )}
    </div>
  );
};
export default CardInfo;
