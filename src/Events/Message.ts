import { Message } from "discord.js";
import IEvent from "../Interfaces/IEvent";

export const event: IEvent = {
    type: "on",
    event: "message",
    handle: async (client, message: Message) => {
        const mentionRegexPrefix: RegExp = RegExp(`^<@!${client.user.id}>`);

        if (!message.guild || message.author.bot) return;

        const prefix: string = message.content.match(mentionRegexPrefix) ? message.content.match(mentionRegexPrefix)[0] : client.prefix.find(e => message.content.startsWith(e));

        if (!prefix) return;

        const [cmd, ...args] = message.content.slice(prefix.length).trim().split(/ +/g);
        let cmdobj = client.commandCollection.get(cmd) ?? client.commandCollection.get(client.aliasesCollection.get(cmd));
        cmdobj?.handle(message, args, client)
    }
}