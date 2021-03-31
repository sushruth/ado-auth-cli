import dayjs from "dayjs";
import fs from "fs";
import { Token, TokenStore } from "./types";

export function writeAdoRc(rcPath: string, response: Token) {
  fs.writeFileSync(
    rcPath,
    JSON.stringify(
      {
        ...response,
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
