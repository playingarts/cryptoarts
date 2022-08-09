import {
  Dispatch,
  FC,
  HTMLAttributes,
  memo,
  SetStateAction,
  useState,
} from "react";
import Button from "../Button";
import Sort from "../Icons/Sort";
import ThickChevron from "../Icons/ThickChevron";

interface Props extends HTMLAttributes<HTMLElement> {
  states: string[];
  setter?: Dispatch<SetStateAction<string>> | ((_: string) => void);
  palette?: "dark" | "light";
  noIcon?: boolean;
  value?: string;
}

const SelectButton: FC<Props> = memo(
  ({ noIcon, value, palette = "light", states, setter, ...props }) => {
    const [listState, setListState] = useState(false);

    const [buttonState, setButtonState] = useState<
      {
        children: string;
        selected: boolean;
      }[]
    >(
      states.map((state, index) => ({
        children: state,
        selected: value ? state === value : index === 0,
      }))
    );

    const onClick = (btn: { children: string; selected: boolean }) => {
      if (!listState) {
        setListState(true);
        return;
      }
      setButtonState((prev) => [
        ...prev.map((state) => ({
          ...state,
          selected: state.children === btn.children,
        })),
      ]);
      setter && setter(btn.children);
      setListState(false);
    };

    return (
      <div
        {...props}
        css={(theme) => [
          {
            height: theme.spacing(5),
            width: "min-content",
            position: "relative",
            transform: `translateX(-${theme.spacing(2.2)}px)`,
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
            transform: listState
              ? "rotate(90deg) translate(-75%, -10%)"
              : "rotate(-90deg) translate(75%, 10%)",
            position: "absolute",
            top: "50%",
            pointerEvents: "none",
            color: "inherit",
          })}
        />
        <ul
          css={(theme) => ({
            borderRadius: theme.spacing(1),
            padding: 0,
            margin: 0,
            display: "grid",
            overflow: "hidden",
            width: `calc(100% + ${theme.spacing(2.2)}px)`,
          })}
        >
          {buttonState.map((btn, index) => (
            <li
              key={btn.children}
              css={(theme) => [
                {
                  display: "block",
                  height: "fit-content",
                  transition: theme.transitions.fast("margin-top"),
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
                zIndex: btn.selected ? 1 : "initial",
              }}
            >
              <Button
                {...(!noIcon && { Icon: Sort })}
                shape="square"
                css={{
                  width: "100%",
                  color: "inherit",
                  background: "inherit",
                  whiteSpace: "nowrap",
                }}
                onClick={() => onClick(btn)}
              >
                {btn.children}
              </Button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
);

SelectButton.displayName = "SelectButton";

export default SelectButton;
