const { SlashCommandBuilder } = require('discord.js');
const FN = require('../FortniteAPI');
const config = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('bp')
		.setDescription('Gets the battlepass for a given season')
        .addIntegerOption(option => option.setName('season')
            .setDescription('The season, leave blank for current')
            .setRequired(false)
            .setMinValue(2)
        ),
	async execute(interaction) {
        var season = interaction.options.getInteger("season");
        if(season == null || season == undefined) season = "current";
        const response = await FN.GetBattlePass(season,"en",config.fnToken);
        if(!response.result) return interaction.reply({content:"The given season does not have a battlepass.\nThis could be because you set a season in the future",ephemeral:true});
        const rewards = response.rewards.filter(reward => {
            const types = ["itemaccess","outfit","cosmeticvariant","pickaxe"];
            return types.includes(reward.item.type.id);
        });
        var rewardsInfo = `BATTLEPASS FOR SEASON: **${response.displayInfo.chapterSeason}**\nRange: *${new Date(response.seasonDates.begin).toLocaleDateString()}* to *${new Date(response.seasonDates.end).toLocaleDateString()}*\n\n`;
        for(let a = 0; a < rewards.length; a++) {
            var tier = "";
            if(rewards[a].tier != 0) tier = ["TIER",rewards[a].tier];
            if(rewards[a].page != null) tier =  ["PAGE",rewards[a].page];
            rewardsInfo = `${rewardsInfo}${tier[0]} *${tier[1]}*\n**${rewards[a].item.name}** (${rewards[a].item.type.name})\n*${rewards[a].item.description}*\n\n`;
            if(rewardsInfo.length >= 1500) {
                rewardsInfo = `${rewardsInfo}\nand more...`;
                return interaction.reply(rewardsInfo);
            }
            if(a == rewards.length - 1)
            rewardsInfo = `${rewardsInfo}${rewards[a].item.images.full_background}\n\n`;
        }
        await interaction.reply(rewardsInfo);
    },
};
