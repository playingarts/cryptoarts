import { useRouter } from "next/router";
import {
  forwardRef,
  ForwardRefRenderFunction,
  HTMLAttributes,
  useEffect,
} from "react";
import Button from "../../Button";
import Chevron from "../../Icons/Chevron";
import Close from "../../Icons/Close";
import Link, { Props as LinkProps } from "../../Link";

export interface Props extends HTMLAttributes<HTMLDivElement> {
  prevLink?: LinkProps["href"];
  nextLink?: LinkProps["href"];
  closeLink?: LinkProps["href"];
}

const CardNav: ForwardRefRenderFunction<HTMLDivElement, Props> = (
  { prevLink, nextLink, closeLink, children, ...props },
  ref
) => {
  const { push } = useRouter();

  useEffect(() => {
    const keyHandler = (event: KeyboardEvent) => {
      if (event.code === "ArrowLeft" && prevLink) {
        return push(prevLink);
      }

      if (event.code === "ArrowRight" && nextLink) {
        return push(nextLink);
      }

      if (event.code === "Escape" && closeLink) {
        return push(closeLink);
      }
    };

    window.addEventListener("keydown", keyHandler);

    return () => window.removeEventListener("keydown", keyHandler);
  }, [push, prevLink, nextLink, closeLink]);

  return (
    <div {...props} ref={ref}>
      <div
        css={{
          position: "sticky",
          top: "100vh",
          zIndex: 1,
        }}
      >
        {prevLink && (
          <Button
            component={Link}
            Icon={Chevron}
            href={prevLink}
            css={(theme) => ({
              position: "absolute",
              bottom: "50vh",
              left: 0,
              transform: `translate(${theme.spacing(
                5
              )}px, 50%) rotate(-180deg)`,
            })}
          />
        )}
        {nextLink && (
          <Button
            component={Link}
            Icon={Chevron}
            href={nextLink}
            css={(theme) => ({
              position: "absolute",
              bottom: "50vh",
              right: 0,
              transform: `translate(-${theme.spacing(5)}px, 50%)`,
            })}
          />
        )}
        {closeLink && (
          <Button
            component={Link}
            Icon={Close}
            href={closeLink}
            css={(theme) => ({
              position: "absolute",
              right: 0,
              top: "-100vh",
              transform: `translate(-${theme.spacing(5)}px, ${theme.spacing(
                14
              )}px)`,
            })}
          />
        )}
      </div>

      {children}
    </div>
  );
};

export default forwardRef(CardNav);
