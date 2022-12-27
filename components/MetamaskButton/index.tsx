import { Interpolation, Theme } from "@emotion/react";
import { CSSPropertiesWithMultiValues } from "@emotion/serialize";
import { colord } from "colord";
import { useMetaMask } from "metamask-react";
import { MetaMaskState } from "metamask-react/lib/metamask-context";
import { FC } from "react";
import { useSignature } from "../../contexts/SignatureContext";
import { theme } from "../../pages/_app";
import { PartialRecord } from "../../source/utils";
import Button, { Props as ButtonProps } from "../Button";
import Metamask from "../Icons/Metamask";
import Link from "../Link";

interface Props
  extends ButtonProps,
    PartialRecord<MetaMaskState["status"], string> {
  noLabel?: boolean;
  noIcon?: boolean;
  backgroundColor:
    | keyof typeof theme.colors
    | CSSPropertiesWithMultiValues["backgroundColor"];
  textColor: keyof typeof theme.colors | CSSPropertiesWithMultiValues["color"];
}

const MetamaskButton: FC<Props> = ({
  textColor,
  noIcon,
  backgroundColor,
  connected = "Connected",
  notConnected = "Connect MetaMask",
  connecting = "Connecting",
  initializing = "Initializing",
  unavailable = "Install MetaMask",
  noLabel,
  children,
  ...props
}) => {
  const { status, connect } = useMetaMask();
  const { askSig } = useSignature();

  let { css, action, label } = {
    css: (theme) => ({
      backgroundColor:
        theme.colors[backgroundColor as keyof typeof theme.colors] ||
        backgroundColor,
      color: theme.colors[textColor as keyof typeof theme.colors] || textColor,
      transition: theme.transitions.fast(["opacity", "color", "background"]),
      [theme.mq.sm]: {
        "&:hover": {
          opacity: 0.9,
        },
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
      color:
        theme.colors[
          backgroundColor as keyof Omit<typeof theme.colors, "decks">
        ] || backgroundColor,
      "&:hover": {
        background: colord(theme.colors.white).alpha(0.1).toRgbString(),
      },
    });

    action = {
      onClick: askSig,
    };
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
    <Button
      {...props}
      {...(!noIcon && { Icon: Metamask })}
      css={css}
      {...action}
      title={status}
      {...(noLabel && { shape: "round" })}
    >
      {!noLabel && (children || label)}
    </Button>
  );
};

export default MetamaskButton;
