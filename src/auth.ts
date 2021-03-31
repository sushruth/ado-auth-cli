import open from "open";
import { listenForTokenFromTheWebsite } from "./lib/server";

const url = `https://app.vssps.visualstudio.com/oauth2/authorize
?client_id=54DC9EFD-680A-4B1E-8066-D669BC6A5D09
&response_type=Assertion
&scope=vso.packaging
&redirect_uri=https://ado-auth.vercel.app/api/auth`.trim();

export async function auth() {
  open(url);

  const token = await listenForTokenFromTheWebsite();

  console.log(token);
}
