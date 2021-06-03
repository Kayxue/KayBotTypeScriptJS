import ICommand from "../Interfaces/ICommand";

export const cmd: ICommand = {
    name: "ping",
    handle: async (message, args, client) => {
        return message.channel.send(`Ping: ${client.ws.ping}`)
    }
}