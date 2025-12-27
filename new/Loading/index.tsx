import { FC, HTMLAttributes } from "react";
import Grid from "../../components/Grid";
import Text from "../Text";

interface Props extends HTMLAttributes<HTMLElement> {
  fullPage?: boolean;
}

const Loading: FC<Props> = ({ fullPage = false, ...props }) => (
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
      <div
        css={(theme) => ({
          width: 40,
          height: 40,
          margin: "0 auto 20px",
          border: `3px solid ${theme.colors.black10}`,
          borderTopColor: theme.colors.accent,
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
          "@keyframes spin": {
            to: { transform: "rotate(360deg)" },
          },
        })}
      />
      <Text typography="paragraphSmall" css={{ opacity: 0.5 }}>
        Loading...
      </Text>
    </div>
  </Grid>
);

export default Loading;
