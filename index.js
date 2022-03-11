// SETUP
const Discord = require("discord.js");
const Database = require("@replit/database");
const db = new Database();
const bot = new Discord.Client();
const prefixes = ["~~", "!", "^^", "!!", "@@", "!", "-"];
var preferences;
var lastmessages = {};

const hailMary = () => {
    db.set("preferences", JSON.stringify({"insert id":{"messages":[],"words":{"good":[],"bad":[]},"barre":200,"users":{"good":[],"bad":[]},"channels":{"good":[],"bad":[]},"dm":true,"status":{"presence":"on","humor":"Good","reason":"temp"}}}));
    preferences = {"insert id":{"messages":[],"words":{"good":[],"bad":[]},"barre":200,"users":{"good":[],"bad":[]},"channels":{"good":[],"bad":[]},"dm":true,"status":{"presence":"on","humor":"Good","reason":"temp"}}};
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > 3000){
            break;
        }
    }
    return true;
}

bot.login("insert token");
bot.on('ready', () => {
    console.log("Bot successfully logged in");
    bot.user.setActivity("", {type: 3});
    db.get("preferences").then(
        (prefstring) => {
            if (undefined == prefstring) {throw new Error("ERROR ERROR BLBLBLBLBLLB"); return};
            preferences = JSON.parse(prefstring);
            updateMessage();
        }
    );
});

const createEmbed = (title, text, color) => {
    embed = new Discord.MessageEmbed()
    .setColor(color)
    .setTitle(title);
    if (text) embed.setDescription(text);
    return embed;
}

const updateMessage = () => {
    let preserved_messages_loralie = [];
    let date = Date.now();
    preferences["insert id"].messages.forEach((msg) => {
        if (date - msg.time < 100000000) preserved_messages_loralie.push(msg)
    });
    preferences["insert id"].messages = preserved_messages_loralie;
    db.set("preferences", JSON.stringify(preferences));
    setTimeout(updateMessage, 6000000);
}

// MESSAGES
bot.on('message',(message) => {
    if (message.author.username == bot.user.username) return;
    // Evalutation du msg
    if (loralieeval(message) >= preferences["insert id"].barre && message.author.id != insert id) {
        preferences["insert id"].messages.push({
            "score": loralieeval(message),
            "url": `https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id}`,
            "content": message.content,
            "author": message.author.username,
            "channel": message.channel.name,
            "guild": message.guild.name,
            "time": message.createdTimestamp
        });
        db.set("preferences", JSON.stringify(preferences));
        if (preferences["insert id"].dm == true) {
            try {
                let receiver = message.guild.members.cache.get("insert id");
                let linkcontent = [String(message.guild.id), String(message.channel.id), String(message.id)];
                let msg = String("You could be interested in this message : \nhttps://discord.com/channels/"  + linkcontent.join("/") + "/");
                receiver.send(msg);
            } catch {
                console.log("User isn't in this guild")
            }
        }
    }
    lastmessages[message.author.id] = message.content;
    // Commandes
    if (message.author.id != insert id) return;
    if (!message.content.startsWith("~~")) return;
    let args = message.content.split("").splice(2).join("").split(" ");
    //add
    if (args[0] == "add") {
        if (args[1] == "good") {
            if (args[2] == "word" && !preferences[message.author.id].words.good.includes(args[3])) {
                preferences[message.author.id].words.good.push(args[3].toLowerCase());
                db.set("preferences", JSON.stringify(preferences));
                message.react("✅");
            } else if (args[2] == "user") {
                preferences[message.author.id].users.good.push(args[3].toLowerCase());
                db.set("preferences", JSON.stringify(preferences));
                message.react("✅");
            } else if (args[2] == "channel") {
                preferences[message.author.id].channels.good.push(args[3].toLowerCase());
                db.set("preferences", JSON.stringify(preferences));
                message.react("✅");
            }
        } else if (args[1] == "bad") {
            if (args[2] == "word" && !preferences[message.author.id].words.bad.includes(args[3])) {
                preferences[message.author.id].words.bad.push(args[3].toLowerCase());
                db.set("preferences", JSON.stringify(preferences));
                message.react("✅");
            } else if (args[2] == "user") {
                preferences[message.author.id].users.bad.push(args[3].toLowerCase());
                db.set("preferences", JSON.stringify(preferences));
                message.react("✅");
            } else if (args[2] == "channel") {
                preferences[message.author.id].channels.bad.push(args[3].toLowerCase());
                db.set("preferences", JSON.stringify(preferences));
                message.react("✅");
            }
        }
    }
    // remove 
    else if (args[0] == "remove") {
        if (args[1] == "good") {
            if (args[2] == "word" && preferences[message.author.id].words.good.includes(args[3])) {
                preferences[message.author.id].words.good.splice(preferences[message.author.id].words.good.indexOf(args[3]), 1);
                db.set("preferences", JSON.stringify(preferences));
                message.react("✅");
            } else if (args[2] == "user" && preferences[message.author.id].users.good.includes(args[3])) {
                preferences[message.author.id].users.good.splice(preferences[message.author.id].users.good.indexOf(args[3]), 1);
                db.set("preferences", JSON.stringify(preferences));
                message.react("✅");
            } else if (args[2] == "channel" && preferences[message.author.id].channels.good.includes(args[3])) {
                preferences[message.author.id].channels.good.splice(preferences[message.author.id].channels.good.indexOf(args[3]), 1);
                db.set("preferences", JSON.stringify(preferences));
                message.react("✅");
            }
        } else if (args[1] == "bad") {
            if (args[2] == "word" && preferences[message.author.id].words.bad.includes(args[3])) {
                preferences[message.author.id].words.bad.splice(preferences[message.author.id].words.bad.indexOf(args[3]), 1);
                db.set("preferences", JSON.stringify(preferences));
                message.react("✅");
            } else if (args[2] == "user" && preferences[message.author.id].users.bad.includes(args[3])) {
                preferences[message.author.id].users.bad.splice(preferences[message.author.id].users.bad.indexOf(args[3]), 1);
                db.set("preferences", JSON.stringify(preferences));
                message.react("✅");
            } else if (args[2] == "channel" && preferences[message.author.id].channels.bad.includes(args[3])) {
                preferences[message.author.id].channels.bad.splice(preferences[message.author.id].channels.bad.indexOf(args[3]), 1);
                db.set("preferences", JSON.stringify(preferences));
                message.react("✅");
            }
        }
    }
    // get message
    else if (args[0] == "get" && args[1] == "message") {
        message.channel.send(preferences[message.author.id].messages[parseInt(args[2])].url)        
    }
    // list
    else if (args[0] == "list") {
        if (args[1] == "good") {
            if (args[2] == "words" && preferences[message.author.id].words.good.length) message.channel.send(createEmbed("Liste des mots aimés", preferences[message.author.id].words.good.join(", "), "GREEN")); 
            else if (args[2] == "users" && preferences[message.author.id].users.good.length) message.channel.send(createEmbed("Liste des utilisateurs aimés", "<@"+preferences[message.author.id].users.good.join(">, <@")+">", "GREEN"));
            else if (args[2] == "channels" && preferences[message.author.id].channels.good.length) message.channel.send(createEmbed("Liste des channels aimés", "<#"+preferences[message.author.id].channels.good.join(">, <#")+">", "GREEN")); 
        } else if (args[1] == "bad") {
            if (args[2] == "words" && preferences[message.author.id].words.bad.length) message.channel.send(createEmbed("Liste des mots malaimés", preferences[message.author.id].words.bad.join(", "), "DARK_RED")); 
            else if (args[2] == "users" && preferences[message.author.id].users.bad.length) message.channel.send(createEmbed("Liste des utilisateurs malaimés", "<@"+preferences[message.author.id].users.bad.join(">, <@")+">", "DARK_RED"));
            else if (args[2] == "channels" && preferences[message.author.id].channels.bad.length) message.channel.send(createEmbed("Liste des channels malaimés", "<#"+preferences[message.author.id].channels.bad.join(">, <#")+">", "DARK_RED")); 
        }
    }
    //interpreteur
    else if (args[0] == "code") {
        let strcode = args.slice(1, args.length).join(" ");
        eval(strcode);
        message.react("✅");
    //barre
    } else if (args[0] == "barre") {
        preferences[message.author.id].barre = args[1]
        db.set("preferences", JSON.stringify(preferences));
        message.react("✅");
    }
    //DM
    else if (args[0] == "dm") {
        if (args[1] == "change"){
            if (preferences[message.author.id].dm == false) {
                preferences[message.author.id].dm = true
                message.react("✅");
            } else {
                preferences[message.author.id].dm = false
                message.react("✅");
            }
        } else {
            let receiver = message.guild.members.cache.get(args[1])
            receiver.send(args.slice(2, args.length).join(" "));
            message.react("✅");
        }
        
    } 
    // help
    else if (args[0] == "help") {
        message.channel.send(createEmbed("Here are the commands available to you",false,"GREEN").addField("add", "good or bad; word, user or channel").addField("remove", "good or bad; word, user or channel").addField("list","good or bad; words, users or channels").addField("Other random commands","goodenough, dm, code, barre, help, recent, get message, delete messages").addField("Your current dm status", preferences[message.author.id].dm))
    } 
    // recent 
    else if (args[0] == "recent") {
        let min; 
        if (args[1] == "-barre") min = parseInt(args[2]); else min = 0;
        let embed = createEmbed("Here are the last messages you got:", false, "YELLOW");
        let i = 0;
        if (preferences[message.author.id].messages.length == 0) return message.channel.send(createEmbed("You have no messages ;-;", false, "ORANGE"))
        preferences[message.author.id].messages.forEach((msg) => {
            if (msg.score < min) return;
            embed.addField(`${i}: ${msg.author} in **${msg.channel}** (${msg.guild})`, msg.content) 
            i ++; 
        });
        message.channel.send(embed)
    }
    // delete messages 
    else if (args[0] == "delete" && args[1] == "messages") {
        preferences[message.author.id].messages = [];
        db.set("preferences", JSON.stringify(preferences));
        message.react("✅");
    }
    //status
    else if (args[0] == "status") {
        if (args[1] == "set") {
            if (args[2] == "humor") {
                preferences[message.author.id].status.humor = args[3]
            }
            else if (args[2] == "presence") {
                preferences[message.author.id].status.presence = args[3]
            }
            else if (args[2] == "time") {
                let d = new Date()
                d = d.getTime()
                let arr = args[3]
                if (arr[-1] == "h") {
                    let t = 1000*3600
                } else if (arr[-1] == "d") {
                    let t = 1000*3600*24
                } else if (arr[-1] == "w") {
                    let t = 1000*3600*24*7
                } 
                arr.pop(-1)
                t = arr.join("")
                preferences[message.author.id].status.time = d+t*temp
            }
        }
        if (args[1] == "get") {
            let temptime = new Date().getTime()
            let remainingTime = preferences[message.author.id].status.time - temptime
            remainingTime = Math.floor(remainingTime/1000)
            let minutes = Math.floor(remainingTime/60)
            let hours = Math.floor(minutes/60)
            let day = Math.floor(hours/24)
            remainingTimetext = JSON.stringify(day)+"d" + JSON.stringify(hours-day*24)+"h" + JSON.stringify(minutes)+"m" + JSON.stringify(remainingTime)+"s"
            let statustemptext = "Your current status :\n - Humor: " + preferences[message.author.id].status.humor + "\n - Presence: " + preferences[message.author.id].status.presence + "\n - Remaining time: " + remainingTimetext
            console.log(remainingTimetext)
            createEmbed("Current status", statustemptext, "BLUE")
        }
    }
});

const loralieeval = (msg) => {
    let score = 0;
    if (msg.author.bot) return 0;
    let b = false
    prefixes.forEach((p) => {if (msg.content.startsWith(p)) b = true});
    if (b) return 0;
    if (msg.attachments.size) score += 200;
    if (msg.content.length < 3 && !msg.attachments.size) return 0;
    if (lastmessages[msg.author.id]) {
        let sub = msg.content.substring(0, msg.content.length - 2);
        if (sub.includes(lastmessages[msg.author.id]) || lastmessages[msg.author.id].includes(sub)) return 0
    };
    if (preferences["insert id"].users.good.includes(msg.author.id)) score += 50;
    if (preferences["insert id"].users.bad.includes(msg.author.id)) score -= 50;
    if (preferences["insert id"].channels.bad.includes(msg.channel.id)) score -= 25;
    if (preferences["insert id"].channels.good.includes(msg.channel.id)) score += 25;
    if (msg.mentions.users.size == 1) score += 25;
    if (msg.mentions.users.find(user => user.id == insert id)) score += 225;
    let mots = msg.content.split(" ");
    if (mots.length > 2) score += 50;
    score += 2* mots.length;
    let mess = msg.content.toLowerCase();
    preferences["insert id"].words.good.forEach((e) => {if (mess.includes(e)) score += 250});
    preferences["insert id"].words.bad.forEach((e) => {if (mess.includes(e)) score -= 100});
    return score;
}