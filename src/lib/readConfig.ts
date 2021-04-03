import { execSync } from "child_process";
import { logger } from "../logger/logger";

const defaultRegex = /^(https?)?:?\/\/registry\.(yarnpkg|npmjs)\.(com|org).*/i;

const commands = {
  npm: "npm config get registry",
  yarn: "yarn config get registry",
  yarn2: "yarn config get npmRegistryServer",
};

function getRegistry(tool: Exclude<keyof typeof commands, "yarn2">) {
  let registry = "";

  let toolToUse: keyof typeof commands = tool;

  if (tool === "yarn") {
    const version = execSync("yarn -v", { encoding: "utf8" })?.trim();
    if (/2\.\d*\.\d*/i.test(version)) {
      toolToUse = "yarn2";
    }
  }

  try {
    registry = execSync(commands[toolToUse], {
      encoding: "utf8",
      cwd: process.cwd(),
    })
      ?.trim()
      .replace(/^https?:/, ""); // remove https

    if (defaultRegex.test(registry) || /undefined/i.test(registry)) {
      registry = "";
    }
  } catch (error) {
    logger.debug(
      `Running "${commands[toolToUse]}" resulted in an error - `,
      error
    );
  }

  if (!registry) {
    logger.debug(`No custom ${toolToUse} registry found.`);
  } else {
    logger.debug(`${toolToUse} config contains this registry -> `, registry);
  }

  return registry;
}

export function readConfig() {
  let npmRegistry = getRegistry("npm");
  let yarnRegistry = getRegistry("yarn");

  return new Set(
    [...getBothEntries(npmRegistry), ...getBothEntries(yarnRegistry)].filter(
      Boolean
    )
  );
}

/**
 * Helper function to get both entries needed, for a given ado npm registry
 * @param registry registry url as a string
 * @returns array of two urls - one with the trailing /registry/ and one without.
 */
function getBothEntries(registry?: string) {
  if (!registry) return [];
  const withoutTrailingRegistry = registry.replace(/\/registry\/?$/im, "/");
  return [withoutTrailingRegistry, withoutTrailingRegistry + "registry/"];
}
