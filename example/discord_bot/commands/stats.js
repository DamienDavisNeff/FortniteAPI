const { SlashCommandBuilder } = require('discord.js');
const FN = require('../FortniteAPI');
const config = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('stats')
		.setDescription('Gets player stats')
        .addStringOption(option => option.setName('username')
            .setDescription('The username that you want to look up')
            .setRequired(true)
        ),
	async execute(interaction) {

        const username = interaction.options.getString("username");
        var accountID = await FN.GetAccountID(username,"en",config.fnToken);

        if(accountID.result) {
            accountID = accountID.account_id;
        } else {
            return interaction.reply({content:"Invalid Account",ephemeral:true});
        }

        const result = await FN.GetStats(accountID,"en",config.fnToken);
        if(!result.result) {
            return interaction.reply({content:"Profile is Private",ephemeral:true});
        } else {
            const stats = Object.values(result.global_stats);
            const combinedStats = stats.reduce((acc, cur) => {
                acc.wins += cur.placetop1;
                acc.kills += cur.kills;
                acc.matchesPlayed += cur.matchesplayed;
                acc.minutesPlayed += cur.minutesplayed;
                return acc;
            }, { wins: 0, kills: 0, matchesPlayed: 0, minutesPlayed: 0 });
            const winrate = `${((combinedStats.wins/combinedStats.matchesPlayed)*100).toFixed(2)}%`;
            const kd = `${(combinedStats.kills/combinedStats.matchesPlayed).toFixed(2)}`;
            const timePlayed = `${Math.floor(combinedStats.minutesPlayed/60)}h${combinedStats.minutesPlayed%60}`;
            const finalInfo = `Stats For Player: **${username}**\n\nWINS: **${combinedStats.wins}**\nKILLS: **${combinedStats.kills}**\nMATCHES PLAYED: **${combinedStats.matchesPlayed}**\n\nWinrate: **${winrate}**\nKD: **${kd}**\n\nTIME PLAYED: **${timePlayed}**`;
            return interaction.reply(finalInfo);
        }
        
	},
};
