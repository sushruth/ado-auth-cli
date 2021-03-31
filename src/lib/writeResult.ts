import dayjs from "dayjs";
import fs from "fs";
import { Token, TokenStore } from "./types";

export function writeResult(rcPath: string, response: Token) {
  fs.writeFileSync(
    rcPath,
    JSON.stringify(
      {
        expires_in: response.expires_in,
        refresh_token: response.refresh_token,
        token_type: response.token_type,
        expires_on: dayjs()
          .add(Number(response.expires_in), "seconds")
          .toISOString(),
      } as TokenStore,
      null,
      "  "
    ),
    "utf8"
  );
}
