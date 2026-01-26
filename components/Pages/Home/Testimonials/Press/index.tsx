import { FC, HTMLAttributes } from "react";
import Grid from "../../../../Grid";
import Fastcompany from "../../../../Icons/Fastcompany";
import CreativeBloq from "../../../../Icons/CreativeBloq";
import DigitalArts from "../../../../Icons/DigitalArts";
import Esquire from "../../../../Icons/Esquire";

const PRESS_LINKS = [
  {
    name: "Fast Company",
    href: "https://www.fastcompany.com/90575448/these-playing-cards-show-fantastical-ways-the-world-could-change-by-2120",
    Icon: Fastcompany,
    scale: 1,
  },
  {
    name: "Creative Bloq",
    href: "https://www.creativebloq.com/illustration/artists-collaborate-picture-perfect-playing-cards-10134891",
    Icon: CreativeBloq,
    scale: 0.9,
  },
  {
    name: "Digital Arts",
    href: "https://www.digitalartsonline.co.uk/features/illustration/55-global-designers-illustrators-each-designed-playing-card-in-this-unique-deck/",
    Icon: DigitalArts,
    scale: 0.8,
  },
  {
    name: "Esquire",
    href: "https://www.esquire.com/style/mens-fashion/g4233463/artistic-deck-of-cards",
    Icon: Esquire,
    scale: 0.9,
  },
];

const Press: FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => {
  return (
    <Grid id="press" css={{ marginTop: 50 }} {...props}>
      {PRESS_LINKS.map(({ name, href, Icon, scale }) => (
        <a
          key={name}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Read about Playing Arts on ${name}`}
          css={(theme) => ({
            gridColumn: "span 3",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
            color: theme.colors.third_black,
            transition: "color 0.2s",
            "&:hover": {
              color: theme.colors.black,
            },
            "&:focus-visible": {
              outline: `2px solid ${theme.colors.dark_gray}`,
              outlineOffset: 4,
              borderRadius: 4,
            },
          })}
        >
          <div
            css={{
              transform: scale !== 1 ? `scale(${scale})` : undefined,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Icon />
          </div>
        </a>
      ))}
    </Grid>
  );
};

export default Press;
