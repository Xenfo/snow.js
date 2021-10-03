import {
  APIInteractionDataResolvedChannel,
  APIInteractionDataResolvedGuildMember,
  APIRole
} from 'discord-api-types/v9';
import {
  CommandInteraction,
  GuildChannel,
  GuildMember,
  PermissionResolvable,
  Role,
  User,
  Snowflake
} from 'discord.js';

import { ArgumentOptions, CommandOptions } from '../../typings';
import SnowError from '../../utils/SnowError';
import SnowModule from '../SnowModule';
import CommandHandler from './CommandHandler';

class Command extends SnowModule {
  public name!: string;
  public typing: boolean;
  public ratelimit: number;
  public ownerOnly: boolean;
  public description: string;
  public handler!: CommandHandler;
  public args?: ArgumentOptions[];
  public cooldown?: number | null;
  public channel: 'guild' | 'dm' | null;
  public ignoreCooldown?: Snowflake | Snowflake[];
  public parent: { name: string; description: string } | null;
  public userPermissions?: PermissionResolvable | PermissionResolvable[];
  public clientPermissions?: PermissionResolvable | PermissionResolvable[];

  public constructor(
    id: string,
    options: CommandOptions = { name: 'SnowJSCommandHasNoName' }
  ) {
    if (options.name === 'SnowJSCommandHasNoName')
      throw new Error(`Command ${id} has no name`);

    super(id, { category: options.category });

    const {
      name,
      args = this.args ?? [],
      parent = null,
      channel = null,
      ownerOnly = false,
      typing = false,
      cooldown = null,
      ratelimit = 1,
      description = '',
      clientPermissions = this.clientPermissions,
      userPermissions = this.userPermissions,
      ignoreCooldown
    } = options;

    this.name = name;
    this.args = args;
    this.typing = typing;
    this.parent = parent;
    this.channel = channel;
    this.cooldown = cooldown;
    this.ratelimit = ratelimit;
    this.ownerOnly = ownerOnly;
    this.description = description;

    this.clientPermissions = clientPermissions;
    this.userPermissions = userPermissions;
    this.ignoreCooldown = ignoreCooldown;
  }

  public exec(
    _interaction: CommandInteraction,
    _args?: Record<
      string,
      | string
      | number
      | boolean
      | User
      | APIInteractionDataResolvedChannel
      | GuildChannel
      | Role
      | APIRole
      | GuildMember
      | APIInteractionDataResolvedGuildMember
      | null
    >
  ): any | Promise<any> {
    throw new SnowError('NOT_IMPLEMENTED', this.constructor.name, 'exec');
  }
}

export default Command;
