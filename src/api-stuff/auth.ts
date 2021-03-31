import open from "open";
import { listenForTokenFromTheWebsite } from "./server";
import { writeResult } from "../lib/writeResult";

const url = `https://app.vssps.visualstudio.com/oauth2/authorize
?client_id=54DC9EFD-680A-4B1E-8066-D669BC6A5D09
&response_type=Assertion
&scope=vso.packaging
&redirect_uri=https://ado-auth.vercel.app/api/auth`.trim();

export async function auth(rcPath: string) {
  open(url);

  const result = await listenForTokenFromTheWebsite();

  if (result.access_token && result.refresh_token && result.expires_in) {
    writeResult(rcPath, result);
  } else {
    console.error("Something went wrong while fetching refresh token");
  }

  return result;
}
