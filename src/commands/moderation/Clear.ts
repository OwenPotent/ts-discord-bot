import { Message, MessageEmbed, User } from 'discord.js';

import Command from '../../structures/Command';
import DiscordClient from '../../structures/DiscordClient';

export default class ClearCommand extends Command {
    constructor(client: DiscordClient) {
        super(client, {
            name: 'clear',
            group: 'Moderation',
            description: 'Clears messages',
            examples: ['clear 10'],
            aliases: ['purge'],
            cooldown: 30,
            require: {
                permissions: ['MANAGE_MESSAGES'],
            }
        });
    }

    async run(message: Message, args: string[]) {
        if (!args[0]) {
            const embed = new MessageEmbed({
                color: 'RED',
                title: 'Error',
                description: 'You must specify a number of messages to delete.'
            });

            return message.channel.send({ embeds: [embed] });
        }

        const amount = parseInt(args[0]);

        if (isNaN(amount)) {
            const embed = new MessageEmbed({
                color: 'RED',
                title: 'Error',
                description: 'You must specify a number of messages to delete.'
            });

            return message.channel.send({ embeds: [embed] });
        }

        if (amount < 2 || amount > 100) {
            const embed = new MessageEmbed({
                color: 'RED',
                title: 'Error',
                description: 'You must specify a number of messages to delete between 2 and 100.'
            });

            return message.channel.send({ embeds: [embed] });
        }

        const fetched = await message.channel.messages.fetch({ limit: amount });

        if (fetched.size === 0) {
            const embed = new MessageEmbed({
                color: 'RED',
                title: 'Error',
                description: 'There are no messages to delete.'
            });

            return message.channel.send({ embeds: [embed] });
        }

        fetched.forEach(msg => {
            msg.delete();
        });

        // send an embed that contains the number of messages deleted and the additional options.
        const embed = new MessageEmbed({
            color: 'GREEN',
            title: 'Success',
            description: `Successfully deleted ${fetched.size} messages.`
        });

        // send the embed, wait 5 seconds then delete the message
        return message.channel.send({ embeds: [embed] }).then(msg => {
            setTimeout(() => {
                msg.delete();
            }, 5000);
        });
    }
}