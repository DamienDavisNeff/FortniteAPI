const { SlashCommandBuilder } = require('discord.js');
const FN = require('../FortniteAPI');
const config = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('news')
		.setDescription('Gets news for a certain gamemode')
        .addStringOption(option => option.setName('mode')
            .setDescription('The gamemode. Allowed options: br, stw, and creative')
            .setRequired(true)
        ),
	async execute(interaction) {
        const allowedModes = ["br","stw","creative"];
        const mode = interaction.options.getString("mode");
        if (!allowedModes.includes(mode)) return interaction.reply({content:"Invalid Mode\nThe Allowed Modes Are `br`, `stw`, and `creative`",ephemeral:true});
        const { news } = await FN.GetNews(mode,"en",config.fnToken);
        const liveNews = news.filter(({live}) => live);
        const newsInfo = liveNews.reduce((acc, { title, body, image }) => 
        acc + `**${title}**\n*${body}*\n${image}\n\n`, `CURRENT NEWS FOR **${mode.toLocaleUpperCase()}**\n\n`);
        await interaction.reply(newsInfo);
    },
};
