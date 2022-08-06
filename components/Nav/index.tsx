import { colord } from "colord";
import { Dispatch, FC, HTMLAttributes, SetStateAction } from "react";
import { useDecks } from "../../hooks/deck";
import { breakpoints } from "../../source/enums";
import Link from "../Link";
import { useSize } from "../SizeProvider";

const Nav: FC<
  HTMLAttributes<HTMLElement> & {
    setModal?: Dispatch<SetStateAction<boolean>>;
  }
> = ({ setModal, ...props }) => {
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
      css={(theme) => ({
        background: colord(theme.colors.text_title_dark)
          .alpha(0.95)
          .toRgbString(),
        borderRadius: theme.spacing(1),
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
        height: theme.spacing(5),
        alignItems: "flex-end",
        display: "flex",
        justifyContent: "center",
        fontSize: theme.spacing(1.2),
        [theme.mq.sm]: {
          height: theme.spacing(6),
          fontSize: theme.spacing(1.8),
        },
        boxSizing: "content-box",
        textTransform: "uppercase",
        fontWeight: 600,
        color: theme.colors.white,
      })}
    >
      {width < breakpoints.sm && setModal && (
        <button
          css={{
            padding: 0,
            fontWeight: "inherit",
            textTransform: "uppercase",
            background: "none",
            color: "inherit",
            fontSize: "inherit",
            border: "none",
            opacity: 0.7,
            lineHeight: "40px",
          }}
          onClick={() => setModal(true)}
        >
          browse collection
        </button>
      )}
      {width >= breakpoints.sm && (
        <div>
          {decks.map(({ slug, short }) => (
            <Link
              key={slug}
              href={`/${slug}`}
              // activeCss={(theme) => ({
              //   color: theme.colors.text_subtitle_light,
              // })}
              css={(theme) => [
                {
                  paddingLeft: theme.spacing(2.5),
                  paddingRight: theme.spacing(2.5),
                  textDecoration: "none",
                  lineHeight: "60px",
                  opacity: 0.7,
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
                slug === "crypto" && [
                  {
                    color: "transparent",
                    background: theme.colors.eth,
                    backgroundClip: "text",
                    backgroundSize: "400% 100%",
                    animation: "gradient 5s ease infinite",
                  },
                ],
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
