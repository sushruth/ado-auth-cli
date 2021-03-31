import sade from "sade";
import { auth } from "./src/auth";
import { readrc } from "./src/readrc";

export * from "./src/auth";
export * from "./src/lib/server";
export * from "./src/lib/types";
export * from "./src/readrc";

export const authenticate = async () => {
  console.debug("Trying to get registry settings from npm and yarn");
  readrc();
  console.debug("Trying to get get auth token");
  auth();
};

const cli = sade("ado-auth", true).version("0.0.15");

cli.action(authenticate);

if (require.main === module) {
  cli.parse(process.argv);
}
