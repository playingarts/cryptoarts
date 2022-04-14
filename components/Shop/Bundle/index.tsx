import { FC, HTMLAttributes } from "react";
import AddToBagButton from "../../AddToBagButton";
import Bag from "../../Icons/Bag";
import Line from "../../Line";
import Text from "../../Text";

interface Props
  extends Omit<HTMLAttributes<HTMLElement>, "title">,
    GQL.Product {}

const ShopBundle: FC<Props> = ({ title, price, image, _id, ...props }) => (
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
        aspectRatio: "495/400",
        flexGrow: 1,
        minHeight: theme.spacing(10),
      })}
    />
    <div>
      <Line spacing={3} />

      <Text component="h4" css={{ margin: 0 }}>
        {title}
      </Text>

      <Text variant="body2" css={{ margin: 0, opacity: 0.5 }}>
        €{price.toFixed(2)}
      </Text>

      <AddToBagButton
        productId={_id}
        css={(theme) => ({
          marginTop: theme.spacing(2),
        })}
        color="black"
        Icon={Bag}
      />
    </div>
  </div>
);

export default ShopBundle;
