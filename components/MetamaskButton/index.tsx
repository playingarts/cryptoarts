import { useMetaMask } from "metamask-react";
import { FC } from "react";
import Button from "../Button";
import Metamask from "../Icons/Metamask";
import Link from "../Link";

const MetamaskButton: FC = (props) => {
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
        Connected
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
        Connect MetaMask
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
        Connecting
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
        Initializing
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
        Install MetaMask
      </Button>
    );
  }

  return null;
};

export default MetamaskButton;
