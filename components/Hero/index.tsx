import { FC, HTMLAttributes, useEffect } from "react";
import { useLoadRandomCards } from "../../hooks/card";
import Card from "../Card";

type Props = HTMLAttributes<HTMLElement>;

const Hero: FC<Props> = (props) => {
  const { cards, loadRandomCards } = useLoadRandomCards();

  useEffect(() => {
    loadRandomCards({ variables: { limit: 2, shuffle: true } });
  }, [loadRandomCards]);

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
        <Card
          key={card._id}
          interactive={true}
          noInfo={true}
          card={card}
          size={index % 2 === 0 ? undefined : "big"}
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
                    "--width": `${theme.spacing(11.4)}px !important`,
                    "--height": `${theme.spacing(16.1)}px !important`,
                  },
                }
              : {
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
                    "--width": `${theme.spacing(13.6)}px !important`,
                    "--height": `${theme.spacing(19.1)}px !important`,
                  },
                }
          }
        />
      ))}
    </div>
  );
};

export default Hero;
