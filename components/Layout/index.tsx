import { forwardRef, ForwardRefRenderFunction, HTMLAttributes } from "react";

export type Props = HTMLAttributes<HTMLElement>;

const Layout: ForwardRefRenderFunction<HTMLElement, Props> = (
  { children, ...props },
  ref
) => {
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
          position: "relative",
          // left: 50%;
          // transform: translate(-50%, 0);
        })}
      >
        {children}
      </div>
    </section>
  );
};

export default forwardRef(Layout);
