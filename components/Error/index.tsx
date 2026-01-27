import { FC, HTMLAttributes } from "react";
import Grid from "../Grid";
import Text from "../Text";
import ArrowButton from "../Buttons/ArrowButton";

interface Props extends HTMLAttributes<HTMLElement> {
  error?: Error;
  retry?: () => void;
  fullPage?: boolean;
}

const getErrorMessage = (error?: Error): string => {
  if (!error) return "Failed to load data. Please try again.";
  return error.message || "Failed to load data. Please try again.";
};

const Error: FC<Props> = ({ error, retry, fullPage = false, ...props }) => (
  <Grid
    css={(theme) => [
      {
        alignItems: "center",
        justifyContent: "center",
        background: theme.colors.soft_gray,
      },
      fullPage && {
        minHeight: "50vh",
        padding: "60px 0",
      },
    ]}
    {...props}
  >
    <div
      css={{
        gridColumn: "span 12",
        textAlign: "center",
        padding: "40px 0",
      }}
    >
      <Text typography="h4" css={{ marginBottom: 10 }}>
        Something went wrong
      </Text>
      <Text
        typography="p-s"
        css={(theme) => ({ color: theme.colors.black50, marginBottom: 20 })}
      >
        {getErrorMessage(error)}
      </Text>
      {retry && (
        <ArrowButton color="accent" onClick={retry}>
          Try again
        </ArrowButton>
      )}
    </div>
  </Grid>
);

export default Error;
