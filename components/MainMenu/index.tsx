import { FC, HTMLAttributes } from "react";
import Logo from "../Icons/Logo";
import MenuSvg from "../Icons/Menu";
import Bag from "../Icons/Bag";
import Button from "../Button/Button";

interface Props extends HTMLAttributes<HTMLElement> {
  palette?: "dark";
}

const MainMenu: FC<Props> = ({ palette }) => {
  return (
    <div
      css={(theme) => ({
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        overflow: "hidden",
        position: "relative",
        padding: [10, 20],
        borderRadius: 10,
        height: 70,
        zIndex: 2,
        background:
          palette === "dark" ? theme.colors.darkGray : theme.colors.eth,
      })}
    >
      <div css={{ display: "flex" }}>
        <div
          css={{
            width: 70,
            height: 70,
            marginRight: 24,
            display: "flex",
          }}
        >
          <MenuSvg
            css={(theme) => ({
              "&:hover": { cursor: "pointer" },
              position: "relative",
              alignSelf: "center",
              width: 32,
              height: 32,
              margin: "auto",
              borderRadius: [100, 0, 10],
              fill:
                palette === "dark" ? theme.colors.gray : theme.colors.darkGray,
            })}
          />
        </div>
        <div
          css={(theme) => ({
            display: "flex",
            alignItems: "center",
            fontSize: 24,
            fontFamily: theme.fonts.aldrichFont,
            marginTop: 8,
            color:
              palette === "dark" ? theme.colors.gray : theme.colors.darkGray,
          })}
        >
          PLAYING ARTS
        </div>
      </div>
      <div
        css={{
          position: "absolute",
          display: "flex",
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          css={{
            display: "flex",
            height: "100%",
            alignItems: "center",
          }}
        >
          <Logo
            css={(theme) => ({
              "&:hover": {
                fillOpacity: 0.8,
              },
              fill:
                palette === "dark" ? theme.colors.gray : theme.colors.darkGray,
            })}
          />
        </div>
      </div>
      <Button
        css={{
          background: "white",
          fill: "black",
          stroke: "black",
          marginRight: 20,
        }}
        Icon={Bag}
        text="shop"
      />
    </div>
  );
};

export default MainMenu;
