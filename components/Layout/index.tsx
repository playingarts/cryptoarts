import {
  forwardRef,
  ForwardRefRenderFunction,
  HTMLAttributes,
  MutableRefObject,
  useEffect,
} from "react";

export interface Props extends HTMLAttributes<HTMLElement> {
  scrollIntoView?: boolean;
}

const Layout: ForwardRefRenderFunction<HTMLElement, Props> = (
  { scrollIntoView, children, ...props },
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

  return (
    <section
      {...props}
      ref={ref}
      css={(theme) => ({
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        position: "relative",
      })}
    >
      <div
        css={(theme) => ({
          maxWidth: theme.spacing(123),
          margin: "0 auto",
        })}
      >
        {children}
      </div>
    </section>
  );
};

export default forwardRef(Layout);
