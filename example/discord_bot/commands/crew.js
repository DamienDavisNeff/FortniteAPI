const { SlashCommandBuilder } = require('discord.js');
const FN = require('../FortniteAPI');
const config = require('../config.json');

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

module.exports = {
	data: new SlashCommandBuilder()
		.setName('crew')
		.setDescription('Gets information about Fortnite Crew')
        .addIntegerOption(option => option.setName('month')
            .setDescription('The month that you want to look up')
            .setRequired(true)
            .setMinValue(1)
            .setMaxValue(12)
        )
        .addIntegerOption(option => option.setName('year')
            .setDescription('The year that you want to look up')
            .setRequired(true)
            .setMinValue(2020)
        ),
	async execute(interaction) {

        const month = interaction.options.getInteger("month")-1;
        const year = interaction.options.getInteger("year");
        
        // CHECKS IF THE DATE IS IN THE PRESENT
        if (year === new Date().getFullYear() && month === new Date().getMonth()) {
            const response = await FN.GetCrew("en",config.fnToken);
            const current = response.currentCrew;
            var rewards = current.rewards.map(r => `**${r.item.name}** (*${r.item.type.name}*)\n${r.item.description}\n\n`).join('');
            return interaction.reply(`The Current Crew Pack:\n\n${rewards}${current.images.apiRender}`);
        } else if (year > new Date().getFullYear()) {
            return interaction.reply({content:"You can't pick a year in the future",ephemeral:true});
        } else if(year === new Date().getFullYear() && month > new Date().getMonth()) {
            return interaction.reply({content:"You can't pick a month in the future",ephemeral:true});
        }

        // CHECKS IF THE DATE IS IN THE PAST
        if (year > new Date().getFullYear() || (year === new Date().getFullYear() && month > new Date().getMonth())) {
            return interaction.reply({ content: "You can't pick a date in the future", ephemeral: true });
        }

        // GET HISTORY OF CREW, AND RETURN MATCHING PACK
        const response = await FN.GetCrewHistory("en", config.fnToken);
        const history = response.history;
        const matchingCrewPack = history.find(pack => {
            const releaseMonth = new Date(pack.date).getMonth();
            const releaseYear = new Date(pack.date).getFullYear();
            return releaseMonth === month && releaseYear === year;
        });

        // SEND MESSAGE WITH CREW PACK IF EXISTS, OTHERWISE SEND ERROR
        if (matchingCrewPack) {
            var rewards = "";
            for (let b = 0; b < matchingCrewPack.rewards.length; b++) {
                rewards = `${rewards}**${(matchingCrewPack.rewards[b].item.name)}** (*${matchingCrewPack.rewards[b].item.type.name}*)\n${matchingCrewPack.rewards[b].item.description}\n\n`
            }
            const crewInfo = `The Crew Pack For ${monthNames[month]} ${year}\n\n${rewards}${matchingCrewPack.images.apiRender}`;
            return interaction.reply(crewInfo);
        } else {
            return interaction.reply({ content: "No crew pack found for the selected date", ephemeral: true });
        }

	},
};
