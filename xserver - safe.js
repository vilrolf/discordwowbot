/*

*/
var Discord = require("discord.js");
var bot = new Discord.Client();
var raiders = new Discord.Collection();
var wowClass = new Map();
var notes = new Map();
var personalNotes = new Map();
var versionNr = "1.0";
var roles;
var guild;
var gMembers;
var loaded = false;
var responseObject = {
  "ayy": "Ayy, lmao!",
  "wat": "Say what?",
  "lol": "roflmaotntpmp",
  "ping": "pong",
  "raid": "Mandag og onsdag 18:00 > 22:00"
}

var roleNames = ["@Everyone", "admin", "dps", "healer", "tank"];
var changelog = "Nytt i denne versjonen " + "\n"
  + "Notes: lag notat ved !setnote, slett ved !deletenote,  les alle notater med !notes" + "\n"
  + "!help og !about finnes også nå og litt sånn andre ting da vettu.";

bot.on("message", msg => {
  var message = msg.content.toLowerCase();
  if (msg.author.bot) return;

  if (responseObject[msg.content]) {
    msg.channel.sendMessage(responseObject[msg.content]);
    return;
  }


  // Set the prefix
  var prefix = "!";
  // Exit and stop if it's not there

  if (!msg.content.startsWith(prefix)) return;
  if (message.startsWith(prefix + "load")) { // BYTT TIL FIRST FOR LIVE

    guild = bot.guilds.first();
    msg.channel.sendMessage(guild.name);
    msg.channel.sendMessage("Event-Bot er klar! versjon " + versionNr);
    msg.channel.sendMessage(changelog);
    gMembers = guild.members;
cancelAnimationFrame
    roles = guild.roles.array();

    loaded = true;

    msg.channel.sendMessage("folk i guild" + gMembers.size);
  }
  if (!loaded) {
    return;
  }

  var user = msg.author;
  var gMember;
  if (gMembers != null) {

    gMember = gMembers.find('id', user.id);
  }

  if (message.startsWith(prefix + "tulling")) {
    msg.channel.sendMessage("dust");
  }

  if (message.startsWith(prefix + "roles")) { // BYTT TIL FIRST FOR LIVE

    for (var i = 0; i < roles.length; i++) {
      msg.channel.sendMessage(i + " : " + roles[i].name);
    }
  }


  for (var i = 0; i < roles.length; i++) {
    if (message.startsWith(prefix + roleNames[i])) {

      gMember.addRole(roles[i]);
      msg.channel.sendMessage("Role set to: " + roles[i].name);
      //bot.addMemberToRole(msg.author, msg.guild.roles.get("name", "DPS"));

    }
  }

  if (message.startsWith(prefix + "about")) {
    msg.channel.sendMessage("Event-Bot, bot for å organisere raids! " + "\n"
      + "Versjon nummer" + versionNr);
  }
  if (message.startsWith(prefix + "setnote")) {


    var note = msg.content.slice("setnote".length + 1, msg.content.length);

    notes.set(user, note);
    msg.channel.sendMessage("Notat satt til \"" + note + "\" for " + user);

  }
  if (message.startsWith(prefix + "antallnotat")) {
    msg.channel.sendMessage("antall notater: " + notes.size);
  }
  if (message.startsWith(prefix + "readnote")) {
    if (notes.has(user.id)) {
      msg.channel.sendMessage("Din note:  " + notes.get(user));

    } else {
      msg.channel.sendMessage("Du har ingen notes");
    }

  }
  if (message.startsWith(prefix + "deletenote")) {
    if (notes.has(user)) {
      notes.delete(user);
      msg.channel.sendMessage("Note er slettet");
    } else {
      msg.channel.sendMessage("Du har ingen notater, vanskelig å slette de da......");
    }
  }
  if (message.startsWith(prefix + "notes")) {
    notes.forEach(function (item, key, mapObj) {
      msg.channel.sendMessage(key + " : " + item);
      // document.write(item.toString() + "<br />");
    });
  }

  if (message.startsWith(prefix + "help")) {
    msg.channel.sendMessage("Du trenger hjelp altså! er ikke så vanskelig dette her, kommandoene du har tilgjengelig er" + "\n"
      + "!join - for å joine neste raid   " + "\n"
      + "!leave - for å leave neste raid" + "\n"
      + "!setclass skrivdinklasseher - for å sette din klasse" + "\n"
      + "!dps, !tank, !healer for å sette din rolle" + "\n"
      + "!setnote, !deletenote, !notes, !readnote"
    );
  }

  if (message.startsWith(prefix + "setclass")) {
    var args = msg.content.split(" ").slice(1);

    wowClass.set(msg.author.id, args[0]);
    msg.channel.sendMessage("Class set to " + args[0] + " for " + msg.author);

  }

  if (message.startsWith(prefix + "join")) {

    if (raiders.exists('id', gMember.id)) {
      msg.channel.sendMessage("kanke registrere deg to ganger da. dust..");
      return;
    }

    var out = "Legger til " + gMember + " som " + findRole(gMember.roles);

    msg.channel.sendMessage(out);
    raiders.set(gMember.id, gMember);
  }
  if (message.startsWith(prefix + "size")) {
    msg.channel.sendMessage(raiders.size);
  }
  if (message.startsWith(prefix + "leave")) {
    msg.channel.sendMessage("du er fjerner fra raidet. uffda");
    raiders.delete(gMember.id);

  }
  if (message.startsWith(prefix + "clearlist")) {
    if (gMember.roles.exists('name', 'admin')) {
      raiders.clear();
      msg.channel.sendMessage("Bortevekk");
    } else {
      msg.channel.sendMessage("Du har ikke tilgang til å slette dette gitt.");
    }

  }
  if (message.startsWith(prefix + "myroles")) {
    gRoles = gMember.roles.array();
    for (var i = 0; i < gRoles.length; i++) {
      var role = gRoles[i];
      msg.channel.sendMessage(i + ": " + role);
    }
  }


  if (message.startsWith(prefix + "list")) {
    if (raiders.size === 0) {
      msg.channel.sendMessage("0 folk i listen");
      return;
    }
    var healers = 0;
    var tanks = 0;
    var dps = 0;

    var out = "";
    var raidArray = raiders.array();

    for (var i = 0; i < raidArray.length; i++) {

      out += raidArray[i] + " " + wowClass.get(raidArray[i].id);
      charRoles = raidArray[i].roles.array();

      //out += findRole(raidArray[i].roles) + "\n";
      if (raidArray[i].roles.exists('name', 'Tank')) {
        tanks++;
        out += " Tank" + "\n";
      }
      else if (raidArray[i].roles.exists('name', 'Healer')) {
        healers++;
        out += " Healer" + "\n";
      }
      else if (raidArray[i].roles.exists('name', 'DPS')) {
        dps++;
        out += " DPS" + "\n";
      }

    }
    var top = "Antall: " + raidArray.length + "\n"
      + "--------------------------------------- " + "\n"
      + "Tanks: " + tanks + "\n"
      + "Healers: " + healers + "\n"
      + "DPS: " + dps + "\n"
      + "--------------------------------------- " + "\n";

    msg.channel.sendMessage(top + out);

  }
  if (message.startsWith(prefix + "nlist")) {
    if (raiders.size === 0) {
      msg.channel.sendMessage("0 folk i listen");
      return;
    }
    var healers = 0;
    var tanks = 0;
    var dps = 0;

    var out = "";
    var raidArray = raiders.array();

    for (var i = 0; i < raidArray.length; i++) {

      out += raidArray[i] + " " + wowClass.get(raidArray[i].id);
      charRoles = raidArray[i].roles.array();

      //out += findRole(raidArray[i].roles) + "\n";
      if (raidArray[i].roles.exists('name', 'Tank')) {
        tanks++;
        out += " Tank";
      }
      else if (raidArray[i].roles.exists('name', 'Healer')) {
        healers++;
        out += " Healer";
      }
      else if (raidArray[i].roles.exists('name', 'DPS')) {
        dps++;
        out += " DPS";
      }

      if (notes.has(raidArray[i].user)) {
        out += " --- " + notes.get(raidArray[i].user);
      }
      out += "\n";

    }
    var top = "Antall: " + raidArray.length + "\n"
      + "--------------------------------------- " + "\n"
      + "Tanks: " + tanks + "\n"
      + "Healers: " + healers + "\n"
      + "DPS: " + dps + "\n"
      + "--------------------------------------- " + "\n";

    msg.channel.sendMessage(top + out);

  }
  if (message.startsWith(prefix + "present")) {
    var online = 0;
    var idle = 0;
    var offline = 0;
    var offlineUsers = "";
    var idleUsers = "";
    raidArray = raiders.array();
    for (var i = 0; i < raidArray.length; i++) {
      var raider = raidArray[i];
      if (raider.user.status === "online") {
        online++;
      } else if (raider.user.status === "offline") {
        offline++;
        offlineUsers += raider + "\n";
      } else if (raider.user.status === "idle") {
        idle++;
        idleUsers += raider + "\n";
      }
    }
    msg.channel.sendMessage((online + idle) + "/" + raidArray.length + " Online" + "\n"
      + online + " ready " + "\n"
      + offline + " offline" + "\n"
      + idle + " idle" + "\n"
      + "---------------------" + "\n"
      + "Offline: " + "\n"
      + offlineUsers + "\n"
      + "---------------------" + "\n"
      + "Idle: " + "\n"
      + idleUsers);
  }

  if (message.startsWith(prefix + "ping")) {
    msg.channel.sendMessage("pong!");
  }

  else if (message.startsWith(prefix + "foo")) {
    msg.channel.sendMessage("bar!");
  }

});

bot.on('ready', () => {
  console.log('I am ready!');
});

function findRole(roles) {
  var out = "";
  if (roles.exists('name', 'Tank')) {
    out = " Tank";
  }
  else if (roles.exists('name', 'Healer')) {
    out = " Healer";
  }
  else if (roles.exists('name', 'DPS')) {
    out = " DPS";
  }
  return out;
}

bot.login("MjMzNTI0MzY0MTQ5MTI5asdasdasdPEA7NbhnTmrvE"); //  LIVE
//bot.login("MjMzODg0MjkwMzE0NjasdasdasdPk0DrTAGm_Y"); // TESTING