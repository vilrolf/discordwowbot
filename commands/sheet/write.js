const sheet  = require('../../sheet.js')
exports.run = async (client, msg) => {
    if (sheet.write()) msg.reply("Think it worked")
    else msg.reply(":/")
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
    name: "write",
    description: "Writes to google sheet",
    usage: "",
    usageDelim: "",
    type: "commands",
};