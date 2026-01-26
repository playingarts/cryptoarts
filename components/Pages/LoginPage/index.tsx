"use client";

import { FC, useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Grid from "../../Grid";
import Header from "../../Header";
import Footer from "../../Footer";
import Newsletter from "../../Newsletter";
import Text from "../../Text";
import ArrowButton from "../../Buttons/ArrowButton";
import { HEADER_OFFSET } from "../../../styles/theme";

type LoginState = "idle" | "sending" | "sent" | "error";

const LoginPage: FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [state, setState] = useState<LoginState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Check for error in URL params (from verify redirect)
  useEffect(() => {
    const { error } = router.query;
    if (error === "invalid_token") {
      setErrorMessage("This link has expired or is invalid. Please request a new one.");
      setState("error");
    } else if (error === "missing_token") {
      setErrorMessage("Invalid login link. Please request a new one.");
      setState("error");
    } else if (error === "server_error") {
      setErrorMessage("Something went wrong. Please try again.");
      setState("error");
    }
  }, [router.query]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      setErrorMessage("Please enter a valid email address.");
      setState("error");
      return;
    }

    setState("sending");
    setErrorMessage("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.status === 429) {
        setErrorMessage("Too many requests. Please try again in a minute.");
        setState("error");
        return;
      }

      if (!response.ok) {
        setErrorMessage(data.error || "Something went wrong.");
        setState("error");
        return;
      }

      setState("sent");
    } catch {
      setErrorMessage("Network error. Please try again.");
      setState("error");
    }
  };

  return (
    <>
      <Head>
        <title>Login - Playing Arts</title>
      </Head>
      <Header />
      <Grid
        css={(theme) => ({
          background: theme.colors.soft_gray,
          paddingTop: HEADER_OFFSET,
          paddingBottom: theme.spacing(6),
        })}
      >
        <div css={{ gridColumn: "span 8" }}>
          <Text typography="newh3">Admin Login</Text>

          {state === "sent" ? (
            <div css={(theme) => ({ marginTop: theme.spacing(3), marginBottom: theme.spacing(12) })}>
              <Text
                typography="linkNewTypography"
                css={(theme) => ({
                  color: theme.colors.black,
                  marginBottom: 20,
                })}
              >
                We sent a login link to {email}.
                <br />
                Click the link in the email to sign in.
              </Text>
              <ArrowButton
                onClick={() => {
                  setState("idle");
                  setEmail("");
                }}
                color="accent"
                size="medium"
              >
                Try a different email
              </ArrowButton>
            </div>
          ) : (
            <>
              <div
                css={(theme) => ({
                  marginTop: theme.spacing(3),
                  marginBottom: theme.spacing(12),
                  maxWidth: 400,
                  display: "flex",
                  flexDirection: "column",
                  gap: theme.spacing(1.5),
                })}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (state === "error") setState("idle");
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && email && state !== "sending") {
                      handleSubmit(e as unknown as React.FormEvent);
                    }
                  }}
                  placeholder="your@email.com"
                  disabled={state === "sending"}
                  css={(theme) => ({
                    padding: "14px 18px",
                    fontSize: 16,
                    border: `1px solid ${state === "error" ? theme.colors.accent : theme.colors.black10}`,
                    borderRadius: 8,
                    outline: "none",
                    transition: "border-color 0.2s",
                    "&:focus": {
                      borderColor: theme.colors.black30,
                    },
                    "&:disabled": {
                      opacity: 0.6,
                      cursor: "not-allowed",
                    },
                  })}
                />

                {state === "error" && errorMessage && (
                  <Text
                    typography="paragraphSmall"
                    css={(theme) => ({
                      color: theme.colors.accent,
                    })}
                  >
                    {errorMessage}
                  </Text>
                )}

                <ArrowButton
                  onClick={handleSubmit}
                  color="accent"
                  size="medium"
                  css={{
                    marginTop: 15,
                    opacity: state === "sending" || !email ? 0.5 : 1,
                    pointerEvents: state === "sending" || !email ? "none" : "auto",
                  }}
                >
                  {state === "sending" ? "Sending..." : "Send Magic Link"}
                </ArrowButton>
              </div>
            </>
          )}
        </div>
      </Grid>
      <Newsletter />
      <Footer />
    </>
  );
};

export default LoginPage;
