const crons = require('./cron/all')
const komada = require("komada");
const client = new komada.Client({
  // ownerID : "your-user-id",
  prefix: "+",
  clientOptions: {
    fetchAllMembers: false,
  },
  cmdLogging: true,

});
client.login(process.env.botToken)
// crons.runCrons()
client.on('ready', () => {
  client.user.setActivity('+help', {type: 'PLAYING'})
  console.log('I am ready!');
});