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
                }
              : {
                  transform: "rotate(-15deg) scale(0.85)",
                  marginTop: -theme.spacing(8),
                  marginLeft: -theme.spacing(3),
                }
          }
        />
      ))}
    </div>
  );
};

export default Hero;
