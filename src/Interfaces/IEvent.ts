import { ClientEvents } from "discord.js";
import Client from "../Client"

export default interface IEvent {
    type: "on" | "once",
    event: keyof ClientEvents
    handle: (client: Client, ...args: any[]) => Promise<any>
}