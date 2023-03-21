import { Theme } from "@emotion/react";
import { FC, HTMLAttributes } from "react";
import { breakpoints } from "../../source/enums";
import Arrowed from "../Arrowed";
import Line from "../Line";
import Link from "../Link";
import { useSize } from "../SizeProvider";
import Text from "../Text";

interface Props extends HTMLAttributes<HTMLElement> {
  items: {
    status?: string;
    title: string;
    paragraph: string | JSX.Element;
    action?: { text: string; href: string; blank?: boolean };
    accent?: keyof Theme["colors"];
  }[];
  palette: "light" | "dark";
}

const Roadmap: FC<Props> = ({ items, palette, ...props }) => {
  const { width } = useSize();
  return (
    <ul
      {...props}
      css={(theme) => ({
        listStyle: "none",
        padding: 0,
        margin: 0,
        [theme.maxMQ.sm]: {
          paddingBottom: theme.spacing(2),
        },
        a: {
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

            return [
              {
                boxSizing: "border-box",
                overflow: "visible",
                position: "relative",
                display: "grid",
                borderImageSource: `linear-gradient(180deg, ${
                  item.accent
                    ? theme.colors[item.accent]
                    : theme.colors.lavender
                } 0%, ${
                  items[index + 1]
                    ? items[index + 1].accent || theme.colors.lavender
                    : theme.colors.text_title_dark
                } 100%)`,
                borderImageSlice: 1,
                [theme.maxMQ.sm]: [
                  // isLast && {
                  //   borderImageSource: `linear-gradient(180deg, ${theme.colors.lavender} 0%, ${theme.colors.page_bg_light_gray} 90%)`,
                  //   borderImageSlice: 1,
                  // },
                  {
                    borderLeft: `${
                      item.accent || theme.colors.lavender
                    } solid ${theme.spacing(0.2)}px`,
                    paddingLeft: theme.spacing(3),
                    paddingBottom: theme.spacing(2),
                    marginLeft: theme.spacing(1.8),
                  },
                ],
                "&:before": {
                  [theme.maxMQ.sm]: {
                    transform: "translateX(calc(-50% - 2px))",
                    width: theme.spacing(1.8),
                    height: theme.spacing(1.8),
                    left: 1,
                  },
                  content: '""',
                  position: "absolute",
                  backgroundColor: item.accent || theme.colors.lavender,
                  borderRadius: "100%",
                  width: theme.spacing(2.2),
                  height: theme.spacing(2.2),
                  display: "block",
                },
                [theme.mq.sm]: [
                  {
                    width: `calc(50% + ${theme.spacing(0.2)}px)`,
                    [modTwo ? "borderLeft" : "borderRight"]: `${
                      item.accent || theme.colors.lavender
                    } solid ${theme.spacing(0.4)}px`,
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
                  // isLast && {
                  //   borderImageSource: `linear-gradient(180deg, ${theme.colors.lavender} 0%, ${theme.colors.text_title_dark} 100%)`,
                  //   borderImageSlice: 1,
                  // },
                ],
              },
            ];
          }}
        >
          <Text
            css={(theme) => ({
              color: item.accent || theme.colors.lavender,
              margin: 0,
              textTransform: "capitalize",
              fontWeight: 500,
              fontSize: 14,
              [theme.maxMQ.sm]: {
                fontSize: 12,
                lineHeight: 1.5,
              },
            })}
          >
            <span
              css={(theme) => [
                {
                  border: "1px solid currentColor",
                  borderRadius: 30,
                  padding: `${theme.spacing(0.2)}px ${theme.spacing(1)}px`,
                },
              ]}
            >
              {item.status || "complete"}
            </span>
          </Text>
          <Text
            component="h5"
            css={(theme) => ({
              [theme.maxMQ.sm]: [
                // theme.typography.body3,
                palette === "dark" && {
                  color: theme.colors.white,
                  paddingTop: `${theme.spacing(1)}px`,
                },
              ],
              [theme.mq.sm]: {
                color: theme.colors.white,
                marginTop: theme.spacing(2),
              },
              margin: `${theme.spacing(1)}px 0`,
            })}
          >
            {item.title}
          </Text>
          <Text
            css={(theme) => ({
              color: theme.colors.text_subtitle_light,
              [theme.maxMQ.sm]: [
                {
                  fontSize: 16,
                  color:
                    palette === "dark"
                      ? theme.colors.text_subtitle_light
                      : theme.colors.text_title_dark,
                },
              ],
              // [theme.mq.sm]: {
              //   color: theme.colors.white,
              // },
              margin: 0,
            })}
          >
            {item.paragraph}
          </Text>
          {item.action && (
            <Link
              href={item.action.href}
              {...(item.action.blank && { target: "_blank" })}
              css={(theme) => ({
                marginTop: theme.spacing(1),
                alignItems: "center",

                color: item.accent || theme.colors.lavender,
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

          {index !== items.length - 1 && width < breakpoints.sm && (
            <Line
              palette={palette}
              spacing={1}
              css={(theme) => ({
                marginTop: theme.spacing(2),
                width: "100%",
              })}
            />
          )}
        </li>
      ))}
    </ul>
  );
};

export default Roadmap;
