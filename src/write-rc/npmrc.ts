import { Token } from "../lib/types";
import fs from "fs";
import os from "os";
import path from "path";
import { logger } from "../logger/logger";

type WriteNpmrcParams = {
  npmrcPath: string;
  registries: Set<string>;
  token: Token;
};

const authTokenDelimiter = ":_authToken=";

export function writeNpmrc({ npmrcPath, registries, token }: WriteNpmrcParams) {
  let npmrc = "";
  if (fs.existsSync(npmrcPath)) {
    logger.debug("found npmrc in home directory");
    npmrc = fs.readFileSync(npmrcPath, "utf-8");
    for (const line of npmrc.split(/\n/)) {
      if (/^\/\//.test(line)) {
        // starts with '//'
        const [url] = line.split(authTokenDelimiter);
        const matchingRegistry = [...registries].find((reg) =>
          reg.startsWith(url)
        );

        if (matchingRegistry) {
          npmrc += url + ":_authToken=" + token.access_token + "\n";
          registries.delete(matchingRegistry);
        } else {
          npmrc += line + "\n";
        }
      }
    }
  }

  // if registries are still left
  npmrc = [...registries]
    .map((registry) => registry + authTokenDelimiter + token?.access_token)
    .join("/n");

  if (npmrc) {
    logger.debug("Writing ~/.npmrc");
    fs.writeFileSync(path.resolve(os.homedir(), ".npmrc"), npmrc);
  }
}