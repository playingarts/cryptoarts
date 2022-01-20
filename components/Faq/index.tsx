import { FC, Fragment } from "react";
import FaqItem from "../FaqItem";
import Line from "../Line";
import Text from "../Text";

const Faq: FC = () => {
  const faq = {
    "Do you ship to my country?": "Answer",
    "How much does it cost to ship a package?": "Answer",
    "How long does shipping take?": "Answer",
    "How do I know if my order has been successfully shipped?": "Answer",
    "I’ve received shipping confirmation e-mail with tracking number but how to track my order?":
      "Answer",
    "The estimated delivery date has passed and I still haven’t received my order. What’s wrong?":
      "Answer",
    "Tracking says that the parcel has been returned. What’s wrong?": "Answer",
    "What is your return policy?": "Answer",
    "What payment methods you accept?": "Answer",
  };

  return (
    <Fragment>
      <Text component="h5" css={{ margin: 0, opacity: 0.5 }}>
        Shipping faq
      </Text>
      <Line spacing={3} />
      {Object.entries(faq).map(([question, answer]) => {
        return (
          <FaqItem
            key={question}
            question={question}
            css={(theme) => ({ marginTop: theme.spacing(2), opacity: 0.5 })}
          >
            {answer}
          </FaqItem>
        );
      })}
    </Fragment>
  );
};

export default Faq;
