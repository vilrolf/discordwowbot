exports.run = (client, message) => {
  const channel = message.channel;
  if(!channel) return
  channel.send(message.author.username + ' slettet: ' + message.content)
}