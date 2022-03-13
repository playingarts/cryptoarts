import { useMetaMask } from "metamask-react";
import { MetaMaskState } from "metamask-react/lib/metamask-context";
import { FC } from "react";
import Button, { Props as ButtonProps } from "../Button";
import Metamask from "../Icons/Metamask";
import Link from "../Link";

type PartialRecord<K extends keyof any, T> = Partial<Record<K, T>>;

const MetamaskButton: FC<
  ButtonProps & PartialRecord<MetaMaskState["status"], string>
> = ({
  connected = "Connected",
  notConnected = "Connect MetaMask",
  connecting = "Connecting",
  initializing = "Initializing",
  unavailable = "Install MetaMask",
  ...props
}) => {
  const { status, connect } = useMetaMask();

  if (status === "connected") {
    return (
      <Button
        {...props}
        Icon={Metamask}
        css={(theme) => ({
          background: theme.colors.green,
          color: theme.colors.text_title_light,
        })}
      >
        {connected}
      </Button>
    );
  }

  if (status === "notConnected") {
    return (
      <Button
        {...props}
        Icon={Metamask}
        css={(theme) => ({
          background: theme.colors.orange,
          color: theme.colors.text_title_light,
        })}
        onClick={connect}
      >
        {notConnected}
      </Button>
    );
  }

  if (status === "connecting") {
    return (
      <Button
        {...props}
        Icon={Metamask}
        css={(theme) => ({
          background: theme.colors.spades,
          color: theme.colors.text_title_light,
        })}
      >
        {connecting}
      </Button>
    );
  }

  if (status === "initializing") {
    return (
      <Button
        {...props}
        Icon={Metamask}
        css={(theme) => ({
          background: theme.colors.spades,
          color: theme.colors.text_title_light,
        })}
      >
        {initializing}
      </Button>
    );
  }

  if (status === "unavailable") {
    return (
      <Button
        {...props}
        Icon={Metamask}
        css={(theme) => ({
          background: "red",
          color: theme.colors.text_title_light,
        })}
        component={Link}
        href="https://metamask.io/download/"
        target="_blank"
      >
        {unavailable}
      </Button>
    );
  }

  return null;
};

export default MetamaskButton;
