import Menu from "../../Icons/Menu";
import Button from "../../Buttons/Button";
import { FC, HTMLAttributes } from "react";
import ScandiBlock from "../../ScandiBlock";
import { useRouter } from "next/router";
import { useDeck } from "../../../hooks/deck";
import { colord } from "colord";
import Text from "../../Text";

const TitleButton: FC<
  HTMLAttributes<HTMLElement> & { setShow: (x: boolean) => void }
> = ({ setShow, ...props }) => {
  const {
    query: { deckId },
  } = useRouter();

  const { deck } = useDeck({ variables: { slug: deckId } });

  return (
    <ScandiBlock css={{ gridColumn: "span 3", height: "100%" }} {...props}>
      <Button
        base={true}
        css={(theme) => [
          {
            paddingLeft: 10,
            paddingRight: 15,
            color: theme.colors.dark_gray + " !important",
            transition: theme.transitions.fast("background"),
            "&:hover": {
              background: colord(theme.colors.white).alpha(0.5).toRgbString(),
            },
          },
        ]}
        onClick={() => setShow(true)}
      >
        <Menu css={{ marginRight: 10 }} />

        {deck ? deck.title : "Playing Arts"}
      </Button>
    </ScandiBlock>
  );
};

export default TitleButton;
