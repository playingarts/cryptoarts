import Link from "../../Link";
import Instagram from "../../Icons/Instagram";
import Twitter from "../../Icons/Twitter";
import Youtube from "../../Icons/Youtube";
import { socialLinks } from "../../../source/consts";
import ArrowButton from "../../Buttons/ArrowButton";
import { usePalette } from "../../Pages/Deck/DeckPaletteContext";

const HeaderButton = () => {
  const { palette } = usePalette();
  return (
    <Link href="/new/shop">
      <ArrowButton
        color={palette === "dark" ? "white" : undefined}
        palette={palette}
      >
        Shop
      </ArrowButton>
    </Link>
  );
};

const CTA = () => {
  const { palette } = usePalette();
  return (
    <>
      <div
        css={(theme) => [
          { display: "flex", gap: 30 },
          palette === "dark" && { color: theme.colors.white75 },
        ]}
      >
        <Link href={socialLinks.instagram} css={{ width: "initial" }}>
          <Instagram />
        </Link>
        <Link href={socialLinks.twitter} css={{ width: "initial" }}>
          <Twitter />
        </Link>
        <Link href={socialLinks.youtube} css={{ width: "initial" }}>
          <Youtube />
        </Link>
      </div>
      <HeaderButton />
    </>
  );
};

export default CTA;
