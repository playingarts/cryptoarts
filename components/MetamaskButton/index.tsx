import { useMetaMask } from "metamask-react";
import { MetaMaskState } from "metamask-react/lib/metamask-context";
import { FC } from "react";
import { PartialRecord } from "../../source/utils";
import Button, { Props as ButtonProps } from "../Button";
import Metamask from "../Icons/Metamask";
import Link from "../Link";

interface Props
  extends ButtonProps,
    PartialRecord<MetaMaskState["status"], string> {
  noLabel?: boolean;
}

const MetamaskButton: FC<Props> = ({
  connected = "Connected",
  notConnected = "Connect MetaMask",
  connecting = "Connecting",
  initializing = "Initializing",
  unavailable = "Install MetaMask",
  noLabel,
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
        title={connected}
      >
        {!noLabel && connected}
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
        title={notConnected}
      >
        {!noLabel && notConnected}
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
        title={connecting}
      >
        {!noLabel && connecting}
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
        title={initializing}
      >
        {!noLabel && initializing}
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
        title={unavailable}
      >
        {!noLabel && unavailable}
      </Button>
    );
  }

  return null;
};

export default MetamaskButton;
