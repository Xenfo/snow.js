import { Client, ClientOptions } from 'discord.js';

export class SnowClient extends Client {
  public constructor(options: ClientOptions) {
    super(options);
  }
}
