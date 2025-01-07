import { colord } from "colord";
import { FC, HTMLAttributes, useLayoutEffect, useState } from "react";
import Grid from "../../components/Grid";
import ScandiBlock from "../ScandiBlock";
import CTA from "./CTA";
import Middle from "./Middle";
import TitleButton from "./TitleButton";

export interface Props extends HTMLAttributes<HTMLElement> {}

const Header: FC<Props> = ({ ...props }) => {
  const [showSiteNav, setShowSiteNav] = useState<"top" | "afterTop">("top");

  const [altNav, setAltNav] = useState(false);

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
          margin: "0 auto",
          maxWidth: 1420,
          width: "100%",
          paddingLeft: 17,
          paddingRight: 25,
          marginTop: 15,
          transition: theme.transitions.fast("top"),
          top: "calc(-100%)",
          position: "sticky",
        },
      ]}
      style={
        showSiteNav === "top"
          ? {}
          : {
              top: 15,
            }
      }
    >
      <Grid
        css={(theme) => [
          {
            gridTemplateRows: 60,
            lineHeight: "60px",
            borderRadius: theme.spacing(1),
            alignItems: "center",
            zIndex: 1,
            overflow: "hidden",
            color: theme.colors.dark_gray,
          },

          {
            transition: theme.transitions.fast([
              "background",
              "height",
              "lineHeight",
            ]),
          },
        ]}
        style={
          showSiteNav === "top"
            ? {
                gridTemplateRows: 70,
                lineHeight: "70px",
              }
            : {
                top: 15,
                background: colord("#FFFFFF").alpha(0.9).toRgbString(),
                backdropFilter: "blur(10px)",
              }
        }
      >
        <TitleButton
          css={(theme) => [
            { transition: theme.transitions.fast("border-color") },
          ]}
          style={
            (showSiteNav === "afterTop" && { borderColor: "transparent" }) || {}
          }
        />
        <Middle {...{ showSiteNav, altNav }} />

        <ScandiBlock
          css={(theme) => [
            {
              gridColumn: "span 3",
              justifyContent: "space-between",
              height: "100%",
              transition: theme.transitions.fast("border-color"),
            },
          ]}
          style={
            (showSiteNav === "afterTop" && { borderColor: "transparent" }) || {}
          }
        >
          <CTA />
        </ScandiBlock>
      </Grid>
    </header>
  );
};

export default Header;
