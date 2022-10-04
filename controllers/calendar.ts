import { RouteParams, RouterContext } from "https://deno.land/x/oak@v9.0.0/mod.ts";

import { Consumer, type InMemoryLayer } from "https://deno.land/x/oak_channels@v0.0.2/mod.ts";

// deno-lint-ignore no-explicit-any
type Cntx = RouterContext<RouteParams, Record<string, any> & { consumer: Consumer; }>

export default {
  test: async ({ params, response, cookies }: Cntx, layer: InMemoryLayer) => {
    const roomId = params.id + ''
    console.log('List of cookies:', await cookies.get('test'))

    layer.groupSend(roomId, 'hello from server')

    await cookies.set('test', 'test', {
      maxAge: 900000, // 15 mins
      httpOnly: true,
      domain: "localhost:3000",
      sameSite:'none',
      path: "/",
    })

    response.body = {
      success: true,
      data: 'Sample data'
    }
  }
}