import { FC, Fragment, useState } from "react";

import { CSSObject } from "@emotion/serialize";
import { useForm, SubmitHandler } from "react-hook-form";
import Text from "../Text";
import { colord } from "colord";
import Arrow from "../Icons/Arrow";

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
        {status && (
          <span
            css={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              transform: "translateY(calc(-100% - 5px))",
            }}
          >
            {statusMessage[status]}
          </span>
        )}
      </Text>
      <form
        onSubmit={handleSubmit(onSubmit)}
        css={(theme) => [
          {
            display: "flex",
            background: "white",
            borderRadius: theme.spacing(1),
            border: "2px solid",
            borderColor: colord(
              palette === "dark" ? theme.colors.white : theme.colors.black
            )
              .alpha(0.2)
              .toRgbString(),
            boxSizing: "border-box",
            // height: "var(--buttonHeight)",
            height: 55,
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
          placeholder="Your e-mail"
          css={(theme) => ({
            ...(theme.typography.newParagraph as CSSObject),
            padding: 0,
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
        <button
          type="submit"
          disabled={!!status}
          css={[
            {
              background: "none",
              height: "100%",
              padding: 0,
              margin: 0,
              border: "none",
              paddingRight: 15,
            },
          ]}
        >
          <Text css={(theme) => [{ color: theme.colors.black50 }]}>
            Deal <Arrow css={[{ marginLeft: 10 }]} />
          </Text>
        </button>
      </form>
    </Fragment>
  );
};

export default EmailForm;
