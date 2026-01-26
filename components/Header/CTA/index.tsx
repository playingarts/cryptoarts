import Link from "../../Link";
import Instagram from "../../Icons/Instagram";
import Twitter from "../../Icons/Twitter";
import Youtube from "../../Icons/Youtube";
import { socialLinks } from "../../../source/consts";
import ArrowButton from "../../Buttons/ArrowButton";
import { usePalette } from "../../Pages/Deck/DeckPaletteContext";
import { useSize } from "../../SizeProvider";
import { breakpoints } from "../../../source/enums";
import Button from "../../Buttons/Button";
import Bag from "../../Icons/Bag";

const HeaderButton = () => {
  const { palette } = usePalette();
  const { width } = useSize();
  return (
    <Link href={(process.env.NEXT_PUBLIC_BASELINK || "") + "/shop"}>
      {width >= breakpoints.sm ? (
        <ArrowButton
          color={palette === "dark" ? "white" : undefined}
          palette={palette}
          size="medium"
        >
          Shop
        </ArrowButton>
      ) : (
        <Button icon>
          <Bag />
        </Button>
      )}
    </Link>
  );
};

const CTA = () => {
  const { palette } = usePalette();
  const { width } = useSize();
  return (
    <>
      {width >= breakpoints.sm ? (
        <div
          css={(theme) => [
            { display: "flex", gap: theme.spacing(3) },
            palette === "dark" && {
              color: theme.colors.white75,
              "& a": {
                transition: "color 0.2s ease",
                "&:hover": {
                  color: theme.colors.white,
                },
              },
            },
          ]}
        >
          <Link href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" css={{ width: "initial" }}>
            <Instagram />
          </Link>
          <Link href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" css={{ width: "initial" }}>
            <Twitter />
          </Link>
          <Link href={socialLinks.youtube} target="_blank" rel="noopener noreferrer" css={{ width: "initial" }}>
            <Youtube />
          </Link>
        </div>
      ) : null}
      <HeaderButton />
    </>
  );
};

export default CTA;
