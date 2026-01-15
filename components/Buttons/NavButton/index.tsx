import { FC, HTMLAttributes } from "react";
import Button, { Props } from "../Button";
import Arrow from "../../Icons/Arrow";
import { Props as PaletteProps } from "../../Pages/Deck/DeckPaletteContext";
import { usePaletteHook } from "../../../hooks/usePaletteHook";

const NavButton: FC<
  HTMLAttributes<HTMLElement> & Props & { palette?: PaletteProps["palette"] }
> = ({ palette: paletteProp, ...props }) => {
  const { palette } = usePaletteHook(paletteProp);
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
        palette === "dark"
          ? { color: theme.colors.white }
          : { color: theme.colors.black50 },
      ]}
      {...props}
    >
      <Arrow />
    </Button>
  );
};

export default NavButton;
