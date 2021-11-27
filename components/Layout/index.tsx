import { FC, HTMLAttributes } from "react";

const Layout: FC<HTMLAttributes<HTMLElement>> = ({ children, ...props }) => {
  return (
    <section
      {...props}
      css={(theme) => ({
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        position: "relative",
      })}
    >
      <div
        css={(theme) => ({
          maxWidth: theme.spacing(142),
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

export default Layout;
