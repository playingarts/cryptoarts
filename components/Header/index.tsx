import { FC, HTMLAttributes, useEffect, useState } from "react";
import throttle from "just-throttle";
import LogoIcon from "../Icons/Logo";
import MenuIcon from "../Icons/Menu";
import Nav from "../Nav";
import Title from "../Title";
import Button from "../Button";
import Bag from "../Icons/Bag";
import Bell from "../Icons/Bell";
import Link from "../Link";

interface Props extends HTMLAttributes<HTMLElement> {
  palette?: "dark";
}

const Header: FC<Props> = ({ palette, ...props }) => {
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
          },
          palette === "dark"
            ? {
                background: theme.colors.darkGray,
                color: theme.colors.gray,
              }
            : {
                background: theme.colors.eth,
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
              palette === "dark" ? theme.colors.gray : theme.colors.darkGray,
          })}
        >
          <MenuIcon />
        </button>

        <Title
          css={{
            fontSize: 20,
            textTransform: "uppercase",
            marginTop: "0.3em",
            flexGrow: 1,
          }}
        >
          playing arts
        </Title>

        <div
          css={{
            textAlign: "center",
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <LogoIcon
            gradient={palette === "dark"}
            css={(theme) => [
              palette === "dark" && { color: theme.colors.gray },
            ]}
          />
        </div>

        <Bell
          css={(theme) => [
            {
              marginRight: theme.spacing(3),
              color:
                palette === "dark" ? theme.colors.gray : theme.colors.darkGray,
            },
          ]}
        />

        <Button
          component={Link}
          href="/shop"
          text="Shop"
          Icon={Bag}
          css={(theme) => ({ marginRight: theme.spacing(2) })}
        />
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
