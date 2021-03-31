import fs from "fs";
import yaml from "js-yaml";
import os from "os";
import path from "path";
import { Token, YarnRcRegistryPart } from "../lib/types";
import { logger } from "../logger/logger";

type Yarn2RcParams = {
  yarnrcPath: string;
  registries: Set<string>;
  token: Token;
};

export function writeYarn2rc({ registries, token, yarnrcPath }: Yarn2RcParams) {
  let yarnrc: YarnRcRegistryPart = { npmRegistries: {} };

  if (fs.existsSync(yarnrcPath)) {
    logger.debug("Found .yarnrc.yml in home directory");
    yarnrc = yaml.load(
      fs.readFileSync(yarnrcPath, "utf-8")
    ) as YarnRcRegistryPart; // assume no throw

    if (yarnrc && typeof yarnrc === "object") {
      for (const reg of registries) {
        const yarnConfigOfInterest = yarnrc.npmRegistries[reg];
        if (yarnConfigOfInterest) {
          yarnConfigOfInterest.npmAuthToken = token.access_token;
          registries.delete(reg);
        }
      }
    }
  }

  const yarnRcDump = [...registries].reduce(
    (acc, value) => {
      return {
        npmRegistries: {
          ...acc.npmRegistries,
          [value]: {
            npmAlwaysAuth: true,
            npmAuthToken: token?.access_token,
          },
        },
      };
    },
    {
      npmRegistries: {},
    } as YarnRcRegistryPart
  );

  if (yarnRcDump) {
    const contents = yaml.dump({
      npmRegistries: {
        ...yarnRcDump.npmRegistries,
        ...yarnrc.npmRegistries,
      },
    } as YarnRcRegistryPart);

    if (contents) {
      logger.debug("Writing ~/.yarnrc.yml");
      fs.writeFileSync(path.resolve(os.homedir(), ".yarnrc.yml"), contents);
    }
  }
}
