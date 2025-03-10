import { FC, HTMLAttributes } from "react";
import Button, { Props } from "../Button";
import Arrow from "../../Icons/Arrow";
import { usePalette } from "../../Pages/Deck/DeckPaletteContext";

const NavButton: FC<HTMLAttributes<HTMLElement> & Props> = ({ ...props }) => {
  const { palette } = usePalette();
  return (
    <Button
      base={true}
      noColor={true}
      css={(theme) => [
        {
          width: 45,
          borderRadius: "100%",
          textAlign: "center",
          "&:hover": [
            palette === "dark"
              ? {
                  background: theme.colors.white,
                  color: theme.colors.black,
                }
              : {
                  background: theme.colors.dark_gray,
                  color: theme.colors.white,
                },
          ],
        },
        palette === "dark" && {
          color: theme.colors.white,
        },
      ]}
      {...props}
    >
      <Arrow />
    </Button>
  );
};

export default NavButton;
