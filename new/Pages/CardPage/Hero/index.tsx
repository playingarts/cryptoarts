import { FC, HTMLAttributes } from "react";
import Grid from "../../../../components/Grid";
import { useRouter } from "next/router";
import Card from "../../../Card";
import { useCard } from "../../../../hooks/card";
import Text from "../../../Text";
import ArrowButton from "../../../Buttons/ArrowButton";
import Link from "../../../Link";
import { useDeck } from "../../../../hooks/deck";
import ScandiBlock from "../../../ScandiBlock";
import ArrowedButton from "../../../Buttons/ArrowedButton";
import Instagram from "../../../Icons/Instagram";
import Twitter from "../../../Icons/Twitter";
import Website from "../../../../components/Icons/Website";
import Facebook from "../../../../components/Icons/Facebook";
import Behance from "../../../../components/Icons/Behance";
import Foundation from "../../../../components/Icons/Foundation";
import { usePalette } from "../../Deck/DeckPaletteContext";
import { theme } from "../../../../pages/_app";

const socialIcons: Record<string, FC> = {
  website: Website,
  instagram: Instagram,
  facebook: Facebook,
  twitter: Twitter,
  behance: Behance,
  foundation: Foundation,
};

const Hero: FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => {
  const {
    query: { artistSlug, deckId },
  } = useRouter();

  const { card } = useCard({
    variables: { slug: artistSlug, deckSlug: deckId },
  });

  const { deck } = useDeck({
    variables: { slug: deckId },
  });

  const { palette } = usePalette();

  return (
    <Grid
      css={[{ paddingTop: 145, paddingBottom: 150 }]}
      style={
        deckId === "crypto"
          ? { backgroundColor: theme.colors.darkBlack }
          : card && card.cardBackground
          ? { backgroundColor: card.cardBackground }
          : {}
      }
    >
      <div css={[{ gridColumn: "span 6" }]}>
        {card && (
          <Card
            noArtist
            size="big"
            card={card}
            css={[
              {
                margin: "auto",
                position: "sticky",
                top: 100,
                paddingTop: 30,
                paddingBottom: 60,
              },
            ]}
          />
        )}
      </div>
      <div css={[{ gridColumn: "span 6" }]}>
        <div
          css={[
            {
              display: "grid",
              alignContent: "center",
              maxWidth: 520,
              height: 610,
            },
          ]}
        >
          <Text typography="newh1">{card ? card.artist.name : "..."}</Text>
          <Text typography="newh4">{card ? card.artist.country : "..."}</Text>
          <div
            css={[
              { display: "flex", alignItems: "cetner", gap: 30, marginTop: 30 },
            ]}
          >
            <Link
              href={
                (process.env.NEXT_PUBLIC_BASELINK || "") + "/shop/" + deckId
              }
            >
              <ArrowButton color="accent">Shop this deck</ArrowButton>
            </Link>
            <Link
              href={(process.env.NEXT_PUBLIC_BASELINK || "") + "/" + deckId}
            >
              <ArrowButton size="small" noColor base>
                Explore all cards
              </ArrowButton>
            </Link>
          </div>
        </div>
        <ScandiBlock css={[{ paddingTop: 15, display: "block" }]}>
          <ArrowedButton>The artist</ArrowedButton>

          <div
            css={[
              {
                maxWidth: 520,
              },
            ]}
          >
            <div css={[{ marginTop: 60, display: "flex", gap: 30 }]}>
              <img
                src={card ? card.artist.userpic : undefined}
                alt=""
                css={[
                  {
                    borderRadius: 10,
                    aspectRatio: "1",
                    height: 80,
                  },
                ]}
              />
              <div css={[{ flexBasis: 0, flexGrow: 1 }]}>
                <Text typography="paragraphSmall">
                  {card ? card.artist.info : "..."}
                </Text>
                {card && (
                  <div
                    css={(theme) => [
                      {
                        marginTop: 30,
                        display: "flex",
                        gap: 30,
                        alignItems: "center",
                      },
                      palette === "dark" && {
                        color: theme.colors.white75,
                      },
                    ]}
                  >
                    {Object.entries(card.artist.social).map(([key, value]) => {
                      const Icon = socialIcons[key];
                      if (!value || !Icon) {
                        return null;
                      }

                      return (
                        <Link href={value} key={value}>
                          <Icon />
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
            <Text css={[{ marginTop: 60 }]}>{card ? card.info : null} </Text>
          </div>
        </ScandiBlock>
        {deck && (
          <ScandiBlock
            css={[{ paddingTop: 15, marginTop: 60, display: "block" }]}
          >
            <ArrowedButton css={[{ display: "block", marginTop: 30 }]}>
              The deck
            </ArrowedButton>

            <img
              src={deck.product?.image}
              alt=""
              css={[{ height: 300, aspectRatio: "1", objectFit: "cover" }]}
            />

            <Text css={[{ marginTop: 30 }]}>
              This card belongs to the {deck.title} deck — {deck.description}
            </Text>
            <div
              css={[
                {
                  display: "flex",
                  alignItems: "cetner",
                  gap: 30,
                  marginTop: 30,
                },
              ]}
            >
              <Link
                href={(process.env.NEXT_PUBLIC_BASELINK || "") + "/" + deckId}
              >
                <ArrowButton color="accent">Explore all cards</ArrowButton>
              </Link>
              <Link
                href={
                  (process.env.NEXT_PUBLIC_BASELINK || "") + "/shop/" + deckId
                }
              >
                <ArrowButton size="small" noColor base>
                  Shop this deck
                </ArrowButton>
              </Link>
            </div>
          </ScandiBlock>
        )}
      </div>
    </Grid>
  );
};

export default Hero;
