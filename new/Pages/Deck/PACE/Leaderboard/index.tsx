import { FC, HTMLAttributes } from "react";
import ScandiBlock from "../../../../ScandiBlock";
import Text from "../../../../Text";
import image from "../../../../../mocks/images/PACE/image.png";
import image1 from "../../../../../mocks/images/PACE/image-1.png";
import image2 from "../../../../../mocks/images/PACE/image-2.png";

const temp: { [x: string]: number | string } = {
  "Top Holders": "Highest # of NFTs held",
  "Active traders": "Most # of transactions",
  "Rare holders": "Backsides and jokers",
};

const Holder = () => {
  return (
    <div>
      <img
        src={image.src}
        alt=""
        css={[
          {
            float: "left",
            width: 40,
            height: 40,
            borderRadius: 5,
            marginRight: 15,
          },
        ]}
      />
      <div>
        <Text typography="paragraphSmall">89</Text>
        <Text typography="paragraphSmall">0xe444.e3eA</Text>
      </div>
    </div>
  );
};

const Leaderboard: FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => {
  return (
    <div
      css={(theme) => [
        {
          background: theme.colors.darkBlack,
          padding: 30,
          borderRadius: 20,
        },
      ]}
      {...props}
    >
      <Text typography="newh4">Leaderboard</Text>
      <div css={[{ display: "flex", gap: 30, marginTop: 30 }]}>
        {Object.keys(temp).map((item) => (
          <div css={[{ flexBasis: 1, flexGrow: 1 }]}>
            <Text typography="newh4" css={[{ marginBottom: 5 }]}>
              {item}
            </Text>
            <Text typography="paragraphSmall">{temp[item]}</Text>
            <ScandiBlock
              key={item}
              css={[
                {
                  // paddingTop: 30,
                  display: "block",
                  width: "100%",
                  marginTop: 30,
                  " > *": {
                    paddingTop: 30,
                  },
                },
              ]}
            >
              <Holder />
              <Holder />
              <Holder />
            </ScandiBlock>
          </div>
        ))}
      </div>
      <Text
        typography="paragraphSmall"
        css={(theme) => [{ color: theme.colors.white50, marginTop: 30 }]}
      >
        More collectors
      </Text>
    </div>
  );
};

export default Leaderboard;
