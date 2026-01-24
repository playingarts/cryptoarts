/**
 * Artist Resolvers
 *
 * Thin resolvers that delegate to ArtistService.
 */

import { artistService } from "../../services";

export const resolvers: GQL.Resolvers = {
  Artist: {
    social: ({ website, social }) => artistService.getSocials(website, social),
  },
  Query: {
    artists: (_, { hasPodcast, shuffle, limit }) =>
      artistService.getArtists({ hasPodcast, shuffle, limit }),
  },
};
