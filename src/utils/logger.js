import winston from "winston";

const { combine, timestamp, json, errors, colorize } = winston.format;

// Init app logger
const logger = winston.createLogger({
  level: "info",
  format: combine(
    timestamp(),
    errors({ stack: true }),
    json(),
    colorize({ all: true })
  ),
  transports: [new winston.transports.Console()],
});

if (process.env.NODE_ENV === "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

export default logger;
