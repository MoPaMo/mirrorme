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
//discord
function getRnd(ind){
var a = "";
    for (var i = 0; i < ind; i++) {
      var n = abc[crypto.randomInt(0, abc.length - 1)];
      a += n;
    }
    return a}
app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/views/start.html`);
});
app.get('/finish', (req, res) => {
  res.sendFile(`${__dirname}/views/start.html`);
});
client.once('ready', () => {
  console.log('Ready!');
});
client.on('guildCreate', (guild) => {
  let channel = client.channels.cache.get(guild.systemChannelID);
  channel.send('Hi @everyone, I\'m **mirrorme**. *Currently under development*');
});
client.on('message', message => {

  if (message.content === '!start-mirror') {
    message.channel.send('Theoretically started mirroring…');
    let a=getRnd(20)
    message.channel.send('Your link is: ||https://mirror.mopamo.repl.co/c/' +message.guild.id+"/"+ a + '||. Others are now able to watch your chat through this link. Type `!stop-mirror` to prevent that');
  }
  else 
  if (message.content === '!start-mirror') {
  //message.
  }
  else{
message.react('👁');  }
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});

client.login(process.env['dctoken']);
