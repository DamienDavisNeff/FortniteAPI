const { SlashCommandBuilder } = require('discord.js');
const FN = require('../FortniteAPI');
const config = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('shop')
		.setDescription('Get information about the item shop!'),
	async execute(interaction) {
        const response = await FN.GetShop("en",config.fnToken);
        shop = response.shop;
		var shopInfo = "\n";
		for(let a = 0; a < shop.length; a++) {
			// GETS THE DIFFERENCE IN TIME, BETWEEN NOW & THE PREVIOUS RELEASE DATE
			// AND CONVERTS IT FROM MS TO DAYS
			var timeDiff = Math.ceil((((new Date() - new Date(shop[a].previousReleaseDate)/1000)/60)/60)/24);
			var currentItem = `**${shop[a].displayName}**\n*${shop[a].displayType}*\nLast Seen *${timeDiff}* Days Ago\n${shop[a].price.finalPrice} VBucks\n`
			shopInfo = `${shopInfo}\n${currentItem}`;
			if(shopInfo.length >= 1500) {
				shopInfo = `${shopInfo}\nand ${shop.length-1-a} more...`;
				break;
			}
		}
		await interaction.reply(`The shop currently has: ${shop.length} items. They are:\n${shopInfo}`);
	},
};
