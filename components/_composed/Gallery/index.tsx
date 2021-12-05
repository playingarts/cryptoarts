import { FC, Fragment, HTMLAttributes, useState } from "react";
import BlockTitle from "../../BlockTitle";
import Box from "../../Box";
import Button from "../../Button";
import Carousel from "../../Carousel";
import Arrow from "../../Icons/Arrow";

interface Props extends HTMLAttributes<HTMLElement> {}

const Gallery: FC<Props> = (props) => {
  const items = [
    "https://i.ytimg.com/vi/lWAEP0C3QUQ/maxresdefault.jpg",
    "https://editorial.designtaxi.com/editorial-images/news-CatLoafPhotoshop130516/6-Cat-Loafing-Awkwardly-Stairs-Photoshop-Funny-Memes.jpg",
    "https://editorial.designtaxi.com/editorial-images/news-CatLoafPhotoshop130516/3-Cat-Loafing-Awkwardly-Stairs-Photoshop-Funny-Memes.jpg",
    "https://i.dailymail.co.uk/i/pix/2016/06/05/12/34EFE90E00000578-3625941-Portalcat_On_Imgur_Seir_describes_him_or_herself_as_a_long_time_-a-14_1465127349029.jpg",
  ];
  const [index, setIndex] = useState(0);

  return (
    <div {...props}>
      <Box>
        <BlockTitle
          variant="h3"
          titleText="Gallery"
          subTitleText="Follow @playingarts on Instagram"
          action={
            <Fragment>
              <Button
                disabled={index === 0}
                onClick={() => setIndex(index - 1)}
                variant="bordered"
                Icon={Arrow}
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
                disabled={items.length < 4 || index === items.length - 3}
                onClick={() => setIndex(index + 1)}
                variant="bordered"
                css={(theme) => ({ marginLeft: theme.spacing(2) })}
                Icon={Arrow}
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
      <Carousel items={items} index={index} />
    </div>
  );
};

export default Gallery;
