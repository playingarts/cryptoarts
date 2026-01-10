import { FC, HTMLAttributes, useMemo } from "react";
import Grid from "../../../../Grid";
import ScandiBlock from "../../../../ScandiBlock";
import Fastcompany from "../../../../Icons/Fastcompany";
import CreativeBloq from "../../../../Icons/CreativeBloq";
import DigitalArts from "../../../../Icons/DigitalArts";
import Esquire from "../../../../Icons/Esquire";

const PRESS_LINKS = [
  {
    name: "Fast Company",
    href: "https://www.fastcompany.com/90575448/these-playing-cards-show-fantastical-ways-the-world-could-change-by-2120",
    Icon: Fastcompany,
  },
  {
    name: "Creative Bloq",
    href: "https://www.creativebloq.com/illustration/artists-collaborate-picture-perfect-playing-cards-10134891",
    Icon: CreativeBloq,
  },
  {
    name: "Digital Arts",
    href: "https://www.digitalartsonline.co.uk/features/illustration/55-global-designers-illustrators-each-designed-playing-card-in-this-unique-deck/",
    Icon: DigitalArts,
  },
  {
    name: "Esquire",
    href: "https://www.esquire.com/style/mens-fashion/g4233463/artistic-deck-of-cards",
    Icon: Esquire,
  },
];

// Fisher-Yates shuffle
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const Press: FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => {
  // Shuffle once on mount
  const shuffledLinks = useMemo(() => shuffleArray(PRESS_LINKS), []);

  return (
    <Grid css={{ marginTop: 50 }} {...props}>
      {shuffledLinks.map(({ name, href, Icon }) => (
        <ScandiBlock
          key={name}
          opacity={0.3}
          css={{
            gridColumn: "span 3",
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
          }}
        >
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Read about Playing Arts on ${name}`}
            css={(theme) => ({
              color: theme.colors.third_black,
              transition: "opacity 0.2s, transform 0.2s",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              "&:hover": {
                opacity: 0.7,
                transform: "scale(1.05)",
              },
              "&:focus-visible": {
                outline: `2px solid ${theme.colors.dark_gray}`,
                outlineOffset: 4,
                borderRadius: 4,
              },
            })}
          >
            <Icon />
          </a>
        </ScandiBlock>
      ))}
    </Grid>
  );
};

export default Press;
