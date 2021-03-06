//!ilvl turalyon snitrus
const db = require('../../db.js')
const mTable = require('markdown-table')
const _ = require('lodash')
exports.run = async (client, msg) => {
    const id = msg.member.id
    const characters = db.getWowCharactersFromUser(id)

    let highestItemLvl = 0
    let highestItemLvlChar = null
    let totalItemLvl = 0
    let totalKills = 0
    for (i in characters) {
        const c = characters[i]
        if (c.averageItemLevel > highestItemLvl) {
            highestItemLvlChar = c
            highestItemLvl = c.averageItemLevel
        }
        totalItemLvl += c.averageItemLevel
        totalKills += c.totalHonorableKills
    }
    const avgItemLvl = _.round((totalItemLvl / characters.length), 0)
    const outArray = [
        ['Highest itemLvL', 'Total honorable kills', 'Average itemLvL', 'Achievement Points'],
        [highestItemLvlChar.name + ':' + highestItemLvl, totalKills, avgItemLvl, characters[0].achievementPoints]
    ]
    const table = mTable(outArray) //  {align: 'c'}

    msg.reply('Your stats: ' +
        ' ```' +
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
    name: "mystats",
    description: "Displays your stats",
    usage: "",
    usageDelim: "",
    type: "commands",
};