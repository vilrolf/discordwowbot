const db = require('../../db.js')
const wow = require('../../wow.js')
const charEmbed = require('../../util/charEmbed.js')
exports.run = async (client, msg) => {
    const id = msg.member.id
    try {
        const wowData = await wow.getInfo(c[1], c[2])
        wowData.averageItemLevel = wowData.items.averageItemLevel
        delete wowData.items
        if (db.addWowChar(id, wowData)) {
            const embed =  charEmbed.createEmbedMessageFromChar(wowData)
            msg.channel.send({embed});
        }
        else msg.reply('Character already added')
    }
    catch (error) {
        if (error.status === 404) msg.reply('Can not find character')
        console.log(error)
        msg.reply(error)
    }
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
    name: "update",
    description: "Updates all your characters from armory",
    usage: "",
    usageDelim: "",
    type: "commands",
};