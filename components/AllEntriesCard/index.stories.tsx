import { ComponentStory, ComponentMeta } from "@storybook/react";
import AllEntriesCard from ".";
import Spades from "../Icons/Spades";
import Joker from "../Icons/Joker";
import Clubs from "../Icons/Clubs";
import Diamonds from "../Icons/Diamonds";
import Hearts from "../Icons/Hearts";
import { CardSuits } from "../../source/enums";

export default {
  title: "AllEntriesCard",
  component: AllEntriesCard,
} as ComponentMeta<typeof AllEntriesCard>;

const Template: ComponentStory<typeof AllEntriesCard> = (args) => (
  <AllEntriesCard {...args} />
);

export const HeartsCard = Template.bind({});
HeartsCard.args = {
  cardValue: "king",
  suit: CardSuits.h,
  Icon: Hearts,
  note: "13 cards",
};

export const ClubsCard = Template.bind({});
ClubsCard.args = {
  cardValue: "king",
  suit: CardSuits.c,
  Icon: Clubs,
  note: "13 cards",
};

export const SpadesCard = Template.bind({});
SpadesCard.args = {
  cardValue: "king",
  suit: CardSuits.s,
  Icon: Spades,
  note: "13 cards",
};

export const DiamondsCard = Template.bind({});
DiamondsCard.args = {
  cardValue: "king",
  suit: CardSuits.d,
  Icon: Diamonds,
  note: "13 cards",
};

export const JokerRedCard = Template.bind({});
JokerRedCard.args = {
  cardValue: "joker",
  suit: CardSuits.r,
  Icon: Joker,
  note: "13 cards",
};

export const JokerBlackCard = Template.bind({});
JokerBlackCard.args = {
  cardValue: "joker",
  suit: CardSuits.b,
  Icon: Joker,
  note: "13 cards",
};
