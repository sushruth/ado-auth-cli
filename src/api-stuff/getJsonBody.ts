import { IncomingMessage } from "http";

export async function getJsonBody<D>(req: IncomingMessage) {
  return new Promise<D | undefined>(async (resolve, reject) => {
    let body = [];
    let jsonBody: D | undefined;

    req
      .on("data", (chunk: never) => {
        body.push(chunk);
      })
      .on("end", () => {
        jsonBody = JSON.parse(Buffer.concat(body).toString());

        if (jsonBody) {
          resolve(jsonBody);
        } else {
          resolve(undefined);
        }
      })
      .on("error", reject);
  });
}
