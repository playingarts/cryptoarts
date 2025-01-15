import { Meta, StoryObj } from "@storybook/react/*";
import Component from ".";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { HttpResponse, graphql } from "msw";

type Story = StoryObj<typeof Component>;

const mockedClient = new ApolloClient({
  uri: "api/v1/graphql",
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "no-cache",
      errorPolicy: "all",
    },
    query: {
      fetchPolicy: "no-cache",
      errorPolicy: "all",
    },
  },
});

const meta = {
  component: Component,
  title: "New/Home/Podcast/Podcast",
  decorators: (Story) => (
    <ApolloProvider client={mockedClient}>
      <Story />
    </ApolloProvider>
  ),
} as Meta<typeof Component>;

export default meta;

export const Default: Story = {
  parameters: {
    msw: {
      handlers: [
        graphql.query("Podcasts", () =>
          HttpResponse.json({
            data: {
              podcasts: [
                {
                  name: "Jonathan Monaghan",
                  podcastName: "Jonathan Monaghan",
                  image:
                    "https://s3.amazonaws.com/img.playingarts.com/www/podcast/ep18.jpg",
                  episode: 18,
                  youtube:
                    "https://www.youtube.com/watch?v=ZuqptFNmFz0&list=PLhr51fAv2oZrgD0MreHVp8m9fdb7ETF4L",
                  desc: "In this episode Jonathan discusses his journey from neuroscience to motion design.",
                  time: "1h 35m",
                },
                {
                  name: "Prateek Vatash",
                  podcastName: "Prateek Vatash",
                  image:
                    "https://s3.amazonaws.com/img.playingarts.com/www/podcast/ep17.jpg",
                  episode: 17,
                  youtube:
                    "https://www.youtube.com/watch?v=ux60RkIdA08&list=PLhr51fAv2oZrgD0MreHVp8m9fdb7ETF4L",
                  desc: "In this episode Jonathan discusses his journey from neuroscience to motion design.",
                  time: "1h 35m",
                },
                {
                  name: "Vini Naso",
                  podcastName: "Vini Naso",
                  image:
                    "https://s3.amazonaws.com/img.playingarts.com/www/podcast/ep16.jpg",
                  episode: 16,
                  youtube:
                    "https://www.youtube.com/watch?v=PsKAHq-L0zw&list=PLhr51fAv2oZrgD0MreHVp8m9fdb7ETF4L",
                  apple:
                    "https://podcasts.apple.com/es/podcast/playing-arts-podcast-ep16-vini-naso/id1605752620?i=1000576644956",
                  spotify:
                    "https://open.spotify.com/episode/2WhPf3dneX7rMkAwKweTsB?si=1e1738f9941f441b",
                  desc: "In this episode Jonathan discusses his journey from neuroscience to motion design.",
                  time: "1h 35m",
                },
                {
                  name: "Josh Pierce",
                  podcastName: "Josh Pierce",
                  image:
                    "https://s3.amazonaws.com/img.playingarts.com/www/podcast/ep15.jpg",
                  episode: 15,
                  youtube:
                    "https://www.youtube.com/watch?v=P0J1zVFA-d4&list=PLhr51fAv2oZrgD0MreHVp8m9fdb7ETF4L",
                  spotify:
                    "https://open.spotify.com/episode/545habL2Q9sL6kDZUnmHPt?si=da9a0aeb102a4830",
                  apple:
                    "https://podcasts.apple.com/es/podcast/playing-arts-podcast-ep15-josh-pierce/id1605752620?i=1000571569683",
                  desc: "In this episode Jonathan discusses his journey from neuroscience to motion design.",
                  time: "1h 35m",
                },
                {
                  name: "RWR2",
                  podcastName: "Rodrigo Rezende",
                  image:
                    "https://s3.amazonaws.com/img.playingarts.com/www/podcast/ep14.jpg",
                  episode: 14,
                  youtube:
                    "https://www.youtube.com/watch?v=BBtabPQJu_o&list=PLhr51fAv2oZrgD0MreHVp8m9fdb7ETF4L",
                  spotify:
                    "https://open.spotify.com/episode/7i1sv8HX2Ij02nRXkeQXvO?si=d022fd2eb2fe41e9",
                  apple:
                    "https://podcasts.apple.com/es/podcast/playing-arts-podcast-ep14-rodrigo-rezende/id1605752620?i=1000570806968",
                  desc: "In this episode Jonathan discusses his journey from neuroscience to motion design.",
                  time: "1h 35m",
                },
                {
                  name: "Nicole Ruggiero",
                  podcastName: "Nicole Ruggiero",
                  image:
                    "https://s3.amazonaws.com/img.playingarts.com/www/podcast/ep12.jpg",
                  episode: 12,
                  youtube:
                    "https://www.youtube.com/watch?v=oS0gxCI-OVo&list=PLhr51fAv2oZrgD0MreHVp8m9fdb7ETF4L",
                  spotify:
                    "https://open.spotify.com/episode/54T7C8Grzr8jPLcHHxVRZY?si=1a7e8d8af36b47f1",
                  apple:
                    "https://podcasts.apple.com/es/podcast/playing-arts-podcast-ep12-nicole-ruggiero/id1605752620?i=1000570019324",
                  desc: "In this episode Jonathan discusses his journey from neuroscience to motion design.",
                  time: "1h 35m",
                },
                {
                  name: "Velvet Spectrum",
                  podcastName: "Luke Choice",
                  image:
                    "https://s3.amazonaws.com/img.playingarts.com/www/podcast/ep11.jpg",
                  episode: 11,
                  youtube:
                    "https://www.youtube.com/watch?v=zOcsX3rWsEk&list=PLhr51fAv2oZrgD0MreHVp8m9fdb7ETF4L",
                  spotify:
                    "https://open.spotify.com/episode/2Mx5U0BQktSmV9gexSTB9p?si=7e3aa150a73a4942",
                  apple:
                    "https://podcasts.apple.com/es/podcast/playing-arts-podcast-ep11-velvet-spectrum/id1605752620?i=1000569260593",
                  desc: "In this episode Jonathan discusses his journey from neuroscience to motion design.",
                  time: "1h 35m",
                },
              ],
            },
          })
        ),
      ],
    },
  },
};
