import { FC, HTMLAttributes } from "react";
import { typographyLiterals } from "../../pages/_app";
import { usePalette } from "../Pages/Deck/DeckPaletteContext";

const Text: FC<
  HTMLAttributes<HTMLElement> & {
    typography?: keyof typeof typographyLiterals;
    loading?: boolean;
  }
> = ({ children, typography = "newParagraph", loading = false, ...props }) => {
  const { palette } = usePalette();
  return (
    <div
      css={(theme) => [
        theme.typography[typography],
        {
          color: theme.colors[palette === "dark" ? "white75" : "dark_gray"],
        },
        loading && {
          "@keyframes loadingPlaceholder": {
            "0%": {
              background: theme.colors.pale_gray,
            },
            "50%": {
              background: theme.colors.soft_gray,
            },
            "100%": {
              background: theme.colors.pale_gray,
            },
            animation: "loadingPlaceholder 500ms infinite linear",
          },
        },
      ]}
      {...props}
    >
      {children}
    </div>
  );
};

export default Text;
