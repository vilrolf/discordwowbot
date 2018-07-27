//!ilvl turalyon snitrus
const db = require('../../db.js')
exports.run = async(client, msg) => {
  const id = msg.author.id
  const wowData =  db.getWowCharecters(id)
  const r = "Name: " + wowData.name + " \n" 
   + "Realm: " + wowData.realm + " \n"
   + "ItemLvl: " + wowData.averageItemLevel + " \n"
   + "totalHonorableKills: " + wowData.totalHonorableKills + " \n"
   + "achievementPoints: " + wowData.achievementPoints + " \n"
  msg.reply(r)
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
  name: "mychar",
  description: "Gets data from your character",
  usage: "",
  usageDelim: "",
  type: "commands",
};