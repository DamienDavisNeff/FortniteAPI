const { SlashCommandBuilder } = require('discord.js');
const FN = require('../FortniteAPI');
const config = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('upcoming')
		.setDescription('Get the amount of upcoming cosmetics in the game'),
	async execute(interaction) {
		const response = await FN.GetUpcomingItems("en",config.fnToken);
        const items = response.items;
        await interaction.reply(`There are curently ${items.length} upcoming items.\nUse \`/details {id}\` to get details about a specific item`);
	},
};
