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
  }
> = ({
  arrowedText,
  paragraphText,
  linkNewText,
  linkNewHref,
  bottom,
  beforeLinkNew,
  titleAsText = false,
  ...props
}) => (
  <Grid
    css={[{ paddingTop: 60, overflow: "hidden", gridColumn: "1/-1" }]}
    {...props}
  >
    <ScandiBlock
      css={[{ gridColumn: "span 6", paddingTop: 15, alignItems: "start" }]}
    >
      {titleAsText ? (
        <Text css={{ display: "flex", alignItems: "center" }}>
          <IconArrow css={{ marginRight: 10 }} />
          {arrowedText}
        </Text>
      ) : (
        <ArrowedButton>{arrowedText}</ArrowedButton>
      )}
    </ScandiBlock>
    <ScandiBlock
      css={[
        {
          gridColumn: "span 6",
          paddingTop: 15,
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "start",
        },
      ]}
    >
      <div>
        <Text typography="paragraphBig">{paragraphText}</Text>
        <div css={[{ marginTop: 30, display: "flex", gap: 30 }]}>
          {beforeLinkNew}
          {linkNewText && (
            linkNewHref ? (
              <Link href={linkNewHref} target="_blank" rel="noopener noreferrer">
                <ArrowButton size="small" base={true} noColor={true}>
                  {linkNewText}
                </ArrowButton>
              </Link>
            ) : (
              <ArrowButton size="small" base={true} noColor={true}>
                {linkNewText}
              </ArrowButton>
            )
          )}
        </div>
      </div>
      {bottom}
    </ScandiBlock>
  </Grid>
);

export default Intro;
