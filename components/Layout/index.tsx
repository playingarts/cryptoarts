import { forwardRef, ForwardRefRenderFunction, HTMLAttributes } from "react";

const Layout: ForwardRefRenderFunction<
  HTMLElement,
  HTMLAttributes<HTMLElement>
> = ({ children, ...props }, ref) => {
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
