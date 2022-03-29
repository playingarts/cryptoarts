import { Theme, Interpolation } from "@emotion/react";
import { colord } from "colord";
import { useMetaMask } from "metamask-react";
import { MetaMaskState } from "metamask-react/lib/metamask-context";
import { FC } from "react";
import { theme } from "../../pages/_app";
import { PartialRecord } from "../../source/utils";
import Button, { Props as ButtonProps } from "../Button";
import Metamask from "../Icons/Metamask";
import Link from "../Link";

interface Props
  extends ButtonProps,
    PartialRecord<MetaMaskState["status"], string> {
  noLabel?: boolean;
  backgroundColor: keyof typeof theme.colors;
  textColor: keyof typeof theme.colors;
}

const MetamaskButton: FC<Props> = ({
  textColor,
  backgroundColor,
  connected = "Connected",
  notConnected = "Connect MetaMask",
  connecting = "Connecting",
  initializing = "Initializing",
  unavailable = "Install MetaMask",
  noLabel,
  ...props
}) => {
  const { status, connect } = useMetaMask();
  let { css, action, label } = {
    css: (theme) => ({
      backgroundColor: theme.colors[backgroundColor],
      color: theme.colors[textColor],
      transition: theme.transitions.fast(["opacity", "color", "background"]),
      "&:hover": {
        opacity: 0.9,
      },
    }),
  } as {
    css: Interpolation<Theme>;
    label?: string;
    action?: ButtonProps;
  };

  if (status === "connected") {
    css = (theme) => ({
      backgroundColor: colord(theme.colors.white).alpha(0).toRgbString(),
      color: theme.colors[backgroundColor],
      "&:hover": {
        background: colord(theme.colors.white).alpha(0.1).toRgbString(),
      },
    });
    label = connected;
  }

  if (status === "notConnected") {
    action = {
      onClick: connect,
    };
    label = notConnected;
  }

  if (status === "connecting") {
    label = connecting;
  }

  if (status === "initializing") {
    label = initializing;
  }

  if (status === "unavailable") {
    action = {
      component: Link,
      href: "https://metamask.io/download/",
      target: "_blank",
    };
    label = unavailable;
  }

  return (
    <Button {...props} Icon={Metamask} css={css} {...action} title={status}>
      {!noLabel && label}
    </Button>
  );
};

export default MetamaskButton;
