import {
  FC,
  // Fragment,
  HTMLAttributes,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
// import { breakpoints } from "../../../source/enums";
import Card from "../../Card";
import SizeProvider from "../../SizeProvider";
import { useRandomCardsWithoutDeck } from "../../../hooks/card";
import { useResizeDetector } from "react-resize-detector";
import Link from "../../Link";

const emptyCard = {
  _id: "",
  video: "",
  img: "",
  value: "",
  suit: "",
  info: "",
  deck: "",
  artist: "",
  opensea: "",
};

const animationSpeed = 500;

const HeroCard: FC<
  HTMLAttributes<HTMLElement> & {
    initTransform?: string;
    getCard: () => GQL.Card;
  }
> = ({ initTransform = "", getCard, ...props }) => {
  const { width, height, ref } = useResizeDetector();

  const [animation, setAnimation] =
    useState<"rotateY90 ease-in" | "rotateY180 ease-out" | "">();

  const [card, setCard] = useState<GQL.Card>(emptyCard as unknown as GQL.Card);

  const [nextCard, setNextCard] = useState<GQL.Card>(
    emptyCard as unknown as GQL.Card
  );

  const [nextCardLoaded, setNextCardLoaded] = useState(false);

  const [scram, setScram] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = nextCard.img;

    img.onload = () => {
      setNextCardLoaded(true);
    };
  }, [nextCard]);

  useEffect(() => {
    setCard(getCard());
  }, []);

  useEffect(() => {
    setScram(false);

    const scramTimeout = setTimeout(() => {
      setScram(true);
    }, Math.random() * 15000 + 1000);

    return () => clearTimeout(scramTimeout);
  }, [scram]);

  useLayoutEffect(() => {
    if (scram && nextCard) {
      setAnimation("rotateY90 ease-in");
    }
  }, [scram, nextCardLoaded]);

  useEffect(() => {
    setNextCard(getCard());
    setNextCardLoaded(false);
  }, [card]);

  const animationEnd = () => {
    if (animation === "rotateY90 ease-in") {
      setCard(nextCard);
      setAnimation("rotateY180 ease-out");
    }
  };

  return (
    <div
      {...props}
      css={(theme) => [
        {
          transform: initTransform,
          position: "relative",
          display: "inline-block",
          width: width,
          height: height,
          marginRight: theme.spacing(1),
          marginBottom: theme.spacing(1),
        },
      ]}
    >
      <div css={{ position: "absolute", top: 0, left: 0 }} ref={ref}>
        <Link href={card.deck ? `/${card.deck.slug}/${card.artist.slug}` : "/"}>
          <Card
            card={card}
            {...props}
            interactive={true}
            noInfo={true}
            customSize={true}
            filter={true}
            animated={true}
            noTransition={true}
            style={{ animation: `${animation} ${animationSpeed}ms forwards` }}
            onAnimationEnd={animationEnd}
          />
        </Link>
      </div>
    </div>
  );
};

const ComposedMainHero: FC<HTMLAttributes<HTMLElement>> = (props) => {
  // const { width } = useSize();

  const { cards } = useRandomCardsWithoutDeck();

  const [stack, setStack] = useState<string[]>([]);

  useEffect(() => {
    setStack([]);
  }, [cards]);

  const getCard = () => {
    if (!cards || cards.length === 0) {
      return emptyCard as unknown as GQL.Card;
    }

    const rand = Math.floor(Math.random() * (cards.length - stack.length));

    const card = cards.filter(
      ({ _id }) => stack.findIndex((id) => id == _id) === -1
    )[rand];
    if (stack.length > 50) {
      setStack([card._id]);
    } else {
      setStack([...stack, card._id]);
    }
    return card;
  };

  return (
    <SizeProvider>
      <div
        {...props}
        css={{
          "--perspWidth": "calc(var(--width)*5)",
          "@keyframes rotateY180": {
            "0%": {
              transform: "perspective(var(--perspWidth)) rotateY(-90deg) ",
            },
            "100%": {
              transform: "perspective(var(--perspWidth)) rotateY(0deg) ",
            },
          },
          "@keyframes rotateY90": {
            "0%": {
              transform: "perspective(var(--perspWidth)) rotateY(0deg) ",
            },
            "100%": {
              transform: "perspective(var(--perspWidth)) rotateY(90deg) ",
            },
          },
        }}
      >
        <HeroCard getCard={getCard} initTransform="translateY(50%)" />
        <HeroCard getCard={getCard} />
        <HeroCard getCard={getCard} initTransform="translateY(50%)" />
        <br />
        <HeroCard getCard={getCard} initTransform="translateY(50%)" />
        <HeroCard getCard={getCard} />
        <HeroCard getCard={getCard} initTransform="translateY(50%)" />
        <HeroCard getCard={getCard} />
        <br />

        <HeroCard
          getCard={getCard}
          initTransform="translateY(50%) rotate(-10.62deg)"
          // initTransform="translateY(110%) translateX(20%) rotate(-10.62deg)"
          css={(theme) => [
            {
              top: theme.spacing(20.3),
              left: theme.spacing(4),
              zIndex: 1,
              [theme.maxMQ.md]: {
                left: theme.spacing(0),
              },
              [theme.maxMQ.sm]: {
                top: theme.spacing(34),
                left: theme.spacing(15),
              },
              [theme.maxMQ.xsm]: {
                top: theme.spacing(36),
                left: theme.spacing(15.5),
              },
            },
          ]}
        />

        <HeroCard
          getCard={getCard}
          css={(theme) => [
            {
              [theme.mq.sm]: {
                top: theme.spacing(0),
              },
            },
          ]}
        />

        <HeroCard getCard={getCard} initTransform="translateY(50%)" />
        {/* {width >= breakpoints.sm && (
          <Fragment>
            <br />

            <HeroCard
              getCard={getCard}
              initTransform="translateX(100%) rotate(30deg)"
              css={(theme) => [
                {
                  display: "inline-block",
                  position: "relative",
                  marginRight: theme.spacing(1),
                  marginBottom: theme.spacing(1),
                  marginLeft: theme.spacing(2),
                  top: theme.spacing(23),
                },
              ]}
            />
          </Fragment>
        )} */}
      </div>
    </SizeProvider>
  );
};

export default ComposedMainHero;
