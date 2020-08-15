const Discord = require('discord.js');
const bot = new Discord.Client();

const token = 'NzM1NDM1NzA4NjI5NjQ3Mzcx.XxgOEA.51xgwEs29g5MBMfr9lx23x7OpkM';

const PREFIX = "!";
var version = "1.0.1"

var fs = require('fs');
var userData = JSON.parse(fs.readFileSync('userData.json','utf8'));

bot.on('ready', () => {
    console.log('This bot is online!')
})

bot.on('message', message=>{
    let args = message.content.split(" ");
    var sender = message.author;
    if(!userData[sender.id]) userData[sender.id] = {
        messagesSent: 0,
        activities:[],
        completion:[],
        total:0
    }
    if (sender.id==="735435708629647371"){
        return;
    }
    userData[sender.id].messagesSent++;
    fs.writeFile('userData.json', JSON.stringify(userData),(err)=>{
        if (err) console.error(err);
    });
    if (args[0] === "yes"){
        message.reply("YESSSSSSSSSSSSSSSSS!");
    }else if (args[0] === "no"){
        message.reply("NOOOOOOOOOOOOOOOOO");
    }else if (args[0] === "k"){
        message.reply("fuck you gay mother fucking k user");
    }else if (args[0] === "wtf"){
        message.reply("what the fuck is wrong with you bitch");
    }else if (args[0] === "gay"){
        message.reply("you're fucking gay, bet you sleep in your own fucking tears");
    }else if (args[0] === "fuck"){
        message.reply("the most fucking retarded hoe ive seen in my life, god bless this planet");
    }else if (args[0] === "hi"){
        message.channel.send("hey cutie I like u owo");
    }else if (args[1] === "sexy"){
        message.channel.send("You're the sexy babe, xoxo");
    }

    let arg = message.content.slice(PREFIX.length).split(" ");

    switch(arg[0]){
        case 'fate':
            let fate = Math.random();
            if (fate<=0.5){
                const embed = new Discord.MessageEmbed()
                .setTitle(String.fromCodePoint(0x1F4A2)+' FAIL '+String.fromCodePoint(0x1F4A2))
                .addField('Score', fate.toFixed(2)+"% ")
                .setColor(0xff0000)
                message.channel.send(embed);
            } else{
                const embed = new Discord.MessageEmbed()
                .setTitle(String.fromCodePoint(0x1F320)+' SUCCESS '+String.fromCodePoint(0x1F320))
                .addField('Score', fate.toFixed(2)+"% ")
                .setColor(0x00ff00)
                message.channel.send(embed);
            }
            break;
        case 'ping':
            message.reply('pong!')
            break;
        case 'pong':
            message.channel.send('ping!')
            break;
        case 'info':
            if(arg[1] ==='version'){
                message.channel.send('Version ' + version);
            }else{
                message.channel.send("I can make to-do lists, coin flips and talk shit");
            }
            break;
        case 'clear':
            if(!args[1]) return message.reply('You need to give me a digit')
            message.channel.bulkDelete(arg[1]);
            break;
        case 'embed':
            const embed = new Discord.MessageEmbed()
            .setTitle('User Information')
            .addField('User Name', message.author.username)
            .addField('Messages sent', userData[sender.id].messagesSent)
            .addField('Act planned', userData[sender.id].total)
            .addField('Current server', message.guild.name)
            .setColor(0x9932CC)
            .setThumbnail(message.author.avatarURL());
            message.channel.send(embed);
        break;
        case 'stats':
            message.channel.send('You have sent **'+userData[sender.id].messagesSent+"** messages!");
            //message.channel.send('I have sent **'+userData["735435708629647371"].messagesSent+"** messages!");
            break;
        case 'plan':
            let wholeCommand = message.content.slice(PREFIX.length);
            var i;
            var j=0;
            for (i=0;i<12;i++){
                if (wholeCommand[0]!==' '){
                    wholeCommand= wholeCommand.slice(1);
                }else{
                    wholeCommand= wholeCommand.slice(1);
                    j++;
                    if(j===2){
                        i=10;
                        break;
                    }
                }
            }
            if(arg[1]==='add'){
                if(!wholeCommand){
                    message.channel.send('please specify ur activity eg. !plan add run');
                } else{}
                userData[sender.id].activities.push(wholeCommand);
                userData[sender.id].completion.push(String.fromCodePoint(0x2B55));
                userData[sender.id].total++;
                message.channel.send('activity **'+wholeCommand+'** has been added!');
                fs.writeFile('userData.json', JSON.stringify(userData),(err)=>{
                    if (err) console.error(err);
                });
            }
            else if(arg[1]=='remove'){
                if(!wholeCommand){
                    message.channel.send('please specify ur activity eg. !plan remove run');
                }else if (!isNaN(arg[2])){
                    const index = userData[sender.id].activities.indexOf(wholeCommand);
                    if (arg[2] > -1) {
                        userData[sender.id].activities.splice(arg[2], 1);
                        userData[sender.id].completion.splice(index, 1);
                        }
                        userData[sender.id].total--;
                        message.channel.send('activity **'+wholeCommand+'** has been removed!');
                        fs.writeFile('userData.json', JSON.stringify(userData),(err)=>{
                            if (err) console.error(err);
                        });
                }else{
                    const index = userData[sender.id].activities.indexOf(wholeCommand);
                    if (index > -1) {
                    userData[sender.id].activities.splice(index, 1);
                    userData[sender.id].completion.splice(index, 1);
                    }
                    userData[sender.id].total--;
                    message.channel.send('activity **'+wholeCommand+'** has been removed!');
                    fs.writeFile('userData.json', JSON.stringify(userData),(err)=>{
                        if (err) console.error(err);
                    });
                }
                    fs.writeFile('userData.json', JSON.stringify(userData),(err)=>{
                        if (err) console.error(err);
                    });
            }
            else if(arg[1]==="check"){
                if(!wholeCommand){
                    message.channel.send('please specify ur activity eg. !plan remove run');
                }else if (!isNaN(arg[2])){
                    const index = userData[sender.id].activities.indexOf(wholeCommand);
                    if (arg[2] > -1) {
                        if (userData[sender.id].completion[arg[2]]===String.fromCodePoint(0x2B55)){
                            userData[sender.id].completion[arg[2]]=String.fromCodePoint(0x2B50);
                            message.channel.send('activity **'+wholeCommand+'** has been checked!');
                        }else{
                            userData[sender.id].completion[arg[2]]=String.fromCodePoint(0x2B55);
                            message.channel.send('activity **'+wholeCommand+'** has been unchecked!');
                        }
                        }
                        fs.writeFile('userData.json', JSON.stringify(userData),(err)=>{
                            if (err) console.error(err);
                        });
                }else{
                    const index = userData[sender.id].activities.indexOf(wholeCommand);
                    if (index > -1) {
                        if (userData[sender.id].completion[index]===String.fromCodePoint(0x2B55)){
                            userData[sender.id].completion[index]=String.fromCodePoint(0x2B50);
                            message.channel.send('activity **'+wholeCommand+'** has been checked!');
                        }else{
                            userData[sender.id].completion[index]=String.fromCodePoint(0x2B55);
                            message.channel.send('activity **'+wholeCommand+'** has been unchecked!');
                        }
                        }
                        fs.writeFile('userData.json', JSON.stringify(userData),(err)=>{
                            if (err) console.error(err);
                        });
            }
        }else if(!arg[1]){
                var i;                       
                let embed = new Discord.MessageEmbed();
                for (i=-1;i<userData[sender.id].total;i++){
                    let randomColor = '#'+Math.floor(Math.random()*16777215).toString(16);
                    if (i===-1){
                        embed = embed
                        .setTitle('To-do List')
                        .setFooter("user: "+message.author.username)
                        //.setThumbnail(message.author.avatarURL())
                        .setColor(randomColor);
                    }else{
                        embed = embed
                        .addField("Uniwork",userData[sender.id].completion[i]+"\n"+ userData[sender.id].activities[i])
                        .setThumbnail('https://img.favpng.com/5/2/2/computer-icons-clip-art-vector-graphics-computer-software-illustration-png-favpng-JLAA2wmhcNF1NZYh1RYrRRNwC.jpg'); 
                    }
                }
                message.channel.send(embed);
            }else if(arg[1]==='total'){
                message.channel.send('You currently have **'+userData[sender.id].total+"** activities planned!");
            }else{
                message.channel.send('undefined action eg. use !plan, !plan remove {activity}, !plan add {activity}');
            }
            break;
    }

})

bot.login(token);
