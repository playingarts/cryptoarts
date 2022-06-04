import { Podcast } from "../source/graphql/schemas/podcast";
import { connect } from "../source/mongoose";

export const podcasts: Omit<GQL.Podcast, "_id">[] = [
  {
    name: "Jonathan Monaghan",
    podcastName: "Jonathan Monaghan",
    image: "https://s3.amazonaws.com/img.playingarts.com/www/podcast/ep18.jpg",
    episode: 18,
    youtube:
      "https://www.youtube.com/watch?v=ZuqptFNmFz0&list=PLhr51fAv2oZrgD0MreHVp8m9fdb7ETF4L",
  },
  {
    name: "Prateek Vatash",
    podcastName: "Prateek Vatash",
    image: "https://s3.amazonaws.com/img.playingarts.com/www/podcast/ep17.jpg",
    episode: 17,
    youtube:
      "https://www.youtube.com/watch?v=ux60RkIdA08&list=PLhr51fAv2oZrgD0MreHVp8m9fdb7ETF4L",
  },
  {
    name: "Vini Naso",
    podcastName: "Vini Naso",
    image: "https://s3.amazonaws.com/img.playingarts.com/www/podcast/ep16.jpg",
    episode: 16,
    youtube:
      "https://www.youtube.com/watch?v=PsKAHq-L0zw&list=PLhr51fAv2oZrgD0MreHVp8m9fdb7ETF4L",
  },
  {
    name: "Josh Pierce",
    podcastName: "Josh Pierce",
    image: "https://s3.amazonaws.com/img.playingarts.com/www/podcast/ep15.jpg",
    episode: 15,
    youtube:
      "https://www.youtube.com/watch?v=P0J1zVFA-d4&list=PLhr51fAv2oZrgD0MreHVp8m9fdb7ETF4L",
  },
  {
    name: "RWR2",
    podcastName: "Rodrigo Rezende",
    image: "https://s3.amazonaws.com/img.playingarts.com/www/podcast/ep14.jpg",
    episode: 14,
    youtube:
      "https://www.youtube.com/watch?v=BBtabPQJu_o&list=PLhr51fAv2oZrgD0MreHVp8m9fdb7ETF4L",
  },
  {
    name: "Nicole Ruggiero",
    podcastName: "Nicole Ruggiero",
    image: "https://s3.amazonaws.com/img.playingarts.com/www/podcast/ep12.jpg",
    episode: 12,
    youtube:
      "https://www.youtube.com/watch?v=oS0gxCI-OVo&list=PLhr51fAv2oZrgD0MreHVp8m9fdb7ETF4L",
  },
  {
    name: "Velvet Spectrum",
    podcastName: "Luke Choice",
    image: "https://s3.amazonaws.com/img.playingarts.com/www/podcast/ep11.jpg",
    episode: 11,
    youtube:
      "https://www.youtube.com/watch?v=zOcsX3rWsEk&list=PLhr51fAv2oZrgD0MreHVp8m9fdb7ETF4L",
  },
  {
    name: "David Ariew",
    podcastName: "David Ariew",
    image: "https://s3.amazonaws.com/img.playingarts.com/www/podcast/ep10.jpg",
    episode: 10,
    apple:
      "https://podcasts.apple.com/es/podcast/playing-arts-podcast-ep10-david-ariew/id1605752620?i=1000557107463",
    spotify:
      "https://open.spotify.com/episode/6KRtEOSnjXGRuueBRSzdxq?si=dde97c10830445aa",
    youtube:
      "https://www.youtube.com/watch?v=_TC2miIL2vI&list=PLhr51fAv2oZrgD0MreHVp8m9fdb7ETF4L",
  },
  {
    name: "Baugasm",
    podcastName: "Vasjen Katro",
    image: "https://s3.amazonaws.com/img.playingarts.com/www/podcast/ep9.jpg",
    episode: 9,
    youtube:
      "https://www.youtube.com/watch?v=7IRg4h5be6Q&list=PLhr51fAv2oZrgD0MreHVp8m9fdb7ETF4L",
    spotify:
      "https://open.spotify.com/episode/7iijcBAMkSZ3XSesCEWkbE?si=2a57ee98c9f04a06",
    apple:
      "https://podcasts.apple.com/es/podcast/playing-arts-podcast-ep09-baugasm/id1605752620?i=1000556682141",
  },
  {
    name: "Kaloian Toshev — MZK",
    podcastName: "Kaloian Toshev",
    image: "https://s3.amazonaws.com/img.playingarts.com/www/podcast/ep8.jpg",
    episode: 8,
    apple:
      "https://podcasts.apple.com/es/podcast/playing-arts-podcast-ep08-kaloian-toshev/id1605752620?i=1000555858548",
    spotify:
      "https://open.spotify.com/episode/1krbXhxYqKK3EHduIZKOyx?si=d5c55fbafb254ab8",
    youtube:
      "https://www.youtube.com/watch?v=8xrmGV9Fkzo&list=PLhr51fAv2oZrgD0MreHVp8m9fdb7ETF4L",
  },
  {
    name: "Ryan Hawthorne",
    podcastName: "Ryan Hawthorne",
    image: "https://s3.amazonaws.com/img.playingarts.com/www/podcast/ep7.jpg",
    episode: 7,
    youtube:
      "https://www.youtube.com/watch?v=W8uakjC5R8U&list=PLhr51fAv2oZrgD0MreHVp8m9fdb7ETF4L&index=9",
    spotify:
      "https://open.spotify.com/episode/5FMENQ9AYvZ6fn8PD86MMI?si=79971a86135c46c7",
    apple:
      "https://podcasts.apple.com/es/podcast/playing-arts-podcast-ep07-ryan-hawthorne/id1605752620?i=1000554349513",
  },
  {
    name: "fesq",
    podcastName: "Fesq",
    image: "https://s3.amazonaws.com/img.playingarts.com/www/podcast/ep6.jpg",
    episode: 6,
    apple:
      "https://podcasts.apple.com/es/podcast/playing-arts-podcast-ep06-fesq/id1605752620?i=1000553484081",
    spotify:
      "https://open.spotify.com/episode/4dogCjoLARmqlhP2cKKnbQ?si=a77f6037dc934c95",
    youtube:
      "https://www.youtube.com/watch?v=_KX3GgN_VVo&list=PLhr51fAv2oZrgD0MreHVp8m9fdb7ETF4L",
  },
  {
    name: "Tim Riopelle",
    podcastName: "Tim Riopelle",
    image: "https://s3.amazonaws.com/img.playingarts.com/www/podcast/ep5.jpg",
    episode: 5,
    youtube:
      "https://www.youtube.com/watch?v=JXjLz0pvoFs&list=PLhr51fAv2oZrgD0MreHVp8m9fdb7ETF4L&index=11",
    spotify:
      "https://open.spotify.com/episode/6XbLR58oVVUtHPmM0R1kL9?si=a340e94094a2410b",
    apple:
      "https://podcasts.apple.com/es/podcast/playing-arts-podcast-ep05-tim-riopelle/id1605752620?i=1000552513476",
  },
  {
    name: "Eloh",
    podcastName: "Eloh",
    image: "https://s3.amazonaws.com/img.playingarts.com/www/podcast/ep4.jpg",
    episode: 4,
    apple:
      "https://podcasts.apple.com/es/podcast/playing-arts-podcast-ep04-eloh/id1605752620?i=1000551768812",
    spotify:
      "https://open.spotify.com/episode/3zPMavC64BBAd7pTmvBfEX?si=0177b9e7180049e5",
    youtube:
      "https://www.youtube.com/watch?v=QJv37GYGvU0&list=PLhr51fAv2oZrgD0MreHVp8m9fdb7ETF4L",
  },
  {
    name: "Bram Vanhaeren",
    podcastName: "Bram Vanhaeren",
    image: "https://s3.amazonaws.com/img.playingarts.com/www/podcast/ep3.jpg",
    episode: 3,
    youtube:
      "https://www.youtube.com/watch?v=ecesXLOguyw&list=PLhr51fAv2oZrgD0MreHVp8m9fdb7ETF4L",
    spotify:
      "https://open.spotify.com/episode/6r7njhAAPTg65YWt1bFeiv?si=42652f2d10c4407e",
    apple:
      "https://podcasts.apple.com/es/podcast/playing-arts-podcast-ep03-bram-vanhaeren/id1605752620?i=1000551292466",
  },
  {
    name: "GHØST GIRL",
    podcastName: "Lindon Schaab",
    image: "https://s3.amazonaws.com/img.playingarts.com/www/podcast/ep2.jpg",
    episode: 2,
    apple:
      "https://podcasts.apple.com/es/podcast/playing-arts-podcast-ep02-gh%C3%B8st-girl/id1605752620?i=1000548950965",
    spotify:
      "https://open.spotify.com/episode/3oySt5tuvc61Vdg99IK3JT?si=9787e9f64dc74774",
    youtube:
      "https://www.youtube.com/watch?v=WgKD6aTazsA&list=PLhr51fAv2oZrgD0MreHVp8m9fdb7ETF4L",
  },
  {
    name: "Jason Naylor",
    podcastName: "Jason Naylor",
    image: "https://s3.amazonaws.com/img.playingarts.com/www/podcast/ep1.jpg",
    youtube:
      "https://www.youtube.com/watch?v=i78vXb2d06w&list=PLhr51fAv2oZrgD0MreHVp8m9fdb7ETF4L",
    spotify:
      "https://open.spotify.com/episode/5gUf4nI9UqEXvlUyzAz1zW?si=788c9cb6870c4ba5",
    apple:
      "https://podcasts.apple.com/es/podcast/playing-arts-podcast-ep01-jason-naylor/id1605752620?i=1000548214960",
    episode: 1,
  },
];
const dump = async () => {
  await connect();

  await Podcast.deleteMany();

  await Podcast.insertMany(podcasts);
};

export default dump;
