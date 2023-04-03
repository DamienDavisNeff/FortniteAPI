const { SlashCommandBuilder, DiscordAPIError } = require('discord.js');
const FN = require('../FortniteAPI');
const config = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('old_map')
		.setDescription('Gives you an old map')
        .addStringOption(option => option.setName('season')
            .setDescription('what version of the map do you want (eg: 11.10)')
            .setRequired(true)
        )
        .addBooleanOption(option => option.setName('poi')
            .setDescription('Should POIs be visible?')
            .setRequired(false)
        ),
	async execute(interaction) {
        var showPOIs = interaction.options.getBoolean("poi");
        if(showPOIs == null || showPOIs == undefined) showPOIs = false;
        const version = interaction.options.getString("season");
        const mapList = await FN.GetOldMaps("en",config.fnToken);
        maps = mapList.maps;
        for(let a = 0; a < maps.length; a++) {
            if(version != maps[a].patchVersion) {
                if(a >= maps.length-1) return interaction.reply(`Map not found for ${version}`);
                continue;
            }
            var image = maps[a].url;
            if(showPOIs) image = maps[a].urlPOI;
            return interaction.reply(image);
        }
	},
};
