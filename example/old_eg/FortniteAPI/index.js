const https = require('https');

async function GetRequest(url,key) {
    return new Promise((resolve, reject) => {
        const options = {
            headers: {
                Authorization: `${key}`
            }
        };
        https.get(url, options, (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                resolve(data);
            });
        }).on('error', (err) => {
            reject(err);
        });
      });
}

// CHALLENGES
const GetChallenges = async (season,lang,key) => {
    if(season == null) season = "current";
    if(lang == null) lang = "en";
    if(key == null) return null;
    return JSON.parse(await GetRequest(`https://fortniteapi.io/v3/challenges?season=${season}&lang=${lang}`,key));
}

// ITEMS
const GetItems = async (lang,key) => {
    if(lang == null) lang = "en";
    if(key == null) return null;
    return JSON.parse(await GetRequest(`https://fortniteapi.io/v2/items/list?lang=${lang}`,key));
}
// UPCOMING ITEMS
const GetUpcomingItems = async (lang,key) => {
    if(lang == null) lang = "en";
    if(key == null) return null;
    return JSON.parse(await GetRequest(`https://fortniteapi.io/v2/items/upcoming?lang=${lang}`,key));
}
// ITEM DETAILS
const GetItemDetails = async (id,lang,key) => {
    if(id == null) return null;
    if(lang == null) lang = "en";
    if(key == null) return null;
    return JSON.parse(await GetRequest(`https://fortniteapi.io/v2/items/get?id=${id}&lang=${lang}`,key));
}
// LIST OF SETS
const GetSets = async (lang,key) => {
    if(lang == null) lang = "en";
    if(key == null) return null;
    return JSON.parse(await GetRequest(`https://fortniteapi.io/v2/items/sets?lang=${lang}`,key));
}
// CURRENT BUNDLES // PREMIUM
// DAILY SHOP
const GetShop = async (lang,key) => {
    if(lang == null) lang = "en";
    if(key == null) return null;
    return JSON.parse(await GetRequest(`https://fortniteapi.io/v2/shop?lang=${lang}`,key));
}
// RARITIES
const GetRarities = async (lang,key) => {
    if(lang == null) lang = "en";
    if(key == null) return null;
    return JSON.parse(await GetRequest(`https://fortniteapi.io/v2/rarities?lang=${lang}`,key));
}
// FORTNITE CREW
const GetCrew = async (lang,key) => {
    if(lang == null) lang = "en";
    if(key == null) return null;
    return JSON.parse(await GetRequest(`https://fortniteapi.io/v2/crew?lang=${lang}`,key));
}
// FORTNITE CREW HISTORY
const GetCrewHistory = async (lang,key) => {
    if(lang == null) lang = "en";
    if(key == null) return null;
    return JSON.parse(await GetRequest(`https://fortniteapi.io/v2/crew/history?lang=${lang}`,key));
}

// CREATOR CODE SEARCH
const SearchCreatorCode = async (code,lang,key) => {
    if(code == null) return null;
    if(key == null) return null;
    return JSON.parse(await GetRequest(`https://fortniteapi.io/v1/creator?code=${code}`,key));
}

// ACCOUNT ID
const GetAccountID = async (username,lang,key) => {
    if(username == null) return null;
    if(key == null) return null;
    return JSON.parse(await GetRequest(`https://fortniteapi.io/v1/lookup?username=${username}`,key));
}
// STATS
const GetStats = async (id,lang,key) => {
    if(id == null) return null;
    if(key == null) return null;
    return JSON.parse(await GetRequest(`https://fortniteapi.io/v1/stats?account=${id}`,key));
}

// NEWS
const GetNews = async (mode,lang,key) => {
    if(mode == null) return null;
    if(lang == null) lang = "en";
    if(key == null) return null;
    return JSON.parse(await GetRequest(`https://fortniteapi.io/v1/news?lang=${lang}&type=${mode}`,key));
}
// BATTLE PASS
const GetBattlePass = async (season,lang,key) => {
    if(season == null) season = "current";
    if(lang == null) lang = "en";
    if(key == null) return;
    return JSON.parse(await GetRequest(`https://fortniteapi.io/v2/battlepass?lang=${lang}&season=${season}`,key));
}
// ACHIVEMENTS
const GetAchievements = async (lang,key) => {
    if(lang == null) lang = "en";
    if(key == null) return null;
    return JSON.parse(await GetRequest(`https://fortniteapi.io/v1/achievements?lang=${lang}`,key));
}
// TOURNAMENTS
const GetTournaments = async (region,lang,key) => {
    if(region == null) return null;
    if(lang == null) lang = "en";
    if(key == null) return null;
    return JSON.parse(await GetRequest(`https://fortniteapi.io/v1/events/list?lang=${lang}&region=${region}`,key));
}
// TOURNAMENT DETAILS
const GetTournamentInfo = async (id,lang,key) => {
    if(id == null) return null;
    if(key == null) return null;
    return JSON.parse(await GetRequest(`https://fortniteapi.io/v1/events/window?windowId=${id}`,key));
}
// TOURNAMENT SCORES
const GetTournamentScores = async (id,lang,key) => {
    if(id == null) return null;
    if(key == null) return null;
    return JSON.parse(await GetRequest(`https://fortniteapi.io/v1/events/cumulative?eventId=${id}`,key));
}
// TOURNAMENT REPLAYS // PREMIUM

// CURRENT MAP // ADD SHOW POI OPTION
const GetMap = async (showPOI,lang,key) => {
    if(showPOI == null) showPOI = false;
    if(lang == null) lang = "en";
    return `https://media.fortniteapi.io/images/map.png?showPOI=${showPOI}&lang=${lang}`;
}
// OLD MAPS
const GetOldMaps = async (lang,key) => {
    if(key == null) return null;
    return JSON.parse(await GetRequest(`https://fortniteapi.io/v1/maps/list`,key));
}
// POI LIST
const GetPOIs = async (lang,key) => {
    if(lang == null) lang = "en";
    if(key == null) return null;
    return JSON.parse(await GetRequest(`https://fortniteapi.io/v2/game/poi?lang=${lang}`,key));
}

// PREVIOUS SEASONS
const GetOldSeasons = async (lang,key) => {
    if(lang == null) lang = "en";
    if(key == null) return null;
    return JSON.parse(await GetRequest(`https://fortniteapi.io/v1/seasons/list?lang=${lang}`,key));
}

// WEAPON LIST // BETA
const GetWeaponList = async (lang,key) => {
    if(lang == null) lang = "en";
    if(key == null) return null;
    return JSON.parse(await GetRequest(`https://fortniteapi.io/v1/seasons/list?lang=${lang}`,key));
}
// WEAPON LIST (DETAILED) // PREMIUM
// WEAPON SPAWN RATE // PREMIUM
// ITEM LOCATIONS // PREMIUM
// FISH LIST
const GetFish = async (lang,key) => {
    if(lang == null) lang = "en";
    if(key == null) return null;
    return JSON.parse(await GetRequest(`https://fortniteapi.io/v1/loot/fish?lang=${lang}`,key));
}
// VEHICLE STATS
const GetVehicles = async (lang,key) => {
    if(key == null) return null;
    return JSON.parse(await GetRequest(`https://fortniteapi.io/v2/game/vehicles`,key));
}
// AUGMENTS
const GetAugments = async (lang,key) => {
    if(key == null) return null;
    return JSON.parse(await GetRequest(`https://fortniteapi.io/v1/game/augments`,key));
}

// GAME MODES
const GetGameModes = async (lang,key) => {
    if(lang == null) lang = "en";
    if(key == null) return null;
    return JSON.parse(await GetRequest(`https://fortniteapi.io/v1/game/modes?lang=${lang}`,key));
}
// FEATURED ISLANDS
const GetFeaturedIslands = async (lang,key) => {
    if(key == null) return null;
    return JSON.parse(await GetRequest(`https://fortniteapi.io/v1/creative/featured`,key));
}
// CREATE ISLAND SEARCH (CODE)
const SearchIslands = async (code,lang,key) => {
    if(code == null) return null;
    return JSON.parse(await GetRequest(`https://fortniteapi.io/v1/creative/island?code=${code}`,key));
}
// DISCOVERY LIST // PREMIUM /// LEAVE BLANK

// TWITCH DROPS
const GetDrops = async (lang,key) => {
    if(key == null) return null;
    return JSON.parse(await GetRequest(`https://fortniteapi.io/v1/twitch/drops`,key));
}

// EXPORTS
module.exports = {
    GetChallenges,
    GetItems,
    GetUpcomingItems,
    GetItemDetails,
    GetSets,
    GetShop,
    GetRarities,
    GetCrew,
    GetCrewHistory,
    SearchCreatorCode,
    GetAccountID,
    GetStats,
    GetNews,
    GetBattlePass,
    GetAchievements,
    GetTournaments,
    GetTournamentInfo,
    GetTournamentScores,
    GetMap,
    GetOldMaps,
    GetPOIs,
    GetOldSeasons,
    GetWeaponList,
    GetFish,
    GetVehicles,
    GetAugments,
    GetGameModes,
    GetFeaturedIslands,
    SearchIslands,
    GetDrops
};
