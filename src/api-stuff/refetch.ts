import { TokenStore } from "../lib/types";
import { writeResult } from "../lib/writeResult";
import { listenForTokenFromTheWebsite } from "./server";
import open from "open";

export async function refetch(data: TokenStore, rcPath: string) {
  open(`https://ado-auth.vercel.app/api/refresh?token=${data.refresh_token}`);

  const result = await listenForTokenFromTheWebsite();

  if (result.access_token && result.refresh_token && result.expires_in) {
    writeResult(rcPath, result);
  } else {
    console.error("Something went wrong while fetching refresh token");
  }

  return result;
}
