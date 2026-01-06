"use client";

import { FC, Fragment } from "react";
import Head from "next/head";
import Grid from "../../Grid";
import Header from "../../Header";
import Footer from "../../Footer";
import Text from "../../Text";
import ArrowButton from "../../Buttons/ArrowButton";
import Link from "../../Link";

const privacyDate = process.env.NEXT_PUBLIC_PRIVACY_DATE || "Error";

const data = [
  {
    title: "Information we receive and collect",
    content: (
      <>
        When you fill in the forms (submit your profile / enter the contest /
        contact us) or purchase something from our store, we collect the
        personal information you give us such as your name, address and email
        address, your portfolio link. In addition, when you browse our website,
        we automatically receive your computer's internet protocol (IP) address,
        which may tell us generally, where you are located.
        <br />
        <br />
        When you contact us to request support or other information, we may keep
        a record of the communication to help resolve the matter you contacted
        us about.
        <br />
        <br />
        When you make purchases through our websites, we use a payment processor
        and do not receive credit card or other financial information (other
        than confirmation that payment in a certain amount has been made). We
        may collect contact information from you that we pass through to the
        payment processor to facilitate the transaction. Our e-store is run by
        Shopify, an ecommerce provider.
      </>
    ),
  },
  {
    title: "How we use personal information",
    content: (
      <>
        Digital Abstracts may use your personal information to:
        <br />
        — communicate: send info-emails regarding to the contest, send
        confirmation emails, inform you about upcoming events, share news and
        updates;
        <br />— send products: that you purchase in our Store or win during the
        contest.
      </>
    ),
  },
  {
    title: 'Do we use "cookies"?',
    content: (
      <>
        Yes. Cookies are small files that a site or its service provider
        transfers to your computer's hard drive through your Web browser (if you
        allow) that enables the site's or service provider's systems to
        recognize your browser and capture and remember certain information. For
        instance, we use cookies to help us remember and process the items in
        your shopping bag.
        <br />
        <br />
        They are also used to help us understand your preferences based on
        previous or current site activity, which enables us to provide you with
        improved services. We also use cookies to help us compile aggregate data
        about site traffic and site interaction so that we can offer better site
        experiences and tools in the future.
        <br />
        <br />
        We use cookies to:
        <br />
        — Help remember and process the items in the shopping bag.
        <br />
        — Understand and save user's preferences for future visits.
        <br />
        <br />
        You can choose to have your computer warn you each time a cookie is
        being sent, or you can choose to turn off all cookies. You do this
        through your browser (like Internet Explorer) settings. Each browser is
        a little different, so look at your browser's Help menu to learn the
        correct way to modify your cookies.
        <br />
        <br />
        If you disable cookies off, some features will be disabled It won't
        affect the users experience that make your site experience more
        efficient and some of our services will not function properly.
      </>
    ),
  },
  {
    title: "Google",
    content:
      "Google's advertising requirements can be summed up by Google's Advertising Principles. They are put in place to provide a positive experience for users. https://support.google.com/adwordspolicy/answer/1316548?hl=en",
  },
  {
    title: "Disclosure",
    content: (
      <>
        Digital Abstracts works with companies that help us run our business.
        These companies provide services such as delivering customer support,
        processing credit card payments, and sending emails and your purchased
        goods on our behalf. In some cases, these companies have access to some
        of your personal information in order to provide services to you on our
        behalf. They are not permitted to use your information for their own
        purposes.
        <br />
        <br />
        We may share or publish aggregate information that does not specifically
        identify you, such as statistical information about visitors to our
        website or statistical information regarding our products.
        <br />
        <br />
        We may be forced to disclose your personal information if we are
        required by law to do so or if you violate our Terms of Service.
      </>
    ),
  },
  {
    title: "Securing your data",
    content:
      "We understand that the security of your personal information is important. Digital Abstracts is taking reasonable technical and organisational precautions to prevent the loss, misuse or alteration of your personal information. However, despite our efforts, no security controls are 100% effective and Digital Abstracts cannot ensure or warrant the security of your personal information.",
  },
  {
    title: "Cross-border data transfers",
    content:
      "Information that Digital Abstracts collects may be stored and processed in and transferred between any of the countries in which Digital Abstracts operates to enable the use of the information in accordance with this privacy policy. You agree to such cross-border transfers of personal information.",
  },
  {
    title: "Changes to this privacy statement",
    content:
      "Digital Abstracts reserves the right to modify this privacy policy at any time, so please review it frequently. Changes and clarifications will take effect immediately upon their posting on the website. If we make material changes to this policy, we will notify you here that it has been updated, so that you are aware of what information we collect, how we use it, and under what circumstances, if any, we use and/or disclose it.",
  },
  {
    title: "Other websites",
    content: (
      <>
        We have pages on many social networking platforms where you can visit
        and communicate with us. We may collect information when you visit our
        social networking pages, for example if you follow or "like" us. Be sure
        to review the privacy and data usage policies of any social networking
        platform you use to learn more about its personal information practices
        and your options.
        <br />
        <br />
        This website may contain links to other websites. Digital Abstracts is
        not responsible for the privacy policies or practices of any third
        party.
      </>
    ),
  },
  {
    title: "Questions and Contact Information",
    content:
      "If you have a privacy question or complaint, please email us at info@playingarts.com",
  },
];

const PrivacyPage: FC = () => {
  return (
    <>
      <Head>
        <title>Privacy - Playing Arts</title>
        <meta name="description" content="Information we receive and collect" />
      </Head>
      <Header />

      {/* Hero Section */}
      <Grid
        css={(theme) => ({
          background: theme.colors.soft_gray,
          paddingTop: theme.spacing(20),
          paddingBottom: theme.spacing(10),
          [theme.maxMQ.sm]: {
            paddingTop: theme.spacing(15),
            paddingBottom: theme.spacing(5),
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
            Privacy Statement
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
            [theme.maxMQ.sm]: { gridColumn: "1 / -1" },
          })}
        >
          <Text typography="newParagraph" css={{ marginBottom: 24 }}>
            Playing Arts project is legally represented by Digital Abstracts
            S.L. that cares about your privacy. This privacy statement provides
            details about the personal information that Digital Abstracts
            receives through this website (playingarts.com), and the ways this
            information might be used.
          </Text>
          <Link href="/contact" css={{ textDecoration: "none" }}>
            <ArrowButton color="black">Contact Us</ArrowButton>
          </Link>
        </div>
      </Grid>

      {/* Content Sections */}
      <Grid
        css={(theme) => ({
          background: theme.colors.pale_gray,
          paddingTop: theme.spacing(10),
          paddingBottom: theme.spacing(10),
          [theme.maxMQ.sm]: {
            paddingTop: theme.spacing(5),
            paddingBottom: theme.spacing(5),
          },
        })}
      >
        <div css={{ gridColumn: "1 / -1" }}>
          {data.map(({ title, content }, index) => (
            <div
              key={index}
              css={(theme) => ({
                marginBottom: theme.spacing(6),
                [theme.maxMQ.sm]: { marginBottom: theme.spacing(4) },
              })}
            >
              <Text
                typography="newh4"
                css={(theme) => ({
                  color: theme.colors.dark_gray,
                  marginBottom: theme.spacing(2),
                })}
              >
                {title}
              </Text>
              <Text
                typography="paragraphSmall"
                css={(theme) => ({
                  color: theme.colors.black50,
                  marginBottom: theme.spacing(3),
                })}
              >
                {content}
              </Text>
              <div
                css={(theme) => ({
                  height: 1,
                  background: theme.colors.black10,
                })}
              />
            </div>
          ))}

          <Text
            typography="label"
            css={(theme) => ({
              color: theme.colors.black50,
              marginTop: theme.spacing(4),
            })}
          >
            Last Edited on {privacyDate}
          </Text>
        </div>
      </Grid>

      <Footer />
    </>
  );
};

export default PrivacyPage;
