import { Router } from "https://deno.land/x/oak@v9.0.0/mod.ts";

import { InMemoryLayer, mountConsumer } from "https://deno.land/x/oak_channels@v0.0.2/mod.ts";

const router = new Router()
//controllers
import wsServerStatus from '../controllers/wsServerStatus.ts'
import calendarController from "../controllers/calendar.ts";

const layer = new InMemoryLayer();

router
  .all('/ws/:id', mountConsumer(wsServerStatus, layer))
  .get('/test/:id', async (ctx) => await calendarController.test(ctx, layer))

export default router