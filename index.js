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
const twemoji = require("twemoji");
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
function escapeHTML(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
function jumboMoji(s) {
  let regex =
  /^\s*<img class="emoji" draggable="false" alt="(.{2,10})" src="https:\/\/twemoji\.maxcdn\.com\/v\/13\.1\.0\/svg\/([\w-]+)\.svg"\/>\s*$/g;
  if (!regex.test(s)) return s; //abort if not single emoji
  let subst = `<img class="emoji jumbo" draggable="false" alt="$1" src="https://twemoji.maxcdn.com/v/13.1.0/svg/$2.svg"/>`;

  // The substituted value will be contained in the result variable
  return s.replace(regex, subst);
}
const docpathes = {
  "stage-vs-chat": "stage.html",
  stageVsChat: "stage.html",
  "stage-mode": "stage.html",
  basics: "basics.html",
  cheatsheet: "commands.html",
  "getting-started": "basics.html",
};
// <express>
app.use(compression());
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/views/start.html`);
});
app.get("/public/app.css", (req, res) => {
  res.sendFile(`${__dirname}/public/app.css`);
});
app.get("/add", (req, res) => {
  res.redirect(
    "https://discord.com/oauth2/authorize?client_id=835079528770043925&scope=bot&permissions=335694913&response_type=code&redirect_uri=https%3A%2F%2Fmirrorme.repl.co%2Ffinish"
  );
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
app.get("/code-of-conduct", (req, res) => {
  res.sendFile(`${__dirname}/views/code_of_conduct.html`);
});
app.get("/code_of_conduct", (req, res) => {
  res.sendFile(`${__dirname}/views/code_of_conduct.html`);
});
app.get("/codeofconduct", function (req, res) {
  res.redirect("/tos");
});
app.get("/gh", function (req, res) {
  res.redirect("https://github.com/MoPaMo/mirrorme");
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
app.get("/docs", (req, res) => {
  res.sendFile(`${__dirname}/views/docs/index.html`);
});
app.get("/docs/:name", (req, res) => {
  let reallink =
    req.params.name in docpathes ? docpathes[req.params.name] : "404docs.html";
  res.sendFile(`${__dirname}/views/docs/${reallink}`);
});
// </express>

// <socketIO>

io.on("connection", (socket) => {
  const regex = /^https:\/\/mirrorme\.repl\.co\/c\/(\d+)\/(.{20})$/gm;
  let url = socket.handshake.headers.referer;
  //console.log(url);
  if (regex.test(socket.handshake.headers.referer)) {
    let matches = /https:\/\/mirrorme\.repl\.co\/c\/(\d+)\/(.{20})/.exec(
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
          //console.log("Signed in");
          socket.join(server_id + "/" + record.pwd);
          io.to(server_id + "/" + record.pwd).emit("sys", "someone joined");
          let agent = socket.handshake.headers["user-agent"];
          let browser = Bowser.parse(agent);
          //console.log(browser);
          //console.log(server_id + "/" + record.pwd);
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
      //console.log(record);
    });
  } else {
    socket.emit("error", "url_error");
    //console.log("error");
  }
  socket.on("msg", (data) => {
    //console.log(data);
    const regex = /^https:\/\/mirrorme\.repl\.co\/c\/(\d+)\/(.{20})$/gm;
    let url = socket.handshake.headers.referer;
    //console.log(url);
    if (regex.test(socket.handshake.headers.referer)) {
      let matches =
        /https:\/\/mirrorme\.repl\.co\/c\/(\d+)\/(.{20})/.exec(url);
      let server_id = matches[1];
      let server_pwd = matches[2];

      db.get(server_id).then((record) => {
        if (record == null) {
          socket.emit("error", "NotRegistered");
        } else {
          //record found
          if (record.pwd != null && record.pwd == server_pwd) {
            client.channels.cache
              .get(record.channel)
              .send("Someone said: " + data);
          }
        }
      });
    }
  });
});

// </socketIO>

// <discordJS>
client.once("ready", () => {
  console.log("Ready!");
});

client.on("guildCreate", (guild) => {
  let channel = client.channels.cache.get(guild.systemChannelID);
  channel.send("Hi @everyone, I'm **mirrorme**. *Currently under development*");
  guild.roles
    .create({
      data: { name: "mirrorme_mod", permissions: [], color: "BLACK" },
      reason: "Role is used to configure the mirrorme-bot",
    })
    .then(() => {
      channel.send(
        "I've just created the `mirrorme_mod` role. You are required to have this role or Admin status to use `!m-`commands. "
      );
    })
    .catch(() => {
      channel.send(
        "I've just failed at creating the `mirrorme_mod` role. You are required to have this role or Admin status to use `!m-`commands. *Please add the role manually!* "
      );
    });
});
client.on("message", (message) => {
  if (message.channel.type !== "dm" && !message.author.bot) {
    if (
      message.member.hasPermission("ADMINISTRATOR") ||
      message.member.roles.cache.some((role) => role.name === "mirrorme_mod")
    ) {
      if (message.content === "!m-start") {
        let sentmsg = message.channel.send(
          "Starting mirrorme for your server..."
        );
        let a = getRnd(20);

        db.set(message.guild.id, {
          pwd: a,
          channel: message.channel.id,
          created: new Date(),
          name: message.author.id,
        }).then(() => {
          client.users.cache
            .get(message.author.id)
            .send(
              "Your link is: ||https://mirrorme.repl.co/c/" +
                message.guild.id +
                "/" +
                a +
                " || . Others are now able to watch your chat through this link. Type `!m-stop` to prevent that"
            );
          sentmsg.then((sentm) => {
            sentm.edit("Mirroring your server!");
          });
          message.guild.me.setNickname("Mirroring this server. (!m-url)");
        });
      } else if (message.content === "!m-ping") {
        message.channel.send(
          "I'm online! You can view my status here: https://stats.uptimerobot.com/BErLNFVkyE/787978795"
        );
      } else if (message.content === "!m-info") {
        db.get(message.guild.id).then((val) => {
          message.channel.send(`Created at ${val.created} by <@${val.name}>`);
        });
      } else if (message.content === "!m-url") {
        db.get(message.guild.id).then((val) => {
          if (val != null && val.pwd != null) {
            //dm
            client.users.cache
              .get(message.author.id)
              .send(
                `|| https://mirrorme.repl.co/c/${message.guild.id}/${val.pwd} ||`
              );
          }
        });
      } else if (message.content === "!m-stop") {
        db.get(message.guild.id).then((val) => {
          if (val) {
            message.channel.send("Created at " + val.created);

            db.delete(message.guild.id).then(() => {
              message.channel.send(
                "We've deleted your data and stopped mirroring"
              );
              message.guild.me.setNickname("MirrorMe - type !m-help for help");
            });
          } else {
            message.channel.send(
              "Looks like we didn't activly mirrored this server ????. If you want to do that, type `!m-start`"
            );
          }
        });
      } else if (message.content === "!m-leave") {
        if (
          message.member.hasPermission("ADMINISTRATOR") ||
          member.roles.cache.some((role) => role.name === "mirrorme_mod")
        ) {
          db.delete(message.guild.id).then(() => {
            let mainchannel = client.channels.cache.get(
              message.guild.systemChannelID
            );

            const exampleEmbed = new Discord.MessageEmbed()
              .setColor("#0099ff")
              .setTitle("I'm leaving this server! Bye ????")
              .setURL(
                `https://discordapp.com/channels/${message.guild.id}/${message.channel.id}/${message.id}>`
              )
              .setAuthor(message.author.username, message.author.avatarURL())
              .addFields(
                {
                  name: "What",
                  value: ":white_check_mark: Delete all data from our DB",
                  inline: true,
                },
                {
                  name: "I'm",
                  value: ":white_check_mark: Remove `mirrorme_mod`-role",
                  inline: true,
                },
                {
                  name: "doing:",
                  value: ":white_check_mark: Remove myself",
                  inline: true,
                }
              )
              .addField(
                "If you miss me, you can invite me again: ",
                `

<https://mirrorme.repl.co/add>`
              )
              .setTimestamp()
              .setFooter(
                `Caused through !m-leave by @${message.author.username}`
              );

            mainchannel.send(exampleEmbed);

            let role = message.guild.roles.cache.find(
              (role) => role.name === "mirrorme_mod"
            );
            //console.log(role);
            if (role) {
              role.delete(
                "Since mirrorme left, there's no use for this role. Invite again: https://mirrorme.repl.co/add"
              );
            }
            //console.log(role);
            message.react("????");
            message.guild.leave();
          });
        } else {
          message.reply(
            "sorry, you don't have the permission to remove me. Ask an admin to do so!"
          );
        }
      } else if (message.content === "!m-help") {
        const emb = new Discord.MessageEmbed()
          .setColor("#0099ff")
          .setTitle("MirrorMe Help")
          .setURL(`https://mirrorme.repl.co/docs`)
          .setAuthor(client.user.username, client.user.avatarURL())
          .addFields(
            {
              name: "!m-start",
              value: "Starts the mirroring. You will get the URl in exchange!",
              inline: true,
            },
            {
              name: "!m-stop",
              value:
                "Stop ,the mirroring, delete all data and kick active browser users",
              inline: true,
            },
            {
              name: "!m-url",
              value:
                "Get current mirroring URl (obviously only works if mirroring is enabled)",
              inline: true,
            }
          )
          .setTimestamp()
          .setFooter(
            `Check out our site for better help: https://mirrorme.repl.co/docs`
          );
        message.channel.send(emb);
      } else {
        db.get(message.guild.id).then((response) => {
          if (response) {
            message.react("????");
            //console.log(message.guild.id + "/" + response.pwd);
            io.to(message.guild.id + "/" + response.pwd).emit("msg", {
              author: message.author.username,
              text: jumboMoji(
                twemoji.parse(escapeHTML(message.content), {
                  folder: "svg",
                  ext: ".svg",
                })
              ),
              id: message.author.id,
              img: message.author.avatarURL(),
              date: message.author.discriminator,
            });
          }
        });
      }
    } else {
      //no permission

      message.reply(
        "sorry, you're required to have admin privileges /  the `mirrorme_mod` role to use me ??????"
      );
    }
  } //end
  else {
    //DM
    if (!message.author.bot) {
      message.reply(
        "I'm afraid mirrorme is only working on servers! You can add mirrorme to a server here: https://mirrorme.repl.co"
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
client.login(process.env["dctoken"]).catch((a) => {
  console.log("Error signing in");
  console.log(a);
});
