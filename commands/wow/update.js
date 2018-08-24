const db = require('../../db.js')
const wow = require('../../wow.js')
var sheet = require('../../sheet')
const charEmbed = require('../../util/charEmbed.js')
exports.run = async (client, msg) => {
    const hasChanges = await db.updateAllCharacters()
    if (hasChanges) sheet.write()
    if (!hasChanges) msg.reply('No changes')
    else msg.reply('Something changed')
}

exports.conf = {
    enabled: true,
    selfbot: false,
    runIn: ["text", "dm", "group"],
    aliases: [],
    permLevel: 4,
    botPerms: [],
    requiredFuncs: [],
    requiredModules: [],
};

exports.help = {
    name: "update",
    description: "Updates all characters from armory",
    usage: "",
    usageDelim: "",
    type: "commands",
};