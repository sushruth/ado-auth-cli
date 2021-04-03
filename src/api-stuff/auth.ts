import open from "opener";
import { listenForTokenFromTheWebsite } from "./server";
import { writeAdoRc } from "../lib/writeAdoRc";
import { CliOptions } from "../lib/types";
import { CLIENT_ID } from "../lib/constants";
import { URL } from "url";

function getUrl(clientId = CLIENT_ID, host: string) {
  const hostUrl = new URL(host);
  hostUrl.pathname = "/api/auth";

  return `https://app.vssps.visualstudio.com/oauth2/authorize?client_id=${clientId}&response_type=Assertion&scope=vso.packaging&redirect_uri=${hostUrl.href}`;
}

export async function auth(rcPath: string, config: CliOptions) {
  open(getUrl(config.clientId, config.host));

  const result = await listenForTokenFromTheWebsite(config);

  if (result.access_token && result.refresh_token && result.expires_in) {
    writeAdoRc(rcPath, result);
  } else {
    console.error("Something went wrong while fetching refresh token");
  }

  return result;
}
