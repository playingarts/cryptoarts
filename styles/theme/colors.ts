/**
 * Core color palette
 * Organized by design system era (new vs legacy)
 */
export const colorLiterals = {
  // New design system colors
  mint: "#CFF8D8",
  darkBlack: "#212121",
  black: "#333333",
  white75: "#FFFFFFBF",
  white50: "#FFFFFF80",
  white30: "#FFFFFF4D",
  spaceBlack: "#292929",
  cryptoCardBg: "#181818",
  violet: "#E3E4F4",
  black30: "#0000004D",
  black50: "#00000080",
  accent: "#6A5ACD",
  dark_gray_hover: "#3C3C3C",
  favourite: "#E3E4F4",
  soft_gray: "#F1F1F1",
  pale_gray: "#EAEAEA",
  third_black: "#0000004C",
  pink: "#FFDFF3",
  almost_white: "#FFFFFFBF",

  // Legacy colors (kept for backward compatibility)
  orangeRed: "#FF6633",
  darkTurqoise: "#07D0E0",
  cadillac_pink: "#E289C2",
  eggshell_blue: "#C9FFF7",
  lavender_blue: "#8582F9",
  light_cyan: "#A6FCF7",
  charcoal_gray: "#404040",
  joker: "#FFB0B0",
  crypto: "#510EAC",
  white: "#FFFFFF",
  page_bg_light_gray: "#f5f5f5",
  page_bg_gray: "#e5e5e5",
  page_bg_dark: "#0A0A0A",
  dark_gray: "#333333",
  light_gray: "#DFDFDF",
  page_bg_light: "#EAEAEA",
  text_title_dark: "#0A0A0A",
  white_gray: "rgba(255, 255, 255, 0.1)",
  text_subtitle_dark: "rgba(10, 10, 10, 0.5)",
  text_title_light: "rgba(255, 255, 255, 0.9)",
  text_subtitle_light: "rgba(234, 234, 234, 0.5)",
  gradient: "linear-gradient(90deg, #58CDFF 0%, #C77BFF 100%)",
  gradient_three: "linear-gradient(90deg, #7142D6 0%, #2FBACE 100%)",
  diamonds: "#E2F4AE",
  clubs: "#CFEEE8",
  hearts: "#FFB8CB",
  spades: "#CDD0F5",
  eth: "linear-gradient(90.19deg, #8482F8 14%, #A6FBF6 86.07%)",
  orange: "#F89D35",
  green: "#05CE78",
  red: "#C4161C",
  lavender: "#8582F9",
  brightGray: "#EFEFEF",
  svggray: "#C4C4C4",
} as const;

/**
 * Deck-specific color themes
 * Each deck has its own color palette for branding
 */
export const deckColors = {
  decks: {
    zero: {
      header: "#CBDA75",
      palette: "light",
      background: "#181818",
      textColor: "rgba(255, 255, 255, 0.9)",
      nav: {
        button: {
          background: "rgba(255, 255, 255, 0.9)",
          color: "#0A0A0A",
          hoverColor: "#FFFFFF",
        },
        color: "rgba(255, 255, 255, 0.7)",
        hoverColor: "#FFFFFF",
      },
    },
    one: {
      header: "#DCACA2",
      palette: "light",
      background: "#E9E4E0",
      textColor: "#0A0A0A",
      nav: {
        button: {
          color: "rgba(255, 255, 255, 0.9)",
          background: "#0A0A0A",
          hoverColor: "#0A0A0ACC",
        },
        color: "rgba(10, 10, 10, 0.5)",
        hoverColor: "#181818",
      },
    },
    two: {
      header: "#B3A2DC",
      palette: "light",
      background: "#E7E0E9",
      textColor: "#0A0A0A",
      nav: {
        button: {
          color: "rgba(255, 255, 255, 0.9)",
          background: "#0A0A0A",
          hoverColor: "#0A0A0ACC",
        },
        color: "rgba(10, 10, 10, 0.5)",
        hoverColor: "#181818",
      },
    },
    three: {
      header: "#A2C4DC",
      palette: "light",
      background: "#E0E6E9",
      textColor: "#0A0A0A",
      nav: {
        button: {
          color: "rgba(255, 255, 255, 0.9)",
          background: "#0A0A0A",
          hoverColor: "#0A0A0ACC",
        },
        color: "rgba(10, 10, 10, 0.5)",
        hoverColor: "#181818",
      },
    },
    special: {
      header: "#181818",
      palette: "dark",
      background: "#E0E6E9",
      textColor: "#0A0A0A",
      nav: {
        button: {
          background: "rgba(255, 255, 255, 0.9)",
          color: "#0A0A0A",
          hoverColor: "#FFFFFF",
        },
        color: "rgba(10, 10, 10, 0.5)",
        hoverColor: "#181818",
      },
    },
    future: {
      header: "#A6D4B7",
      palette: "light",
      background: "#181818",
      textColor: "rgba(255, 255, 255, 0.9)",
      nav: {
        button: {
          background: "#FFFDBF",
          color: "#0A0A0A",
          hoverColor: "#FFFFFF",
        },
        color: "#FFFDBF",
        hoverColor: "#FFFFFF",
      },
    },
    crypto: {
      header: "#E289C2",
      palette: "light",
      background: "#181818",
      textColor: "rgba(255, 255, 255, 0.9)",
      nav: {
        button: {
          background: "#C9FFF7",
          color: "#0A0A0A",
          hoverColor: "#FFFFFF",
        },
        color: "#C9FFF7",
        hoverColor: "#FFFFFF",
      },
    },
  },
} as const;

// Legacy alias for backward compatibility
export const customcolors = deckColors;
