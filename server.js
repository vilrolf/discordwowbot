var Discord = require("discord.js");
var bot = new Discord.Client();
var users = [];
var fs = require('fs');
var versionNr = "1.2.1";
var roles;
var guild;
var gMembers;
var loaded = false;
var notGoing = 0;
var going = 1;
var maybe = 2;
var responseObject = {
  "ayy": "Ayy, lmao!",
  "wat": "Say what?",
  "lol": "roflmaotntpmp",
  "ping": "pong",
  "raid": "Mandag og onsdag 18:00 > 22:00"
}

var roleNames = ["@Everyone", "admin", "dps", "healer", "tank"];
var changelog = "!roll finnes, gir et tilfeldig tall mellom 1-100 " + "\n"
  + "fikset !present igjen. ";

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

  if (msg.channel.name === "general") {
    return;
  }
  if (message.startsWith(prefix + "load")) { // BYTT TIL FIRST FOR LIVE
    /*
        guild = bot.guilds.first();
        
        gMembers = guild.members;
        roles = guild.roles.array();
        users = require('./RaidList.json');
        fn60sec();
        setInterval(fn60sec, 60 * 1000 * 60);
    
        loaded = true;
        */
    load();
    msg.channel.sendMessage(guild.name + "\n"
      + "Event-Bot er klar! Versjon :" + versionNr + "\n"
      + changelog);

  }
  if (!loaded) {
    return;
  }

  var user = msg.author;
  var juser;
  //console.log(users.find(x => x.id === user));

  if (users.find(x => x.id === user.id) == undefined) {
    juser = user;
    users.push(juser);
  } else {
    juser = users.find(x => x.id === user.id);
  }

  var gMember;
  if (gMembers != null) {
    gMember = gMembers.find('id', user.id);
  }

  if (message.startsWith(prefix + "file")) {
    users = require('./RaidList.json');
  }
  if (message.startsWith(prefix + "write")) {
    msg.channel.sendMessage("lagrer alt sammen");
    save();

  }

  if (message.startsWith(prefix + "tulling")) {
    msg.channel.sendMessage("dust");
    juser.note += " jeg er en tulling";
  }

  if (message.startsWith(prefix + "roles")) { // BYTT TIL FIRST FOR LIVE

    for (var i = 0; i < roles.length; i++) {
      msg.channel.sendMessage(i + " : " + roles[i].name);
    }
  }
  if (message.startsWith(prefix + "poll")) {
    var yes = 0;
    var no = 0;
    for (var i = 0; i < users.length; i++) {
      if (users[i].answer === 1) {
        yes++;
      }
      if (users[i].answer === 0) {
        no++;
      }

    }
    msg.channel.sendMessage("YES: " + yes + "\n" + "NO: " + no);
  }
  if (message.startsWith(prefix + "startpoll")) {
    msg.channel.sendMessage("POLL STARTED!");
  }
  if (message.startsWith(prefix + "endpoll")) {
    var yes = 0;
    var no = 0;
    for (var i = 0; i < users.length; i++) {
      if (users[i].answer === 1) {
        yes++;
      }
      if (users[i].answer === 0) {
        no++;
      }
      users[i].answer = -1;
    }
    msg.channel.sendMessage("YES: " + yes + "\n" + "NO: " + no);

  }
  if (message.startsWith(prefix + "yes")) {
    juser.answer = 1;
  }
  if (message.startsWith(prefix + "no")) {
    juser.answer = 0;
  }



  if (message.startsWith(prefix + "roll")) {
    var roll = Math.floor((Math.random() * 100) + 1);
    msg.channel.sendMessage(msg.author + " : " + roll);
  }

  for (var i = 0; i < roles.length; i++) {
    if (message.startsWith(prefix + roleNames[i])) {
      gMember.addRole(roles[i]);
      msg.channel.sendMessage("Role set to: " + roles[i].name);

    }
  }

  if (message.startsWith(prefix + "about")) {
    msg.channel.sendMessage("Event-Bot, bot for å organisere raids! " + "\n"
      + "Versjon nummer" + versionNr + "\n"
      + changelog);
  }
  if (message.startsWith(prefix + "setnote")) {


    var note = msg.content.slice("setnote".length + 1, msg.content.length);
    juser.note = note;

    msg.channel.sendMessage("Notat satt til \"" + note + "\" for " + user);

  }

  if (message.startsWith(prefix + "readnote")) {
    if (juser.note != undefined || juser.note != "") {

      msg.channel.sendMessage("Din note:  " + juser.note);

    } else {
      msg.channel.sendMessage("Du har ingen notes");
    }

  }
  if (message.startsWith(prefix + "deletenote")) {
    if (juser.hasOwnProperty("note")) {
      delete juser.note;
      msg.channel.sendMessage("Note er slettet");
    } else {
      msg.channel.sendMessage("Du har ingen notater, vanskelig å slette de da......");
    }
  }
  if (message.startsWith(prefix + "notes")) {

    var out = "";
    for (var i = 0; i < users.length; i++) {
      out += users[i] + " : " + users[i].note + "\n";
    }
    msg.channel.sendMessage(out);
  }

  if (message.startsWith(prefix + "help")) {
    msg.channel.sendMessage("Du trenger hjelp altså! er ikke så vanskelig dette her, kommandoene du har tilgjengelig er" + "\n"
      + "!join - for å joine neste raid   " + "\n"
      + "!leave - for å leave neste raid" + "\n"
      + "!maybe - hvis du kanskje kommer neste raid" + "\n"
      + "!setclass skrivdinklasseher - for å sette din klasse" + "\n"
      + "!dps, !tank, !healer for å sette din rolle" + "\n"
      + "!setnote, !deletenote, !notes, !readnote"
    );
  }

  if (message.startsWith(prefix + "setclass")) {
    var args = msg.content.split(" ").slice(1);
    juser.class = args[0];
    msg.channel.sendMessage("Class set to " + juser.class + " for " + msg.author);

    save();

  }
  if (message.startsWith(prefix + "myuser")) {
    msg.channel.sendMessage(JSON.stringify(juser));
  }

  if (message.startsWith(prefix + "join")) {
    juser.raidStatus = going;

    var out = "Legger til " + gMember + " som " + findRole(gMember.roles);

    msg.channel.sendMessage(out);

  }

  if (message.startsWith(prefix + "maybe")) {
    msg.channel.sendMessage("setter deg over til maybe listen");
    juser.raidStatus = maybe;

  }
  if (message.startsWith(prefix + "size")) {
    //msg.channel.sendMessage(raiders.size);
  }

  if (message.startsWith(prefix + "leave")) {
    msg.channel.sendMessage("du er fjernet fra raidet. uffda");
    juser.raidStatus = notGoing;


  }
  if (message.startsWith(prefix + "clearlist")) {
    if (gMember.roles.exists('name', 'admin')) {
      for (var i = 0; i < users.length; i++) {
        users[i].raidStatus = notGoing;

      }
      msg.channel.sendMessage("Bortevekk");

    } else {
      msg.channel.sendMessage("Du har ikke tilgang til å slette dette gitt.");
    }
    save();
  }
  if (message.startsWith(prefix + "myroles")) {
    gRoles = gMember.roles.array();
    for (var i = 0; i < gRoles.length; i++) {
      var role = gRoles[i];
      msg.channel.sendMessage(i + ": " + role);
    }
  }


  if (message.startsWith(prefix + "list")) {
    var raidArray = [];
    var maybeArray = [];
    for (var i = 0; i < users.length; i++) {
      if (users[i].raidStatus === going) {
        raidArray.push(users[i]);
      } else if (users[i].raidStatus === maybe) {
        maybeArray.push(users[i]);
      }
    }

    if (raidArray.length === 0) {
      msg.channel.sendMessage("0 folk i listen");
      return;
    }
    var healers = 0;
    var tanks = 0;
    var dps = 0;

    var out = "";

    for (var i = 0; i < raidArray.length; i++) {
      target = gMembers.find('id', raidArray[i].id);

      out += target + " " + raidArray[i].class;

      charRoles = gMembers.find('id', raidArray[i].id).roles;

      if (charRoles.exists('name', 'Tank')) {
        tanks++;
        out += " Tank";
      }
      else if (charRoles.exists('name', 'Healer')) {
        healers++;
        out += " Healer";
      }
      else if (charRoles.exists('name', 'DPS')) {
        dps++;
        out += " DPS";
      } else {
        out += " noRole ";
      }
      if (raidArray[i].note != undefined) {
        out += " --- " + raidArray[i].note;
      }
      out += "\n";


    }
    var top = "Antall: " + raidArray.length + "\n"
      + "--------------------------------------- " + "\n"
      + "Tanks: " + tanks + "\n"
      + "Healers: " + healers + "\n"
      + "DPS: " + dps + "\n"
      + "--------------------------------------- " + "\n";

    out += "\n" + maybeArray.length + " som muligens kommer";
    msg.channel.sendMessage(top + out);

  }
  if (message.startsWith(prefix + "users")) {
    if (gMember.roles.exists('name', 'admin')) {
      msg.channel.sendFile('RaidList.json');


    }
    //msg.channel.sendMessage(JSON.stringify(users));
  }

  if (message.startsWith(prefix + "present")) {
    var online = 0;
    var idle = 0;
    var offline = 0;
    var offlineUsers = "";
    var idleUsers = "";

    var raidArray = [];
    var maybeArray = [];
    for (var i = 0; i < users.length; i++) {
      if (users[i].raidStatus === going) {
        raidArray.push(users[i]);
      } else if (users[i].raidStatus === maybe) {
        maybeArray.push(users[i]);
      }
    }

    for (var i = 0; i < raidArray.length; i++) {
      var raider = gMembers.find('id', raidArray[i].id).user;
      if (raider.status === "online") {
        online++;
      } else if (raider.status === "offline") {
        offline++;
        offlineUsers += raider + "\n";
      } else if (raider.status === "idle") {
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
function fn60sec() {
  save();

  console.log("Saving");
}
function load() {
  guild = bot.guilds.first();
  gMembers = guild.members;
  roles = guild.roles.array();
  users = require('./RaidList.json');
  fn60sec();
  setInterval(fn60sec, 60 * 1000 * 60);

  loaded = true;
}


function save() {
  fs.writeFile('RaidList.json', JSON.stringify(users), function (err) {
    if (err) return console.log(err);

  });
}
bot.on('ready', () => {
  console.log('I am ready!');
  load();
});


bot.login(process.env.botToken); // TESTING