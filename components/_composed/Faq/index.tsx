import { FC, HTMLAttributes } from "react";
import Faq from "../../Faq";
import Amex from "../../Icons/Amex";
import Mastercard from "../../Icons/Mastercard";
import PayPal from "../../Icons/PayPal";
import Visa from "../../Icons/Visa";

const ComposedFaq: FC<HTMLAttributes<HTMLDivElement> & { title?: string }> = ({
  title,
  ...props
}) => (
  <div {...props}>
    <Faq title={title} />
    <div
      css={(theme) => ({
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        columnGap: theme.spacing(5),

        [theme.maxMQ.sm]: {
          justifyContent: "center",
          gap: theme.spacing(1),
          marginBottom: theme.spacing(2.5),
        },
        marginTop: theme.spacing(3.5),
        color: theme.colors.svggray,
      })}
    >
      <Visa
        css={(theme) => [
          {
            [theme.maxMQ.sm]: {
              height: theme.spacing(2),
            },
          },
        ]}
      />
      <Mastercard
        css={(theme) => [
          {
            [theme.maxMQ.sm]: {
              height: theme.spacing(3),
            },
          },
        ]}
      />
      <Amex
        css={(theme) => [
          {
            [theme.maxMQ.sm]: {
              height: theme.spacing(3),
            },
          },
        ]}
      />
      <PayPal
        css={(theme) => [
          {
            [theme.maxMQ.sm]: {
              height: theme.spacing(2),
            },
          },
        ]}
      />
      {/* <ApplePay
        css={(theme) => [
          {
            [theme.maxMQ.sm]: {
              height: theme.spacing(2.5),
            },
          },
        ]}
      /> */}
    </div>
  </div>
);

export default ComposedFaq;
