import { gql } from "@apollo/client";

/**
 * Social media links fragment
 */
export const SocialFragment = gql`
  fragment SocialFragment on Socials {
    website
    instagram
    facebook
    twitter
    behance
    dribbble
    foundation
    superrare
    makersplace
    knownorigin
    rarible
    niftygateway
    showtime
  }
`;

/**
 * Podcast info fragment
 */
export const PodcastFragment = gql`
  fragment PodcastFragment on Podcast {
    image
    youtube
    spotify
    apple
    episode
  }
`;

/**
 * Basic artist info (minimal fields for lists)
 */
export const ArtistBasicFragment = gql`
  fragment ArtistBasicFragment on Artist {
    name
    slug
    userpic
  }
`;

/**
 * Full artist info with social and podcast
 */
export const ArtistFragment = gql`
  ${SocialFragment}
  ${PodcastFragment}

  fragment ArtistFragment on Artist {
    name
    userpic
    info
    country
    website
    slug
    podcast {
      ...PodcastFragment
    }
    social {
      ...SocialFragment
    }
  }
`;
