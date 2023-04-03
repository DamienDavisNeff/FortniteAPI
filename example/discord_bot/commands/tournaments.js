const { SlashCommandBuilder } = require('discord.js');
const FN = require('../FortniteAPI');
const config = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('tournaments')
		.setDescription('Gets the upcoming tournaments for the current season')
        .addStringOption(option => option.setName('region')
            .setDescription('The region for the tournaments. Valid options: "nae","naw","br","eu","oce","asia","me"')
            .setRequired(true)
        ),
	async execute(interaction) {
        const regions = ["nae","naw","br","eu","oce","asia","me"];
        const realPlatforms = ["XCloud","XCloudMobile","XSX","PS5","PS4","XboxOne","Android","Switch","Windows"];
        const region = interaction.options.getString("region");
        if(!regions.includes(region.toLocaleLowerCase())) return interaction.reply("Please select a valid region.\nThe valid regions are `nae`,`naw`,`br`,`eu`,`oce`,`asia`,`me`");
        const response = await FN.GetTournaments(region,"en",config.fnToken);
        const events = response.events;
        var allEvents = "**UPCOMING EVENTS**\n\n";
        for(let a = 0; a < events.length; a++) {
            if(new Date(events[a].endTime) > new Date()) {
                var platforms = events[a].platforms;
                platforms = platforms.reduce((acc, cur) => {
                    if (realPlatforms.includes(cur)) {
                      acc.push(cur);
                    }
                    return acc;
                }, []);
                const platformMap = {
                    "XCloud": "Cloud Gaming",
                    "XCloudMobile": "Cloud Gaming (Mobile)",
                    "XboxOne": "Xbox One",
                    "XSX": "Xbox Series X",
                    "PS4": "PlayStation 4",
                    "PS5": "PlayStation 5",
                    "Android": "Android",
                    "Switch": "Nintendo Switch",
                    "Windows": "PC"
                };
                platforms = platforms.map(platform => platformMap[platform] || platform);
                
                var platformsParsed = "";
                for(let b = 0; b < platforms.length; b++) {
                    if (b === platforms.length - 2) {
                        platformsParsed += platforms[b] + " and ";
                    } else if (b === platforms.length - 1) {
                        platformsParsed += platforms[b];
                    } else {
                        platformsParsed += platforms[b] + ", ";
                    }
                }
                eventDetails = `**${events[a].name_line1} ${events[a].name_line2}**\n*${events[a].id.replace("epicgames_","")}*\n${events[a].short_description}\n${events[a].schedule} at ${new Date(events[a].beginTime).toLocaleTimeString()} to ${new Date(events[a].endTime).toLocaleTimeString()} (${new Intl.DateTimeFormat().resolvedOptions().timeZone})\nPlatforms: ${platformsParsed}\n\n`;
                allEvents = `${allEvents}${eventDetails}`;
                if(allEvents.length >= 1500) {
                    allEvents = `${allEvents}and ${events.length-1-a} more...`;
                    return interaction.reply(allEvents);
                }
            }
        }
        await interaction.reply(allEvents);
	},
};
