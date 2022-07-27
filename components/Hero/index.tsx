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
      css={{
        position: "relative",
      }}
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
                  [theme.maxMQ.sm]: {
                    transform: "rotate(15deg) scale(1)",
                    left: theme.spacing(15.2),
                    marginTop: -theme.spacing(8.5),
                    "--width": `${theme.spacing(11.4)}px`,
                    "--height": `${theme.spacing(16.1)}px`,
                  },
                }
              : {
                  transform: "rotate(-15deg) scale(0.85)",
                  marginTop: -theme.spacing(8),
                  marginLeft: -theme.spacing(3),
                  [theme.maxMQ.sm]: {
                    transform: "rotate(-15deg) scale(1)",
                    marginTop: -theme.spacing(10),
                    marginBottom: theme.spacing(3),
                    marginLeft: theme.spacing(2.5),
                    "--width": `${theme.spacing(13.6)}px`,
                    "--height": `${theme.spacing(19.1)}px`,
                  },
                }
          }
        />
      ))}
    </div>
  );
};

export default Hero;
