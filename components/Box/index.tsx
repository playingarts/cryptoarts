import { FC, HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLElement> {
  padding?: number;
  narrow?: boolean;
}

const Box: FC<Props> = ({ narrow, padding = 1, ...props }) => (
  <section
    {...props}
    css={(theme) => ({
      borderRadius: theme.spacing(2),
      padding: `${theme.spacing((narrow ? 4 : 6) * padding)}px ${theme.spacing(
        (narrow ? 4 : 9.5) * padding
      )}px`,
    })}
  />
);

export default Box;
