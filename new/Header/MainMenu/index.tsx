import {
  Dispatch,
  FC,
  HTMLAttributes,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import ScandiBlock from "../../ScandiBlock";
import ButtonTemplate from "../../Buttons/Button";
import { colord } from "colord";
import Delete from "../../Icons/Delete";
import Text from "../../Text";
import CTA from "../CTA";
import NewLink from "../../Link/NewLink";
import { useProducts } from "../../../hooks/product";
import EmailForm from "../../EmailForm";
import { links } from "../../Footer";

const LocalGrid: FC<HTMLAttributes<HTMLElement>> = ({ children, ...props }) => (
  <div
    css={(theme) => [
      {
        paddingTop: 15,
        display: "grid",
        background: theme.colors.pale_gray,
        columnGap: theme.spacing(3),
        "--columnWidth": `${theme.spacing(8)}px`,
        [theme.maxMQ.sm]: {
          columnGap: theme.spacing(2),
          "--columnWidth": `${theme.spacing(4)}px`,
        },
        // justifyContent: "center",
        paddingLeft: 75,
        paddingRight: 75,
        gridTemplateColumns: "repeat(6, var(--columnWidth))",
        width: "fit-content",
      },
    ]}
    {...props}
  >
    {children}
  </div>
);

const MainMenu: FC<
  HTMLAttributes<HTMLElement> & { setShow: Dispatch<SetStateAction<boolean>> }
> = ({ setShow, ...props }) => {
  const { products } = useProducts();

  const [hover, setHover] = useState<string>("");

  useEffect(() => {
    if (!products) {
      return;
    }

    setHover(products[0].image || "");
  }, [products]);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      css={(theme) => [
        {
          background: theme.colors.black30,
          width: "100%",
          position: "fixed",
          inset: 0,
          zIndex: 9999,

          overflow: "scroll",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          msOverflowStyle: "none",
          "scrollbar-width": "none",
        },
      ]}
      onClick={() => {
        setShow(false);
      }}
      {...props}
    >
      <div
        css={[{ width: "fit-content" }]}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <LocalGrid>
          <ScandiBlock css={{ gridColumn: "span 3", height: 70 }}>
            <ButtonTemplate
              css={(theme) => [
                {
                  color: theme.colors.dark_gray,
                  transition: theme.transitions.fast("background"),
                  "&:hover": {
                    background: colord(theme.colors.white)
                      .alpha(0.5)
                      .toRgbString(),
                  },
                },
              ]}
              onClick={() => setShow(false)}
            >
              <Delete />
              <Text
                css={(theme) => [
                  {
                    transition: theme.transitions.slow("color"),
                    color: theme.colors.dark_gray,
                  },
                ]}
              >
                Close
              </Text>
            </ButtonTemplate>
          </ScandiBlock>

          <ScandiBlock
            css={(theme) => [
              {
                gridColumn: "span 3",
                justifyContent: "space-between",
                height: "100%",
                transition: theme.transitions.fast("border-color"),
              },
            ]}
          >
            <CTA />
          </ScandiBlock>
          <div
            css={[
              {
                height: 450,
                display: "flex",
                alignItems: "center",
                gridColumn: "1/-1",
                gap: 12,
                marginTop: 30,
              },
            ]}
          >
            <div css={[{ width: 190, display: "grid", gap: 5 }]}>
              {products &&
                products
                  .filter((product) => product.type === "deck")
                  .map((product, index) => {
                    const deck = product.deck;
                    if (!deck) {
                      return undefined;
                    }
                    return (
                      <NewLink
                        key={deck.slug + "mainmenu" + index}
                        //   css={[{ display: "block" }]}
                        href={deck.slug}
                        onMouseEnter={() => setHover(product.image || "")}
                      >
                        {deck.short}
                      </NewLink>
                    );
                  })}
            </div>
            <img
              css={[{ flex: 1, minWidth: 0, objectFit: "contain" }]}
              src={hover}
              alt=""
            />
          </div>
        </LocalGrid>
        <LocalGrid
          css={(theme) => [
            {
              background: theme.colors.violet,
              paddingTop: 60,
              paddingBottom: 60,
            },
          ]}
        >
          <ScandiBlock
            css={(theme) => [
              {
                paddingTop: 15,
                gridColumn: "1/-1",
                flexDirection: "column",
                alignItems: "start",
                form: {
                  width: "100%",
                  marginTop: 30,
                },
              },
            ]}
          >
            <Text typography="paragraphSmall">Explore project updates</Text>
            <EmailForm />
          </ScandiBlock>
          <Text
            typography="paragraphNano"
            css={[{ gridColumn: "span 4", marginTop: 30 }]}
          >
            Join 10,000+ collectors for early access to exclusive drops, and
            gain automatic entry into our monthly giveaways.
          </Text>
        </LocalGrid>
        <LocalGrid
          css={[
            {
              paddingTop: 60,
              paddingBottom: 60,
            },
          ]}
        >
          {Object.keys(links).map((key) => (
            <ScandiBlock
              css={(theme) => [
                {
                  borderColor: theme.colors.black30,
                  gridColumn: "span 2",
                  paddingTop: 15,
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "start",
                  "> *": {
                    color: theme.colors.black50,
                  },
                },
              ]}
            >
              <Text typography="paragraphSmall">{key}</Text>
              <div css={[{ marginTop: 30 }]}>
                {links[key].map((item) => (
                  <NewLink
                    href={item.split(" ").join("").toLowerCase()}
                    css={[{ display: "block" }]}
                  >
                    {item}
                  </NewLink>
                ))}
              </div>
            </ScandiBlock>
          ))}
          <ScandiBlock
            css={(theme) => [
              {
                paddingTop: 15,
                color: theme.colors.black30,
                borderColor: theme.colors.black30,
                display: "flex",
                gap: 30,
                gridColumn: "1/-1",
                marginTop: 60,
              },
            ]}
          >
            <Text
              typography="paragraphMicro"
              css={(theme) => [
                {
                  a: {
                    textDecoration: "underline",
                    color: theme.colors.black50,
                  },
                  color: theme.colors.black50,
                },
              ]}
            >
              © 2012—2025 Digital Abstracts SL. Any artwork displayed on this
              website may not be reproduced or used in any manner whatsoever
              without the express written permission of Digital Abstracts or
              their respective owners. Patent Pending. Thanks for reading this,
              bye!
              <br />
              <br />
              <a
                css={[{ textDecoration: "underline", marginRight: 15 }]}
                href=""
              >
                Privacy Statement
              </a>
              <a css={[{ textDecoration: "underline" }]} href="">
                Terms of Service
              </a>
            </Text>
          </ScandiBlock>
        </LocalGrid>
      </div>
    </div>
  );
};

export default MainMenu;
