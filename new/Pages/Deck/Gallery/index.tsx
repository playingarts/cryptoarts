import { FC, HTMLAttributes } from "react";
import Grid from "../../../../components/Grid";
import ScandiBlock from "../../../ScandiBlock";
import ArrowedButton from "../../../Buttons/ArrowedButton";
import background from "../../../../mocks/images/backgroundImage.png";
import Text from "../../../Text";

const Gallery: FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => {
  return (
    <Grid
      css={(theme) => [
        {
          background: theme.colors.soft_gray,
          paddingTop: 60,
          paddingBottom: 120,
          rowGap: 30,
          img: {
            borderRadius: 15,
          },
        },
      ]}
    >
      <ScandiBlock
        css={[
          {
            gridColumn: "span 6",
            display: "grid",
            paddingTop: 15,
            alignItems: "initial",
          },
        ]}
      >
        <ArrowedButton>Deck Gallery</ArrowedButton>
      </ScandiBlock>

      <ScandiBlock
        css={[
          {
            gridColumn: "span 6",
            alignItems: "initial",
            paddingTop: 15,
            height: 241,
          },
        ]}
      >
        <Text css={[{ paddingBottom: 120 }]}>
          Loved this deck? Continue the story with these collector’s favourites.
        </Text>
      </ScandiBlock>
      <img
        css={[
          {
            gridColumn: "span 3",
            aspectRatio: "1/1",
            width: "100%",
            objectFit: "cover",
          },
        ]}
        src={background.src}
        alt=""
      />
      <img
        css={[
          {
            gridColumn: "span 6",
            aspectRatio: "1/1",
            width: "100%",
            objectFit: "cover",
            gridRow: "span 2",
          },
        ]}
        src={background.src}
        alt=""
      />
      <img
        css={[
          {
            gridColumn: "span 3",
            aspectRatio: "1/1",
            width: "100%",
            objectFit: "cover",
          },
        ]}
        src={background.src}
        alt=""
      />
      <img
        css={[
          {
            gridColumn: "span 3",
            aspectRatio: "1/1",
            width: "100%",
            objectFit: "cover",
          },
        ]}
        src={background.src}
        alt=""
      />
      <img
        css={[
          {
            gridColumn: "span 3",
            aspectRatio: "1/1",
            width: "100%",
            objectFit: "cover",
          },
        ]}
        src={background.src}
        alt=""
      />
    </Grid>
  );
};

export default Gallery;
