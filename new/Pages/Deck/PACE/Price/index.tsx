import { FC, HTMLAttributes } from "react";
import Text from "../../../../Text";
import ScandiBlock from "../../../../ScandiBlock";

const temp: { [x: string]: number | string } = {
  "Trading volume": "Ξ4426",
  "Floor price": "Ξ.006",
  "Record sale": "Ξ35",
};

const Price: FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => {
  return (
    <div
      css={(theme) => [
        {
          padding: 30,
          paddingBottom: 25,
          borderRadius: 20,

          background: theme.colors.darkBlack,
        },
      ]}
      {...props}
    >
      <Text typography="newh4">Price</Text>
      {Object.keys(temp).map((item) => (
        <ScandiBlock
          key={item}
          css={[
            { paddingTop: 15, display: "block", width: "170", marginTop: 30 },
          ]}
        >
          <Text typography="newh3">{temp[item]}</Text>
          <Text typography="newh4">{item}</Text>
        </ScandiBlock>
      ))}

      <Text
        typography="paragraphSmall"
        css={(theme) => [{ color: theme.colors.white50, marginTop: 30 }]}
      >
        Last updated: today
      </Text>
    </div>
  );
};

export default Price;
