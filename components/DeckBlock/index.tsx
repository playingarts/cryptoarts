import { forwardRef, ForwardRefRenderFunction } from "react";
import { theme } from "../../pages/_app";
import { breakpoints } from "../../source/enums";
import Button from "../Button";
import Bag from "../Icons/Bag";
import Link from "../Link";
import { useSize } from "../SizeProvider";
import BlockWithProperties from "../_composed/BlockWithProperties";

export interface Props {
  deck: GQL.Deck;
  palette: "light" | "dark";
}

const DeckBlock: ForwardRefRenderFunction<HTMLElement, Props> = ({
  deck,
  palette,
}) => {
  const common = () => ({
    borderRadius: "20px",
    [theme.maxMQ.sm]: {
      borderRadius: "10px",
      flexBasis: "100%",
      flexGrow: "1",
      aspectRatio: "1",
    },
    [theme.mq.sm]: {
      width: theme.spanColumns(3),
    },
    [theme.mq.md]: {
      width: theme.spanColumns(4),
    },
    backgroundRepeat: "no-repeat",
    backgroundColor:
      palette === "dark" ? theme.colors.dark_gray : theme.colors.page_bg_light,
    backgroundPosition: "center",
  });
  const buyButton=<Button
  color="black"
  component={Link}
  href={{
    pathname: "/shop",
    query: {
      scrollIntoView: `[data-id='${deck.slug}']`,
      scrollIntoViewBehavior: "smooth",
    },
  }}
  Icon={Bag}
  css={(theme) => [
    {
      width: "100%",
      justifyContent: "center",
      [theme.maxMQ.sm]: [
        {
          marginTop: 10,
          marginBottom: 25,
          gridColumn: "1 / -1",
        },
      ],
      [theme.mq.sm]: {
        gridColumn: "span 2/ 8",
      },
      [theme.mq.md]: {
        gridColumn: "span 2/ 9",
      },
    },
    palette === "dark" && {
      background: theme.colors.page_bg_light,
      color: theme.colors.page_bg_dark,
    },
  ]}
>
  Buy now
</Button>

const { width} = useSize();

  return (
    <BlockWithProperties
      title="Physical Deck"
      properties={Object.keys(deck.properties).map((key) => ({
        key,
        value: deck.properties[key],
      }))}
      palette={palette}
      action={
        buyButton
      }
    >
      {width<breakpoints.sm? buyButton:null}
      <div
        css={(theme) => [
          {
            display: "flex",
            flexWrap: "wrap",
            gap: theme.spacing(2),
            gridColumn: "1/-1",
            paddingBottom: theme.spacing(3),
            [theme.mq.sm]: {
              flexDirection: "column",
              height: theme.spacing(67.2),
              gap: theme.spacing(3),
              paddingBottom: "0",
            },
            [theme.mq.md]: {
              height: theme.spacing(90.8),
              gap: theme.spacing(3),
              paddingBottom: "0",
            },
          },
        ]}
      >
        <img
          css={[
            {
              ...common(),
              objectFit: "cover",
              aspectRatio: "1",
            },
          ]}
          width={0}
          src={deck.image}
          loading="lazy"
        />
        <img
          loading="lazy"
          width={0}
          css={[
            {
              aspectRatio: "390 / 488",
              ...common(),
              objectFit: "cover",
            },
          ]}
          src={`https://s3.amazonaws.com/img.playingarts.com/www/decks/gallery/${deck.slug}-01.jpg`}
        />
        <img
          loading="lazy"
          width={0}
          css={[
            {
              aspectRatio: "390 / 488",
              ...common(),
              objectFit: "cover",
            },
          ]}
          src={`https://s3.amazonaws.com/img.playingarts.com/www/decks/gallery/${deck.slug}-02.jpg`}
        />
        <img
          loading="lazy"
          width={0}
          src={`https://s3.amazonaws.com/img.playingarts.com/www/decks/gallery/${deck.slug}-03.jpg`}
          css={[
            {
              aspectRatio: "1",
              ...common(),
              objectFit: "cover",
            },
          ]}
        />
        <img
          loading="lazy"
          width={0}
          src={`https://s3.amazonaws.com/img.playingarts.com/www/decks/gallery/${deck.slug}-04.jpg`}
          css={[
            {
              aspectRatio: "390 / 438",
              ...common(),
              objectFit: "cover",
            },
          ]}
        />
        <img
          loading="lazy"
          width={0}
          src={`https://s3.amazonaws.com/img.playingarts.com/www/decks/gallery/${deck.slug}-05.jpg`}
          alt=""
          css={[
            {
              aspectRatio: "390 / 440",
              objectFit: "cover",
              ...common(),
            },
          ]}
        />
      </div>
    </BlockWithProperties>
    // <Grid
    //   css={(theme) => [
    //     {
    //       [theme.mq.sm]: {
    //         background: `url(${deck.image}) no-repeat`,
    //         backgroundSize: `auto ${theme.spacing(50)}px`,
    //         backgroundPosition: "bottom left",
    //         width: "fit-content",
    //         margin: "0 auto",
    //       },
    //     },
    //   ]}
    // >
    //   <BlockTitle
    //     variant={"h3"}
    //     palette={palette}
    //     title={width < breakpoints.sm ? "Physical Deck" : deck.title}
    //     subTitleText={deck.description}
    //     noLine={width >= breakpoints.sm}
    //     css={(theme) => [
    //       {
    //         [theme.maxMQ.sm]: {
    //           gridColumn: "1 / -1",
    //           order: -1,
    //         },
    //         [theme.mq.sm]: {
    //           gridColumn: "span 4 / 10",
    //           display: "block",
    //         },
    //         [theme.mq.md]: {
    //           gridColumn: "span 5 / 12",
    //         },
    //       },
    //     ]}
    //   >
    //     <Grid {...props} css={{ gridColumn: "1/-1" }}>
    //       {width < breakpoints.sm && (
    //         <Fragment>
    //           <Text variant="body2" css={[{ gridColumn: "1/-1" }]}>
    //             {deck.description}
    //           </Text>
    //           <div
    //             css={(theme) => [
    //               {
    //                 [theme.maxMQ.sm]: [
    //                   {
    //                     gridColumn: "1 / -1",
    //                     height: theme.spacing(28),
    //                   },
    //                 ],
    //                 [theme.mq.sm]: {
    //                   gridColumn: "span 5",
    //                   gridRow: "span 3",
    //                 },
    //                 [theme.mq.md]: {
    //                   gridColumn: "span 6",
    //                 },
    //                 flexBasis: "50%",
    //                 display: "block",
    //                 background: `url(${deck.image}) 50% 50% no-repeat`,
    //                 backgroundSize: "contain",
    //               },
    //             ]}
    //           />
    //         </Fragment>
    //       )}

    //       <dl
    //         css={(theme) => ({
    //           color: theme.colors.text_title_dark,
    //           margin: 0,
    //           [theme.maxMQ.sm]: [
    //             {
    //               color:
    //                 palette === "dark"
    //                   ? theme.colors.white
    //                   : theme.colors.black,
    //             },
    //             {
    //               gridColumn: "1 / -1",
    //             },
    //           ],
    //           [theme.mq.sm]: {
    //             marginTop: theme.spacing(2.5),
    //             gridColumn: "span 4 / 10",
    //           },
    //           [theme.mq.md]: {
    //             gridColumn: "span 5 / 12",
    //           },
    //         })}
    //       >
    //         <Line spacing={1} palette={palette} />
    //         {Object.entries(deck.properties).map(([key, value]) => (
    //           <Fragment key={key}>
    //             <div
    //               css={(theme) => ({
    //                 display: "grid",
    //                 gap: theme.spacing(3),
    //                 gridTemplateColumns: `repeat(auto-fit, ${theme.spacing(
    //                   7.5
    //                 )}px) `,
    //                 paddingTop: theme.spacing(0.5),
    //                 paddingBottom: theme.spacing(0.5),
    //               })}
    //             >
    //               <Text
    //                 component="dt"
    //                 variant="h7"
    //                 css={(theme) => ({
    //                   color: theme.colors.text_subtitle_dark,
    //                   [theme.maxMQ.sm]: {
    //                     color:
    //                       palette === "dark"
    //                         ? theme.colors.text_subtitle_light
    //                         : theme.colors.text_subtitle_dark,
    //                   },
    //                 })}
    //               >
    //                 {key}
    //               </Text>
    //               <Text
    //                 component="dd"
    //                 css={(theme) => [
    //                   {
    //                     gridColumn: "2 / -1",
    //                     fontSize: 16,
    //                     margin: 0,
    //                     color: theme.colors.text_subtitle_dark,
    //                     [theme.maxMQ.sm]: {
    //                       color:
    //                         palette === "dark"
    //                           ? theme.colors.text_title_light
    //                           : theme.colors.text_title_dark,
    //                     },
    //                   },
    //                 ]}
    //               >
    //                 {value}
    //               </Text>
    //             </div>
    //             <Line spacing={1} palette={palette} />
    //           </Fragment>
    //         ))}
    //       </dl>

    //       <Button
    //         color="black"
    //         component={Link}
    //         href={{
    //           pathname: "/shop",
    //           query: {
    //             scrollIntoView: `[data-id='${deck.slug}']`,
    //             scrollIntoViewBehavior: "smooth",
    //           },
    //         }}
    //         Icon={Bag}
    //         css={(theme) => [
    //           {
    //             width: "100%",
    //             justifyContent: "center",
    //             marginTop: theme.spacing(3.5),
    //             marginBottom: theme.spacing(2.5),
    //             [theme.maxMQ.sm]: [
    //               {
    //                 gridColumn: "1 / -1",
    //               },
    //             ],
    //             [theme.mq.sm]: {
    //               gridColumn: "span 2/ 8",
    //             },
    //             [theme.mq.md]: {
    //               gridColumn: "span 2/ 9",
    //             },
    //           },
    //           palette === "dark" &&
    //             width < breakpoints.sm && {
    //               background: theme.colors.page_bg_light,
    //               color: theme.colors.page_bg_dark,
    //             },
    //         ]}
    //       >
    //         Buy now
    //       </Button>
    //     </Grid>
    //   </BlockTitle>
    // </Grid>
  );
};

export default forwardRef(DeckBlock);
