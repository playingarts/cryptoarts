import { FC, HTMLAttributes } from "react";
import { theme } from "../../../pages/_app";
import { socialLinks } from "../../../source/consts";
import { breakpoints } from "../../../source/enums";
import BlockTitle from "../../BlockTitle";
import Grid from "../../Grid";
import Link from "../../Link";
import Roadmap from "../../Roadmap";
import { useSize } from "../../SizeProvider";

interface Props extends HTMLAttributes<HTMLElement> {
  palette: "light" | "dark";
}

const ComposedRoadmap: FC<Props> = ({ palette, ...props }) => {
  const { width } = useSize();
  return (
    <BlockTitle
      css={{ gridColumn: "1/-1" }}
      title="Roadmap"
      palette={width >= breakpoints.sm ? "dark" : palette}
      variant="h3"
    >
      <Grid short={true}>
        <Roadmap
          palette={palette}
          css={(theme) => [
            {
              gridColumn: "1 / -1",
              marginTop: theme.spacing(6),
              [theme.maxMQ.sm]: [
                {
                  marginTop: theme.spacing(3),
                },
              ],
            },
          ]}
          {...props}
          items={[
            {
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
              title: "Official Launch",
              paragraph:
                "Start minting your cards. Fair launch, fair distribution: cards are sold in packs with a pair of random animated cards instantly revealed in your Ethereum wallet. (Sold out in 19 minutes).",
                action: {
                  text: "Opensea collection",
                  href: "https://opensea.io/collection/cryptoedition",
                  blank: true,
                },
            },
            {
              title: "Back to the Community",
              paragraph:
                "Random airdrops from the artsists + 11 cards airdropped to Crypto Edition card holders. These were rolled out daily, highlighting the card and artist prior to selecting a lucky winner.",
              action: { text: "Giveaway results", href: "/" },
            },
            {
              title: "Digital to Physical",
              paragraph:
                "Production of the physical Crypto Edition deck. Printed on the premium quality playing card stock and paired with Augmented Reality mobile app to enjoy animations right in your diamond hands.",
              action: { text: "Claim your deck", href: "/shop" },
            },
            {
              title: "Website Redesign",
              paragraph:
                  "Complete website redesign. Playing Arts API, Integration with Ethereum blockchain, Web3 ready.",
                action: {
                  text: "Suggest a feature",
                  href: "https://discord.gg/u8gfv2zdG3",
                  blank: true,
                },
            },
            {
              title: "weekly podcast",
              paragraph:
                "Launch of the weekly podcast where we will put the spotlight on artists in our community.",
              action: {
                text: "Watch series",
                href: "https://www.youtube.com/playlist?list=PLhr51fAv2oZrgD0MreHVp8m9fdb7ETF4L",
                blank: true,
              },
            },
            {
              accent: theme.colors.eggshell_blue,
              status: "next up",
              title: "playing arts game",
              paragraph:
                "You've got cards? Let's play games! We are building a game where you'll be able to power-up your cards. How? In addition to mooning Art each card has dynamic stats sewed in that can be leveled up based on your activity in the game and will be reflected on OpenSea.",
              action: {
                text: "Join beta testers",
                href: "https://discord.gg/u8gfv2zdG3",
                blank: true,
              },
            },
            {
              accent: theme.colors.cadillac_pink,
              status: "in development",
              title: "Roadmap 2.0",
              paragraph: "We’re working on a new roadmap.",
              // action: {
              //   text: "Let's discuss",
              //   href: "https://discord.gg/u8gfv2zdG3",
              //   blank: true,
              // },
            },
          ]}
        />
      </Grid>
    </BlockTitle>
  );
};
export default ComposedRoadmap;
