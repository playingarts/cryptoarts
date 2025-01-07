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
import { ClassNames, Theme } from "@emotion/react";
import { CSSInterpolation, CSSObject } from "@emotion/serialize";

export interface Props extends HTMLAttributes<HTMLElement> {
  states: {
    children: string | number;
    Icon?: ButtonProps["Icon"];
    IconProps?: ButtonProps["iconProps"];
  }[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setter?: Dispatch<SetStateAction<any>> | ((_: any) => void);
  palette?: "dark" | "light";
  value?: string | number;
  noText?: boolean;
  keepOrder?: boolean;
  listCSS?: ((_: Theme) => CSSInterpolation) | CSSObject;
}

const SelectButton: FC<Props> = memo(
  ({
    keepOrder,
    value,
    noText,
    palette = "light",
    states,
    setter,
    listCSS,
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

    const onClick = ({ children, Icon, ...props }: (typeof states)[number]) => {
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
      if (setter) {
        setter(children);
      }
      setListState(false);
    };

    return (
      <div
        {...props}
        onClick={(e) => e.stopPropagation()}
        css={(theme) => [
          {
            maxHeight: "var(--buttonHeight)",
            "&:hover": {
              cursor: "pointer",
            },
            [theme.maxMQ.sm]: {
              // transform: "translateY(-18%)",
            },
          },
        ]}
      >
        <ClassNames>
          {({ cx, css, theme }) => (
            <ul
              onMouseEnter={() => setListState(true)}
              onMouseLeave={() => setListState(false)}
              className={cx(
                css(typeof listCSS === "function" ? listCSS(theme) : listCSS)
              )}
              css={(theme) => [
                {
                  zIndex: 10,
                  padding: 0,
                  margin: 0,
                  width: "100%",
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
                  borderRadius: theme.spacing(1),
                },
                (palette === "light" && {
                  color: theme.colors.black,
                  background: theme.colors.white,
                }) ||
                  (palette === "dark" && {
                    color: theme.colors.text_title_light,
                    background: theme.colors.dark_gray,
                  }),
              ]}
            >
              <ThickChevron
                width={17}
                height={17}
                css={(theme) => [
                  {
                    zIndex: 3,
                    right: theme.spacing(1.5),
                    // top: 0,
                    transform: !listState ? `rotate(90deg)` : `rotate(-90deg)`,
                    position: "absolute",
                    top: theme.spacing(1.2),
                    [theme.mq.sm]: {
                      top: theme.spacing(1.7),
                    },
                    pointerEvents: "none",
                    color: "inherit",
                  },
                ]}
              />
              {buttonState.map(
                (btn, index) =>
                  (!listState ? index === 0 : true) && (
                    <li
                      key={btn.children}
                      css={(theme) => [
                        {
                          display: "block",
                          height: "fit-content",
                          paddingRight: theme.spacing(2.2),
                        },
                      ]}
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
          )}
        </ClassNames>
      </div>
    );
  }
);

SelectButton.displayName = "SelectButton";

export default SelectButton;
