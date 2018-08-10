const db = require('../../db.js')
const wow = require('../../wow.js')
const charEmbed = require('../../util/charEmbed.js')
exports.run = async (client, msg) => {
   db.updateAllCharacters()

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