import { FC, HTMLAttributes } from "react";
import Arrowed from "../Arrowed";
import Link from "../Link";
import Text from "../Text";

interface Props extends HTMLAttributes<HTMLElement> {
  items: {
    date: string;
    title: string;
    paragraph: string | JSX.Element;
    action?: { text: string; href: string };
  }[];
}

const Roadmap: FC<Props> = ({ items, ...props }) => {
  return (
    <ul
      {...props}
      css={(theme) => ({
        listStyle: "none",
        padding: 0,
        margin: 0,
        a: {
          color: theme.colors.lavender,
          transition: theme.transitions.fast("color"),
          "&:hover": {
            color: theme.colors.white,
          },
        },
      })}
    >
      {items.map((item, index) => (
        <li
          key={item.title}
          css={(theme) => {
            const modTwo = index % 2 === 0;
            const isLast = items.length - 1 === index;

            return [
              {
                [modTwo ? "borderLeft" : "borderRight"]: `${
                  theme.colors.lavender
                } solid ${theme.spacing(0.4)}px`,
                boxSizing: "border-box",
                overflow: "visible",
                width: `calc(50% + ${theme.spacing(0.2)}px)`,
                position: "relative",
                display: "grid",
                "&:before": {
                  content: '" "',
                  position: "absolute",
                  backgroundColor: theme.colors.lavender,
                  borderRadius: "100%",
                  width: theme.spacing(2.2),
                  height: theme.spacing(2.2),
                  display: "block",
                },
              },
              modTwo && {
                left: `calc(50% + ${theme.spacing(-0.2)}px)`,
                paddingLeft: theme.spacing(5.8),
                ":before": {
                  left: -theme.spacing(1.3),
                },
              },
              !modTwo && {
                paddingRight: theme.spacing(5.8),
                textAlign: "right",
                ":before": {
                  right: -theme.spacing(1.3),
                },
              },
              isLast && {
                borderImageSource:
                  "linear-gradient(180deg, #8582F9 0%, #0A0A0A 100%)",
                borderImageSlice: 1,
              },
            ];
          }}
        >
          <Text css={(theme) => ({ color: theme.colors.lavender, margin: 0 })}>
            {item.date}
          </Text>
          <Text
            component="h5"
            css={(theme) => ({
              color: theme.colors.white,
              margin: `${theme.spacing(1)}px 0`,
            })}
          >
            {item.title}
          </Text>
          <Text
            css={(theme) => ({
              color: theme.colors.text_subtitle_light,
              margin: 0,
            })}
          >
            {item.paragraph}
          </Text>
          {item.action && (
            <Link
              href={item.action.href}
              css={(theme) => ({
                marginTop: theme.spacing(1),
                alignItems: "center",
                "&:hover": {
                  span: {
                    marginRight: theme.spacing(0.5),
                  },
                },
              })}
            >
              <Arrowed>
                <span
                  css={(theme) => ({
                    transition: theme.transitions.fast("margin-right"),
                  })}
                >
                  {item.action.text}
                </span>
              </Arrowed>
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
};

export default Roadmap;
