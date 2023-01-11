import {
  forwardRef,
  ForwardRefRenderFunction,
  HTMLAttributes,
  ReactNode,
} from "react";
import Grid from "../../Grid";
import Layout from "../../Layout";
import Text from "../../Text";

interface Props extends HTMLAttributes<HTMLElement> {
  labels?: string[];
  title: string;
  subtitle: string;
  outerChildren?: ReactNode;
  layoutChildren?: ReactNode;
  slug?: string;
}

const ComposedMain: ForwardRefRenderFunction<HTMLDivElement, Props> = (
  {
    children,
    outerChildren,
    layoutChildren,
    title,
    subtitle,
    labels,
    slug,
    ...props
  },
  ref
) => {
  return (
    <div
      css={(theme) => [
        slug === "crypto"
          ? {
              background: theme.colors.page_bg_dark,
            }
          : {
              background: theme.colors.white,
              [theme.mq.sm]: {
                background: theme.colors.page_bg_light_gray,
              },
            },
      ]}
    >
      {/* Deck page header */}
      <Layout
        css={(theme) => ({
          // background:
          //   theme.colors.decks[deck.slug as keyof typeof theme.colors.decks]
          //     .background,
          borderRadius: `0 0 ${theme.spacing(5)}px ${theme.spacing(5)}px`,
          color: theme.colors.light_gray,
          paddingTop: theme.spacing(25),
          paddingBottom: theme.spacing(6),
          // maxWidth: breakpoints.lg,
          margin: "0 auto",
          // maxWidth: 1440,
          [theme.mq.sm]: {
            height: `calc(100vh - ${theme.spacing(6)}px)`,
            maxHeight: theme.spacing(75),
            paddingTop: theme.spacing(25),
            
          },
          [theme.maxMQ.md]: {
            paddingTop: theme.spacing(22),
          },
          [theme.maxMQ.sm]: {
            borderRadius: `0 0 ${theme.spacing(3)}px ${theme.spacing(3)}px`,
            paddingTop: theme.spacing(18),
            paddingBottom: theme.spacing(3),
            paddingLeft: theme.spacing(2.5),
            paddingRight: theme.spacing(2.5),
          },
          overflow: "hidden",
        })}
        ref={ref}
        {...props}
      >
        <Grid
          css={{
            zIndex: 1,
            position: "relative",
            height: "100%",
          }}
        >
          <div
            css={(theme) => [
              {
                gridColumn: "1 / 7",
                display: "flex",
                
                flexDirection: "column",
                [theme.maxMQ.sm]: {
                  // marginTop: -theme.spacing(21.5),
                  paddingTop: theme.spacing(18),
                  // order: -1,
                },
              },
            ]}
          >
            <Grid
              auto={true} css={(theme) => [{ flexGrow: 1, marginBottom: theme.spacing(2), gap: 0, gridTemplateRows:"auto 1fr" }]}
            >
              <Text
                component="h1"
                css={(theme) => [
                  {
                    gridColumn: "1 / -1",
                    margin: 0,
                    display: "flex",
                    flexWrap: "wrap",
                    gap: theme.spacing(1),
                  },
                ]}
              >
                {title}
                {labels && (
                  <div
                    css={(theme) => [
                      {
                        display: "inline-flex",
                        alignItems: "center",
                        gap: theme.spacing(1),
                        marginTop: theme.spacing(1),
                        marginBottom: theme.spacing(1),

                        [theme.maxMQ.xsm]: {
                          gap: theme.spacing(.5),
                        },
                      },
                    ]}
                  >
                    {labels.map((label) => (
                      <span
                        key={label}
                        css={(theme) => [
                          theme.typography.label,
                          {
                            fontFamily: "Work Sans, sans-serif",
                            border: "2px solid",
                            padding: `${theme.spacing(0.2)}px ${theme.spacing(
                              1
                            )}px `,
                            textTransform: "uppercase",
                            fontWeight: 600,
                            borderRadius: theme.spacing(3),
                            position: "relative",
                            letterSpacing: 0,
                            height: "fit-content",

                            [theme.maxMQ.xsm]: {
                              fontSize: "14px",
                            },
                          },
                        ]}
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                )}
              </Text>
              <Text
                variant="body3"
                css={(theme) => [
                  {
                    gridColumn: "span 8",

                    [theme.maxMQ.md]: {
                      gridColumn: "span 7",
                    },
                    [theme.maxMQ.sm]: {
                      fontSize: 18,
                    },
                    
                    margin: 0,
                    [theme.mq.sm]: {
                      marginTop: theme.spacing(1),
                    },
                  },
                ]}
              >
                {subtitle}
              </Text>
            </Grid>
            {children}
          </div>
          {outerChildren}
        </Grid>
        {layoutChildren}
      </Layout>
    </div>
  );
};

export default forwardRef(ComposedMain);
