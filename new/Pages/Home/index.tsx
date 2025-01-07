import { mockCard } from "../../../mocks/card";
import Button from "../../../components/Button";
import Grid from "../../../components/Grid";

import Text from "../../../components/Text";
import HeroCard from "./HeroCard";
import placeholder from "../../../mocks/deckCollectionPreview.png";
import AugmentedReality from "../../../components/AugmentedReality";
import Layout from "../../../components/Layout";
import FastCompany from "../../../components/Icons/FastCompany";
import CreativeBloq from "../../../components/Icons/CreativeBloq";
import DigitalArts from "../../../components/Icons/DigitalArts";
import Esquire from "../../../components/Icons/Esquire";
import Quote from "../../../components/Quote";
import Header from "../../Header";

type Props = {};

const Home = (props: Props) => {
  return (
    <>
      <Header />
      <Grid css={[{ background: "#E9E7E2", width: "100%" }]}>
        <div css={{ gridColumn: "1/-1" }}>
          <Grid>
            {/* Hero */}
            <div css={[{ gridColumn: "1/ span 6" }]}>
              <Text css={(theme) => [theme.typography.h, { margin: 0 }]}>
                Collective Art Project
              </Text>
              <span>
                <Button>Learn the story</Button>
                <Button>Shop the decks</Button>
              </span>
              <Text
                css={(theme) => [theme.typography.paragraphBig, { margin: 0 }]}
              >
                “Where art and play come together in every playing card.”
              </Text>
              <Button>Dive in to learn more</Button>
            </div>
            <div css={[{ gridColumn: "7/-1" }]}>
              <HeroCard
                noInfo={true}
                card={{ ...mockCard, background: "none" }}
                css={{ width: 340, height: 478 }}
              />
            </div>
          </Grid>
          {/* Story */}
          <div css={{ position: "relative" }}>
            <Grid css={{ background: "#F1F1F1" }}>
              <div css={[{ gridColumn: "7/-1" }]}>
                <Button>Where art meets play</Button>
                <Text
                  css={(theme) => [
                    theme.typography.paragraphBig,
                    { margin: 0 },
                  ]}
                >
                  Playing Arts brings together artists from around the world,
                  transforming traditional playing cards into a diverse gallery
                  of creative expression.
                </Text>
                <span css={{ div: { display: "inline-block" } }}>
                  <div>
                    <Text css={(theme) => [theme.typography.newH2]}>12</Text>
                    <Text css={(theme) => [theme.typography.newH4]}>Years</Text>
                  </div>
                  <div>
                    <Text css={(theme) => [theme.typography.newH2]}>08</Text>
                    <Text css={(theme) => [theme.typography.newH4]}>
                      Editions
                    </Text>
                  </div>
                  <div>
                    <Text css={(theme) => [theme.typography.newH2]}>1100+</Text>
                    <Text css={(theme) => [theme.typography.newH4]}>
                      Artists
                    </Text>
                  </div>
                </span>
              </div>
            </Grid>
            <Grid css={{ background: "#EAEAEA" }}>
              <div css={[{ gridColumn: "7/-1" }]}>
                <Button>Explore the collection of eight decks</Button>
                <Text
                  css={(theme) => [
                    theme.typography.paragraphBig,
                    { margin: 0 },
                  ]}
                >
                  Each deck is a curated showcase of 55 unique artworks, created
                  by 55 international artists.
                </Text>
              </div>
            </Grid>
          </div>
          {/* Collection */}
          <div>
            <Button>Explore the collection of eight decks</Button>
            <div css={[{ display: "flex", flexWrap: "wrap", gap: 3 }]}>
              {(() => {
                const arr = [];
                for (let i = 0; i < 8; i++) {
                  arr.push(
                    <div
                      css={[
                        {
                          flex: "1 0 30%",
                          height: 450,
                          background: "gray",
                          borderRadius: 16,
                        },
                      ]}
                    >
                      <img
                        src={placeholder.src}
                        alt="asd"
                        css={[{ width: "100%" }]}
                      />
                    </div>
                  );
                }
                arr.push(<div css={[{ flex: "1 0 33%", height: 450 }]}></div>);
                return arr;
              })()}
            </div>
          </div>
          {/* Gallery */}
          <div>
            <Button>Every card, a masterpiece you can hold</Button>
            <Text
              css={(theme) => [theme.typography.paragraphBig, { width: 740 }]}
            >
              Feel the art in every card — carefully crafted on legendary
              Bicycle® paper for unparalleled artistry and tactile quality.
            </Text>
            <Grid css={[{ img: { background: " white", borderRadius: 16 } }]}>
              <div css={[{ gridColumn: "span 6" }]}>
                <Button>The Details</Button>
              </div>

              <div css={[{ gridColumn: "span 6" }]}>
                <div
                  css={[{ display: "flex", justifyContent: "space-between" }]}
                >
                  <Button>Card of the day</Button>
                  <Button>Follow @playingarts</Button>
                </div>
              </div>
              <img
                css={[
                  {
                    gridColumn: "span 3",
                    aspectRatio: "1/1",
                    width: "100%",
                    objectFit: "cover",
                  },
                ]}
                src={placeholder.src}
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
                src={placeholder.src}
                alt=""
              />
              <img
                css={[
                  {
                    gridColumn: "span 6",
                    gridRow: "span 2",
                    aspectRatio: "1/1",
                    width: "100%",
                    objectFit: "cover",
                  },
                ]}
                src={placeholder.src}
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
                src={placeholder.src}
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
                src={placeholder.src}
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
                src={placeholder.src}
                alt=""
              />
              <div css={[{ gridColumn: "7/-1", fontSize: 100 }]}>Quote</div>
            </Grid>
          </div>
          {/* augmented reality */}
          <AugmentedReality palette="light" css={[{ gridColumn: "1/-1" }]} />
          {/* Reviews */}
          <Button>1,000+ Five-of-Stars reviews</Button>
          <Text css={(theme) => [theme.typography.paragraphBig]}>
            Discover why artists, collectors, players and art connoisseurs can’t
            get enough.
          </Text>
          <div css={{ display: "flex", justifyContent: "space-between" }}>
            <span>
              <Button>Shop the decks</Button>
              <Button>Read all stories</Button>
            </span>

            <span>
              <Button>left</Button>
              <Button>Right</Button>
            </span>
          </div>
          <div>
            <Text css={[{ fontSize: 120 }]}>Reviews</Text>
          </div>
          <Layout
            css={(theme) => ({
              background: theme.colors.white,
              paddingTop: theme.spacing(12),
              paddingBottom: theme.spacing(12),
              borderRadius: "0px 0px 50px 50px",
              zIndex: 1,
            })}
          >
            <Grid
              css={(theme) => ({
                gap: theme.spacing(3),
                [theme.maxMQ.md]: {
                  [theme.maxMQ.md]: {
                    gridTemplateColumns: `repeat(6, ${theme.spacing(7.5)}px)`,
                  },
                },
              })}
            >
              <a
                rel="noreferrer"
                href="https://www.fastcompany.com/90575448/these-playing-cards-show-fantastical-ways-the-world-could-change-by-2120"
                target="_blank"
                css={{
                  gridColumn: "span 3",
                  textAlign: "center",
                  color: "#000",
                }}
              >
                <FastCompany />
              </a>
              <a
                rel="noreferrer"
                href="https://www.creativebloq.com/illustration/artists-collaborate-picture-perfect-playing-cards-10134891"
                target="_blank"
                css={{
                  gridColumn: "span 3",
                  textAlign: "center",
                  color: "#000",
                }}
              >
                <CreativeBloq />
              </a>
              <a
                rel="noreferrer"
                href="https://www.digitalartsonline.co.uk/features/illustration/55-global-designers-illustrators-each-designed-playing-card-in-this-unique-deck/"
                target="_blank"
                css={{
                  gridColumn: "span 3",
                  textAlign: "center",
                  color: "#000",
                }}
              >
                <DigitalArts />
              </a>
              <a
                rel="noreferrer"
                href="https://www.esquire.com/style/mens-fashion/g4233463/artistic-deck-of-cards"
                target="_blank"
                css={{
                  gridColumn: "span 3",
                  textAlign: "center",
                  color: "#000",
                }}
              >
                <Esquire />
              </a>
            </Grid>
            <Grid
              short={true}
              css={(theme) => ({
                marginTop: theme.spacing(10),
              })}
            >
              <Quote css={{ gridColumn: "1 / -1" }}>
                “This really is a unique deck. The concept is playful, and
                elegant at the same time. The colors are vibrant. A wonderful
                price of art.”
              </Quote>
            </Grid>
          </Layout>
        </div>
      </Grid>
      <div>FOOTER</div>
    </>
  );
};

export default Home;
