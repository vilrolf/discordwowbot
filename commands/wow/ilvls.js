//!ilvl turalyon snitrus
const db = require('../../db.js')
exports.run = async(client, msg) => {
    const users =  db.getAllChars('averageItemLevel')
    let totalItemLevel = 0
    for(i in users) {
        totalItemLevel += users[i].averageItemLevel
    }
    const avgItemLvl = totalItemLevel / users.length
    msg.reply('avgItemLvl: ' + avgItemLvl)
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
  name: "ilvls",
  description: "Gets data from your character",
  usage: "",
  usageDelim: "",
  type: "commands",
};