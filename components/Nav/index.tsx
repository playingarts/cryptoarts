import { FC, HTMLAttributes } from "react";
import { useDecks } from "../../hooks/deck";
import Link from "../Link";
import { colord } from "colord";

const Nav: FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => {
  const { decks = [], loading } = useDecks({
    variables: { withProduct: false },
  });

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
        height: theme.spacing(6),
        display: "flex",
        justifyContent: "center",
        fontSize: 18,
        alignItems: "center",
        boxSizing: "content-box",
      })}
    >
      {decks.map(({ slug, short }) => (
        <Link
          key={slug}
          href={`/${slug}`}
          activeCss={(theme) => ({
            color: theme.colors.text_subtitle_light,
          })}
          css={(theme) => ({
            paddingLeft: theme.spacing(2.5),
            paddingRight: theme.spacing(2.5),
            color: theme.colors.white,
            textDecoration: "none",
            lineHeight: "60px",
            textTransform: "uppercase",
            fontWeight: 600,
            opacity: 0.7,
          })}
        >
          {short}
        </Link>
      ))}
    </nav>
  );
};

export default Nav;
