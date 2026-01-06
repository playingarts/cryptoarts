import { FC, HTMLAttributes } from "react";
import Grid from "../../../../Grid";
import Fastcompany from "../../../../Icons/Fastcompany";
import CreativeBloq from "../../../../Icons/CreativeBloq";
import DigitalArts from "../../../../Icons/DigitalArts";
import Esquire from "../../../../Icons/Esquire";

const Press: FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => (
  <Grid
    css={(theme) => ({
      gap: theme.spacing(3),
      marginTop: 50,
      lineHeight: "80px",
      "> *": {
        color: theme.colors.third_black,
      },
      [theme.maxMQ.md]: {
        [theme.maxMQ.md]: {
          gridTemplateColumns: `repeat(6, ${theme.spacing(7.5)}px)`,
        },
      },
    })}
  >
    <a
      rel="noreferrer"
      href="https://www.fastcompany.com/90575448/these-playing-cards-show-fantastical-ways-the-world-could-change-by-2120"
      target="_blank"
      css={{ gridColumn: "span 3", textAlign: "center" }}
    >
      <Fastcompany />
    </a>
    <a
      rel="noreferrer"
      href="https://www.creativebloq.com/illustration/artists-collaborate-picture-perfect-playing-cards-10134891"
      target="_blank"
      css={{ gridColumn: "span 3", textAlign: "center" }}
    >
      <CreativeBloq />
    </a>
    <a
      rel="noreferrer"
      href="https://www.digitalartsonline.co.uk/features/illustration/55-global-designers-illustrators-each-designed-playing-card-in-this-unique-deck/"
      target="_blank"
      css={{ gridColumn: "span 3", textAlign: "center" }}
    >
      <DigitalArts />
    </a>
    <a
      rel="noreferrer"
      href="https://www.esquire.com/style/mens-fashion/g4233463/artistic-deck-of-cards"
      target="_blank"
      css={{ gridColumn: "span 3", textAlign: "center" }}
    >
      <Esquire />
    </a>
  </Grid>
);

export default Press;
