import { FC, HTMLAttributes } from "react";

const Menu: FC<HTMLAttributes<SVGElement> & { animateOnHover?: boolean }> = ({
  animateOnHover,
  ...props
}) => (
  <svg
    width="50"
    height="50"
    viewBox="0 0 50 50"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    {...props}
    {...(animateOnHover && {
      css: (theme) => ({
        [theme.mq.sm]: {
          "&:hover": {
            "#menuBar": {
              d:
                'path("M11 25.5C11 24.6716 11.6716 24 12.5 24H37.5C38.3284 24 39 24.6716 39 25.5C39 26.3284 38.3284 27 37.5 27H12.5C11.6716 27 11 26.3284 11 25.5Z")',
            },
          },
          "#menuBar": {
            transition: theme.transitions.fast("d"),
          },
        },
      }),
    })}
  >
    <path d="M11 34.5C11 33.6716 11.6716 33 12.5 33H37.5C38.3284 33 39 33.6716 39 34.5C39 35.3284 38.3284 36 37.5 36H12.5C11.6716 36 11 35.3284 11 34.5Z" />
    <path
      id="menuBar"
      d="M11 25.5C11 24.6716 11.6716 24 12.5 24H24.5C25.3284 24 26 24.6716 26 25.5C26 26.3284 25.3284 27 24.5 27H12.5C11.6716 27 11 26.3284 11 25.5Z"
    />
    <path d="M11 16.5C11 15.6716 11.6716 15 12.5 15H37.5C38.3284 15 39 15.6716 39 16.5C39 17.3284 38.3284 18 37.5 18H12.5C11.6716 18 11 17.3284 11 16.5Z" />
  </svg>
);

export default Menu;
