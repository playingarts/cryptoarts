import { ComponentStory, ComponentMeta } from "@storybook/react";
import Carousel from "./";

export default {
  title: "Carousel",
  component: Carousel,
} as ComponentMeta<typeof Carousel>;

const Template: ComponentStory<typeof Carousel> = (args) => (
  <Carousel {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  items: [
    "https://i.ytimg.com/vi/lWAEP0C3QUQ/maxresdefault.jpg",
    "https://editorial.designtaxi.com/editorial-images/news-CatLoafPhotoshop130516/6-Cat-Loafing-Awkwardly-Stairs-Photoshop-Funny-Memes.jpg",
    "https://editorial.designtaxi.com/editorial-images/news-CatLoafPhotoshop130516/3-Cat-Loafing-Awkwardly-Stairs-Photoshop-Funny-Memes.jpg",
    "https://i.dailymail.co.uk/i/pix/2016/06/05/12/34EFE90E00000578-3625941-Portalcat_On_Imgur_Seir_describes_him_or_herself_as_a_long_time_-a-14_1465127349029.jpg",
    "https://i1.sndcdn.com/artworks-000249769035-91fgrp-t500x500.jpg",
  ],
  index: 0,
};

export const Third = Template.bind({});
Third.args = {
  ...Primary.args,
  index: 2,
};
