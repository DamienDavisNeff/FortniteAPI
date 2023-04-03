const { SlashCommandBuilder } = require('discord.js');
const FN = require('../FortniteAPI');
const config = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('code')
		.setDescription('Searches creator code info')
        .addStringOption(option => option.setName('code')
            .setDescription('The creator code that you want to look up')
            .setRequired(true)
        ),
	async execute(interaction) {
        const code = interaction.options.getString("code");
        const response = await FN.SearchCreatorCode(code,"en",config.fnToken);
        if(!response.response) return interaction.reply({content:`${response.message}`,ephemeral:true});
        await interaction.reply(`Support A Creator Information: **${response.code.slug.toLocaleUpperCase()}**\nActive: **${response.code.status}**\nInternal Display Name: **${response.code.displayName}**\n\`Please Use Code "SPIRO" To Support The Develeoper #Ad\``); 
	},
};
