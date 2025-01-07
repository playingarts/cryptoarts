import { FC, Fragment, HTMLAttributes } from "react";
import Arrow from "../Icons/Arrow";

interface Props {
  position?: "append" | "prepend";
  rotation?: number;
}

const Arrowed: FC<HTMLAttributes<HTMLElement> & Props> = ({
  position = "append",
  rotation = 180,
  children,
}) => (
  <Fragment>
    {position === "prepend" && (
      <Arrow
        css={(theme) => ({
          marginRight: theme.spacing(0.7),
          verticalAlign: "baseline",
          transform: `rotate(${rotation}deg)`,
        })}
      />
    )}

    {children}

    {position === "append" && (
      <Arrow
        css={(theme) => ({
          marginLeft: theme.spacing(0.7),
          verticalAlign: "baseline",
          transform: `rotate(${rotation - 180}deg)`,
        })}
      />
    )}
  </Fragment>
);

export default Arrowed;
