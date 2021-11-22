import { css } from "@emotion/react";
import { FC, HTMLAttributes } from "react";

const Layout: FC<HTMLAttributes<HTMLElement>> = ({ children, ...props }) => {
  return (
    <section
      {...props}
      css={css`
        padding-left: 10px;
        padding-right: 10px;
        position: relative;
      `}
    >
      <div
        css={css`
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
