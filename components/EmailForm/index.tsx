import { FC, Fragment, useState } from "react";

import { CSSObject } from "@emotion/serialize";
import { useForm, SubmitHandler } from "react-hook-form";
import Button from "../Button";
import Text from "../Text";
import ThickChevron from "../Icons/ThickChevron";
import { colord } from "colord";

type FormInput = {
  email: string;
};

const statusMessage = {
  fail: "Check email format",
  loading: "Loading",
  success: "Thank you! Please check your email to confirm subscription.",
};

interface Props {
  palette?: "light" | "dark";
}

const EmailForm: FC<Props> = ({ palette = "dark" }) => {
  const { register, handleSubmit } = useForm<FormInput>();

  const [status, setStatus] = useState<keyof typeof statusMessage>();

  const [focus, setFocus] = useState(false);

  const [email, setEmail] = useState("");

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    setStatus("loading");
    const res = await fetch("/api/v1/newsletter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data, email }),
    });

    if (res.status !== 200) {
      return setStatus("fail");
    }
    return setStatus("success");
  };

  return (
    <Fragment>
      <form
        onSubmit={handleSubmit(onSubmit)}
        css={(theme) => [
          {
            display: "flex",
            background: "rgba(0, 0, 0, 0.05)",
            borderRadius: theme.spacing(1),
            marginTop: theme.spacing(2),
            border: "2px solid",
            borderColor: colord(
              palette === "dark" ? theme.colors.white : theme.colors.black
            )
              .alpha(0.2)
              .toRgbString(),
            boxSizing: "border-box",
            height: "var(--buttonHeight)",
            "&:focus": {},
          },
          focus && {
            borderColor: colord(
              palette === "dark" ? theme.colors.white : theme.colors.black
            )
              .alpha(0.5)
              .toRgbString(),
          },
          status === "fail" && {
            borderColor: theme.colors.red,
          },
          status === "success" && {
            borderColor: theme.colors.green,
          },
        ]}
      >
        <input
          type="email"
          placeholder="Your email"
          css={(theme) => ({
            ...(theme.typography.body2 as CSSObject),
            paddingLeft: theme.spacing(2),
            flexGrow: 1,
            "&:focus": {
              outline: "none",
            },
          })}
          {...register("email")}
          required={true}
          onBlur={() => setFocus(false)}
          onFocus={() => {
            setFocus(true);
          }}
          onChange={(e) => {
            setEmail(e.target.value);
            setStatus(undefined);
          }}
        />
        <Button
          disabled={!!status}
          type="submit"
          Icon={ThickChevron}
          css={{
            height: "100%",
          }}
        />
      </form>
      <Text
        css={(theme) => [
          {
            color: colord(
              palette === "dark" ? theme.colors.white : theme.colors.black
            )
              .alpha(0.3)
              .toRgbString(),
            lineHeight: "25px",
            fontSize: 15,
            position: "relative",
          },
          status && {
            color: colord(
              palette === "dark" ? theme.colors.white : theme.colors.black
            )
              .alpha(0.7)
              .toRgbString(),
          },
        ]}
      >
        <span css={status && { visibility: "hidden" }}>
          We will never share your details with others. Unsubscribe at anytime!
        </span>
        {status && (
          <span css={{ position: "absolute", top: 0, left: 0, right: 0 }}>
            {statusMessage[status]}
          </span>
        )}
      </Text>
    </Fragment>
  );
};

export default EmailForm;
