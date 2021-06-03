import { Client, Collection } from "discord.js"
import glo from "glob"
import { promisify } from "util"
import chalk from "chalk"
import IEvent from "./Interfaces/IEvent"
import ICommand from "./Interfaces/ICommand"
const glob = promisify(glo)

export interface IBotOptions {
    token: string,
    prefix: string[]
}

export default class client extends Client {
    public prefix: string[]
    public eventCollection: IEvent[] = []
    public commandCollection: Collection<string, ICommand> = new Collection()
    public aliasesCollection: Collection<string, string> = new Collection()

    public constructor(option: IBotOptions) {
        super()
        this.token = option.token
        this.prefix = option.prefix
    }

    private async loadCommand() {
        return glob("./Commands/**/*.{js,ts}")
            .then(commands => {
                console.log(`${chalk.bgBlue.black(`[Info]`)} ${chalk.blue("載入指令中......")}`)
                for (let commandFile of commands) {
                    delete require.cache[require.resolve(commandFile)];
                    const command: ICommand = require(commandFile).cmd;
                    this.commandCollection.set(command.name, command);
                    if (command.aliases?.length) {
                        for (const alias of command.aliases) {
                            this.aliasesCollection.set(alias, command.name);
                        }
                    }
                }
                console.log(`${chalk.bgGreen.black(`[Succeed]`)} ${chalk.green("指令載入完成!")}`)
            })
    }

    private async loadEvents() {
        return glob("./Events/**/*.{js,ts}")
            .then(events => {
                console.log(`${chalk.bgBlue.black(`[Info]`)} ${chalk.blue("載入事件監聽器中......")}`)
                for (let eventFile of events) {
                    delete require.cache[require.resolve(eventFile)];
                    const event: IEvent = require(eventFile).event;
                    this.eventCollection.push(event)
                    if (event.type === "on") {
                        this.on(event.event, (...args) => event.handle(this, ...args))
                    }
                    else {
                        this.once(event.event, (...args) => event.handle(this, ...args))
                    }
                }
                console.log(`${chalk.bgGreen.black(`[Succeed]`)} ${chalk.green("指令事件監聽器完成!")}`)
            })
    }

    public async start() {
        await this.loadCommand()
        await this.loadEvents()
        this.login(this.token)
    }
}