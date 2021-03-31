import fetch from "node-fetch";
import { AdoAuthApiResponse, TokenStore } from "../lib/types";
import { writeAdoRc } from "../lib/writeAdoRc";
import { logger } from "../logger/logger";

export async function refetch(data: TokenStore, rcPath: string) {
  const result: AdoAuthApiResponse = await fetch(
    `https://ado-auth.vercel.app/api/refresh?token=${data.refresh_token}`
  ).then((res) => res.json());

  if (result.code === "SUCCESS") {
    logger.debug("Received refreshed token succesfully.");
    writeAdoRc(rcPath, result.body);
    return result.body;
  } else {
    logger.debug(
      "Something went wrong while fetching refresh token - ",
      result
    );
  }
}
