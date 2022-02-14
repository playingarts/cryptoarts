import { FC, Fragment, HTMLAttributes, useState } from "react";
import Arrowed from "../../Arrowed";
import BlockTitle from "../../BlockTitle";
import Box from "../../Box";
import Button from "../../Button";
import Carousel, { Props as CarouselProps } from "../../Carousel";
import Chevron from "../../Icons/Chevron";
import Link from "../../Link";

const Gallery: FC<HTMLAttributes<HTMLDivElement>> = (props) => {
  const items = [
    "https://i.ytimg.com/vi/lWAEP0C3QUQ/maxresdefault.jpg",
    "https://editorial.designtaxi.com/editorial-images/news-CatLoafPhotoshop130516/6-Cat-Loafing-Awkwardly-Stairs-Photoshop-Funny-Memes.jpg",
    "https://editorial.designtaxi.com/editorial-images/news-CatLoafPhotoshop130516/3-Cat-Loafing-Awkwardly-Stairs-Photoshop-Funny-Memes.jpg",
    "https://i.dailymail.co.uk/i/pix/2016/06/05/12/34EFE90E00000578-3625941-Portalcat_On_Imgur_Seir_describes_him_or_herself_as_a_long_time_-a-14_1465127349029.jpg",
  ];
  const [index, setIndex] = useState(0);
  const visibleItems = 3;

  const changeIndex: CarouselProps["onIndexChange"] = (offset) => {
    const newIndex = index + offset;

    setIndex(
      newIndex < 0 ? 0 : Math.min(items.length - visibleItems, newIndex)
    );
  };
  const onPrev = () => changeIndex(-1);
  const onNext = () => changeIndex(1);

  return (
    <div {...props}>
      <Box>
        <BlockTitle
          variant="h3"
          title="Gallery"
          subTitleText={
            <Link href="/">
              <Arrowed>Follow @playingarts on Instagram</Arrowed>
            </Link>
          }
          action={
            <Fragment>
              <Button
                disabled={index === 0}
                onClick={onPrev}
                variant="bordered"
                Icon={Chevron}
                size="small"
                iconProps={{
                  css: (theme) => ({
                    width: theme.spacing(0.8),
                    height: theme.spacing(1.6),
                    transform: "rotate(-180deg)",
                  }),
                }}
              />
              <Button
                disabled={
                  items.length <= visibleItems ||
                  index === items.length - visibleItems
                }
                onClick={onNext}
                variant="bordered"
                css={(theme) => ({ marginLeft: theme.spacing(2) })}
                Icon={Chevron}
                size="small"
                iconProps={{
                  css: (theme) => ({
                    width: theme.spacing(0.8),
                    height: theme.spacing(1.6),
                  }),
                }}
              />
            </Fragment>
          }
        />
      </Box>
      <Carousel items={items} index={index} onIndexChange={changeIndex} />
    </div>
  );
};

export default Gallery;
