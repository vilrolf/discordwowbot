exports.run = async(client, msg) => {
    // await msg.edit('Poll: ' + msg.content.slice(5))
    const channel = msg.channel
    // await msg.reply('Poll: ' + msg.content.slice(5))
    channel.sendMessage
    await msg.react('👍')
    await msg.react('👎')
    await msg.react('🤷')

    
}

exports.conf = {
  enabled: true,
  selfbot: false,
  runIn: ["text", "dm", "group"],
  aliases: ["coin"],
  permLevel: 0,
  botPerms: [],
  requiredFuncs: [],
  requiredModules: [],
};

exports.help = {
  name: "poll",
  description: "Create a poll",
  usage: "",
  usageDelim: "",
  type: "commands",
};