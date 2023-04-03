const { SlashCommandBuilder } = require('discord.js');
const FN = require('../FortniteAPI');
const config = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('achivements')
		.setDescription('Gets the achivements for the current season'),
	async execute(interaction) {
        const response = await FN.GetAchievements("en",config.fnToken);
        const achievements = response.achievements;
        var achivementText = `**ACHIEVEMENTS FOR THE CURRENT SEASON**\n\n`
        for(let a = 0; a < achievements.length; a++) {
            achivementText = `${achivementText}**${achievements[a].name}**\n*${achievements[a].description}*\n\n`;
            if(achivementText.length >= 1500) {
                achivementText = `${achivementText}and ${achievements.length-1-a} more...`;
                break;
            }
        }
        achivementText = `${achivementText}\n${achievements[0].image}`;
        await interaction.reply(achivementText);
	},
};
