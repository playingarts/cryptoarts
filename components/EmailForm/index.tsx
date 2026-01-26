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
      <form
        onSubmit={handleSubmit(onSubmit)}
        css={(theme) => [
          {
            display: "flex",
            background: "white",
            borderRadius: 8,
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
            borderColor: theme.colors.error,
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
            ...(theme.typography.linkNewTypography as CSSObject),
            color: theme.colors.black,
            padding: 0,
            paddingLeft: theme.spacing(2),
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
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
          css={(theme) => [
            {
              background: "#6A5ACD",
              height: "100%",
              padding: 0,
              margin: 0,
              border: "none",
              paddingLeft: 15,
              paddingRight: 15,
              borderRadius: 6,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              transition: "background 0.2s, opacity 0.2s",
            },
            status === "loading" && {
              opacity: 0.7,
              cursor: "wait",
            },
            status === "success" && {
              background: theme.colors.green,
            },
          ]}
        >
          <Text typography="linkNewTypography" css={[{ color: "white", display: "flex", alignItems: "center" }]}>
            {status === "loading" ? "Sending..." : status === "success" ? "Done!" : "Deal"}
            {status !== "loading" && status !== "success" && <Arrow css={[{ marginLeft: 10, color: "white" }]} />}
          </Text>
        </button>
      </form>
      {status && (
        <Text
          css={(theme) => [
            {
              marginTop: 10,
              fontSize: 15,
              color: colord(
                palette === "dark" ? theme.colors.white : theme.colors.black
              )
                .alpha(0.7)
                .toRgbString(),
            },
            status === "fail" && {
              color: theme.colors.error,
            },
            status === "success" && {
              color: theme.colors.green,
            },
          ]}
        >
          {statusMessage[status]}
        </Text>
      )}
    </Fragment>
  );
};

export default EmailForm;
