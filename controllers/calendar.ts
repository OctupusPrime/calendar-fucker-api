import { RouteParams, RouterContext } from "https://deno.land/x/oak@v9.0.0/mod.ts";

import { Consumer, type InMemoryLayer } from "https://deno.land/x/oak_channels@v0.0.2/mod.ts";

// deno-lint-ignore no-explicit-any
type Cntx = RouterContext<RouteParams, Record<string, any> & { consumer: Consumer; }>

export default {
  test: ({ params, response }: Cntx, layer: InMemoryLayer) => {
    const roomId = params.id + ''

    layer.groupSend(roomId, 'hello from server')

    response.body = {
      success: true,
      data: 'Sample data'
    }
  }
}