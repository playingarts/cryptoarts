import { FC } from "react";
import Header, { Props as HeaderProps } from "../../Header";

const ComposedHeader: FC<HeaderProps> = (props) => (
  <Header
    css={(theme) => ({
      position: "fixed",
      left: theme.spacing(1),
      right: theme.spacing(1),
      top: theme.spacing(1),
      zIndex: 10,
      [theme.maxMQ.sm]: {
        left: theme.spacing(0.5),
        right: theme.spacing(0.5),
        top: theme.spacing(0.5),
      },

      [theme.mq.laptop]: {
        maxWidth: theme.spacing(142),
        left: "50%",
        transform: "translate(-50%, 0)",
        width: "100%",
      },
    })}
    {...props}
  />
);

export default ComposedHeader;
