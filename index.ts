import sade from "sade";
import { auth } from "./src/auth";
import { readrc } from "./src/readrc";
import path from 'path'
import fs from 'fs'
import os from 'os'

export * from "./src/auth";
export * from "./src/lib/server";
export * from "./src/lib/types";
export * from "./src/readrc";

export const authenticate = async () => {

  const rcPath = path.resolve(os.homedir(), '.ado-authrc.json');

  if(fs.existsSync(rcPath)) {
    // handle when file exists
    const file = fs.readFileSync(rcPath, 'utf-8');
    try {
      const data = JSON.parse(file);
      // handle when data is valid
      // handle when auth hasnt expired
      // handle when auth has expired - refresh the token
      // handle when refresh token succeeds
      // handle when refresh token fails
    } catch (error) {
      // go ahead get a token
    }
  }

  console.debug("Trying to get registry settings from npm and yarn");
  const { npmRegistry, yarn2Registry, yarnRegistry } = readrc();
  
  console.debug("Trying to get get auth token");
  auth();

  // augment auth token info to contain expiresOn
  // write the `.ado-authrc.json` file without authToken
  // Now go ahead and use that token to write a npmrc and yarnrc.yml
};

const cli = sade("ado-auth", true).version("0.0.15");

cli.action(authenticate);

if (require.main === module) {
  cli.parse(process.argv);
}
