import { FC, HTMLAttributes } from "react";
import Faq from "../../Faq";
import Amex from "../../Icons/Amex";
import ApplePay from "../../Icons/ApplePay";
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
          gap: theme.spacing(3),
          marginTop: theme.spacing(3.5),
          marginBottom: theme.spacing(2.5),
        },
        // opacity: 0.5,
        marginTop: theme.spacing(7.5),
        color: theme.colors.svggray,
      })}
    >
      <Visa />
      <Mastercard />
      <Amex />
      <ApplePay />
      <PayPal />
    </div>
  </div>
);

export default ComposedFaq;
