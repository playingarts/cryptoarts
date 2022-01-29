import { FC, Fragment, useEffect, useRef, useState } from "react";
import Arrowed from "../Arrowed";
import Text, { Props as TextProps } from "../Text";

interface Props extends TextProps {
  lines: number;
}

const Truncate: FC<Props> = ({ children, lines, ...props }) => {
  const [truncated, setTruncated] = useState(true);
  const [withTruncate, truncateNeeded] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);
  const toggle = () => {
    if (ref.current) {
      setTruncated(
        ref.current.scrollHeight === ref.current.getBoundingClientRect().height
      );
    }
  };

  useEffect(() => {
    if (ref.current) {
      truncateNeeded(
        ref.current.scrollHeight != ref.current.getBoundingClientRect().height
      );
    }
  }, []);

  return (
    <Fragment>
      <Text
        ref={ref}
        {...props}
        css={
          truncated
            ? {
                overflow: "hidden",
                display: "-webkit-box",
                "-webkit-box-orient": "vertical",
                "-webkit-line-clamp": `${lines}`,
              }
            : {}
        }
      >
        {children}
      </Text>
      {withTruncate && (
        <Text component="button" variant="label" onClick={toggle}>
          <Arrowed>{truncated ? "Read more" : "Read less"}</Arrowed>
        </Text>
      )}
    </Fragment>
  );
};

export default Truncate;
