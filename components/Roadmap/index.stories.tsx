import { ComponentStory, ComponentMeta } from "@storybook/react";
import Component from ".";
import { socialLinks } from "../../source/consts";
import Link from "../Link";

export default {
  title: "Roadmap",
  component: Component,
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => (
  <Component {...args} css={{ background: "black" }} />
);

export const Primary = Template.bind({});
Primary.args = {
  items: [
    {
      date: "Aug 1st ‘21",
      title: "And here we go…",
      paragraph: (
        <span>
          {
            "Cards appear on the website daily. Can't wait to see them all? Hang out with us on"
          }
          <Link href={socialLinks.discord} target="_blank">
            {" "}
            Discord{" "}
          </Link>
          and try your luck in our
          <Link href={socialLinks.twitter} target="_blank">
            {" "}
            Twitter{" "}
          </Link>
          giveaways!
        </span>
      ),
    },
    {
      date: "Aug 19th ‘21",
      title: "Official Launch",
      paragraph:
        "Start minting your cards. Fair launch, fair distribution: all packs cost 0.13 ETH and include a pair of random animated cards instantly revealed in your Ethereum wallet. (Sold out in 19 minutes).",
    },
    {
      date: "Sep ‘21",
      title: "Back to the Community",
      paragraph:
        "Random airdrops from the artsists + 11 cards airdropped to Crypto Edition card holders. These were rolled out daily, highlighting the card and artist prior to selecting a lucky winner.",
      action: { text: "Giveaway results", href: "/" },
    },
    {
      date: "1Q ‘22",
      title: "Digital to Physical",
      paragraph:
        "Production of the physical Crypto Edition deck. Printed on the premium quality playing card stock and paired with Augmented Reality mobile app to enjoy animations right in your diamond hands.",
      action: { text: "Claim your deck", href: "/shop" },
    },
    {
      date: "2Q ‘22",
      title: "crypto battle game",
      paragraph: (
        <span>
          <span css={{ display: "block" }}>
            {"You've got cards? Let's play games!"}
          </span>
          {
            "We start to build a game where you'll be able to power-up your cards. How? In addition to mooning Art each card has dynamic stats sewed in that can be leveled up based on your activity in the game and will be reflected on OpenSea."
          }
        </span>
      ),
    },
  ],
};
