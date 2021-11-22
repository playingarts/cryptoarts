import { css } from "@emotion/css";
import { FC, HTMLAttributes } from "react";

const Layout: FC<HTMLAttributes<HTMLElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <section
      {...props}
      className={css`
        ${className};
        padding-left: 10px;
        padding-right: 10px;
        position: relative;
      `}
    >
      <div
        className={css`
          max-width: 1420px;
          margin: 0 auto;
          position: relative;
          // left: 50%;
          // transform: translate(-50%, 0);
        `}
      >
        {children}
      </div>
    </section>
  );
};

export default Layout;
