import { useRouter } from "next/router";
import Arrow from "../../Icons/Arrow";

export default () => {
  const {
    query: { deckId },
  } = useRouter();

  return deckId ? (
    <span
      css={[
        {
          "> *": {
            display: "inline-block",
            lineHeight: "45px",
            width: 45,
            verticalAlign: "middle",
            textAlign: "center",
          },
        },
      ]}
    >
      <div>
        <Arrow css={[{ transform: "rotate(180deg)" }]} />
      </div>
      <div>
        <Arrow />
      </div>
    </span>
  ) : undefined;
};
