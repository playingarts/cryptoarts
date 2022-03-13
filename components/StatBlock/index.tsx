import { FC, HTMLAttributes } from "react";
import Arrowed from "../Arrowed";
import Link, { Props as LinkProps } from "../Link";
import Text from "../Text";

export interface Props extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  action?: Pick<LinkProps, "children" | "href" | "target">;
  buttons?: JSX.Element;
}

const StatBlock: FC<Props> = ({
  action,
  title,
  children,
  buttons,
  ...props
}) => (
  <div
    {...props}
    css={(theme) => ({
      display: "flex",
      flexDirection: "column",
      borderRadius: theme.spacing(2),
      padding: theme.spacing(4),
    })}
  >
    {title && (
      <Text
        component="h6"
        css={(theme) => ({
          opacity: 0.5,
          margin: 0,
          marginBottom: theme.spacing(2),
          position: "relative",
          zIndex: 1,
        })}
      >
        {title}
      </Text>
    )}

    <div css={{ flexGrow: 1 }}>{children}</div>

    {buttons && (
      <div
        css={(theme) => ({
          marginTop: theme.spacing(2.5),
        })}
      >
        {buttons}
      </div>
    )}

    {action && (
      <div
        css={(theme) => ({
          marginTop: theme.spacing(2.5),
        })}
      >
        <Text
          component={Link}
          href={action.href}
          target={action.target}
          variant="label"
          css={{
            opacity: 0.5,
            display: "inline-block",
          }}
        >
          <Arrowed>{action.children}</Arrowed>
        </Text>
      </div>
    )}
  </div>
);

export default StatBlock;
