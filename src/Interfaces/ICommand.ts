import { Message } from "discord.js";
import Client from "../Client"

export default class ICommand {
    name: string;
    aliases?: string[]
    handle: (message: Message, args: string[], client: Client) => Promise<any>
}