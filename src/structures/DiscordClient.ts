import { Client, IntentsString } from 'discord.js';
import mongoose from 'mongoose';

import Logger from '../classes/Logger';
import Registry from '../classes/Registry';
import { mongoUri } from '../config/config.json';
import { IConfig } from '../utils/interfaces';

export default class DiscordClient extends Client {
    /**
     * Registry of the client.
     */
    readonly registry: Registry;

    /**
     * Config of the client.
     */
    readonly config: IConfig;

    constructor(intents: IntentsString[]) {
        super({ intents });

        /**
         * Setting up client's config.
         */
        this.config = {
            token: process.env.TOKEN as string,
            prefix: process.env.PREFIX as string,
            developers: JSON.parse(process.env.DEVELOPERS as string) as string[],
            unknownErrorMessage: JSON.parse(process.env.UNKNOWN_COMMAND_ERROR as string)
        };

        /**
         * Creating new registry class.
         */
        this.registry = new Registry(this);

        /**
         * Registering events and commands.
         */
        this.registry.registerAll();

        /**
         * Connect to MongoDB Database
         */
        this.connectToDatabase();
    }

    private async connectToDatabase() {
        await mongoose.connect(mongoUri).then(() => {
            Logger.log("SUCCESS", "Connected to database.");
        }).catch(err => {
            Logger.log("ERROR", `Failed to connect to database. ${err.message}`);
        });
    }
}
