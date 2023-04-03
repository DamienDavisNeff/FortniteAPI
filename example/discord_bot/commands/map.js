const { SlashCommandBuilder, DiscordAPIError } = require('discord.js');
const FN = require('../FortniteAPI');
const config = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('map')
		.setDescription('Gives you the current map')
        .addBooleanOption(option => option.setName('poi')
            .setDescription('Should POIs be visible?')
            .setRequired(false)
        ),
	async execute(interaction) {
        var showPOIs = interaction.options.getBoolean("poi");
        if(showPOIs == null || showPOIs == undefined) showPOIs = false;
        console.log(showPOIs);
        const map = await FN.GetMap(showPOIs,"en",config.fnToken);
        await interaction.reply(map);
	},
};
