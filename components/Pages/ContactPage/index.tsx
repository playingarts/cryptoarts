"use client";

import { FC, useLayoutEffect, useState } from "react";
import Head from "next/head";
import Grid from "../../Grid";
import Header from "../../Header";
import Footer from "../../Footer";
import Text from "../../Text";
import FaqItem from "../../Footer/Faq/Item";
import Visa from "../../Icons/Visa";
import Mastercard from "../../Icons/Mastercard";
import Amex from "../../Icons/Amex";
import PayPal from "../../Icons/PayPal";

const faq = {
  "Do you ship to my country?": "YES! We ship worldwide. Tracking provided.",
  "How much does it cost to ship a package?":
    "Shipping cost is fixed at $4.95 per order (€4.95 for Europe).",
  "How long does shipping take?":
    "Please allow 2—5 business days for orders to be processed after your purchase is complete. The estimated shipping time is 5—10 business days for Europe and USA, and up to 20 business days for the rest of the world.",
  "How do I know if my order has been successfully shipped?":
    "Once your order has been prepared and shipped, you will receive a Shipment Notification email with tracking information, so you'll always know where your package is.",
  "I've received shipping confirmation e-mail with tracking number but how to track my order?":
    'We advise to use track-trace.com/post to track orders. Just paste your tracking number in Post/EMS field, then press "Track with options" button and select your country on the left.',
  "The estimated delivery date has passed and I still haven't received my order. What's wrong?":
    "Please note that the estimated delivery dates are estimates only and are not guaranteed. There are many factors that can affect the delivery of your order.",
  "Tracking says that the parcel has been returned. What's wrong?":
    "The parcels are usually being returned because of the wrong address or because they were not picked up by the customer. Please contact us if this happened with you.",
  "What is your return policy?":
    "We want you to be 100% satisfied with your Playing Arts purchase. Items in new condition can be returned or exchanged within 30 days of delivery. Please note that original shipping charges are non-refundable.",
  "What forms of payment do you accept?":
    "We accept the following payment methods: Credit card (Visa, MasterCard, American Express), PayPal, Apple Pay.",
};

const ContactPage: FC = () => {
  return (
    <>
      <Head>
        <title>Contact - Playing Arts</title>
      </Head>
      <Header />
      <Grid
        css={(theme) => ({
          background: theme.colors.soft_gray,
          paddingTop: theme.spacing(20),
          paddingBottom: theme.spacing(10),
          [theme.maxMQ.sm]: {
            // Mobile styles - to be implemented
          },
        })}
      >
        <div css={{ gridColumn: "1 / -1" }}>
          <Text
            typography="newh1"
            css={(theme) => ({
              color: theme.colors.dark_gray,
              marginBottom: theme.spacing(4),
            })}
          >
            Contact
          </Text>
          <div
            css={(theme) => ({
              height: 1,
              background: theme.colors.black10,
              marginBottom: theme.spacing(4),
            })}
          />
        </div>

        <div
          css={(theme) => ({
            gridColumn: "span 8",
            [theme.maxMQ.sm]: { /* Mobile styles - to be implemented */ },
          })}
        >
          <Text typography="newParagraph">
            You got questions concerning your order or a general matter?
            <br />
            Please reach out to us:{" "}
            <a
              href="mailto:info@playingarts.com"
              css={(theme) => ({ color: theme.colors.accent })}
            >
              info@playingarts.com
            </a>
          </Text>
        </div>

        <div
          css={(theme) => ({
            gridColumn: "span 3",
            [theme.maxMQ.sm]: { /* Mobile styles - to be implemented */ },
          })}
        >
          <Text
            typography="label"
            css={(theme) => ({
              color: theme.colors.black50,
              marginBottom: theme.spacing(1),
            })}
          >
            Company
          </Text>
          <Text
            typography="paragraphSmall"
            css={(theme) => ({ color: theme.colors.black50 })}
          >
            Digital Abstracts, S.L.
            <br />
            VAT No. B66760802
            <br />
            C/Alaba 60, 08005
            <br />
            Barcelona, Spain
          </Text>
        </div>

        <div
          css={(theme) => ({
            gridColumn: "span 3",
            [theme.maxMQ.sm]: { /* Mobile styles - to be implemented */ },
          })}
        >
          <Text
            typography="label"
            css={(theme) => ({
              color: theme.colors.black50,
              marginBottom: theme.spacing(1),
            })}
          >
            Returns
          </Text>
          <Text
            typography="paragraphSmall"
            css={(theme) => ({ color: theme.colors.black50 })}
          >
            Digital Abstracts, S.L.
            <br />
            AK-42, LV-1063
            <br />
            Riga, Latvia
          </Text>
        </div>
      </Grid>

      {/* FAQ Section */}
      <Grid
        css={(theme) => ({
          background: theme.colors.pale_gray,
          paddingTop: theme.spacing(12),
          paddingBottom: theme.spacing(12),
          [theme.maxMQ.sm]: {
            // Mobile styles - to be implemented
          },
        })}
      >
        <div css={{ gridColumn: "1 / -1" }}>
          <Text
            typography="label"
            css={(theme) => ({
              color: theme.colors.black50,
              marginBottom: theme.spacing(3),
            })}
          >
            Shipping FAQ
          </Text>
          <div
            css={(theme) => ({
              height: 1,
              background: theme.colors.black10,
              marginBottom: theme.spacing(2),
            })}
          />
          <div css={(theme) => ({ display: "grid", gap: theme.spacing(2) })}>
            {Object.entries(faq).map(([question, answer]) => (
              <FaqItem key={question} question={question} answer={answer} />
            ))}
          </div>

          {/* Payment Icons */}
          <div
            css={(theme) => ({
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: theme.spacing(5),
              marginTop: theme.spacing(6),
              color: theme.colors.black50,
              [theme.maxMQ.sm]: {
                // Mobile styles - to be implemented
              },
            })}
          >
            <Visa css={(theme) => ({ height: theme.spacing(2.5) })} />
            <Mastercard css={(theme) => ({ height: theme.spacing(3) })} />
            <Amex css={(theme) => ({ height: theme.spacing(3) })} />
            <PayPal css={(theme) => ({ height: theme.spacing(2.5) })} />
          </div>
        </div>
      </Grid>
      <Footer />
    </>
  );
};

export default ContactPage;
