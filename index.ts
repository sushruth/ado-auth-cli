#!/usr/bin/env node
import sade from "sade";
import { operate } from "./src/lib/operate";
import { logger } from "./src/logger/logger";

const cli = sade("ado-auth", true)
  .version("0.0.15")
  .option("-d, --debug", "show debug logs");

cli.action(async ({ debug }) => {
  if (debug) {
    logger.enableDebug();
  }
  
  await operate();
});

// DO NOT run if not in CLI or in CI environmentF
if (require.main === module && !process.env.CI) {
  cli.parse(process.argv);
}

export * from "./src/api-stuff/auth";
export * from "./src/api-stuff/server";
export * from "./src/api-stuff/refetch";

export * from "./src/lib/readConfig";
export * from "./src/lib/types";
export * from "./src/lib/operate";
export * from "./src/lib/writeResult";

export * from "./src/file-stuff/prepare";
export * from "./src/file-stuff/prepare.types";

export * from "./src/write-rc/npmrc";
export * from "./src/write-rc/yarn2rc";
