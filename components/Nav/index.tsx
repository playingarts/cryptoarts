import { colord } from "colord";
import { Dispatch, FC, HTMLAttributes, SetStateAction } from "react";
import { useDecks } from "../../hooks/deck";
import { breakpoints } from "../../source/enums";
import Link from "../Link";
import { useSize } from "../SizeProvider";

const Nav: FC<
  HTMLAttributes<HTMLElement> & {
    setModal?: Dispatch<SetStateAction<boolean>>;
    setHover?: Dispatch<SetStateAction<number>>;
    vertical?: boolean;
  }
> = ({ setHover, setModal, vertical, ...props }) => {
  const { decks = [], loading } = useDecks({
    variables: { withProduct: false },
  });

  const { width } = useSize();

  if (loading) {
    return null;
  }

  return (
    <nav
      {...props}
      css={(theme) => [
        {
          background: colord(theme.colors.text_title_dark)
            .alpha(0.95)
            .toRgbString(),
          borderRadius: theme.spacing(1),
          borderTopRightRadius: 0,
          borderTopLeftRadius: 0,
          alignItems: "flex-end",
          display: "flex",
          justifyContent: "center",
          fontSize: theme.spacing(1.2),
          [theme.mq.sm]: {
            fontSize: theme.spacing(1.8),
          },
          boxSizing: "content-box",
          textTransform: "uppercase",
          fontWeight: 600,
          color: colord(theme.colors.white).alpha(0.7).toRgbString(),
        },
        vertical && {
          alignItems: "center",
        },
      ]}
    >
      {width < breakpoints.sm && setModal && (
        <button
          css={(theme) => [
            {
              padding: 0,
              fontWeight: "inherit",
              textTransform: "uppercase",
              background: "none",
              color: "inherit",
              fontSize: "inherit",
              border: "none",
              marginTop: theme.spacing(1),
              lineHeight: "40px",
              width: "100%",
            },
          ]}
          onClick={() => setModal(true)}
        >
          browse collection
        </button>
      )}
      {width >= breakpoints.sm && (
        <div>
          {decks.map(({ slug, short, openseaCollection }, index) => (
            <Link
              key={slug}
              href={`/${slug}`}
              {...(setHover && { onMouseEnter: () => setHover(index) })}
              {...(setModal && { onClick: () => setModal(false) })}
              activeCss={
                !openseaCollection
                  ? (theme) => ({
                      color: theme.colors.white,
                    })
                  : {}
              }
              css={(theme) => [
                vertical && { display: "block" },
                {
                  paddingLeft: theme.spacing(2.5),
                  paddingRight: theme.spacing(2.5),
                  textDecoration: "none",
                  lineHeight: "60px",
                  "@keyframes gradient": {
                    "0%": {
                      backgroundPosition: "0% 50%",
                    },
                    "50%": {
                      backgroundPosition: "100% 50%",
                    },
                    "100%": {
                      backgroundPosition: "0% 50%",
                    },
                  },
                },
                openseaCollection
                  ? [
                      {
                        color: "transparent",
                        background: theme.colors.eth,
                        backgroundClip: "text",
                        backgroundSize: "400% 100%",
                        animation: "gradient 5s ease infinite",
                      },
                    ]
                  : {
                      transition: theme.transitions.fast("color"),
                      "&:hover": {
                        color: theme.colors.white,
                      },
                    },
              ]}
            >
              {short}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Nav;
