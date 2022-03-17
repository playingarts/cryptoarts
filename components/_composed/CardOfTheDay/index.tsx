import { FC } from "react";
import { useDailyCard } from "../../../hooks/card";
import ComposedCardBlock, {
  Props as ComposedCardBlockProps,
} from "../CardBlock";

const ComposedCardOfTheDay: FC<
  Omit<ComposedCardBlockProps, "card" | "deck">
> = (props) => {
  const { dailyCard } = useDailyCard();

  if (!dailyCard) {
    return null;
  }

  return (
    <ComposedCardBlock
      {...props}
      cardOfTheDay={true}
      card={dailyCard}
      deck={dailyCard.deck}
    />
  );
};

export default ComposedCardOfTheDay;
