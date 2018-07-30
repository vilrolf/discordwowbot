//!ilvl turalyon snitrus
const db = require('../../db.js')
const mTable = require('markdown-table')
exports.run = async (client, msg) => {
    const characters = db.getAllChars(['averageItemLevel', 'level']).reverse()
    const outArray = [['User', 'Name', 'Realm', 'Level', 'Average Item Level', 'Achievement Points', 'Honorable Kills']]
    const guild = msg.channel.guild
    characters.map((c) => {
        const member = guild.members.get(c.memberId)
        outArray.push([
            member.displayName,
            c.name,
            c.realm,
            c.level,
            c.averageItemLevel,
            c.achievementPoints,
            c.totalHonorableKills,
        ])
    })
    const table = mTable(outArray)

    msg.reply('Your characters: ' +
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
    name: "allchars",
    description: "Gets data from your character",
    usage: "",
    usageDelim: "",
    type: "commands",
};