import { FC, HTMLAttributes, useEffect } from "react";
import { useLoadRandomCardsWithInfo } from "../../hooks/card";
import Card from "../Card";
import Link from "../Link";

type Props = HTMLAttributes<HTMLElement>;

const Hero: FC<Props> = (props) => {
  const { cards, loadRandomCardsWithInfo } = useLoadRandomCardsWithInfo();

  useEffect(() => {
    loadRandomCardsWithInfo({ variables: { limit: 2, shuffle: true } });
  }, [loadRandomCardsWithInfo]);

  if (!cards) {
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
      {cards.map((card, index) => (
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
            css={(theme) =>
              index % 2 === 0
                ? {
                    [theme.maxMQ.sm]: {
                      "--width": `${theme.spacing(11.4)}px !important`,
                      "--height": `${theme.spacing(16.1)}px !important`,
                    },
                  }
                : {
                    [theme.maxMQ.sm]: {
                      "--width": `${theme.spacing(13.6)}px !important`,
                      "--height": `${theme.spacing(19.1)}px !important`,
                    },
                  }
            }
          />
        </Link>
      ))}
    </div>
  );
};

export default Hero;
