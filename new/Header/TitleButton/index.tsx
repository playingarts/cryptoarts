import Menu from "../../Icons/Menu";
import ButtonTemplate from "../../Buttons/ButtonTemplate";
import { FC, HTMLAttributes } from "react";
import ScandiBlock from "../../ScandiBlock";
import { useRouter } from "next/router";
import { useDeck } from "../../../hooks/deck";
import { colord } from "colord";
import Text from "../../Text";

const TitleButton: FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => {
  const {
    query: { deckId },
  } = useRouter();

  const { deck } = useDeck({ variables: { slug: deckId } });

  return (
    <ScandiBlock css={{ gridColumn: "span 3", height: "100%" }} {...props}>
      <ButtonTemplate
        css={(theme) => [
          {
            color: theme.colors.dark_gray,
            transition: theme.transitions.fast("background"),
            "&:hover": {
              background: colord(theme.colors.white).alpha(0.5).toRgbString(),
            },
          },
        ]}
      >
        <Menu />
        <Text
          css={(theme) => [
            {
              transition: theme.transitions.slow("color"),
              color: theme.colors.dark_gray,
            },
          ]}
        >
          {deck ? deck.title : "Playing Arts"}
        </Text>
      </ButtonTemplate>
    </ScandiBlock>
  );
};

export default TitleButton;
