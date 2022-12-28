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
}

const ComposedMain: ForwardRefRenderFunction<HTMLDivElement, Props> = (
  { children, outerChildren, title, subtitle, labels, ...props },
  ref
) => {
  return (
    <Layout
      css={(theme) => ({
        // background:
        //   theme.colors.decks[deck.slug as keyof typeof theme.colors.decks]
        //     .background,
        borderRadius: `0 0 ${theme.spacing(5)}px ${theme.spacing(5)}px`,
        color: theme.colors.light_gray,
        paddingTop: theme.spacing(25),
        paddingBottom: theme.spacing(6),
        [theme.mq.sm]: {
          height: `calc(100vh - ${theme.spacing(6)}px)`,
          maxHeight: theme.spacing(80),
        },
        [theme.maxMQ.sm]: {
          borderRadius: `0 0 ${theme.spacing(3)}px ${theme.spacing(3)}px`,
          paddingTop: theme.spacing(16),
          paddingBottom: theme.spacing(4),
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
          <div
            css={(theme) => [{ flexGrow: 1, marginBottom: theme.spacing(3) }]}
          >
            <Text
              component="h1"
              css={(theme) => [
                {
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
                            1.2
                          )}px `,
                          textTransform: "uppercase",
                          fontWeight: 600,
                          borderRadius: theme.spacing(3),
                          position: "relative",
                          letterSpacing: 0,
                          height: "fit-content",
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
                  margin: 0,
                  [theme.mq.sm]: {
                    marginTop: theme.spacing(1),
                  },
                },
              ]}
            >
              {subtitle}
            </Text>
          </div>
          {children}
        </div>
        {outerChildren}
      </Grid>
    </Layout>
  );
};

export default forwardRef(ComposedMain);
