import { FC, HTMLAttributes } from "react";
import Text, { Props as TextProps } from "../../Text";
import { colorLiterals } from "../../../pages/_app";
import { Props as Paletteprops } from "../../Pages/Deck/DeckPaletteContext";

export interface Props {
  color?: keyof typeof colorLiterals;
  bordered?: boolean;
  size?: "small" | "big";
  base?: boolean;
  noColor?: boolean;
  icon?: boolean;
  palette?: Paletteprops["palette"];
}

const Button: FC<HTMLAttributes<HTMLElement> & Props & TextProps> = ({
  children,
  color = "dark_gray",
  bordered = false,
  size = "big",
  base = false,
  noColor = false,
  icon = false,
  palette,
  ...props
}) => {
  return (
    <Text
      css={(theme) => [
        {
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          userSelect: "none",
          borderRadius: size === "big" ? 7 : 5,
          boxSizing: "border-box",
          fontWeight: 400,
          // textAlign: "center",
          textUnderlinePosition: "from-font",
          textDecorationSkipInk: "none",

          // transition: theme.transitions.fast([
          //   "color",
          //   "background-color",
          //   "opacity",
          // ]),

          "&:hover": [
            {
              cursor: "pointer",
            },
            !base && {
              opacity: 0.9,
            },
            noColor === false && {
              color: palette === "dark" ? "black" : "white",
            },
          ],
        },
        size === "big"
          ? [
              {
                fontSize: 25,
                height: 45,
              },
              base === false && {
                paddingLeft: 15,
                paddingRight: 15,
              },
            ]
          : size === "small"
          ? [
              {
                fontSize: 20,
                height: 40,
              },
              base === false && {
                paddingLeft: 12,
                paddingRight: 12,
              },
            ]
          : {},
        base === false &&
          (noColor === false
            ? [
                bordered === true
                  ? {
                      color: theme.colors[color],
                      boxShadow: `0px 0px 0px 1.5px ${theme.colors[color]} inset`,
                      "&:hover": [
                        palette === "dark" && {
                          color: theme.colors.black,
                        },
                        {
                          backgroundColor: theme.colors[color],
                        },
                      ],
                    }
                  : {
                      color: palette === "dark" ? "black" : "white",
                      backgroundColor: theme.colors[color],
                    },
              ]
            : [{ color: theme.colors["dark_gray"] }]),
        icon && {
          width: 45,
          height: 45,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 0,
        },
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

export default Button;
