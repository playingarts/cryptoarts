import { FC, HTMLAttributes } from "react";
import Box from "../Box";
import Button from "../Button";
import Card from "../Card";
import Chevron from "../Icons/Chevron";
import Text from "../Text";

interface Props extends HTMLAttributes<HTMLElement> {
  title: string;
  text: string;
}

const Hero: FC<Props> = ({ title, text, ...props }) => {
  return (
    <div
      {...props}
      css={(theme) => ({
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr 1fr",
        gap: theme.spacing(3),
      })}
    >
      <Box css={{ gridColumn: "span 3" }}>
        <Text component="h1" css={{ margin: 0 }}>
          {title}
        </Text>
        <Text
          variant="body3"
          css={(theme) => ({
            margin: 0,
            marginTop: theme.spacing(2),
            paddingTop: 20,
            paddingBottom: 45,
          })}
        >
          {text}
        </Text>
        <Button
          variant="bordered"
          Icon={Chevron}
          size="small"
          iconProps={{ css: { height: 16, transform: "rotate(90deg)" } }}
        />
      </Box>
      <div css={{ position: "relative" }}>
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
            top: theme.spacing(3),
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
            marginTop: -theme.spacing(5),
            marginLeft: -theme.spacing(3),
          })}
        />
      </div>
    </div>
  );
};

export default Hero;
