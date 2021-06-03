import IEvent from "../Interfaces/IEvent"
export const event: IEvent = {
    type: "once",
    event: "ready",
    handle: async (client) => {
        console.log([
            `Logged in as ${client.user.username}`,
            `Loaded ${client.commandCollection.array().length} Commands!`,
            `Loaded ${client.eventCollection.length} Events!`
        ].join("\n"))
    }
}