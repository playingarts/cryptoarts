import { FC, Fragment } from "react";
import FaqItem from "../FaqItem";
import Line from "../Line";
import Text from "../Text";

const faq = {
  "Do you ship to my country?": "YES! We ship worldwide. Tracking provided.",
  "How much does it cost to ship a package?":
    "Shipping is free for all orders.",
  "How long does shipping take?":
    "Please allow 2—5 business days for orders to be processed after your purchase is complete. The estimated shipping time is 5—10 business days for Europe and USA, and up to 20 business days for the rest of the world.",
  "How do I know if my order has been successfully shipped?":
    "Once your order has been prepared and shipped, you will receive a Shipment Notification email with tracking information, so you’ll always know where your package is.",
  "I’ve received shipping confirmation e-mail with tracking number but how to track my order?":
    'We advise to use track-trace.com/post to track orders. Just paste your tracking number in Post/EMS field, then press "Track with options" button and select your country on the left. Alternatively you can use your local Post’s office website but note that usually tracking info will be visible only when the parcel hits destination country.',
  "The estimated delivery date has passed and I still haven’t received my order. What’s wrong?":
    "Please note that the estimated delivery dates are estimates only and are not guaranteed. There are many factors that can affect the delivery of your order.",
  "Tracking says that the parcel has been returned. What’s wrong?":
    "The parcels are usually being returned because of the wrong address or because they were not picked up by the customer. Please contact us if this happened with you.",
  "What is your return policy?":
    "We want you to be 100% satisfied with your Playing Arts purchase. Items in new condition can be returned or exchanged within 30 days of delivery. Please note that original shipping charges are non-refundable. If we made a mistake or the item arrived defective, please contact us and we’ll make things right.",
    "What forms of payment do you accept?":"We accept the following payment methods: Credit card (Visa, MasterCard, American Express) PayPal, Apple Pay."
};
const Faq: FC<{ title?: string }> = ({ title }) => {

  return (
    <Fragment>
      <Text
        component="h5"
        css={(theme) => [
          {
            margin: "0",
            opacity: ".4",
            marginBottom: theme.spacing(3),
            [theme.maxMQ.sm]: {
              paddingLeft: theme.spacing(2),
              paddingRight: theme.spacing(2),
              marginBottom: theme.spacing(1.5),
            },
          },
        ]}
      >
        {title || "Shipping FAQ"}
      </Text>
      <Line
        spacing={0}
        css={(theme) => [
          {
            [theme.maxMQ.sm]: {
              marginLeft: theme.spacing(2),
              marginRight: theme.spacing(2),
            },
          },
        ]}
      />
      {Object.entries(faq).map(([question, answer]) => {
        return (
          <Fragment key={question}>
            <FaqItem
              question={question}
              css={(theme) => ({
                borderBottom: "1px solid #dddddd",

                [theme.maxMQ.sm]: {
                  marginLeft: theme.spacing(2),
                  marginRight: theme.spacing(2),
                },
              })}
            >
              {answer}
            </FaqItem>
          </Fragment>
        );
      })}
    </Fragment>
  );
};

export default Faq;
