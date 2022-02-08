import { Message, MessageEmbed } from 'discord.js';

import Command from '../../structures/Command';
import DiscordClient from '../../structures/DiscordClient';

export default class PingCommand extends Command {
    constructor(client: DiscordClient) {
        super(client, {
            name: 'ping',
            group: 'Info',
            description: 'Shows the bot\'s ping.',
            cooldown: 30
        });
    }

    async run(message: Message, args: string[]) {
        const embed = new MessageEmbed({
            color: 'BLUE',
            title: 'Ping'
        }).addFields([
            {
                name: 'API Latency',
                value: `${this.client.ws.ping}ms`
            },
            {
                name: 'Message Latency',
                value: `${message.createdTimestamp - message.createdTimestamp}ms`
            }
        ])

        await message.channel.send({ embeds: [embed] });
    }
}