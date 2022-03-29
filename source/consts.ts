export const socialLinks = (() => {
  const data = process.env.NEXT_PUBLIC_SOCIAL_LINKS || "{}";
  let parsedData: object | undefined;

  try {
    parsedData = JSON.parse(data);
  } catch (error) {
    console.error("Failed to parse social links.", data);
  }

  return {
    appStore: "https://apps.apple.com/es/app/playing-arts/id1594901668?l=en",
    playStore:
      "https://play.google.com/store/apps/details?id=com.digitalabstracts.playingarts",
    podcastYoutube:
      "https://www.youtube.com/playlist?list=PLhr51fAv2oZrgD0MreHVp8m9fdb7ETF4L",
    podcastSpotify:
      "https://open.spotify.com/show/6KGDyycLB3F5Tfdu6T7OCN?si=ef57f71704eb4fb9",
    podcastAppleMusic:
      "https://podcasts.apple.com/es/podcast/playing-arts-podcast/id1605752620",
    twitter: "https://twitter.com/playingarts",
    discord: "https://discord.gg/u8gfv2zdG3",
    instagram: "https://instagram.com/playingarts",
    youtube: "https://youtube.com/playingartsproject",
    pinterest: "https://pinterest.com/playingarts",
    behance: "https://behance.net/playing-arts",
    facebook: "https://facebook.com/playingarts",
    allTokens: "https://opensea.io/collection/cryptoedition",
    leaderboard:
      "https://nftnerds.ai/collection/0xc22616e971a670e72f35570337e562c3e515fbfe",
    allStats: "https://getpaced.xyz/",
    ...parsedData,
  };
})();
