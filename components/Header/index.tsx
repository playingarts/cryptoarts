import { FC, HTMLAttributes, useEffect, useState } from "react";
import throttle from "just-throttle";
import LogoIcon from "../Icons/Logo";
import MenuIcon from "../Icons/Menu";
import Nav from "../Nav";
import Text from "../Text";
import Button from "../Button";
import Bag from "../Icons/Bag";
import Link from "../Link";
import { useDeck } from "../../hooks/deck";
import MetamaskButton from "../MetamaskButton";

export interface Props extends HTMLAttributes<HTMLElement> {
  palette?: "gradient";
  customShopButton?: JSX.Element;
  altNav?: JSX.Element;
  showAltNav?: boolean;
  noNav?: boolean;
  deckId?: string;
  isCardPage?: boolean;
}

const Header: FC<Props> = ({
  palette,
  customShopButton,
  altNav,
  showAltNav,
  noNav,
  deckId,
  isCardPage,
  ...props
}) => {
  const { deck } = useDeck({ variables: { slug: deckId } });

  const [expanded, setExpanded] = useState(true);
  const [hovered, setHovered] = useState(false);
  const mouseEnter = () => setHovered(true);
  const mouseLeave = () => setHovered(false);

  useEffect(() => {
    if (noNav || hovered) {
      return setExpanded(false);
    }

    if (!isCardPage) {
      setExpanded(true);
    } else if (isCardPage) {
      setExpanded(false);
    }

    let lastScrollTop = 0;

    const handler = throttle(() => {
      const scrollTop = window.pageYOffset;

      setExpanded(
        scrollTop < 15 ? (isCardPage ? false : true) : scrollTop < lastScrollTop
      );

      lastScrollTop = scrollTop;
    }, 10);

    window.addEventListener("scroll", handler);

    return () => window.removeEventListener("scroll", handler);
  }, [hovered, noNav, isCardPage]);

  return (
    <header {...props}>
      <div
        onMouseLeave={mouseLeave}
        css={(theme) => [
          {
            borderRadius: theme.spacing(1),
            display: "flex",
            alignItems: "center",
            position: "relative",
            zIndex: 1,
            overflow: "hidden",
          },
          palette === "gradient"
            ? {
                background: theme.colors.gradient,
              }
            : {
                background: theme.colors.dark_gray,
                color: theme.colors.text_subtitle_light,
              },
        ]}
      >
        <button
          css={(theme) => ({
            background: "none",
            border: 0,
            width: theme.spacing(7),
            height: theme.spacing(7),
            marginRight: theme.spacing(2.5),
            padding: 0,
            color:
              palette !== "gradient"
                ? theme.colors.text_subtitle_light
                : theme.colors.dark_gray,
          })}
        >
          <MenuIcon />
        </button>

        <div
          css={{
            flexGrow: 1,
            position: "relative",
            marginTop: "0.5em",
          }}
        >
          <Text
            variant="h5"
            component={Link}
            href="/"
            css={(theme) => ({
              position: "absolute",
              transform: "translateY(-50%)",
              transition: theme.transitions.normal("transform"),
            })}
            style={{
              transform: `translateY(${
                deck && (((isCardPage || showAltNav) && "-250%") || "-50%")
              })`,
            }}
          >
            Playing Arts
          </Text>

          {deck && (
            <Text
              variant="h5"
              component={Link}
              href={`/${deckId}`}
              css={(theme) => ({
                position: "absolute",
                transform: "translateY(0)",
                transition: theme.transitions.normal("transform"),
              })}
              style={{
                transform: `translateY(${
                  ((isCardPage || showAltNav) && "-50%") || "200%"
                })`,
              }}
            >
              {deck.title}
            </Text>
          )}
        </div>

        <div
          css={(theme) => ({
            transition: theme.transitions.normal("top"),
            textAlign: "center",
            position: "absolute",
            left: "50%",
            top: (showAltNav && !expanded && "-50%") || "50%",
            transform: "translate(-50%, -50%)",
          })}
        >
          <Link href="/">
            <LogoIcon
              css={(theme) => [
                palette !== "gradient" && {
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
              top: (showAltNav && !expanded && "50%") || "150%",
              transform: "translate(-50%, -50%)",
            })}
            onClick={mouseEnter}
          >
            {altNav}
          </div>
        )}

        <MetamaskButton
          noLabel={true}
          backgroundColor={palette === "gradient" ? "dark_gray" : "white"}
          textColor={palette === "gradient" ? "white" : "dark_gray"}
          css={(theme) => ({
            marginRight: theme.spacing(2),
          })}
        />

        <div css={(theme) => ({ marginRight: theme.spacing(2) })}>
          {customShopButton ? (
            customShopButton
          ) : (
            <Button
              component={Link}
              href="/shop"
              Icon={Bag}
              color={palette === "gradient" ? "black" : undefined}
            >
              Shop
            </Button>
          )}
        </div>
      </div>

      {!noNav && (
        <Nav
          css={(theme) => [
            {
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              transition: theme.transitions.fast("transform"),
              transform: `translate3d(0, 10px, 0)`,
            },
            expanded && {
              paddingTop: theme.spacing(1),
              transform: `translate3d(0, ${theme.spacing(6)}px, 0)`,
            },
          ]}
        />
      )}
    </header>
  );
};

export default Header;
