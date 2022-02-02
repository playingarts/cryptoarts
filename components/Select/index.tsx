import { CSSObject } from "@emotion/serialize";
import { ChangeEventHandler, FC, HTMLAttributes } from "react";
import Chevron from "../Icons/Chevron";

export interface Props
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  value: string;
  onChange: ChangeEventHandler<HTMLSelectElement>;
  options: Record<string, string>;
}

const Select: FC<Props> = ({ value, onChange, options, ...props }) => {
  return (
    <div
      {...props}
      css={{
        position: "relative",
      }}
    >
      <Chevron
        css={(theme) => ({
          width: theme.spacing(0.8),
          height: theme.spacing(1.2),
          transform: "rotate(90deg) translate(-75%, 0)",
          position: "absolute",
          right: theme.spacing(1.1),
          top: "50%",
        })}
      />
      <select
        css={(theme) => ({
          border: 0,
          backgroundColor: "unset",
          appearance: "none",
          paddingRight: theme.spacing(3),
          // textAlign: "right",
          // direction: "rtl",
          ...(theme.typography.h5 as CSSObject),
          height: theme.spacing(5),
          paddingTop: "0.1em",
          lineHeight: "50px",
        })}
        value={value}
        onChange={onChange}
      >
        {Object.entries(options).map(([key, label]) => (
          <option key={key} value={key}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
