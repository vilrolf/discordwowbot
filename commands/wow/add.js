const db = require('../../db.js')
const wow = require('../../wow.js')

exports.run = async (client, msg) => {
    const author = msg.author
    const id = author.id
    const c = msg.content.split(' ')
    // trying to get wow data
    try {
        const wowData =  await wow.getInfo(c[1], c[2])
        wowData.averageItemLevel = wowData.items.averageItemLevel
        delete wowData.items
        db.addWowChar(id, wowData)
        msg.reply('think it worked?')
    }
    catch(error) {
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
    name: "add",
    description: "Sets wow character: RealmName CharacterName",
    usage: "",
    usageDelim: "",
    type: "commands",
};