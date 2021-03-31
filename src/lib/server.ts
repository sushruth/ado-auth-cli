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
      if (/options/i.test(ctx.method)) {
        ctx.set("Access-Control-Allow-Origin", "https://ado-auth.vercel.app");
        ctx.set("Access-Control-Allow-Methods", "POST, OPTIONS");
        ctx.set("Access-Control-Allow-Headers", "content-type");
        ctx.status = 200;
        ctx.res.end();
      } else {
        const body = ctx.request.body;
        console.log("Got body", body);
        ctx.body = { status: "OK" };
        ctx.status = 200;
        ctx.res.end();
        setImmediate(() => server?.close());
        resolve(body);
      }
    });

    server = app.listen(35287);
  });
}
