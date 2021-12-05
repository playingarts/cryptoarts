import { FC, HTMLAttributes } from "react";
import Logo from "../Icons/Logo";
import MenuSvg from "../Icons/Menu";
import Bag from "../Icons/Bag";
import Button from "../Button";

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
        pointerEvents: "initial",
        background:
          palette === "dark" ? theme.colors.dark_gray : theme.colors.gradient,
      })}
    >
      <div css={{ display: "flex" }}>
        <div
          css={{
            width: 70,
            height: 70,
            marginRight: 24,
            display: "flex",
            "&:hover": { cursor: "pointer" },
          }}
        >
          <MenuSvg
            css={(theme) => ({
              position: "relative",
              alignSelf: "center",
              width: 32,
              height: 32,
              margin: "auto",
              borderRadius: [100, 0, 10],
              fill:
                palette === "dark"
                  ? theme.colors.text_subtitle_light
                  : theme.colors.dark_gray,
            })}
          />
        </div>
        <div
          css={(theme) => ({
            display: "flex",
            alignItems: "center",
            fontSize: 24,
            marginTop: 8,
            color:
              palette === "dark"
                ? theme.colors.text_subtitle_light
                : theme.colors.dark_gray,
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
          pointerEvents: "none",
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
              pointerEvents: "initial",
              "&:hover": {
                fillOpacity: 0.8,
              },
              fill:
                palette === "dark"
                  ? theme.colors.text_subtitle_light
                  : theme.colors.dark_gray,
            })}
          />
        </div>
      </div>
      <Button
        css={{
          marginRight: 25,
        }}
        Icon={Bag}
      >
        Shop
      </Button>
    </div>
  );
};

export default MainMenu;
