const { SlashCommandBuilder } = require('discord.js');
const FN = require('../FortniteAPI');
const config = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('quests')
		.setDescription('Get information about the current Fortnite quests'),
	async execute(interaction) {
		const response = await FN.GetChallenges("current","en",config.fnToken);
        const quests = response.bundles
            .map(bundle => bundle.name)
            .filter((name, index, self) => self.indexOf(name) === index && name !== '')
            .join(', ');
        await interaction.reply(`There are currently ${response.bundles.length} sets of quests in Fortnite.\n\nThese quests include:\n${quests}`);
	},
};
