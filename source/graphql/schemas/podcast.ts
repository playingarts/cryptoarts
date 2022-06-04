import { gql } from "@apollo/client";
import { Schema, model, models, Model } from "mongoose";

const schema = new Schema<GQL.Podcast, Model<GQL.Podcast>, GQL.Podcast>({
  image: String,
  youtube: String,
  apple: String,
  spotify: String,
  episode: Number,
  name: String,
  podcastName: String,
});

export const Podcast =
  (models.Podcast as Model<GQL.Podcast>) || model("Podcast", schema);

const getPodcasts = async ({ name, shuffle, limit }: GQL.QueryPodcastsArgs) => {
  let podcasts = await Podcast.find(name ? { name } : {});

  if (shuffle) {
    podcasts.sort(() => Math.random() - Math.random())[0];
  }

  if (limit) {
    podcasts = podcasts.slice(0, limit);
  }

  return podcasts;
};

export const resolvers: GQL.Resolvers = {
  Query: {
    podcasts: (_, args) => getPodcasts(args),
  },
};

export const typeDefs = gql`
  type Query {
    podcasts(name: String, shuffle: Boolean, limit: Int): [Podcast]!
  }

  type Podcast {
    image: String
    youtube: String
    apple: String
    spotify: String
    episode: Int!
    name: String
    podcastName: String
  }
`;
