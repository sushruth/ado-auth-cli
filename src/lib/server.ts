import http from "http";
import Koa from "koa";
import koaBody from "koa-body";
import { Token } from "./types";

export async function listenForTokenFromTheWebsite() {
  return new Promise<Token>((resolve, reject) => {
    setTimeout(() => {
      console.error("Could not retrieve token within 60s");
      reject(new Error("Token retrieval took too long"));
    }, 60000);

    const app = new Koa();

    app.use(
      koaBody({
        jsonLimit: "5kb",
      })
    );

    let server: http.Server | undefined;

    app.use(async (ctx) => {
      ctx.set("Access-Control-Allow-Origin", "https://ado-auth.vercel.app");
      ctx.set("Access-Control-Allow-Methods", "POST, OPTIONS");
      ctx.set("Access-Control-Allow-Headers", "content-type");

      ctx.status = 200;

      if (/POST/i.test(ctx.method)) {
        const body = ctx.request.body;
        if (body.access_token) {
          ctx.body = { status: "OK" };
          resolve(body);
          setImmediate(() => server?.close());
        }
      }

      ctx.res.end();
    });

    server = app.listen(35287);
  });
}
