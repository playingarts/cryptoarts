import {
  createContext,
  Dispatch,
  forwardRef,
  ForwardRefRenderFunction,
  HTMLAttributes,
  MutableRefObject,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

export interface Props extends HTMLAttributes<HTMLElement> {
  scrollIntoView?: boolean;
  palette?: "dark" | "light";
  truncateInit?: boolean;
  notTruncatable?: boolean;
}

export const TruncateContext = createContext(
  {} as { truncate: boolean; setTruncate: Dispatch<SetStateAction<boolean>> }
);

export const useTruncate = () => {
  return useContext(TruncateContext);
};

const Layout: ForwardRefRenderFunction<HTMLElement, Props> = (
  { scrollIntoView, children, palette, truncateInit, notTruncatable, ...props },
  ref
) => {
  useEffect(() => {
    const current =
      ref && (ref as MutableRefObject<HTMLElement | null>).current;

    if (!current || !scrollIntoView) {
      return;
    }

    current.scrollIntoView({
      behavior: "auto",
      block: "start",
    });
  }, []);

  const [truncate, setTruncate] = useState(
    truncateInit !== undefined ? truncateInit : true
  );

  return (
    <section
      {...props}
      ref={ref}
      css={(theme) => [
        {
          paddingLeft: theme.spacing(2.5),
          paddingRight: theme.spacing(2.5),
          position: "relative",
          [theme.maxMQ.sm]: [
            {
              paddingTop: theme.spacing(3),
            },
            truncate === false && {
              borderRadius: theme.spacing(3),
              background: theme.colors.page_bg_light_gray,
            },
            palette !== undefined && {
              color:
                palette === "dark"
                  ? theme.colors.text_title_light
                  : theme.colors.text_title_dark,
              [theme.maxMQ.sm]: palette === "dark" && {
                background: theme.colors.page_bg_dark,
              },

              // [theme.mq.sm]: {
              //   background:
              //     palette === "dark"
              //       ? theme.colors.page_bg_dark
              //       : theme.colors.page_bg_light_gray,
              // },
            },
          ],
        },
      ]}
    >
      <div
        css={{
          margin: "0 auto",
          height: "100%",
          // width: "fit-content",
        }}
      >
        {notTruncatable ? (
          children
        ) : (
          <TruncateContext.Provider value={{ truncate, setTruncate }}>
            {children}
          </TruncateContext.Provider>
        )}
      </div>
    </section>
  );
};

export default forwardRef(Layout);
