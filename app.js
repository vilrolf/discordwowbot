const crons = require('./cron/all')
const { Client, PermLevels } = require("komada");
const defaultPermStructure = new PermLevels()
  .addLevel(0, false, () => true)
  .addLevel(2, false, (client, msg) => {
    if (!msg.guild || !msg.guild.settings.modRole) return false;
    const modRole = msg.guild.roles.get(msg.guild.settings.modRole);
    return modRole && msg.member.roles.has(modRole.id);
  })
  .addLevel(3, false, (client, msg) => {
    if (!msg.guild || !msg.guild.settings.adminRole) return false;
    const adminRole = msg.guild.roles.get(msg.guild.settings.adminRole);
    return adminRole && msg.member.roles.has(adminRole.id);
  })
  .addLevel(4, false, (client, msg) => msg.guild && msg.author.id === msg.guild.owner.id)
const client = new Client({
  // ownerID : "your-user-id",
  prefix: "+",
  defaultPermStructure,
  clientOptions: {
    fetchAllMembers: false,
  },
  cmdLogging: true,

});
client.login(process.env.botToken)
crons.runCrons()
client.on('ready', () => {
  client.user.setActivity('+help', {type: 'PLAYING'})
  console.log('I am ready!');
});
