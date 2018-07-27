const wowUrls = require('./wowUrls.js')
const Discord = require('discord.js')
exports.createEmbedMessageFromChar = (char) => {
    const pvpRating = [char.pvp.brackets.ARENA_BRACKET_2v2.rating, char.pvp.brackets.ARENA_BRACKET_3v3.rating, char.pvp.brackets.ARENA_BRACKET_RBG.rating ]
    const embed = new Discord.RichEmbed()
    .setTitle(char.name + ' | ' + char.realm + ' | ' + char.level + ' lvl | ' + char.averageItemLevel + ' ilvl')
    // .setAuthor("Author Name", "https://i.imgur.com/lm8s41J.png")
    /*
     * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
     */
    .setColor(0x00AE86)
    // .setDescription("This is the main body of text, it can hold 2048 characters.")
    // .setFooter("This is the footer text, it can hold 2048 characters", "http://i.imgur.com/w1vhFSR.png")
    .setThumbnail(wowUrls.getThumbnail(char.thumbnail))
    .setURL(wowUrls.getArmoryUrl(char))

    .addField("Achievement Points",char.achievementPoints)
    .addField("Current PvP rating", pvpRating.sort()[0])

    /*
     * Inline fields may not display as inline if the thumbnail and/or image is too big.
     */
    // .addField("Inline Field", "They can also be inline.", true)
    /*
     * Blank field, useful to create some space.
     */
    // .addBlankField(true)
    // .addField("Inline Field 3", "You can have a maximum of 25 fields.", true);
    return embed
}