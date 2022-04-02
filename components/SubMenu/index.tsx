import { FC, HTMLAttributes } from "react";
import Link from "next/link";
import { useDecks } from "../../hooks/deck";

interface Props extends HTMLAttributes<HTMLElement> {
  currentdeck: {
    id: number;
  };
}

const SubMenu: FC<Props> = ({ currentdeck, ...props }) => {
  const { decks = [], loading } = useDecks({
    variables: { withProduct: false },
  });

  if (loading) {
    return null;
  }

  return (
    <div
      {...props}
      css={(theme) => ({
        display: "flex",
        width: "100%",
        height: 70,
        background: theme.colors.dark_gray,
        borderRadius: "0 0 10px 10px",
        pointerEvents: "none",
      })}
    >
      <div
        css={{
          display: "flex",
          textTransform: "uppercase",
          position: "relative",
          margin: "0 auto",
          fontWeight: 600,
          fontSize: 18,
          height: 60,
          bottom: 5,
        }}
      >
        {decks &&
          decks.map((deck, index) => {
            return (
              <Link href={`/${deck.slug}`} key={deck.slug}>
                <a
                  css={(theme) => ({
                    height: "100%",
                    alignItems: "center",
                    pointerEvents: "initial",
                    display: "flex",
                    paddingRight: 25,
                    paddingLeft: 25,
                    color:
                      currentdeck.id === index
                        ? theme.colors.text_subtitle_light
                        : theme.colors.text_title_light,
                    "&:hover": {
                      cursor: "pointer",
                      color: "white",
                    },
                  })}
                >
                  {deck.slug}
                </a>
              </Link>
            );
          })}
      </div>
    </div>
  );
};
export default SubMenu;
