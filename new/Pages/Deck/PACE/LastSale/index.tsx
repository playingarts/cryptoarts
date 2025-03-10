import { FC, HTMLAttributes } from "react";
import ScandiBlock from "../../../../ScandiBlock";
import Text from "../../../../Text";
import Card from "../../../../Card";

const LastSale: FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => {
  return (
    <div
      css={(theme) => [
        {
          background: theme.colors.darkBlack,
          padding: 30,
          borderRadius: 20,
        },
      ]}
      {...props}
    >
      <Text typography="newh4">Last sale</Text>
      <Card
        noArtist={true}
        size="nano"
        card={
          {
            img: "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/a-h-x89CxW27.jpg",
          } as unknown as GQL.Card
        }
        css={[{ margin: "auto" }]}
      />
      <Text typography="paragraphSmall" css={[{ marginTop: 30 }]}>
        Ξ.008
      </Text>
      <div css={[{ marginTop: 2, ">*": { display: "inline-block" } }]}>
        <Text
          typography="paragraphSmall"
          css={[{ width: 60, marginRight: 10 }]}
        >
          From
        </Text>
        <Text typography="paragraphSmall">save-theplanet</Text>
      </div>
      <div css={[{ marginTop: 2, ">*": { display: "inline-block" } }]}>
        <Text
          typography="paragraphSmall"
          css={[{ width: 60, marginRight: 10 }]}
        >
          To
        </Text>
        <Text typography="paragraphSmall">0x889...48F4</Text>
      </div>
      <Text
        typography="paragraphSmall"
        css={(theme) => [{ color: theme.colors.white50, marginTop: 30 }]}
      >
        More collectors
      </Text>
    </div>
  );
};

export default LastSale;
