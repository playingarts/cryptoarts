import { css } from "@emotion/css";
import { FC } from "react";

const Layout: FC = ({ children }) => {
  return (
    <section
      className={css`
        max-width: 1420px;
        height: 3000px;
        margin: 0 10px;
        position: relative;
        left: 50%;
        transform: translate(-50%, 0);
      `}
    >
      {children}
    </section>
  );
};

export default Layout;
