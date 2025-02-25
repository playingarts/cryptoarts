import { FC, HTMLAttributes, JSX } from "react";
import Grid from "../../components/Grid";
import ArrowedButton from "../Buttons/ArrowedButton";
import Dot from "../Icons/Dot";
import ScandiBlock from "../ScandiBlock";
import Text from "../Text";
import ArrowButton from "../Buttons/ArrowButton";

const Intro: FC<
  HTMLAttributes<HTMLElement> & {
    arrowedText: String;
    paragraphText: String;
    beforeLinkNew?: JSX.Element;
    linkNewText: String;
    bottom?: JSX.Element;
  }
> = ({
  arrowedText,
  paragraphText,
  linkNewText,
  bottom,
  beforeLinkNew,
  ...props
}) => (
  <Grid css={[{ paddingTop: 60, overflow: "hidden" }]}>
    <ScandiBlock
      css={[{ gridColumn: "span 6", paddingTop: 15, alignItems: "start" }]}
    >
      <ArrowedButton>{arrowedText}</ArrowedButton>
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
          <ArrowButton size="small" base={true} noColor={true}>
            {linkNewText}
          </ArrowButton>
        </div>
      </div>
      {bottom}
    </ScandiBlock>
  </Grid>
);

export default Intro;
