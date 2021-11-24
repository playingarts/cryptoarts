import { FC, HTMLAttributes } from "react";
import Link from "next/link";

interface Props extends HTMLAttributes<HTMLElement> {
  currentdeck: {
    id: number;
  };
  decks?: {
    deck: string;
    id: number;
  }[];
}

const SubMenu: FC<Props> = ({ decks, currentdeck, ...props }) => {
  return (
    <div
      {...props}
      css={(theme) => ({
        display: "flex",
        transition: theme.transitions.fast,
        width: "100%",
        height: 70,
        background: theme.colors.darkGray,
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
          decks.map((item, index) => {
            return (
              <Link href={`/${item.deck}`} key={item.deck}>
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
                        ? theme.colors.dimWhite
                        : theme.colors.whiteish,
                    "&:hover": {
                      cursor: "pointer",
                      color: "white",
                    },
                  })}
                >
                  {item.deck}
                </a>
              </Link>
            );
          })}
      </div>
    </div>
  );
};
export default SubMenu;
