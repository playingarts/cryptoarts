import React, { FC, HTMLAttributes } from "react";
import { theme } from "../../pages/_app";
import Link from "next/link";

interface Props extends HTMLAttributes<HTMLElement> {
  currentdeck: {
    id: number;
  };
  decks?: {
    Deck: string;
    id: number;
  }[];
}

const SubMenu: FC<Props> = ({ decks, currentdeck }) => {
  return (
    <div
      css={(theme) => ({
        display: "flex",
        transition: "0.25s",
        width: "100%",
        height: 70,
        background: theme.colors.darkGray,
        borderRadius: "0 0 10px 10px",
      })}
      // style={{ bottom: StyleBottom }}
    >
      <div
        css={(theme) => ({
          display: "flex",
          textTransform: "uppercase",
          fontWeight: 600,
          fontSize: 18,
          height: 60,
          margin: "auto",
        })}
      >
        {decks &&
          decks.map((item, index) => {
            return (
              <Link href={`/${item.Deck}`} key={index + 97}>
                <div
                  css={(theme) => ({
                    height: "100%",
                    alignItems: "center",
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
                  {item.Deck}
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
};
export default SubMenu;
