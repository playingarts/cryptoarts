import { useState } from "react";
import MenuIcon from "../../Icons/Menu";
import { usePalette } from "../../Pages/Deck/DeckPaletteContext";

const MenuButton = () => {
  const [hover, setHover] = useState(false);
  const { palette } = usePalette();

  return (
    <button
      css={{
        background: "none",
        position: "relative",
        padding: 0,
        alignItems: "center",
        border: "none",
        lineHeight: "42px",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        css={[
          {
            position: "relative",
          },
        ]}
      >
        <div
          css={(theme) => [
            {
              borderRadius: "100%",
              animation: "grow 2s 1",
              background:
                palette === "dark"
                  ? theme.colors.white75
                  : theme.colors.dark_gray,
              inset: 0,
              position: "absolute",
              transition: theme.transitions.fast(["scale"]),
              // "@keyframes grow": {
              //   "0%": {
              //     transform: "scale( 0 )",
              //   },
              //   "100%": {
              //     transform: "scale( 1 )",
              //   },
              // },
            },
          ]}
          style={{ scale: hover ? 1 : 0 }}
        />
        <MenuIcon
          css={(theme) => [
            {
              transition: theme.transitions.fast(["color"]),
              position: "relative",
              verticalAlign: "middle",
              color: palette === "dark"
                ? (hover ? theme.colors.dark_gray : theme.colors.white75)
                : (hover ? theme.colors.white : theme.colors.dark_gray),
            },
          ]}
        />

        {/* <div
          css={(theme) => [
            {
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background: theme.colors.dark_gray,
              borderRadius: "100%",
              animationTimingFunction: "easeOut",
              animationDuration: "250ms",
              transitionProperty: "all",
              "&:hover": {
                width: "100%",
                height: "100%",
              },
            },
          ]}
        /> */}
      </div>
    </button>
  );
};

export default MenuButton;
