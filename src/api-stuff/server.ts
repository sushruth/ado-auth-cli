import http, { IncomingMessage } from "http";
import { Token } from "../lib/types";
import { logger } from "../logger/logger";
import { SERVER_PORT, SERVER_TIMEOUT } from "../lib/constants";

export function listenForTokenFromTheWebsite() {
  return new Promise<Token>((resolve, reject) => {
    const server = http.createServer(async (req, res) => {
      if (!req.method) {
        // Probably just for typing. Do not respond if there is no method.
        return res.end();
      }

      logger.debug(`Received ${req.method} request.`);

      res.setHeader(
        "Access-Control-Allow-Origin",
        "https://ado-auth.vercel.app"
      );
      res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
      res.setHeader("Access-Control-Allow-Headers", "content-type");

      if (/POST/i.test(req.method)) {
        const token = await getJsonBody<Token>(req);

        if (token && token.access_token) {
          logger.debug("Received the token");
          res.setHeader("Content-Type", "application/json");
          resolve(token);
          clearTimeout(timeoutToReject);

          logger.debug("Responding back and closing the server");
          res.end(JSON.stringify({ status: "OK" }));
          return server.close();
        }
      }

      res.writeHead(200);

      return res.end();
    });

    logger.debug(
      `Starting server at http://localhost:${SERVER_PORT} and listening to POST request from the ado-auth site`
    );

    const timeoutToReject = setTimeout(() => {
      console.error("Could not retrieve token within 60s");
      reject(new Error("Token retrieval took too long"));
      return server.close();
    }, SERVER_TIMEOUT);

    server.listen(SERVER_PORT);
  });
}

async function getJsonBody<D>(req: IncomingMessage) {
  return new Promise<D | undefined>(async (resolve, reject) => {
    let body = [];
    let jsonBody: D | undefined;

    req
      .on("data", (chunk: never) => body.push(chunk))
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
