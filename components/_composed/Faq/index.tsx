import { FC, HTMLAttributes } from "react";
import Faq from "../../Faq";
import Amex from "../../Icons/Amex";
import ApplePay from "../../Icons/ApplePay";
import Eth from "../../Icons/Eth";
import Mastercard from "../../Icons/Mastercard";
import PayPal from "../../Icons/PayPal";
import Visa from "../../Icons/Visa";

const ComposedFaq: FC<HTMLAttributes<HTMLDivElement>> = (props) => (
  <div {...props}>
    <Faq />
    <div
      css={(theme) => ({
        display: "flex",
        alignItems: "center",
        columnGap: theme.spacing(5),
        opacity: 0.5,
        marginTop: theme.spacing(7.5),
      })}
    >
      <Visa />
      <Mastercard />
      <Amex />
      <ApplePay />
      <PayPal />
      <Eth
        css={(theme) => ({
          width: theme.spacing(3.5),
          height: theme.spacing(5.4),
        })}
      />
    </div>
  </div>
);

export default ComposedFaq;
