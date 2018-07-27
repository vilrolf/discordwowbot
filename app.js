const komada = require("komada");
const client = new komada.Client({
  // ownerID : "your-user-id",
  prefix: "!",
  clientOptions: {
    fetchAllMembers: false,
  },
  cmdLogging: true,
});
client.login(process.env.botToken);