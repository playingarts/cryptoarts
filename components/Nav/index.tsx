import { FC, HTMLAttributes } from "react";
import { useDecks } from "../../hooks/deck";
import Link from "../Link";

const Nav: FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => {
  const { decks = [], loading } = useDecks();

  if (loading) {
    return null;
  }

  return (
    <nav
      {...props}
      css={(theme) => ({
        background: "rgba(24, 24, 24, 0.5)",
        borderRadius: theme.spacing(1),
        height: theme.spacing(6),
        display: "flex",
        justifyContent: "center",
        fontSize: 18,
        alignItems: "center",
        boxSizing: "content-box",
      })}
    >
      {decks.map(({ slug }) => (
        <Link
          key={slug}
          href={`/decks/${slug}`}
          activeCss={(theme) => ({
            color: theme.colors.text_subtitle_light,
          })}
          css={(theme) => ({
            paddingLeft: theme.spacing(2.5),
            paddingRight: theme.spacing(2.5),
            color: theme.colors.text_title_light,
            textDecoration: "none",
            lineHeight: "60px",
            textTransform: "uppercase",
            fontWeight: 600,
          })}
        >
          {slug}
        </Link>
      ))}
    </nav>
  );
};

export default Nav;
