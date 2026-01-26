import { mq, maxMQ } from "./breakpoints";

/**
 * Typography styles for the design system
 * Organized by design era (new Alliance No.2 font vs legacy Aldrich)
 *
 * Note: Alliance font is loaded via next/font/local which generates a unique
 * hashed font name. We use the CSS variable --font-alliance set by next/font.
 */
const allianceFont = "var(--font-alliance), 'Alliance No.2', sans-serif";

export const typographyLiterals = {
  // New design system typography (Alliance No.2 font)
  newParagraph: {
    fontFamily: allianceFont,
    fontSize: 25,
    fontWeight: 400,
    lineHeight: "150%",
    textAlign: "left",
    textUnderlinePosition: "from-font",
    textDecorationSkipInk: "none",
    [maxMQ.xsm]: {
      fontSize: 18,
      lineHeight: "150%",
    },
  },
  newh4: {
    fontFamily: allianceFont,
    fontSize: 25,
    fontWeight: 400,
    lineHeight: "45px",
    textAlign: "left",
    textUnderlinePosition: "from-font",
    textDecorationSkipInk: "none",
    [maxMQ.xsm]: {
      fontSize: 18,
      lineHeight: "28px",
    },
  },
  newh3: {
    fontFamily: allianceFont,
    fontSize: 35,
    fontWeight: 400,
    lineHeight: "53px",
    textAlign: "left",
    textUnderlinePosition: "from-font",
    textDecorationSkipInk: "none",
    [maxMQ.xsm]: {
      fontSize: 24,
      lineHeight: "32px",
    },
  },
  newh2: {
    fontFamily: allianceFont,
    fontSize: 55,
    fontWeight: 400,
    lineHeight: "120%",
    [maxMQ.sm]: {
      fontSize: 40,
      lineHeight: "120%",
    },
    [maxMQ.xsm]: {
      fontSize: 28,
      lineHeight: "130%",
    },
    textAlign: "left",
    textUnderlinePosition: "from-font",
    textDecorationSkipInk: "none",
  },
  paragraphBig: {
    fontFamily: allianceFont,
    fontSize: 35,
    fontWeight: 400,
    lineHeight: "53px",
    textAlign: "left",
    textUnderlinePosition: "from-font",
    textDecorationSkipInk: "none",
    [maxMQ.sm]: {
      fontSize: 28,
      lineHeight: "40px",
    },
    [maxMQ.xsm]: {
      fontSize: 20,
      lineHeight: "30px",
    },
  },
  linkNewTypography: {
    fontFamily: allianceFont,
    fontSize: 20,
    fontWeight: 400,
    lineHeight: "40px",
    textAlign: "left",
    textUnderlinePosition: "from-font",
    textDecorationSkipInk: "none",
    [maxMQ.xsm]: {
      fontSize: 16,
      lineHeight: "28px",
    },
  },
  paragraphSmall: {
    fontFamily: allianceFont,
    fontSize: 18,
    fontWeight: 400,
    lineHeight: "160%",
    textAlign: "left",
    textUnderlinePosition: "from-font",
    textDecorationSkipInk: "none",
    [maxMQ.xsm]: {
      fontSize: 16,
    },
  },
  paragraphNano: {
    fontFamily: allianceFont,
    fontSize: 15,
    fontWeight: 400,
    lineHeight: "150%",
    textAlign: "left",
    textUnderlinePosition: "from-font",
    textDecorationSkipInk: "none",
    [maxMQ.xsm]: {
      fontSize: 13,
    },
  },
  paragraphMicro: {
    fontFamily: allianceFont,
    fontSize: 12,
    fontWeight: 400,
    lineHeight: 1.4333,
    textAlign: "left",
    textUnderlinePosition: "from-font",
    textDecorationSkipInk: "none",
  },
  newh0: {
    fontFamily: allianceFont,
    fontSize: 85,
    fontWeight: 400,
    lineHeight: "100%",
    textAlign: "left",
    textUnderlinePosition: "from-font",
    textDecorationSkipInk: "none",
    [maxMQ.sm]: {
      fontSize: 60,
    },
    [maxMQ.xsm]: {
      fontSize: 40,
    },
  },
  newh1: {
    fontFamily: allianceFont,
    fontSize: 70,
    fontWeight: 400,
    lineHeight: "120%",
    textAlign: "left",
    textUnderlinePosition: "from-font",
    textDecorationSkipInk: "none",
    [maxMQ.sm]: {
      fontSize: 50,
    },
    [maxMQ.xsm]: {
      fontSize: 32,
    },
  },

  // Legacy typography (Aldrich font)
  h1: {
    fontSize: 55,
    fontWeight: 400,
    letterSpacing: "-0.05em",
    lineHeight: 1.1,
    fontFamily: "Aldrich, sans-serif",
    [mq.sm]: {
      fontSize: 80,
      lineHeight: 105 / 100,
    },
    [mq.md]: {
      fontSize: 100,
      lineHeight: 105 / 100,
    },
  },
  h2: {
    fontSize: 40,
    lineHeight: 1.2,
    fontWeight: 400,
    letterSpacing: "-0.05em",
    fontFamily: "Aldrich, sans-serif",
    [mq.sm]: {
      fontSize: 60,
      lineHeight: 65 / 60,
    },
  },
  h3: {
    fontSize: 30,
    lineHeight: 1,
    fontWeight: 400,
    letterSpacing: "-0.05em",
    fontFamily: "Aldrich, sans-serif",
    [mq.sm]: {
      fontSize: 45,
      lineHeight: 50 / 45,
    },
  },
  h4: {
    fontSize: 20,
    lineHeight: 1,
    fontWeight: 400,
    letterSpacing: "-0.05em",
    fontFamily: "Aldrich, sans-serif",
    [mq.sm]: {
      fontSize: 35,
      lineHeight: 40 / 35,
    },
  },
  h5: {
    fontSize: 25,
    fontWeight: 400,
    letterSpacing: "-0.05em",
    lineHeight: 30 / 25,
    fontFamily: "Aldrich, sans-serif",
    textTransform: "uppercase",
  },
  h6: {
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 30 / 16,
    fontFamily: "Aldrich, sans-serif",
    textTransform: "uppercase",
    [mq.sm]: {
      fontSize: 18,
      lineHeight: 30 / 18,
    },
  },
  h7: {
    fontSize: 13,
    lineHeight: 30 / 13,
    fontWeight: 400,
    fontFamily: "Aldrich, sans-serif",
    textTransform: "uppercase",
    [mq.sm]: {
      fontSize: 15,
      lineHeight: 30 / 15,
    },
  },
  body0: {
    fontSize: 12,
    lineHeight: 1.5,
    [mq.sm]: {
      fontSize: 14,
    },
  },
  body: {
    fontSize: 18,
    lineHeight: 27 / 18,
  },
  body2: {
    fontSize: 16,
    lineHeight: 24 / 16,
    [mq.sm]: {
      fontSize: 20,
      lineHeight: 33 / 22,
    },
  },
  body3: {
    fontSize: 18,
    lineHeight: 30 / 20,
    [mq.sm]: {
      fontSize: 22,
      lineHeight: 1.5,
    },
    [mq.md]: {
      fontSize: 26,
      lineHeight: 1.5,
    },
  },
  body4: {
    fontSize: 20,
    lineHeight: 1.5,
    [mq.sm]: {
      fontSize: 20,
      lineHeight: 33 / 22,
    },
  },
  label: {
    fontSize: 16,
    lineHeight: 19 / 16,
    [mq.sm]: {
      fontSize: 18,
      lineHeight: 21 / 18,
    },
  },
} as const;
