import { FC, Fragment, useEffect, useRef, useState } from "react";
import Arrowed from "../Arrowed";
import Text, { Props as TextProps } from "../Text";

interface Props extends TextProps {
  lines: number;
  onlyMore?: boolean;
}

const Truncate: FC<Props> = ({ children, lines, onlyMore, ...props }) => {
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
      {withTruncate && !(onlyMore && !truncated) && (
        <span
          css={(theme) => [
            {
              [theme.mq.sm]: {
                transition: theme.transitions.slow("color"),
                "&:hover": {
                  color: theme.colors.white,
                },
              },
            },
          ]}
        >
          <Text component="button" variant="label" onClick={toggle}>
            <Arrowed>{truncated ? "Read more" : "Read less"}</Arrowed>
          </Text>
        </span>
      )}
    </Fragment>
  );
};

export default Truncate;
