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

  logger.debug(`${registries.size} registries to be updated`);

  if (fs.existsSync(npmrcPath)) {
    logger.debug("found .npmrc in home directory");

    npmrc = fs.readFileSync(npmrcPath, "utf-8");
    for (const line of npmrc.split(/\n/)) {
      /**
       * Yarn 2 seems to add another entry to .npmrc for each URL with the trailing `registry/` removed.
       * Need to address that.
       */
      const lineWithoutTrailingRegistry = line.replace(/\/registry\/?$/im, "/");

      if (/^\/\//.test(line) || /^\/\//.test(lineWithoutTrailingRegistry)) {
        // starts with `//`
        const [url] = line.split(authTokenDelimiter);
        const matchingRegistry = [...registries].find((reg) =>
          reg.startsWith(url)
        );

        if (matchingRegistry) {
          logger.debug(`Adding a token to the "${matchingRegistry}" entry`);
          npmrc += `${url}${authTokenDelimiter}${token.access_token}\n`;

          let urlWithoutTrailingRegistry = url.replace(/\/registry\/?$/im, "/");

          if (urlWithoutTrailingRegistry !== url) {
            // If there is a trailing `/registry/`
            npmrc += `${urlWithoutTrailingRegistry}${authTokenDelimiter}${token.access_token}\n`;
          }
          
          registries.delete(matchingRegistry);
        } else {
          npmrc += line + "\n";
        }
      }
    }
  } else {
    logger.debug("No .npmrc in home directory");
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
