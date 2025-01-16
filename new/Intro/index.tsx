import { FC, HTMLAttributes, JSX } from "react";
import Grid from "../../components/Grid";
import ArrowedButton from "../Buttons/ArrowedButton";
import Dot from "../Icons/Dot";
import ScandiBlock from "../ScandiBlock";
import Text from "../Text";

const Intro: FC<
  HTMLAttributes<HTMLElement> & {
    arrowedText: String;
    paragraphText: String;
    beforeLinkNew?: JSX.Element;
    linkNewText: String;
    bottom?: JSX.Element;
    noHeight?: boolean;
  }
> = ({
  arrowedText,
  paragraphText,
  linkNewText,
  bottom,
  beforeLinkNew,
  noHeight,
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
        !noHeight && {
          height: 370,
        },
      ]}
    >
      <div>
        <Text typography="paragraphBig">{paragraphText}</Text>
        <div css={[{ marginTop: 30, display: "flex", gap: 30 }]}>
          {beforeLinkNew}
          <Text typography="linkNewTypography">
            {linkNewText} <Dot />
          </Text>
        </div>
      </div>
      {bottom}
    </ScandiBlock>
  </Grid>
);

export default Intro;
