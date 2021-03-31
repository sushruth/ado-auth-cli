import http from "http";
import Koa from "koa";
import koaBody from "koa-body";
import { Token } from "./types";

export async function listenForTokenFromTheWebsite() {
  const result = await new Promise<Token>((resolve) => {
    const app = new Koa();

    app.use(
      koaBody({
        jsonLimit: "5kb",
      })
    );

    let server: http.Server | undefined;

    app.use(async (ctx) => {
      const body = ctx.request.body;
      console.log("Got body", body);
      ctx.body = { status: "OK" };
      resolve(body);
      server?.close();
    });

    server = app.listen(35287);
  });
}
