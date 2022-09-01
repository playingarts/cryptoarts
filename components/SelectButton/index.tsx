import {
  Dispatch,
  FC,
  HTMLAttributes,
  memo,
  SetStateAction,
  useState,
} from "react";
import Button, { Props as ButtonProps } from "../Button";
import ThickChevron from "../Icons/ThickChevron";

interface Props extends HTMLAttributes<HTMLElement> {
  states: {
    children: string;
    Icon?: ButtonProps["Icon"];
    IconProps?: ButtonProps["iconProps"];
  }[];
  setter?: Dispatch<SetStateAction<string>> | ((_: string) => void);
  palette?: "dark" | "light";
  value?: string;
  noText?: boolean;
}

const SelectButton: FC<Props> = memo(
  ({ value, noText, palette = "light", states, setter, ...props }) => {
    const [listState, setListState] = useState(false);

    const [buttonState, setButtonState] = useState(
      value
        ? states.sort((a, b) =>
            a.children === value ? -1 : b.children === value ? 1 : 0
          )
        : states
    );

    const onClick = ({ children, Icon, ...props }: typeof states[number]) => {
      if (!listState) {
        setListState(true);
        return;
      }
      setButtonState((prev) => [
        { children, Icon, ...props },
        ...prev.filter((state) => state.children !== children),
      ]);
      setter && setter(children);
      setListState(false);
    };

    return (
      <div
        {...props}
        onMouseEnter={() => setListState(true)}
        onMouseLeave={() => setListState(false)}
        css={(theme) => [
          {
            height: "var(--buttonHeight)",
            width: "min-content",
            position: "relative",
            marginLeft: theme.spacing(2.2),
            transform: `translateX(-${theme.spacing(2.2)}px)`,
            [theme.maxMQ.sm]: [
              noText && {
                transform: `translateX(-${theme.spacing(1.5)}px)`,
                paddingRight: theme.spacing(0.7),
              },
            ],
          },
          (palette === "light" && {
            color: theme.colors.black,
          }) ||
            (palette === "dark" && {
              color: theme.colors.text_title_light,
            }),
        ]}
      >
        <ThickChevron
          css={(theme) => ({
            zIndex: 3,
            right: 0,
            width: theme.spacing(0.8),
            height: theme.spacing(1.2),
            transform: !listState
              ? "rotate(90deg) translate(-75%, -10%)"
              : "rotate(-90deg) translate(75%, 10%)",
            position: "absolute",
            top: "50%",
            pointerEvents: "none",
            color: "inherit",
          })}
        />
        <ul
          css={(theme) => [
            {
              borderRadius: theme.spacing(1),
              padding: 0,
              margin: 0,
              display: "grid",
              overflow: "hidden",
              width: `calc(100% + ${theme.spacing(2.2)}px)`,
            },
          ]}
        >
          {buttonState.map(
            (btn, index) =>
              (!listState ? index === 0 : true) && (
                <li
                  key={btn.children}
                  css={(theme) => [
                    {
                      display: "block",
                      height: "fit-content",
                    },
                    (palette === "light" && {
                      background: theme.colors.white,
                    }) ||
                      (palette === "dark" && {
                        background: theme.colors.dark_gray,
                      }),
                  ]}
                  style={{
                    marginTop:
                      (!listState &&
                        index !== 0 &&
                        "calc(var(--buttonHeight) * -1)") ||
                      0,
                    zIndex: index === 0 ? 1 : "initial",
                  }}
                >
                  <Button
                    iconProps={btn.IconProps}
                    Icon={btn.Icon}
                    shape="square"
                    css={[
                      {
                        color: "inherit",
                        background: "inherit",
                        whiteSpace: "nowrap",
                      },
                      !noText && {
                        width: "100%",
                      },
                    ]}
                    onClick={() => onClick(btn)}
                  >
                    {btn.children}
                  </Button>
                </li>
              )
          )}
        </ul>
      </div>
    );
  }
);

SelectButton.displayName = "SelectButton";

export default SelectButton;
