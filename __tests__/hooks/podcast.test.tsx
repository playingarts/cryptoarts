import { GraphQLError } from "graphql";
import { podcastsQuery, usePodcasts } from "../../hooks/podcast";
import { renderApolloHook, waitFor } from "../../jest/apolloTestUtils";

const mockPodcast = {
  name: "Test Podcast",
  image: "podcast.jpg",
  episode: 1,
  youtube: "https://youtube.com/test",
  spotify: "https://spotify.com/test",
  apple: "https://apple.com/test",
  podcastName: "Playing Arts Podcast",
  desc: "A test podcast episode",
  time: "45:00",
};

describe("hooks/podcast", () => {
  describe("usePodcasts", () => {
    it("returns podcasts data on success", async () => {
      const mocks = [
        {
          request: { query: podcastsQuery, variables: {} },
          result: { data: { podcasts: [mockPodcast] } },
        },
      ];

      const { result } = renderApolloHook(() => usePodcasts(), { mocks });

      expect(result.current.loading).toBe(true);
      expect(result.current.podcasts).toBeUndefined();

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.podcasts).toBeDefined();
    });

    it("returns filtered podcasts by name", async () => {
      const mocks = [
        {
          request: { query: podcastsQuery, variables: { name: "Test" } },
          result: { data: { podcasts: [mockPodcast] } },
        },
      ];

      const { result } = renderApolloHook(
        () => usePodcasts({ variables: { name: "Test" } }),
        { mocks }
      );

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.podcasts).toBeDefined();
    });

    it("returns shuffled and limited podcasts", async () => {
      const mocks = [
        {
          request: {
            query: podcastsQuery,
            variables: { shuffle: true, limit: 5 },
          },
          result: { data: { podcasts: [mockPodcast] } },
        },
      ];

      const { result } = renderApolloHook(
        () => usePodcasts({ variables: { shuffle: true, limit: 5 } }),
        { mocks }
      );

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.podcasts).toBeDefined();
    });

    it("returns error on failure", async () => {
      const mocks = [
        {
          request: { query: podcastsQuery, variables: {} },
          result: { errors: [new GraphQLError("Failed to fetch podcasts")] },
        },
      ];

      const { result } = renderApolloHook(() => usePodcasts(), { mocks });

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.error?.message).toContain("Failed to fetch podcasts");
    });
  });
});
