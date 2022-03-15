import { FC, HTMLAttributes } from "react";
import { useConvertEurToUsd } from "../../hooks/product";
import Text from "../Text";

interface Props extends HTMLAttributes<HTMLDivElement> {
  eur: number;
}

const EurToUsd: FC<Props> = ({ eur, ...props }) => {
  const { usd, loading } = useConvertEurToUsd({
    variables: {
      eur,
    },
  });
  let children: string | undefined;

  if (loading) {
    children = "Calculating...";
  }

  if (usd) {
    children = `~${usd.toLocaleString(undefined, {
      style: "currency",
      currency: "USD",
    })}`;
  }

  if (!children) {
    return null;
  }

  return (
    <Text component="span" {...props}>
      {children}
    </Text>
  );
};

export default EurToUsd;
