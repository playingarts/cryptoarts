import { FC, HTMLAttributes, useEffect } from "react";
import { useLoadHeroCards } from "../../hooks/card";
import Card from "../Card";
import Link from "../Link";

type Props = HTMLAttributes<HTMLElement> & {
  slug: string;
  deck: string;
};

const Hero: FC<Props> = ({ slug, deck, ...props }) => {
  const {
    heroCards = ([
      {
        _id: "card01",
        video: "",
        img: "",
        value: "",
        suit: "",
        info: "",
        deck: "",
        artist: "",
      },
      {
        _id: "card02",
        video: "",
        img: "",
        value: "",
        suit: "",
        info: "",
        deck: "",
        artist: "",
      },
    ] as unknown) as GQL.Card[],
    loadHeroCards,
  } = useLoadHeroCards();

  useEffect(() => {
    loadHeroCards({ variables: { deck, slug } });
  }, [slug, deck, loadHeroCards]);

  if (!heroCards) {
    return null;
  }

  return (
    <div
      {...props}
      css={[
        {
          position: "relative",
          height: 0,
        },
      ]}
    >
      {heroCards.map((card, index) => (
        <Link
          css={(theme) =>
            index % 2 === 0
              ? {
                  transform: "rotate(15deg) scale(0.95)",
                  filter: "blur(1px)",
                  position: "absolute",
                  left: theme.spacing(30),
                  [theme.mq.sm]: {
                    marginTop: -theme.spacing(2.3),
                  },
                  [theme.maxMQ.md]: {
                    left: theme.spacing(17),
                    marginTop: -theme.spacing(5),
                  },
                  [theme.maxMQ.sm]: {
                    transform: "rotate(15deg) scale(1)",
                    left: theme.spacing(15.2),
                    // marginTop: -theme.spacing(8.5),
                    marginTop: theme.spacing(1.5),
                    // "--width": `${theme.spacing(11.4)}px !important`,
                    // "--height": `${theme.spacing(16.1)}px !important`,
                  },
                }
              : {
                  position: "absolute",
                  transform: "rotate(-15deg) scale(0.85)",
                  [theme.mq.sm]: {
                    marginTop: -theme.spacing(8.5),
                  },
                  marginLeft: -theme.spacing(3),
                  [theme.maxMQ.sm]: {
                    transform: "rotate(-15deg) scale(1)",
                    // marginTop: -theme.spacing(10),
                    marginBottom: theme.spacing(3),
                    marginLeft: theme.spacing(2.5),
                    // "--width": `${theme.spacing(13.6)}px !important`,
                    // "--height": `${theme.spacing(19.1)}px !important`,
                  },
                }
          }
          key={card._id}
          href={`/${card.deck.slug}/${card.artist.slug}`}
        >
          <Card
            interactive={true}
            noInfo={true}
            card={card}
            size={index % 2 === 0 ? undefined : "big"}
            animated={!!card.video}
            filter={true}
            css={(theme) => [
              index % 2 === 0
                ? {
                    [theme.maxMQ.md]: {
                      "--width": `${theme.spacing(25)}px !important`,
                      "--height": `${theme.spacing(35.2)}px !important`,
                    },
                    [theme.maxMQ.sm]: {
                      "--width": `${theme.spacing(11.4)}px !important`,
                      "--height": `${theme.spacing(16.1)}px !important`,
                    },
                  }
                : {
                    [theme.maxMQ.md]: {
                      "--width": `${theme.spacing(30)}px !important`,
                      "--height": `${theme.spacing(42.2)}px !important`,
                    },
                    [theme.maxMQ.sm]: {
                      "--width": `${theme.spacing(13.6)}px !important`,
                      "--height": `${theme.spacing(19.1)}px !important`,
                    },
                  },
            ]}
          />
        </Link>
      ))}
    </div>
  );
};

export default Hero;
