import { FC, HTMLAttributes } from "react";
import { socialLinks } from "../../source/consts";
import Button, { Props as ButtonProps } from "../Button";
import AppStore from "../Icons/AppStore";
import GooglePlay from "../Icons/GooglePlay";
import Link from "../Link";

interface Props extends HTMLAttributes<HTMLElement> {
  ButtonProps?: ButtonProps;
  palette?: "dark" | "light";
}

const StoreButtons: FC<Props> = ({ palette, ButtonProps, ...props }) => (
  <div
    {...props}
    css={(theme) => ({
      display: "flex",
      flexWrap: "wrap",

      gap: theme.spacing(2),
      [theme.maxMQ.sm]: {
        gap: theme.spacing(1.5),
      },
    })}
  >
    {socialLinks.appStore && (
      <Button
        {...ButtonProps}
        component={Link}
        Icon={AppStore}
        href={socialLinks.appStore}
        target="_blank"
        css={(theme) => [
          palette &&
            palette !== "dark" && {
              background: theme.colors.page_bg_light,
              color: theme.colors.page_bg_dark,
            },
          {
            borderRadius: theme.spacing(0.8),
            paddingLeft: theme.spacing(1.5),
            paddingRight: theme.spacing(1.5),
            [theme.mq.sm]: {
              width: "auto",
              transition: theme.transitions.slow("all"),
              "&:hover": {
                color: theme.colors.white,
              },
            },
            [theme.maxMQ.sm]: {
              height: theme.spacing(4.5),
              width: theme.spacing(14.1),
            },
          },
        ]}
      />
    )}
    {socialLinks.playStore && (
      <Button
        component={Link}
        Icon={GooglePlay}
        href={socialLinks.playStore}
        target="_blank"
        css={(theme) => [
          palette &&
            palette !== "dark" && {
              background: theme.colors.page_bg_light,
              color: theme.colors.page_bg_dark,
            },
          {
            borderRadius: theme.spacing(0.8),
            width: "auto",
            paddingLeft: theme.spacing(1.5),
            paddingRight: theme.spacing(1.5),
            [theme.mq.sm]: [
              {
                width: "auto",
                transition: theme.transitions.slow("all"),
                "&:hover": {
                  color: theme.colors.white,
                },
              },
            ],
            [theme.maxMQ.sm]: [
              {
                height: theme.spacing(4.5),
                width: theme.spacing(15),
              },
            ],
          },
        ]}
        {...ButtonProps}
      />
    )}
  </div>
);

export default StoreButtons;
