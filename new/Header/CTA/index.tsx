import Link from "../../Link";
import Instagram from "../../Icons/Instagram";
import Twitter from "../../Icons/Twitter";
import Youtube from "../../Icons/Youtube";
import ArrowButton from "../../Buttons/ArrowButton";
import { socialLinks } from "../../../source/consts";

const CTA = () => (
  <>
    <div css={{ display: "flex", gap: 30 }}>
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
    <ArrowButton variant="default">Shop</ArrowButton>
  </>
);

export default CTA;
