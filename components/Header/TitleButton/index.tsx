import Menu from "../../Icons/Menu";
import Button from "../../Buttons/Button";
import { FC, HTMLAttributes } from "react";
import ScandiBlock, { Props } from "../../ScandiBlock";
import { useRouter } from "next/router";
import { useDeck } from "../../../hooks/deck";
import { colord } from "colord";
import { usePalette } from "../../Pages/Deck/DeckPaletteContext";
import { useSize } from "../../SizeProvider";
import { breakpoints } from "../../../source/enums";
import { useMenu } from "../../Contexts/menu";

const TitleButton: FC<
  HTMLAttributes<HTMLElement> & { showSiteNav?: "top" | "afterTop" } & Props
> = ({ showSiteNav = "top", ...props }) => {
  const { openMenu } = useMenu();
  const {
    query: { deckId },
  } = useRouter();

  const { palette } = usePalette();

  const { deck } = useDeck({ variables: { slug: deckId }, skip: !deckId });

  const { width } = useSize();

  return (
    <ScandiBlock
      css={(theme) => [
        {
          [theme.mq.sm]: {
            gridColumn: "span 3",
          },
          height: "100%",
          position: "relative",
          padding: 0,
        },
      ]}
      inset={true}
      palette={palette}
      {...props}
    >
      <Button
        base={true}
        icon={width < breakpoints.sm}
        css={(theme) => [
          {
            [theme.mq.sm]: {
              paddingLeft: 10,
              paddingRight: 15,
            },
            color:
              theme.colors[palette === "dark" ? "white75" : "dark_gray"] +
              " !important",
            transition: theme.transitions.fast("background"),
            "&:hover": {
              background:
                palette === "dark"
                  ? theme.colors.black
                  : colord(theme.colors.white).alpha(0.5).toRgbString(),
            },
          },
        ]}
        onClick={openMenu}
      >
        <Menu css={(theme) => [{ [theme.mq.sm]: { marginRight: 10 } }]} />

        {width >= breakpoints.sm && (
          <span
            css={(theme) => ({
              whiteSpace: "nowrap",
              transition: theme.transitions.fast("opacity"),
            })}
          >
            {deckId && deck && showSiteNav === "afterTop" ? deck.title : "Playing Arts"}
          </span>
        )}
      </Button>
      {/* <PageNav
        css={[
          {
            position: "absolute",
            left: 0,
            bottom: "-54px",
            zIndex: 1,
            height: 45,
          },
        ]}
      /> */}
    </ScandiBlock>
  );
};

export default TitleButton;
