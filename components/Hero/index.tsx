import { FC, HTMLAttributes } from "react";
import Card from "../Card";

type Props = HTMLAttributes<HTMLElement>;

const Hero: FC<Props> = (props) => (
  <div
    {...props}
    css={{
      position: "relative",
    }}
  >
    <Card
      interactive={true}
      noInfo={true}
      card={{
        _id: "61db1bebb3f83f2efa2ea08d",
        artist: {
          _id: "_id",
          name: "name",
          slug: "slug",
          userpic: "userpic",
          social: {},
        },
        deck: { _id: "_id", title: "title", info: "info", slug: "slug" },
        img:
          "https://s3.amazonaws.com/img.playingarts.com/zero-big-hd/jack-of-hearts-jonathan-wong.jpg",
        video:
          "https://s3.amazonaws.com/img.playingarts.com/zero-video/j-hearts_01.mp4",
      }}
      css={(theme) => ({
        transform: "rotate(15deg) scale(0.95)",
        filter: "blur(1px)",
        position: "absolute",
        left: theme.spacing(30),
      })}
    />
    <Card
      interactive={true}
      card={{
        _id: "61db141bc683592b14bb0b8e",
        video: "",
        img:
          "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-gian-wong.jpg",
        artist: {
          _id: "_id",
          name: "name",
          slug: "slug",
          userpic: "userpic",
          social: {},
        },
        deck: { _id: "_id", title: "title", info: "info", slug: "slug" },
      }}
      size="big"
      noInfo={true}
      css={(theme) => ({
        transform: "rotate(-15deg) scale(0.85)",
        marginTop: -theme.spacing(8),
        marginLeft: -theme.spacing(3),
      })}
    />
  </div>
);

export default Hero;
