import { FC, HTMLAttributes, useRef } from "react";
import Grid from "../../../components/Grid";
import { useRatings } from "../../../hooks/ratings";
import testimonialsImage from "../../../mocks/images/gallery-thumbnail.png";
import Dot from "../../Icons/Dot";
import Text from "../../Text";
import Intro from "./Intro";
import Item from "./Item";
import Press from "./Press";

const Testimonials: FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => {
  const { ratings } = useRatings();

  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      css={(theme) => [
        { background: theme.colors.pale_gray, paddingBottom: 60 },
      ]}
    >
      <Intro carouselRef={ref} />
      <Grid
        ref={ref}
        css={[
          {
            height: 490,
            paddingBottom: 60,
            position: "relative",
            overflow: "scroll",
            "&::-webkit-scrollbar": {
              display: "none",
            },
            msOverflowStyle: "none",
            "scrollbar-width": "none",
          },
        ]}
      >
        <div
          css={[
            {
              gridColumn: "1/-1",
            },
          ]}
        >
          <div
            css={[
              {
                display: "inline-flex",
                width: "fit-content",
                " > *": { marginRight: 61 },
              },
            ]}
          >
            {ratings &&
              ratings.map((rating, i) => {
                return <Item key={rating.review + i} {...{ rating }} />;
              })}
            <div>
              <img
                src={testimonialsImage.src}
                alt=""
                css={[{ width: 300, height: 300, borderRadius: 20 }]}
              />
              <Text typography="linkNewTypography" css={{ marginTop: 15 }}>
                @playingcardart <Dot />
              </Text>
            </div>
          </div>
        </div>
      </Grid>
      <Press />
    </div>
  );
};

export default Testimonials;
