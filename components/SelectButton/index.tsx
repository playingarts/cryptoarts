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

export interface Props extends HTMLAttributes<HTMLElement> {
  states: {
    children: string | number;
    Icon?: ButtonProps["Icon"];
    IconProps?: ButtonProps["iconProps"];
  }[];
  setter?: Dispatch<SetStateAction<any>> | ((_: any) => void);
  palette?: "dark" | "light";
  value?: string | number;
  noText?: boolean;
  keepOrder?: boolean;
}

const SelectButton: FC<Props> = memo(
  ({
    keepOrder,
    value,
    noText,
    palette = "light",
    states,
    setter,
    ...props
  }) => {
    const [listState, setListState] = useState(false);

    const [buttonState, setButtonState] = useState(() =>
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
        ...(keepOrder ? states : prev).filter(
          (state) => state.children !== children
        ),
      ]);
      setter && setter(children);
      setListState(false);
    };

    return (
      <ul
        {...props}
        onMouseEnter={() => setListState(true)}
        onMouseLeave={() => setListState(false)}
        css={(theme) => [
          {
            maxHeight: "inherit",
            padding: 0,
            margin: 0,
            overflow: "hidden",
            display: "inline-grid",
            position: "relative",
            "&::-webkit-scrollbar": {
              display: "none",
            },
            MsOverflowStyle: "none",
            scrollbarWidth: "none",
            boxSizing: "content-box",
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
              ? `rotate(90deg) translate(-75%, ${theme.spacing(1.85)}px)`
              : `rotate(-90deg) translate(75%, -${theme.spacing(1.85)}px)`,
            position: "absolute",
            top: "calc(var(--buttonHeight)/2)",
            pointerEvents: "none",
            color: "inherit",
          })}
        />
        {buttonState.map(
          (btn, index) =>
            (!listState ? index === 0 : true) && (
              <li
                key={btn.children}
                css={(theme) => [
                  !listState
                    ? {
                        borderRadius: theme.spacing(1),
                      }
                    : (index === 0 && {
                        borderRadius: `${theme.spacing(1)}px ${theme.spacing(
                          1
                        )}px ${theme.spacing(0)}px ${theme.spacing(0)}px`,
                      }) ||
                      (index === buttonState.length - 1 && {
                        borderRadius: `${theme.spacing(0)}px ${theme.spacing(
                          0
                        )}px ${theme.spacing(1)}px ${theme.spacing(1)}px`,
                      }),
                  {
                    display: "block",
                    height: "fit-content",
                    paddingRight: theme.spacing(2.2),
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
    );
  }
);

SelectButton.displayName = "SelectButton";

export default SelectButton;
