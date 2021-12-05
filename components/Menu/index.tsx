import { FC, HTMLAttributes, useEffect, useState } from "react";
import MainMenu from "../MainMenu";
import SubMenu from "../SubMenu";
import { SubmenuRoller } from "./SubMenuRoller";

interface Props extends HTMLAttributes<HTMLElement> {
  currentdeck?: {
    id: number;
  };
  palette?: "dark";
}

const Menu: FC<Props> = ({ currentdeck, palette, ...props }) => {
  const [showSubMenu, setshowSubMenu] = useState(true);
  useEffect(() => {
    window.addEventListener(
      "scroll",
      () => SubmenuRoller({ setshowSubMenu }),
      false
    );
    return () => {
      window.removeEventListener(
        "scroll",
        () => SubmenuRoller({ setshowSubMenu }),
        false
      );
    };
  }, []);
  return (
    <header
      {...props}
      css={(theme) => ({
        top: 10,
        right: 10,
        left: 10,
        zIndex: 2,
        borderRadius: 10,
        maxWidth: 1860,
        pointerEvents: "none",
        [theme.mq.lg]: {
          right: "",
          left: "",
          margin: `0 ${theme.spacing(9.5)}`,
        },
        [theme.mq.xl]: {
          margin: "0 auto",
        },
      })}
    >
      <MainMenu palette={palette} />
      {currentdeck && (
        <div
          css={{
            width: "100%",
            position: "relative",
            overflow: "hidden",
            marginTop: -10,
          }}
        >
          <SubMenu
            currentdeck={currentdeck}
            css={{
              display: "flex",
              alignItems: "flex-end",
              position: "relative",
              pointerEvents: "initial",
              height: 80,
            }}
            style={showSubMenu ? {} : { marginTop: -80 }}
          />
        </div>
      )}
    </header>
  );
};
export default Menu;
