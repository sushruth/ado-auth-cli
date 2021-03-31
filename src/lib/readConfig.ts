import { execSync } from "child_process";
import { logger } from "../logger/logger";

const defaultRegex = /^(https?)?:?\/\/registry\.(yarnpkg|npmjs)\.(com|org).*/i;

const commands = {
  npm: "npm config get registry",
  yarn: "yarn config get registry",
  yarn2: "yarn config get npmRegistryServer",
};

function getRegistry(tool: keyof typeof commands) {
  let registry = "";

  try {
    registry = execSync(commands[tool], {
      encoding: "utf8",
      cwd: process.cwd(),
    })
      ?.trim()
      .replace(/^https?:/, ""); // remove https

    if (defaultRegex.test(registry) || /undefined/i.test(registry)) {
      registry = "";
    }
  } catch (error) {
    logger.debug(`Running "${commands[tool]}" resulted in an error - `, error);
  }

  if (!registry) {
    logger.debug(`No custom ${tool} registry found.`);
  } else {
    logger.debug(`${tool} config contains this registry -> `, registry);
  }

  return registry;
}

export function readConfig() {
  let npmRegistry = getRegistry("npm");
  let yarnRegistry = getRegistry("yarn");
  let yarn2Registry = getRegistry("yarn2");

  return new Set([npmRegistry, yarnRegistry, yarn2Registry].filter(Boolean));
}
