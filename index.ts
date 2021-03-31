import sade from "sade";
import { auth } from "./src/auth";
import { readrc } from "./src/readrc";

export const authenticate = async () => {
  console.debug("Trying to get registry settings from npm and yarn");
  readrc();
  console.debug("Trying to get get auth token");
  auth();
};

const cli = sade("ado-auth", true).version("0.0.14");

cli.action(authenticate);

if (require.main === module) {
  cli.parse(process.argv);
}
