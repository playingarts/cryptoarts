import { FC, HTMLAttributes } from "react";
import { typographyLiterals } from "../../pages/_app";

const Text: FC<
  HTMLAttributes<HTMLElement> & {
    typography?: keyof typeof typographyLiterals;
  }
> = ({ children, typography = "newParagraph", ...props }) => {
  return (
    <div
      css={(theme) => [
        theme.typography[typography],
        { color: theme.colors.dark_gray },
      ]}
      {...props}
    >
      {children}
    </div>
  );
};

export default Text;
