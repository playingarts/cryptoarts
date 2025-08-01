import { FC, HTMLAttributes } from "react";
import Grid from "../../../../components/Grid";
import ScandiBlock from "../../../ScandiBlock";
import ArrowedButton from "../../../Buttons/ArrowedButton";
import background from "../../../../mocks/images/backgroundImage.png";
import background1 from "../../../../mocks/images/DeckGallery/gallery-thumbnail-3.png";
import background2 from "../../../../mocks/images/DeckGallery/gallery-thumbnail-2.png";
import background3 from "../../../../mocks/images/DeckGallery/gallery-thumbnail-1.png";
import background4 from "../../../../mocks/images/DeckGallery/gallery-thumbnail.png";
import Text from "../../../Text";

const Gallery: FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => {
  return (
    <Grid
      css={(theme) => [
        {
          background: theme.colors.soft_gray,
          paddingTop: 60,
          paddingBottom: 120,
          rowGap: 60,
          img: {
            borderRadius: 15,
          },
        },
      ]}
      id="gallery"
      {...props}
    >
      <ScandiBlock
        css={[
          {
            gridColumn: "span 6",
            paddingTop: 15,
            alignItems: "start",
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
      <Grid css={{ gridColumn: "1/-1", gap: 30 }}>
        <img
          css={[
            {
              gridColumn: "span 3",
              aspectRatio: "1/1",
              width: "100%",
              objectFit: "cover",
            },
          ]}
          src={background1.src}
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
          src={background3.src}
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
          src={background2.src}
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
          src={background4.src}
          alt=""
        />
      </Grid>
    </Grid>
  );
};

export default Gallery;
