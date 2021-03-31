import http from "http";
import Koa from "koa";
import body from "koa-json-body";
import { Token } from "../lib/types";
import { logger } from "../logger/logger";

const app = new Koa();

export async function listenForTokenFromTheWebsite() {
  return new Promise<Token>((resolve, reject) => {
    const timeoutToReject = setTimeout(() => {
      console.error("Could not retrieve token within 60s");
      reject(new Error("Token retrieval took too long"));
    }, 60000);

    app.use(
      body({
        limit: "5kb",
      })
    );

    let server: http.Server | undefined;

    logger.debug(
      "Starting server at http://localhost:35287 and listening to POST request from the ado-auth site"
    );

    server = app.listen(35287);

    app.use(async (ctx) => {
      logger.debug(`Received ${ctx.method} request.`);

      ctx.set("Access-Control-Allow-Origin", "https://ado-auth.vercel.app");
      ctx.set("Access-Control-Allow-Methods", "POST, OPTIONS");
      ctx.set("Access-Control-Allow-Headers", "content-type");

      ctx.status = 200;

      if (/POST/i.test(ctx.method)) {
        const body = ctx.request.body;

        if (body.access_token) {
          logger.debug("Received the token");

          ctx.body = { status: "OK" };
          resolve(body);
          clearTimeout(timeoutToReject);

          logger.debug("Closing the server");
          server?.close();
        }
      }

      ctx.res.end();
    });
  });
}
