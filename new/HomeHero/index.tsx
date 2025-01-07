import React from "react";
import Text from "../../components/Text";

type Props = {};

const HomeHero = (props: Props) => {
  return (
    <Text css={(theme) => [theme.typography.h]}>Collective Art Project</Text>
  );
};

export default HomeHero;
