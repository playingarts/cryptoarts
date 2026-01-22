import { FC, HTMLAttributes } from "react";
import { useLeaderboard } from "../../../../../hooks/opensea";
import ScandiBlock from "../../../../ScandiBlock";
import Text from "../../../../Text";
import Link from "../../../../Link";

/** Format address as 0x1234...5678 */
const formatAddress = (address: string) => {
  if (!address || address.length < 10) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

interface HolderProps {
  address: string;
  count: number;
  username?: string;
  profileImage?: string;
  hideCount?: boolean;
}

const Holder: FC<HolderProps> = ({ address, count, username, profileImage, hideCount }) => {
  const opensesaProfileUrl = `https://opensea.io/${address}?collectionSlugs=cryptoedition`;

  return (
    <Link
      href={opensesaProfileUrl}
      target="_blank"
      rel="noopener noreferrer"
      css={(theme) => ({
        display: "flex",
        alignItems: "center",
        gap: 15,
        textDecoration: "none",
        transition: "opacity 0.2s",
        "&:hover": {
          opacity: 0.7,
        },
      })}
    >
      {profileImage ? (
        <img
          src={profileImage}
          alt="Holder avatar"
          css={{
            width: 40,
            height: 40,
            borderRadius: 5,
            objectFit: "cover",
          }}
        />
      ) : (
        <div
          css={(theme) => ({
            width: 40,
            height: 40,
            borderRadius: 5,
            background: theme.colors.charcoal_gray,
          })}
        />
      )}
      <Text
        typography="paragraphSmall"
        css={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {hideCount ? "" : `${count} – `}{username || formatAddress(address)}
      </Text>
    </Link>
  );
};

const HolderSkeleton: FC = () => (
  <div css={{ display: "flex", alignItems: "center", gap: 15 }}>
    <div
      css={(theme) => ({
        width: 40,
        height: 40,
        borderRadius: 5,
        background: theme.colors.charcoal_gray,
        opacity: 0.5,
      })}
    />
    <div
      css={(theme) => ({
        width: 100,
        height: 16,
        borderRadius: 4,
        background: theme.colors.charcoal_gray,
        opacity: 0.5,
      })}
    />
  </div>
);

const categories = [
  {
    title: "Top Holders",
    subtitle: "Highest # of NFTs held",
    key: "topHolders" as const,
    hideCount: false,
  },
  {
    title: "Active Traders",
    subtitle: "Most # of transactions",
    key: "activeTraders" as const,
    hideCount: false,
  },
  {
    title: "Rare Holders",
    subtitle: "Backsides and jokers",
    key: "rareHolders" as const,
    hideCount: true,
  },
];

const Leaderboard: FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => {
  const { leaderboard, loading } = useLeaderboard({
    variables: { slug: "crypto" },
  });

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
        {categories.map((category) => (
          <div key={category.key} css={[{ flex: "1 1 0", minWidth: 0 }]}>
            <Text typography="newh4" css={[{ marginBottom: 5, fontSize: 20 }]}>
              {category.title}
            </Text>
            <Text typography="paragraphSmall">{category.subtitle}</Text>
            <ScandiBlock
              css={[
                {
                  display: "block",
                  width: "100%",
                  marginTop: 30,
                  " > *": {
                    paddingTop: 30,
                  },
                  " > *:first-of-type": {
                    paddingTop: 0,
                  },
                },
              ]}
            >
              {loading || !leaderboard ? (
                <>
                  <HolderSkeleton />
                  <HolderSkeleton />
                  <HolderSkeleton />
                  <HolderSkeleton />
                  <HolderSkeleton />
                </>
              ) : (
                leaderboard[category.key]?.map((holder) => (
                  <Holder
                    key={holder.address}
                    address={holder.address}
                    count={holder.count}
                    username={holder.username ?? undefined}
                    profileImage={holder.profileImage ?? undefined}
                    hideCount={category.hideCount}
                  />
                ))
              )}
            </ScandiBlock>
          </div>
        ))}
      </div>
      <Text
        typography="paragraphSmall"
        css={(theme) => [{ color: theme.colors.white50, marginTop: 30, fontSize: 15 }]}
      >
        Updated daily from OpenSea
      </Text>
    </div>
  );
};

export default Leaderboard;
