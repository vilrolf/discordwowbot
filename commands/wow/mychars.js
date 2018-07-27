//!ilvl turalyon snitrus
const db = require('../../db.js')
const mTable = require('markdown-table')
exports.run = async (client, msg) => {
    const id = msg.member.id
    const characters = db.getWowCharactersFromUser(id)
    const outArray = [['Name', 'Realm', 'Level', 'Average Item Level', 'Achievement Points', 'Honorable Kills']]
    characters.map((c) => {
        outArray.push([
            c.name,
            c.realm,
            c.level,
            c.averageItemLevel,
            c.achievementPoints,
            c.totalHonorableKills,
        ])
    })
    console.log(outArray)
    const table = mTable(outArray) //  {align: 'c'}

    console.log(table)
    msg.reply('Your characters: ' +
        ' ```'   +
        table
        + '``` ')
}

exports.conf = {
    enabled: true,
    selfbot: false,
    runIn: ["text", "dm", "group"],
    aliases: ["setWow"],
    permLevel: 0,
    botPerms: [],
    requiredFuncs: [],
    requiredModules: [],
};

exports.help = {
    name: "mychars",
    description: "Gets data from your character",
    usage: "",
    usageDelim: "",
    type: "commands",
};