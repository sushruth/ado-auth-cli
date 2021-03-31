import { execSync } from "child_process";

function getRegistry(command: string) {
  return JSON.stringify(
    execSync(command, {
      encoding: "utf8",
      stdio: "ignore",
    }).trim()
  );
}

export function readrc() {
  let npmRegistry = "";
  let yarnRegistry = "";
  let yarn2Registry = "";

  const yarnDefaultRegex = /^(https?)?:?\/\/registry\.yarnpkg\.com.*/i;
  const npmDefaultRegex = /^(https?)?:?\/\/registry\.npmjs\.org.*/i;

  try {
    yarn2Registry = getRegistry("yarn config get npmRegistryServer");
    if (yarnDefaultRegex.test(yarn2Registry)) {
      yarn2Registry = "";
    }
  } catch (error) {}

  try {
    yarnRegistry = getRegistry("yarn config get registry");
    if (yarnDefaultRegex.test(yarnRegistry)) {
      yarnRegistry = "";
    }
  } catch (error) {}

  try {
    npmRegistry = getRegistry("npm config get registry");
  } catch (error) {
    if (npmDefaultRegex.test(npmRegistry)) {
      npmRegistry = "";
    }
  }

  if (!npmRegistry) {
    console.log("No custom npm registries found.");
  } else {
    console.log("Npmrc contains - ", npmRegistry);
  }

  if (!yarnRegistry) {
    console.log("No custom yarn registries found.");
  } else {
    console.log("Npmrc contains - ", yarnRegistry);
  }

  if (!yarn2Registry) {
    console.log("No custom yarn2 registries found.");
  } else {
    console.log("Npmrc contains - ", yarn2Registry);
  }

  return {
    npmRegistry,
    yarnRegistry,
    yarn2Registry,
  };
}
