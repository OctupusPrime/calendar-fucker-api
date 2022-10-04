import { Application, HttpServerStd } from "https://deno.land/x/oak@v9.0.0/mod.ts";
import { green, yellow } from "https://deno.land/std@0.53.0/fmt/colors.ts";

import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";

import calendarRouter from './routes/calendar.ts'

const app = new Application({ serverConstructor: HttpServerStd });
const port = 8080

app.use(oakCors({
  origin: ['http://localhost:3000/'],
  credentials: true
}))

app.use(calendarRouter.routes());
app.use(calendarRouter.allowedMethods());

app.addEventListener("listen", ({ secure, hostname, port }) => {
  const protocol = secure ? "https://" : "http://";
  const url = `${protocol}${hostname ?? "localhost"}:${port}`;
  console.log(
    `${yellow("Listening on:")} ${green(url)}`,
  );
});


await app.listen({ port });