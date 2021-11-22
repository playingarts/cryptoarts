import { css } from "@emotion/react";
import { FC, HTMLAttributes, useEffect, useState } from "react";
import throttle from "just-throttle";
import LogoIcon from "../Icons/Logo";
import MenuIcon from "../Icons/Menu";
import Nav from "../Nav";
import Title from "../Title";

interface Props extends HTMLAttributes<HTMLElement> {
  palette?: "dark";
}

const Header: FC<Props> = ({ palette, ...props }) => {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    let lastScrollTop = 0;

    const handler = throttle(() => {
      const documentHeight = Math.max(
        document.body.scrollHeight
        // document.body.offsetHeight,
        // document.documentElement.clientHeight,
        // document.documentElement.scrollHeight,
        // document.documentElement.offsetHeight
      );

      const scrollTop = Math.min(
        documentHeight - window.innerHeight,
        Math.max(
          0,
          window.pageYOffset
          //  document.documentElement.scrollTop
        )
      );

      setExpanded(!(scrollTop <= 0 ? true : scrollTop >= lastScrollTop));

      lastScrollTop = scrollTop;
    }, 100);

    window.addEventListener("scroll", handler);

    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header {...props}>
      <div
        css={(theme) => [
          css`
            border-radius: 10px;
            background: linear-gradient(90deg, #58cdff 0%, #c77bff 100%);
            display: flex;
            align-items: center;
            position: relative;
            z-index: 1;
          `,
          palette === "dark"
            ? css`
                background: #181818;
                color: ${theme.colors.gray};
              `
            : css`
                background: linear-gradient(90deg, #58cdff 0%, #c77bff 100%);
              `,
        ]}
      >
        <button
          css={css`
            background: none;
            border: 0;
            width: 70px;
            height: 70px;
            padding: 0;
          `}
        >
          <MenuIcon
            css={(theme) => css`
              fill: ${theme.colors.gray};
            `}
          />
        </button>

        <Title
          css={css`
            font-size: 20px;
            text-transform: uppercase;
            margin-top: 0.3em;
            flex-grow: 1;
          `}
        >
          playing arts
        </Title>

        <div
          css={css`
            text-align: center;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
          `}
        >
          <LogoIcon color="gray" />
        </div>

        <div>Shop</div>
      </div>
      <Nav
        css={css`
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          padding-top: 0;
          transition: padding-top 500ms ease;
        `}
        style={expanded ? { paddingTop: 70 } : {}}
      />
    </header>
  );
};

export default Header;
