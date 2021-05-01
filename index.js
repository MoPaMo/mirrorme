const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

const crypto = require("crypto");
const abc = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
const { Server } = require("socket.io");
const io = new Server(server);//socket.io

const Discord = require('discord.js');
const client = new Discord.Client();
const Database = require("@replit/database")
const db = new Database()

//discord
function getRnd(ind) {
  var a = "";
  for (var i = 0; i < ind; i++) {
    var n = abc[crypto.randomInt(0, abc.length - 1)];
    a += n;
  }
  return a
}

app.use(express.static('public'));
app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/views/start.html`);
});
app.get('/tos', (req, res) => {
  res.sendFile(`${__dirname}/views/code_of_conduct.html`);
});
app.get('/finish', (req, res) => {
  res.sendFile(`${__dirname}/views/finish.html`);
});
app.get('/license', (req, res) => {
  res.sendFile(`${__dirname}/views/license.html`);
});
app.get('/c/:server/:pwd', (req, res) => {
  res.sendFile(`${__dirname}/views/app.html`);
});
client.once('ready', () => {
  console.log('Ready!');
});
client.on('guildCreate', (guild) => {
  let channel = client.channels.cache.get(guild.systemChannelID);
  channel.send('Hi @everyone, I\'m **mirrorme**. *Currently under development*');
});
client.on('message', message => {

  if (message.channel.type !== 'dm') {

    if (message.content === '!m-start') {
      message.channel.send('Theoretically started mirroring…');
      let a = getRnd(20)
      message.channel.send('Your link is: ||https://mirror.mopamo.repl.co/c/' + message.guild.id + "/" + a + '||. Others are now able to watch your chat through this link. Type `!m-stop` to prevent that');
      db.set(message.guild.id, { pwd: a, channel: message.channel.id, created: new Date(), name: message.author.id })
    }
    else if (message.content==="!m-ping"){
      message.channel.send("I'm online! You can view my status here: https://stats.uptimerobot.com/BErLNFVkyE")
    }
    else
      if (message.content === '!m-info') {

        db.get(message.guild.id).then((val) => {
          message.channel.send(`Created at ${val.created} by <@${val.name}>`)
        })
      }
      else
        if (message.content === '!m-stop') {
          db.get(message.guild.id).then((val) => {
            message.channel.send("Created at " + val.created)

            db.delete(message.guild.id).then(() => {
              message.channel.send("We've deleted your data and stopped mirroring")
            });
          })
        }

        else {
          message.react('👁');
        }
  } else {
    //DM
    if (!message.author.bot) {
      message.reply("I'm afraid mirrorme is only working on servers! You can add mirrorme to a server here: https://mirror.mopamo.repl.co")
    }
  }
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
app.use(function (req, res, next) {
  res.status(404).sendFile(`${__dirname}/views/404.html`);
});
client.login(process.env['dctoken']);
