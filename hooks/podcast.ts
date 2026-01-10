import { gql } from "@apollo/client";
import { useLazyQuery, useQuery } from "@apollo/client/react";
import { useEffect, useRef, useState } from "react";

export const podcastsQuery = gql`
  query Podcasts($name: String, $shuffle: Boolean, $limit: Int) {
    podcasts(name: $name, shuffle: $shuffle, limit: $limit) {
      name
      image
      episode
      youtube
      spotify
      apple
      podcastName
      desc
      time
    }
  }
`;

export const usePodcasts = (
  options: useQuery.Options<Pick<GQL.Query, "podcasts">> = {}
) => {
  const { data: { podcasts } = { podcasts: undefined }, ...methods } = useQuery<
    Pick<GQL.Query, "podcasts">
  >(podcastsQuery, {
    // Cache podcasts to avoid refetching
    fetchPolicy: "cache-first",
    ...options,
  });

  return { ...methods, podcasts };
};

/**
 * Lazy load podcasts when element enters viewport.
 * Uses IntersectionObserver to defer loading until visible.
 */
export const useLazyPodcasts = (
  options: useQuery.Options<Pick<GQL.Query, "podcasts">> = {}
) => {
  const [loadPodcasts, { data: { podcasts } = { podcasts: undefined }, ...methods }] =
    useLazyQuery<Pick<GQL.Query, "podcasts">>(podcastsQuery, {
      ...options,
      // Always use no-cache for lazy podcasts to ensure fresh shuffle results
      // Place AFTER ...options to prevent override
      fetchPolicy: "no-cache",
    });

  const containerRef = useRef<HTMLDivElement>(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  // Store variables for use in effect
  const variables = options.variables;

  useEffect(() => {
    if (hasLoaded || !containerRef.current) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          // Pass variables explicitly to ensure they're used
          loadPodcasts({ variables });
          setHasLoaded(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" } // Start loading 200px before visible
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [hasLoaded, loadPodcasts, variables]);

  return { containerRef, ...methods, podcasts };
};
