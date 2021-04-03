#!/usr/bin/env node
import sade from "sade";
import { version } from "../package.json";
import { CLIENT_ID, DEFAULT_HOST, SERVER_PORT } from "./lib/constants";
import { operate } from "./lib/operate";
import { CliOptions } from "./lib/types";
import { logger } from "./logger/logger";

const cli = sade("ado-auth", true)
  .version(version)
  .option(
    "--host",
    `On-premises url (including protocol) for the tool ado-auth api`,
    DEFAULT_HOST
  )
  .option(
    "-p, --port",
    `localhost listening port to use for ado-auth api`,
    SERVER_PORT
  )
  .option(
    "-c, --clientid",
    "vistualstudio.com app client ID to use to authenticate"
  )
  .option("-d, --debug", "show debug logs", false);

cli.action(async (config: CliOptions) => {
  if (config.debug) {
    logger.enableDebug();
  }

  if (!config.clientId) {
    config.clientId = CLIENT_ID;
  }

  await operate(config);
});

// DO NOT run if not in CLI or in CI environmentF
if (require.main === module && !process.env.CI) {
  cli.parse(process.argv);
}

export * from "./api-stuff/auth";
export * from "./api-stuff/refetch";
export * from "./api-stuff/server";
export * from "./file-stuff/prepare";
export * from "./file-stuff/prepare.types";
export * from "./lib/operate";
export * from "./lib/readConfig";
export * from "./lib/types";
export * from "./lib/writeAdoRc";
export * from "./write-rc/npmrc";
export * from "./write-rc/yarn2rc";
