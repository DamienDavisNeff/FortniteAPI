const { SlashCommandBuilder } = require('discord.js');
const FN = require('../FortniteAPI');
const config = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('details')
		.setDescription('Get information about cosmetics!')
                .addStringOption(option => option.setName('id').setDescription('The item ID you want to look up').setRequired(true)),
	async execute(interaction) {
        const id = interaction.options.getString('id');
        const response = await FN.GetItemDetails(id,"en",config.fnToken);
        if(!response.result) return interaction.reply("Item not found!");
        const item = response.item;
        const copyrighted = item.copyrightedAudio ? "YES" : "NO";
        const battlepass = item.battlepass ? `${item.battlepass.displayText.chapterSeason}, Tier ${item.battlepass.tier} (${item.battlepass.type})` : "NO";
        info = `**${item.name}** (${item.type.name})\n*${item.description}*\n${item.set.partOf}\nAdded on *${item.added.date}* (${item.added.version})\nIncluded In Battlepass: **${battlepass}**\nIncludes Copyrighted Music: **${copyrighted}**\nFirst Release: *${item.releaseDate}*, Last Relase: *${item.lastAppeareance}*\n${item.images.full_background}`;
        await interaction.reply(info);
	},
};
