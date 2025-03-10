import { colord } from "colord";
import { FC, HTMLAttributes, useLayoutEffect, useState } from "react";
import Grid from "../../components/Grid";
import ScandiBlock from "../ScandiBlock";
import CTA from "./CTA";
import Middle from "./Middle";
import TitleButton from "./TitleButton";
import MenuPortal from "./MainMenu/MenuPortal";
import MainMenu from "./MainMenu";
import { usePalette } from "../Pages/Deck/DeckPaletteContext";

export interface Props extends HTMLAttributes<HTMLElement> {}

const Header: FC<Props> = ({ ...props }) => {
  const [showSiteNav, setShowSiteNav] = useState<"top" | "afterTop">("top");

  const [altNav, setAltNav] = useState(false);

  const [showMenu, setShowMenu] = useState(false);

  const { palette } = usePalette();

  useLayoutEffect(() => {
    let lastScrollTop = 0;

    const handler = () => {
      const scrollTop = window.scrollY;

      setAltNav(scrollTop <= lastScrollTop ? false : true);

      lastScrollTop = scrollTop;
      if (scrollTop >= 600) {
        setShowSiteNav("afterTop");
      } else {
        setShowSiteNav("top");
      }
    };

    window.addEventListener("scroll", handler);

    return () => window.removeEventListener("scroll", handler);
  }, [setShowSiteNav]);

  return (
    <header
      {...props}
      css={(theme) => [
        {
          zIndex: 9999,
          // margin: "0 auto",
          // maxWidth: 1420,
          width: "100%",
          // paddingLeft: 17,
          // paddingRight: 25,

          // header height initially
          marginTop: -70,
          transition: theme.transitions.fast("all"),
          // top: "calc(-200%)",
          position: "sticky",
          transform: "translateY(100%) translateY(15px)",
        },
      ]}
      style={
        showSiteNav === "top"
          ? {
              // top: 0,
              top: -155,
            }
          : {
              // header height later on
              top: -75,
              marginTop: -60,
            }
      }
    >
      <Grid
        css={(theme) => [
          {
            gridTemplateRows: 60,
            lineHeight: "60px",
            // borderRadius: theme.spacing(1),
            alignItems: "center",
            zIndex: 1,
            overflow: "hidden",
            color: theme.colors.dark_gray,
            background: "#FFFFFF00",
            transition: theme.transitions.fast([
              "background",
              "line-height",
              "grid-template-rows",
            ]),
          },

          {
            // transition: theme.transitions.fast(["all"]),
          },
        ]}
        style={
          showSiteNav === "top"
            ? {
                gridTemplateRows: 70,
                lineHeight: "70px",
              }
            : {
                // background: colord("#FFFFFF").alpha(0.9).toRgbString(),
                background:
                  palette === "dark"
                    ? "#292929"
                    : colord("#FFFFFF").alpha(0.9).toRgbString(),
                backdropFilter: "blur(10px)",
              }
        }
      >
        <TitleButton
          inset={showSiteNav !== "afterTop"}
          setShow={setShowMenu}
          css={(theme) => [
            { transition: theme.transitions.fast("border-color") },
          ]}
          style={
            (showSiteNav === "afterTop" && { borderColor: "transparent" }) || {}
          }
        />
        <Middle {...{ showSiteNav, altNav }} />

        <ScandiBlock
          palette={palette}
          css={(theme) => [
            {
              gridColumn: "span 3",
              justifyContent: "space-between",
              height: "100%",
              transition: theme.transitions.fast("border-color"),
            },
          ]}
          inset={showSiteNav !== "afterTop" && true}
          style={
            (showSiteNav === "afterTop" && { borderColor: "transparent" }) || {}
          }
        >
          <CTA />
        </ScandiBlock>
      </Grid>
      <MenuPortal show={showMenu}>
        <MainMenu setShow={setShowMenu} />
      </MenuPortal>
    </header>
  );
};

export default Header;
