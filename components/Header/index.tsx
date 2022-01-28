import { FC, HTMLAttributes, useEffect, useState } from "react";
import throttle from "just-throttle";
import LogoIcon from "../Icons/Logo";
import MenuIcon from "../Icons/Menu";
import Nav from "../Nav";
import Text from "../Text";
import Button from "../Button";
import Bag from "../Icons/Bag";
import Bell from "../Icons/Bell";
import Link from "../Link";

export interface Props extends HTMLAttributes<HTMLElement> {
  palette?: "dark";
  customShopButton?: JSX.Element;
  altNav?: JSX.Element;
  showAltNav?: boolean;
}

const Header: FC<Props> = ({
  palette,
  customShopButton,
  altNav,
  showAltNav,
  ...props
}) => {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    let lastScrollTop = 0;

    const handler = throttle(() => {
      const documentHeight = Math.max(
        document.body.scrollHeight
        // document.body.offsetHeight,
        // document.documentElement.clientHeight,
        // document.documentElement.scrollHeight,
        // document.documentElement.offsetHeight
      );

      const scrollTop = Math.min(
        documentHeight - window.innerHeight,
        Math.max(
          0,
          window.pageYOffset
          //  document.documentElement.scrollTop
        )
      );

      setExpanded(!(scrollTop <= 0 ? true : scrollTop >= lastScrollTop));

      lastScrollTop = scrollTop;
    }, 100);

    window.addEventListener("scroll", handler);

    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header {...props}>
      <div
        css={(theme) => [
          {
            borderRadius: theme.spacing(1),
            display: "flex",
            alignItems: "center",
            position: "relative",
            zIndex: 1,
            overflow: "hidden",
          },
          palette === "dark"
            ? {
                background: theme.colors.dark_gray,
                color: theme.colors.text_subtitle_light,
              }
            : {
                background: theme.colors.gradient,
              },
        ]}
      >
        <button
          css={(theme) => ({
            background: "none",
            border: 0,
            width: theme.spacing(7),
            height: theme.spacing(7),
            padding: 0,
            color:
              palette === "dark"
                ? theme.colors.text_subtitle_light
                : theme.colors.dark_gray,
          })}
        >
          <MenuIcon />
        </button>

        <Text
          variant="h5"
          component="div"
          css={{
            marginTop: "0.3em",
            flexGrow: 1,
          }}
        >
          playing arts
        </Text>

        <div
          css={(theme) => ({
            transition: theme.transitions.normal("top"),
            textAlign: "center",
            position: "absolute",
            left: "50%",
            top: (showAltNav ? "-" : "") + "50%",
            transform: "translate(-50%, -50%)",
          })}
        >
          <Link href="/" css={{ color: "inherit" }}>
            <LogoIcon
              gradient={palette === "dark"}
              css={(theme) => [
                palette === "dark" && {
                  color: theme.colors.text_subtitle_light,
                },
              ]}
            />
          </Link>
        </div>

        {altNav && (
          <div
            css={(theme) => ({
              transition: theme.transitions.normal("top"),
              textAlign: "center",
              position: "absolute",
              left: "50%",
              top: (showAltNav ? "" : "1") + "50%",
              transform: "translate(-50%, -50%)",
            })}
          >
            {altNav}
          </div>
        )}

        <Button
          Icon={Bell}
          css={(theme) => ({
            color:
              palette === "dark"
                ? theme.colors.text_subtitle_light
                : theme.colors.dark_gray,
            marginRight: theme.spacing(2),
          })}
        />

        <div css={(theme) => ({ marginRight: theme.spacing(2) })}>
          {customShopButton ? (
            customShopButton
          ) : (
            <Button component={Link} href="/shop" Icon={Bag}>
              Shop
            </Button>
          )}
        </div>
      </div>

      <Nav
        css={(theme) => [
          {
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            paddingTop: 0,
            transition: theme.transitions.fast("padding-top"),
          },
          expanded && { paddingTop: theme.spacing(7) },
        ]}
      />
    </header>
  );
};

export default Header;
