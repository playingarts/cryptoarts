import chalk from "chalk";
import { createLogger, transports, format } from "winston";
import expressWinston from "express-winston";

export const expressLogger = expressWinston.logger({
  transports: [new transports.Console()],
  format: format.combine(
    format.colorize(),
    format.label({ label: "EXPRESS" }),
    format.timestamp(),
    format.simple()
  ),
  meta: process.env.NODE_ENV === "production",
  expressFormat: true,
  colorize: true,
});

const t = createLogger({
  format: format.combine(
    format.colorize(),
    format.label({ label: "FETCH" }),
    format.timestamp(),
    format.simple()
  ),
  transports: [new transports.Console()],
});

export const fetchLogger = (
  response: Response,
  init: (RequestInit | undefined) & { startTime: number }
) => {
  const { status, url } = response;
  const { method = "get" } = init || {};
  const log = () => {
    t[status < 500 ? "info" : "error"]({
      message: `${chalk.gray(method.toUpperCase())} ${chalk.gray(url)} ${chalk[
        status < 400 ? "green" : status < 500 ? "yellow" : "red"
      ](status)} ${chalk.gray(`${Date.now() - init.startTime}ms`)}`,
    });
  };

  if (response.body && (response.body as any).on) {
    (response.body as any).on("close", log);
  } else {
    log();
  }

  return response;
};

export const getLogger = (logLabel: string) =>
  createLogger({
    format: format.combine(
      format.colorize(),
      format.label({ label: logLabel.toUpperCase() }),
      format.timestamp(),
      format.simple()
    ),
    transports: [new transports.Console()],
  });
