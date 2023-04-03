const { SlashCommandBuilder } = require('discord.js');
const FN = require('../FortniteAPI');
const config = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('items')
		.setDescription('Lists the amount of cosmetics in the game'),
	async execute(interaction) {
		const response = await FN.GetItems("en",config.fnToken);
        const items = response.items;
        await interaction.reply(`There are currently ${items.length} cosmetics in game.\nUse \`/details {id}\` to get details about a specific item`);
	},
};
