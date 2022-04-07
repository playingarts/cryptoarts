import { FC, HTMLAttributes } from "react";
import { socialLinks } from "../../source/consts";
import Button, { Props as ButtonProps } from "../Button";
import AppStore from "../Icons/AppStore";
import GooglePlay from "../Icons/GooglePlay";
import Link from "../Link";

interface Props extends HTMLAttributes<HTMLElement> {
  ButtonProps?: ButtonProps;
}

const StoreButtons: FC<Props> = ({ ButtonProps, ...props }) => (
  <div {...props}>
    {socialLinks.appStore && (
      <Button
        {...ButtonProps}
        component={Link}
        Icon={AppStore}
        href={socialLinks.appStore}
        target="_blank"
        css={(theme) => ({
          borderRadius: theme.spacing(0.8),
          marginRight: theme.spacing(2),
          width: "auto",
          paddingLeft: theme.spacing(1.5),
          paddingRight: theme.spacing(1.5),
        })}
      />
    )}
    {socialLinks.playStore && (
      <Button
        component={Link}
        Icon={GooglePlay}
        href={socialLinks.playStore}
        target="_blank"
        css={(theme) => ({
          borderRadius: theme.spacing(0.8),
          marginRight: theme.spacing(2),
          width: "auto",
          paddingLeft: theme.spacing(1.5),
          paddingRight: theme.spacing(1.5),
        })}
        {...ButtonProps}
      />
    )}
  </div>
);

export default StoreButtons;
