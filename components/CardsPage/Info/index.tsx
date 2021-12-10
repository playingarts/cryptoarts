import { FC, Fragment, HTMLAttributes } from "react";
import Button from "../../Button";
import Text from "../../Text";
import Eth from "../../Icons/Eth";
import Opensea from "../../Icons/Opensea";
import Share from "../../Icons/Share";
import Line from "../../Line";

interface Props extends HTMLAttributes<HTMLDivElement> {
  author: string;
  location: string;
  price: number;
}

const CardInfo: FC<Props> = ({ author, location, price, ...props }) => {
  return (
    <div {...props}>
      <Text component="h2">{author}</Text>
      <Text component="div" variant="h6">
        {location}
      </Text>
      {price && (
        <Fragment>
          <Line size={1} spacing={3} />
          <div
            css={{
              width: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Button
              Icon={Opensea}
              css={(theme) => ({
                color: theme.colors.dark_gray,
                background: theme.colors.gradient,
                marginRight: theme.spacing(2),
              })}
            >
              Buy NFT
            </Button>
            <Button Icon={Share} variant="bordered" />
            <Text
              variant="h4"
              component="div"
              css={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "baseline",
              }}
            >
              <span>{price}</span>
              <Eth
                css={(theme) => ({
                  marginLeft: theme.spacing(1),
                })}
              />
            </Text>
          </div>
        </Fragment>
      )}
    </div>
  );
};
export default CardInfo;
