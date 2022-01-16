import { FC, HTMLAttributes } from "react";
import Button, { Props as ButtonProps } from "../Button";
import Bag from "../Icons/Bag";
import Line from "../Line";
import Text from "../Text";

interface Props extends HTMLAttributes<HTMLElement> {
  image: string;
  name: string;
  price: string;
  ButtonProps: ButtonProps;
}

const Bundle: FC<Props> = ({ name, price, ButtonProps, image, ...props }) => {
  return (
    <div
      {...props}
      css={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
      }}
    >
      <div
        css={(theme) => ({
          backgroundImage: `url(${image})`,
          backgroundSize: "contain",
          backgroundPosition: "50% 50%",
          backgroundRepeat: "no-repeat",
          flexGrow: 1,
          minHeight: theme.spacing(10),
        })}
      />
      <div>
        <Line spacing={3} />

        <Text component="h4" css={{ margin: 0 }}>
          {name}
        </Text>

        <Text variant="body2" css={{ margin: 0, opacity: 0.5 }}>
          {price}
        </Text>

        <Button
          {...ButtonProps}
          css={(theme) => ({
            marginTop: theme.spacing(2),
          })}
          color="black"
          Icon={Bag}
        >
          Add to bag
        </Button>
      </div>
    </div>
  );
};

export default Bundle;
