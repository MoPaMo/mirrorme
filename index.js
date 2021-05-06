const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);

const crypto = require("crypto");
const abc = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const { Server } = require("socket.io");
const io = new Server(server); //socket.io

const Discord = require("discord.js");
const client = new Discord.Client();
const Bowser = require("bowser");
const Database = require("@replit/database");
const db = new Database();
const compression = require("compression");

const a = require("./htmltemplate");
const page_texts = require("./page_texts");
//discord
function getRnd(ind) {
  var a = "";
  for (var i = 0; i < ind; i++) {
    var n = abc[crypto.randomInt(0, abc.length - 1)];
    a += n;
  }
  return a;
}
// <express>
app.use(compression());
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/views/start.html`);
});
app.get("/public/app.css", (req, res) => {
  res.sendFile(`${__dirname}/public/app.css`);
});
app.get("/public/app.js", (req, res) => {
  res.sendFile(`${__dirname}/public/app.js`);
});
app.get("/error/register", (req, res) => {
  res.sendFile(`${__dirname}/public/error_register.html`);
});
app.get("/public/vue.global.js", (req, res) => {
  res.sendFile(`${__dirname}/public/vue.global.js`);
});
app.get("/tos", (req, res) => {
  res.sendFile(`${__dirname}/views/code_of_conduct.html`);
});
app.get("/finish", (req, res) => {
  res.sendFile(`${__dirname}/views/finish.html`);
});
app.get("/license", (req, res) => {
  res.sendFile(`${__dirname}/views/license.html`);
});
app.post("/app-fwd", (req, res) => {
  res.redirect("/c/" + req.query.id + "/" + req.query.pwd);
});
app.get("/c/:server/:pwd", (req, res) => {
  res.sendFile(`${__dirname}/views/app.html`);
});

// </express>

// <socketIO>

io.on("connection", (socket) => {
  const regex = /^https:\/\/mirror\.mopamo\.repl\.co\/c\/(\d+)\/(.{20})$/gm;
  let url = socket.handshake.headers.referer;
  console.log(url);
  if (regex.test(socket.handshake.headers.referer)) {
    let matches = /https:\/\/mirror\.mopamo\.repl\.co\/c\/(\d+)\/(.{20})/.exec(
      url
    );
    let server_id = matches[1];
    let server_pwd = matches[2];

    db.get(server_id).then((record) => {
      if (record == null) {
        socket.emit("error", "NotRegistered");
      } else {
        //record found
        if (record.pwd != null && record.pwd == server_pwd) {
          console.log("Signed in");
          socket.join(server_id + "/" + record.pwd);
          io.to(server_id + "/" + record.pwd).emit("sys", "someone joined");
          let agent = socket.handshake.headers["user-agent"];
          let browser = Bowser.parse(agent);
          console.log(browser);
          console.log(server_id + "/" + record.pwd);
          client.channels.cache
            .get(record.channel)
            .send(
              "Someone joined on the web page (`!m-url`). Device information:" +
                (browser.browser.name == null
                  ? "No browser detected"
                  : browser.browser.name) +
                " on " +
                (browser.os.name == null ? "No OS detected" : browser.os.name) +
                " " +
                (browser.os.versionName == null
                  ? browser.os.version == null
                    ? ""
                    : browser.os.version
                  : browser.os.versionName)
            );
        } else {
          socket.emit("error", "pwd_wrong");
        }
      }
      console.log(record);
    });
  } else {
    socket.emit("error", "url_error");
    console.log("error");
  }
});

io.on("msg", (data)=>{
  console.log(data)
})
// </socketIO>

// <discordJS>
client.once("ready", () => {
  console.log("Ready!");
});
client.on("guildCreate", (guild) => {
  let channel = client.channels.cache.get(guild.systemChannelID);
  channel.send("Hi @everyone, I'm **mirrorme**. *Currently under development*");
});
client.on("message", (message) => {
  if (message.channel.type !== "dm" && !message.author.bot) {
    if (message.content === "!m-start") {
      message.channel.send("Theoretically started mirroring…");
      let a = getRnd(20);
      message.channel.send(
        "Your link is: ||https://mirror.mopamo.repl.co/c/" +
          message.guild.id +
          "/" +
          a +
          " || . Others are now able to watch your chat through this link. Type `!m-stop` to prevent that"
      );
      db.set(message.guild.id, {
        pwd: a,
        channel: message.channel.id,
        created: new Date(),
        name: message.author.id,
      });
    } else if (message.content === "!m-ping") {
      message.channel.send(
        "I'm online! You can view my status here: https://stats.uptimerobot.com/BErLNFVkyE"
      );
    } else if (message.content === "!m-info") {
      db.get(message.guild.id).then((val) => {
        message.channel.send(`Created at ${val.created} by <@${val.name}>`);
      });}
      else if (message.content === "!m-url") {
        db.get(message.guild.id).then((val) => {
          if(val!=null&&val.pwd!=null){
          message.channel.send(`|| https://mirror.mopamo.repl.co/c/${message.guild.id}/${val.pwd} ||`);}
        });
    } else if (message.content === "!m-stop") {
      db.get(message.guild.id).then((val) => {
        message.channel.send("Created at " + val.created);

        db.delete(message.guild.id).then(() => {
          message.channel.send("We've deleted your data and stopped mirroring");
        });
      });
    } else {
      message.react("👁");
      db.get(message.guild.id).then((response) => {
        console.log(message.guild.id + "/" + response.pwd);
        io.to(message.guild.id + "/" + response.pwd).emit("msg", {
          author: message.author.username,
          text: message.content,
          id: message.author.id,
          img: message.author.avatarURL(),
          date: message.author.discriminator,
        });
      });
    }
  } else {
    //DM
    if (!message.author.bot) {
      message.reply(
        "I'm afraid mirrorme is only working on servers! You can add mirrorme to a server here: https://mirror.mopamo.repl.co"
      );
    }
  }
});
// </discordJS>
server.listen(3000, () => {
  console.log("listening on *:3000");
});
app.use(function (req, res, next) {
  res.status(404).sendFile(`${__dirname}/views/404.html`);
});
client.login(process.env["dctoken"]);
