import { FC, Fragment } from "react";
import Arrow from "../Icons/Arrow";

interface Props {
  position?: "append" | "prepend";
}

const Arrowed: FC<Props> = ({ position = "append", children }) => (
  <Fragment>
    {position === "prepend" && (
      <Arrow
        css={(theme) => ({
          marginRight: theme.spacing(0.7),
          verticalAlign: "baseline",
          transform: "rotate(180deg)",
        })}
      />
    )}

    {children}

    {position === "append" && (
      <Arrow
        css={(theme) => ({
          marginLeft: theme.spacing(0.7),
          verticalAlign: "baseline",
        })}
      />
    )}
  </Fragment>
);

export default Arrowed;
