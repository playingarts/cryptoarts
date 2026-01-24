/**
 * Artist Service
 *
 * Business logic for artist-related operations.
 * Extracted from GraphQL resolvers for better separation of concerns.
 */

import { Artist } from "../models";

interface GetArtistsOptions {
  hasPodcast?: boolean | null;
  shuffle?: boolean | null;
  limit?: number | null;
}

export class ArtistService {
  /**
   * Get artists with optional filtering, shuffling, and limiting
   */
  async getArtists({
    hasPodcast,
    shuffle,
    limit,
  }: GetArtistsOptions = {}): Promise<GQL.Artist[]> {
    const query = hasPodcast ? { podcast: { $ne: undefined } } : {};
    let artists = await Artist.find(query);

    if (shuffle) {
      artists = artists.sort(() => Math.random() - Math.random());
    }

    if (limit) {
      artists = artists.slice(0, limit);
    }

    return artists as unknown as GQL.Artist[];
  }

  /**
   * Get a single artist by ID
   */
  async getArtistById(id: string): Promise<GQL.Artist | undefined> {
    const artist = await Artist.findById(id);
    return (artist as unknown as GQL.Artist) || undefined;
  }

  /**
   * Get a single artist by slug
   */
  async getArtistBySlug(slug: string): Promise<GQL.Artist | undefined> {
    const artist = await Artist.findOne({ slug });
    return (artist as unknown as GQL.Artist) || undefined;
  }

  /**
   * Combine website and social fields into a single socials object
   * This matches the GraphQL Artist.social resolver behavior
   */
  getSocials(
    website: string | undefined,
    social: GQL.Socials | undefined
  ): GQL.Socials {
    return { website, ...social };
  }
}

// Export singleton instance
export const artistService = new ArtistService();
