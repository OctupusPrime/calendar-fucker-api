import { BaseConsumer } from "https://deno.land/x/oak_channels@v0.0.2/mod.ts";

export default class EchoConsumer extends BaseConsumer {
  async onConnect() {
    const roomId = this.context.params.id + ''
    // add this consumer to group "foo"
    await this.groupJoin(roomId);
    // send group message to all consumers in group "foo", including "self"
    await this.layer.groupSend(roomId, "new user joined");
  }

  // handle group messages
  // deno-lint-ignore require-await
  async onGroupMessage(group: string, message: string | Uint8Array) {
    this.send(`${group} says ${message}`)
  }

  // handle client messages
    // deno-lint-ignore require-await
  async onText(text: string) {
    this.send(text);
  }
}