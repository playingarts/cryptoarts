import { FC, HTMLAttributes, JSX } from "react";
import Grid from "../Grid";
import ArrowedButton from "../Buttons/ArrowedButton";
import IconArrow from "../Icons/IconArrow";
import ScandiBlock from "../ScandiBlock";
import Text from "../Text";
import ArrowButton from "../Buttons/ArrowButton";
import Link from "../Link";

const Intro: FC<
  HTMLAttributes<HTMLElement> & {
    arrowedText: String;
    paragraphText: String;
    beforeLinkNew?: JSX.Element;
    linkNewText?: String;
    linkNewHref?: string;
    bottom?: JSX.Element;
    /** If true, title is plain text without pointer cursor */
    titleAsText?: boolean;
    /** Color palette - affects text colors */
    palette?: "light" | "dark";
  }
> = ({
  arrowedText,
  paragraphText,
  linkNewText,
  linkNewHref,
  bottom,
  beforeLinkNew,
  titleAsText = false,
  palette = "light",
  ...props
}) => (
  <Grid
    css={(theme) => [{ overflow: "hidden", gridColumn: "1/-1" }]}
    {...props}
  >
    <ScandiBlock
      css={(theme) => [{ gridColumn: "span 6", paddingTop: 15, alignItems: "start", [theme.maxMQ.xsm]: { gridColumn: "1 / -1", paddingBottom: theme.spacing(2) } }]}
    >
      {titleAsText ? (
        <Text
          css={(theme) => ({
            display: "flex",
            alignItems: "center",
            color: theme.colors[palette === "dark" ? "white75" : "black"],
          })}
        >
          <IconArrow css={{ marginRight: 10 }} />
          {arrowedText}
        </Text>
      ) : (
        <ArrowedButton
          css={(theme) => ({
            color: theme.colors[palette === "dark" ? "white75" : "black"],
          })}
        >
          {arrowedText}
        </ArrowedButton>
      )}
    </ScandiBlock>
    <ScandiBlock
      css={(theme) => [
        {
          gridColumn: "span 6",
          paddingTop: 15,
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "start",
          [theme.maxMQ.xsm]: { gridColumn: "1 / -1", borderTop: "none", paddingTop: theme.spacing(3), paddingBottom: theme.spacing(3) },
        },
      ]}
    >
      <div>
        <Text
          typography="p-l"
          css={(theme) => ({
            color: theme.colors[palette === "dark" ? "white75" : "black"],
          })}
        >
          {paragraphText}
        </Text>
        {(beforeLinkNew || linkNewText) && (
          <div css={(theme) => [{ marginTop: theme.spacing(3), display: "flex", gap: theme.spacing(3), [theme.maxMQ.xsm]: { marginBottom: theme.spacing(3) } }]}>
            {beforeLinkNew}
            {linkNewText && (
              linkNewHref ? (
                <Link href={linkNewHref} target="_blank" rel="noopener noreferrer">
                  <ArrowButton
                    size="small"
                    base={true}
                    noColor={true}
                    css={(theme) => ({
                      color: theme.colors[palette === "dark" ? "white75" : "black"],
                    })}
                  >
                    {linkNewText}
                  </ArrowButton>
                </Link>
              ) : (
                <ArrowButton
                  size="small"
                  base={true}
                  noColor={true}
                  css={(theme) => ({
                    color: theme.colors[palette === "dark" ? "white75" : "black"],
                  })}
                >
                  {linkNewText}
                </ArrowButton>
              )
            )}
          </div>
        )}
      </div>
      {bottom}
    </ScandiBlock>
  </Grid>
);

export default Intro;
