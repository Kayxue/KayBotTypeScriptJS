import ICommand from "../Interfaces/ICommand";

export const cmd: ICommand = {
    name: "showargs",
    aliases: ["args"],
    handle: async (message, args, client) => {
        return message.channel.send(`Args: ${args}`)
    }
}