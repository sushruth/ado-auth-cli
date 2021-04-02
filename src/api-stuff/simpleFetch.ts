import { getJsonBody } from "./getJsonBody";
import https from "https";

export async function simpleFetch<D>(url: string) {
  return new Promise<D | undefined>((resolve) => {
    https
      .request(url, async (res) => {
        const body = await getJsonBody<D>(res);
        resolve(body);
      })
      .end();
  });
}
