const FN = require('./FortniteAPI'); // Links the directory

JustAnExample(); // Runs the main async function at initialization 
async function JustAnExample() {
    const currentMap = await FN.GetMap(true,"en",fortniteAPI-io_tokenHere);
    console.log(currentMap);
}