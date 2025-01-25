import { FC, HTMLAttributes, useEffect, useState } from "react";
import Grid from "../../../components/Grid";
import ArrowedButton from "../../Buttons/ArrowedButton";
import Text from "../../Text";
import { useCards } from "../../../hooks/card";
import { useRouter } from "next/router";
import Card from "../../Card";
import { useSize } from "../../../components/SizeProvider";
import { breakpoints } from "../../../source/enums";
import Dot from "../../Icons/Dot";
import background from "../../../mocks/images/backgroundImage.png";

const List = () => {
  const {
    query: { deckId },
  } = useRouter();

  const { cards } = useCards({ variables: { deck: deckId } });

  const { width } = useSize();

  const [range, setRange] = useState(4);

  useEffect(() => {
    setRange(width >= breakpoints.md ? 12 : width >= breakpoints.sm ? 8 : 4);
  }, [width]);
  console.log(deckId, cards);

  return (
    cards && (
      <div
        css={[
          {
            display: "flex",
            gridColumn: "1/-1",
            columnGap: 30,
            flexWrap: "wrap",
            rowGap: 60,
            marginTop: 90,
            justifyContent: "center",
          },
        ]}
      >
        {cards.map((card, index) => {
          const rand =
            index !== 0 &&
            (index + 1) % range === 0 &&
            Math.floor(Math.random() * range) + index - range;

          const randCard = rand && cards[rand];

          return (
            <>
              <Card key={card._id + index} card={card} css={[{ width: 300 }]} />
              {randCard && (
                <Grid css={[{ width: "100%" }]} key={card._id + "quote"}>
                  <img
                    src={background.src}
                    alt=""
                    css={{
                      width: 300,
                      height: 300,
                      gridColumn: "2/6",
                      borderRadius: 15,
                    }}
                  />
                  <div css={[{ gridColumn: "span 6", marginTop: 30 }]}>
                    <div css={[{ display: "flex", gap: 30 }]}>
                      <img
                        src={randCard.artist.userpic}
                        alt=""
                        css={{ width: 80, height: 80 }}
                      />
                      <div css={[{ display: "inline-block" }]}>
                        <Text typography="paragraphBig">
                          {randCard.artist.name}
                        </Text>
                        <Text typography="paragraphSmall">
                          {randCard.artist.country}
                        </Text>
                      </div>
                    </div>
                    <Text typography="newParagraph" css={[{ marginTop: 60 }]}>
                      {randCard.artist.info}
                    </Text>

                    <Text
                      typography="linkNewTypography"
                      css={[{ marginTop: 30 }]}
                    >
                      Discover the artwork <Dot />
                    </Text>
                  </div>
                </Grid>
              )}
            </>
          );
        })}
      </div>
    )
  );
};

const CardList: FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => {
  return (
    <Grid
      css={(theme) => [{ paddingTop: 60, background: theme.colors.pale_gray }]}
    >
      <div css={[{ gridColumn: "span 6" }]}>
        <ArrowedButton>Explore the cards</ArrowedButton>
        <Text css={[{ marginTop: 60 }]} typography="paragraphBig">
          A curated showcase of 55 unique artworks, created by 55 international
          artists.
        </Text>
      </div>
      <List />
    </Grid>
  );
};

export default CardList;
