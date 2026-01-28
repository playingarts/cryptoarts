import { FC, HTMLAttributes } from "react";
import { keyframes } from "@emotion/react";

/** Metallic shine animation for NFT labels */
const metallicShine = keyframes`
  0% {
    background-position: 200% center;
  }
  100% {
    background-position: -200% center;
  }
`;

const Label: FC<HTMLAttributes<HTMLElement>> = ({ children, ...props }) => {
  const isNFT = typeof children === "string" && children.toLowerCase() === "nft";

  return (
    <div
      css={(theme) => [
        {
          fontFamily: "var(--font-alliance), 'Alliance No.2', sans-serif",
          fontSize: 12,
          fontWeight: 400,
          lineHeight: "18px",
          textAlign: "left",
          textUnderlinePosition: "from-font",
          textDecorationSkipInk: "none",
          padding: "6px 10px 4px",
          background: "white",
          borderRadius: 50,
          textTransform: "capitalize",
          color: theme.colors.black,
        },
        isNFT && {
          background: "linear-gradient(135deg, #8B5CF6 0%, #EC4899 25%, #A78BFA 50%, #F472B6 75%, #8B5CF6 100%)",
          backgroundSize: "300% 300%",
          animation: `${metallicShine} 3s linear infinite`,
          fontWeight: 500,
          color: "white",
        },
      ]}
      {...props}
    >
      {children}
    </div>
  );
};

export default Label;
