import pretty from "pino-pretty";

export const stream = pretty({
  colorize: true,
  levelFirst: true,
  translateTime: "SYS:standard",
  ignore: "pid,hostname",
  messageFormat: (log, messageKey) => {
    const message = log[messageKey];
    return String(message);
  },
  customPrettifiers: {
    time: (timestamp) => `[${timestamp}]`,
  },
});
