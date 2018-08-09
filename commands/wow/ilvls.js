//!ilvl turalyon snitrus
const db = require('../../db.js')
exports.run = async (client, msg) => {
  const users = db.getAllChars('averageItemLevel').reverse()
  const outArray = [[ 'Name', 'Realm', 'Average Item Level',]]
  characters.map((c) => {
      outArray.push([
          c.name,
          c.realm,
          c.level,
          c.averageItemLevel,
      ])
  })
  const table = mTable(outArray)

  msg.reply('Sorted by ilvls: ' +
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
  name: "ilvls",
  description: "Gets data from your character",
  usage: "",
  usageDelim: "",
  type: "commands",
};