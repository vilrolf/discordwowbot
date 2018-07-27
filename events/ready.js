exports.run = (client) => {
  client.user.setStatus(`Komada | ${require("komada").version} `);
}