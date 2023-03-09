import throttle from "just-throttle";
import React, {
  FC,
  Fragment,
  HTMLAttributes,
  useLayoutEffect,
  useState,
} from "react";
import { useDeck } from "../../hooks/deck";
import { colord } from "colord";
import { breakpoints } from "../../source/enums";
import Button from "../Button";
import Bag from "../Icons/Bag";
import LogoIcon from "../Icons/Logo";
import MenuIcon from "../Icons/Menu";
import MenuCross from "../Icons/MenuCross";
import Link from "../Link";
import MetamaskButton from "../MetamaskButton";
import Nav from "../Nav";
import { useSize } from "../SizeProvider";
import Text from "../Text";
import ModalMenu from "../_composed/ModalMenu";

if (typeof document === "undefined") {
  React.useLayoutEffect = React.useEffect;
}

export interface Props extends HTMLAttributes<HTMLElement> {
  palette?: "light" | "dark";
  customShopButton?: JSX.Element;
  altNav?: JSX.Element;
  showAltNav?: boolean;
  noNav?: boolean;
  deckId?: string;
  isCardPage?: number;
}

const Header: FC<Props> = ({
  palette = "dark",
  customShopButton,
  altNav,
  showAltNav,
  noNav,
  deckId,
  isCardPage,
  ...props
}) => {
  const { deck } = useDeck({ variables: { slug: deckId } });

  const [expanded, setExpanded] = useState(isCardPage ? false : true);
  const [hovered, setHovered] = useState(false);
  const mouseEnter = () => setHovered(true);
  const mouseLeave = () => setHovered(false);

  useLayoutEffect(() => {
    if (!isCardPage) {
      setExpanded(true);
    } else if (isCardPage) {
      setExpanded(false);
    }
  }, [isCardPage]);

  useLayoutEffect(() => {
    if (noNav || hovered) {
      return setExpanded(false);
    }

    // if (!isCardPage) {
    // setExpanded(true);
    // } else if (isCardPage) {
    // setExpanded(false);
    // }

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

  useLayoutEffect(() => {
    if (!showAltNav) {
      return setExpanded(true);
    }
  }, [showAltNav]);

  const { width } = useSize();

  const [modalState, setModalState] = useState(false);

  useLayoutEffect(() => {
    if (!modalState) {
      return;
    }

    // All entries expanded is true
    setExpanded(!modalState);
    document.body.style.overflow = "hidden";

    return () => {
      setExpanded(modalState);
      document.body.style.overflow = "";
    };
  }, [modalState]);

  return (
    <Fragment>
      {modalState && (
        <div
          css={(theme) => [
            {
              animation: "gradient 5s ease infinite",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              position: "fixed",
              background: theme.colors.text_subtitle_dark,
              backdropFilter: "blur(5px)",
              zIndex: 99998,
            },
          ]}
          onClick={() => setModalState(false)}
        >
          <ModalMenu
            onClick={(e) => {
              e.stopPropagation();
            }}
            onItemClick={() => setModalState(false)}
            css={(theme) => [
              {
                background: colord(theme.colors.black).alpha(0.9).toRgbString(),
                borderRadius: `0 0 ${theme.spacing(5)}px ${theme.spacing(5)}px`,
                minHeight: `calc(100vh - ${theme.spacing(6)}px)`,

                [theme.maxMQ.sm]: {
                  "&::-webkit-scrollbar": {
                    display: "none",
                  },
                  MsOverflowStyle: "none",
                  scrollbarWidth: "none",
                  maxHeight: theme.spacing(65),
                  paddingTop: theme.spacing(6),
                  borderRadius: `0 0 ${theme.spacing(3)}px ${theme.spacing(
                    3
                  )}px`,
                },
              },
            ]}
          />
        </div>
      )}

      <header {...props} css={{}}>
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
              justifyContent: "space-between",
              color:
                palette === "dark"
                  ? theme.colors.text_subtitle_light
                  : showAltNav
                  ? theme.colors.text_subtitle_light
                  : theme.colors.dark_gray,
            },

            // palette === "gradient"
            //   ? {
            //       background: theme.colors.gradient,
            //     }
            //   : {
            //       background: theme.colors.dark_gray,
            //       color: theme.colors.text_subtitle_light,
            //     },
            {
              transition: theme.transitions.fast("background"),
              background:
                (!isCardPage &&
                  !showAltNav &&
                  deck &&
                  theme.colors.decks[
                    deck.slug as keyof typeof theme.colors.decks
                  ].header) ||
                theme.colors.dark_gray,
            },
          ]}
        >
          <button
            css={(theme) => ({
              background: "none",
              border: 0,
              width: theme.spacing(7),
              height: theme.spacing(7),
              [theme.maxMQ.sm]: {
                width: theme.spacing(6),
                height: theme.spacing(6),
              },

              marginRight: theme.spacing(2.5),
              padding: 0,
              color:
                palette === "dark"
                  ? theme.colors.text_subtitle_light
                  : showAltNav
                  ? theme.colors.text_subtitle_light
                  : theme.colors.dark_gray,
            })}
            onClick={() => setModalState(!modalState)}
          >
            {modalState ? (
              <MenuCross
                css={(theme) => ({
                  [theme.mq.sm]: {
                    "&:hover": {
                      opacity: 0.8,
                      transform: "rotate(90deg)",
                    },
                    transition: theme.transitions.fast([
                      "opacity",
                      "transform",
                    ]),
                  },
                })}
              />
            ) : (
              <MenuIcon animateOnHover={true} />
            )}
          </button>

          {width >= breakpoints.sm && (
            <div
              css={[
                {
                  flexGrow: 1,
                  position: "relative",
                  marginTop: "0.3em",
                },
              ]}
            >
              {(deck ? width >= breakpoints.md : true) && (
                <Text
                  variant="h5"
                  component={Link}
                  href="/"
                  css={(theme) => [
                    {
                      position: "absolute",
                      transition: theme.transitions.normal("all"),
                      transform: "translateY(-50%)",
                      fontWeight: 400,
                      [theme.mq.md]: {
                        transform: `translateY(${
                          deck &&
                          (((isCardPage || showAltNav) && "-250%") || "-50%")
                        })`,
                      },
                      [theme.mq.sm]: {
                        "&:hover": {
                          opacity: 0.5,
                        },
                      },
                    },
                  ]}
                >
                  Playing Arts
                </Text>
              )}

              {deck && (
                <Fragment>
                  <Text
                    variant="h5"
                    component={Link}
                    href={`/${deckId}`}
                    css={(theme) => ({
                      position: "absolute",
                      transform: "translateY(0)",
                      transition: theme.transitions.fast("all"),
                      fontWeight: 400,
                      [theme.maxMQ.md]: {
                        transform: `translateY(${
                          (!expanded && showAltNav && "-250%") || "-50%"
                        })`,
                      },
                      [theme.mq.md]: {
                        transform: `translateY(${
                          ((isCardPage || showAltNav) && "-50%") || "200%"
                        })`,
                      },
                      [theme.mq.sm]: {
                        "&:hover": {
                          color: theme.colors.white,
                        },
                      },
                    })}
                  >
                    {deck.title}
                  </Text>
                  {altNav && width < breakpoints.md && (
                    <div
                      css={(theme) => ({
                        position: "absolute",
                        transition: theme.transitions.normal("transform"),
                        textAlign: "center",
                        width: "max-content",
                        marginTop: "-0.25em",
                      })}
                      style={{
                        transform: `translateY(${
                          (!expanded && showAltNav && "-50%") || "200%"
                        })`,
                      }}
                      onClick={mouseEnter}
                    >
                      {altNav}
                    </div>
                  )}
                </Fragment>
              )}
            </div>
          )}
          <div
            css={(theme) => ({
              transition: theme.transitions.normal("top"),
              textAlign: "center",
              position: "absolute",
              left: "50%",
              top: "50%",
              [theme.mq.sm]: {
                top: (showAltNav && !expanded && "-50%") || "50%",
              },
              transform: "translate(-50%, -50%)",
            })}
          >
            <Link href="/">
              <LogoIcon
                css={(theme) => [
                  {
                    [theme.mq.sm]: {
                      "&:hover": {
                        opacity: 0.5,
                      },
                      transition: theme.transitions.fast("opacity"),
                    },
                    [theme.maxMQ.sm]: {
                      height: theme.spacing(2),
                    },
                  },
                  palette === "dark"
                    ? {
                        color: theme.colors.text_subtitle_light,
                      }
                    : showAltNav && {
                        color: theme.colors.text_subtitle_light,
                      },
                ]}
              />
            </Link>
          </div>

          {altNav && width >= breakpoints.md && (
            <div
              css={(theme) => ({
                transition: theme.transitions.normal("top"),
                textAlign: "center",
                position: "absolute",
                left: "50%",
                width: "max-content",
                top: (showAltNav && !expanded && "50%") || "150%",
                transform: "translate(-50%, -50%)",
              })}
              onClick={mouseEnter}
            >
              {altNav}
            </div>
          )}

          <div css={{ display: "flex" }}>
            {width >= breakpoints.sm && (
              <MetamaskButton
                noLabel={true}
                backgroundColor={
                  palette !== "dark"
                    ? showAltNav
                      ? "white"
                      : "black"
                    : "white"
                }
                textColor={
                  palette !== "dark"
                    ? showAltNav
                      ? "black"
                      : "white"
                    : "black"
                }
                css={(theme) => ({
                  marginRight: theme.spacing(2),
                })}
              />
            )}

            <div
              css={(theme) => ({
                marginRight: theme.spacing(1),
              })}
            >
              {customShopButton ? (
                customShopButton
              ) : (
                <Button
                  component={Link}
                  href="/shop"
                  Icon={Bag}
                  color={
                    palette === "light"
                      ? showAltNav
                        ? undefined
                        : "black"
                      : undefined
                  }
                  css={(theme) => ({
                    transition: theme.transitions.fast("all"),
                    [theme.maxMQ.sm]: [
                      palette === "dark" && {
                        color: theme.colors.text_title_dark,
                        background: theme.colors.page_bg_light,
                      },
                    ],
                  })}
                >
                  {width >= breakpoints.sm && "Shop"}
                </Button>
              )}
            </div>
          </div>
        </div>

        {!noNav && (
          <Nav
            setModal={setModalState}
            css={(theme) => [
              {
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                transition: theme.transitions.fast("transform"),
                transform: `translate3d(0, 8px, 0)`,
              },
              expanded && {
                paddingTop: theme.spacing(1),
                transform: `translate3d(0, ${theme.spacing(4)}px, 0)`,
                [theme.mq.sm]: {
                  transform: `translate3d(0, ${theme.spacing(6)}px, 0)`,
                },
              },
            ]}
          />
        )}
      </header>
    </Fragment>
  );
};

export default Header;
