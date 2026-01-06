import { FC, HTMLAttributes, useState } from "react";
import Plus from "../Icons/Plus";
import Button, { Props } from "../Buttons/Button";

const Zoom: FC<HTMLAttributes<HTMLElement> & Props> = ({ ...props }) => {
  const [hover, setHover] = useState(false);

  return (
    <Button
      base={true}
      noColor={true}
      css={(theme) => [
        {
          width: 43,
          lineHeight: "43px",
          borderRadius: "100%",
          background: "white",
          textAlign: "center",
          display: "inline-block",
          color: theme.colors.black,
        },
      ]}
      {...props}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Plus
        css={(theme) => [
          {
            transition: theme.transitions.fast("rotate"),
          },
        ]}
        style={{ rotate: hover ? "-90deg" : "0deg" }}
      />
    </Button>
  );
};

export default Zoom;
