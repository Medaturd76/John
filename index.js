const Discord = require('discord.js');
const client = new Discord.Client();
const { MessageEmbed } = require('discord.js')
const { nogemsg, nopacemg, nopacemsg2, nopacemsg3, nopacemsg4, nopacemsg5, donemsg, ndoneemsg, nwaemsg, helpemsg } = require('./Embeds.json');
const prefix = '?';

client.on('ready', () => console.log("Ready"))

client.on('message', async message => {
    const args = message.content.substring(prefix.length).split(" ")

    if (message.author.bot) return;
    if (!message.content.startsWith(`${prefix}`)) return;
    if (!message.channel.guild) return message.channel.send(nogemsg);
    if (message.content.startsWith(`${prefix}accept`)) {
        if (!args[1]) return message.channel.send(nopacemg);
        if (!args[2]) return message.channel.send(nopacemsg2);
        if (!args[1] && !args[2]) return message.channel.send(nopacemsg3);
        if (!message.member.roles.cache.find(role => role.name === "Website Admin")) {
            message.author.send(nwaemsg)
        }

        const botowner = args[1]
        const bot = args[2]

        botowner.send(new MessageEmbed()
            .setColor("ORANGE")
            .setTitle('**ACCEPTED**')
            .setDescription(`You bot ${bot} was accepted to the website`)
            .setFooter( { text: "Brought to you by Minecrafty99", iconURL: "https://cdn.discordapp.com/avatars/660862491102019604/5b28dadf6cf852c943e1df0a82dad850.webp" } )
        )

        message.author.send(new MessageEmbed()
            .setColor("ORANGE")
            .setTitle('**SUCESS**')
            .setDescription(`Your accepte to ${botowner} was sucessfully sent`)
            .setFooter( { text: "brought to you bey Minecrafty999", iconURL: "https://cdn.discordapp.com/avatars/660862491102019604/5b28dadf6cf852c943e1df0a82dad850.webp" } )
        )
    }
    if (message.content.startsWith(`${prefix}decline`)) {
        if (!args[1]) return message.channel.send(nopacemg);
        if (!args[2]) return message.channel.send(nopacemsg2);
        if (!args[3]) return message.channel.send(nopacemsg4);
        if (!args[2] && !args[3]) return message.channel.send(nopacemsg3);
        if (!args[1] && !args[2] && !args[3]) return message.channel.send(nopacemsg5);
        if (!message.member.roles.cache.find(role => role.name === "Website Admin")) {
            message.author.send(nwaemsg)
        }

        const botowner = args[1]
        const bot = args[2]
        const reason = args[3]

        botowner.send(new MessageEmbed()
            .setColor("BLUE")
            .setTitle('**DECLINED**')
            .setDescription(`I'm sad to tell you this but your bot ${bot} was delcined because: ${reason}`)
            .setFooter( { text: "brought to you bey Minecrafty999", iconURL: "https://cdn.discordapp.com/avatars/660862491102019604/5b28dadf6cf852c943e1df0a82dad850.webp" } )
        )

        message.author.send(new MessageEmbed()
            .setColor("ORANGE")
            .setTitle('**SUCESS**')
            .setDescription(`Your decline to ${botowner} was sucessfully sent`)
            .setFooter( { text: "brought to you bey Minecrafty999", iconURL: "https://cdn.discordapp.com/avatars/660862491102019604/5b28dadf6cf852c943e1df0a82dad850.webp" } )
        )
    }
    if (message.content.startsWith(`${prefix}help`)) {
        if (!message.member.roles.cache.find(role => role.name === "Website Admin")) {
            message.author.send(nwaemsg)
        }
        if (message.member.roles.cache.find(role => role.name === "Website Admin")) {
            message.author.send(helpemsg)
        }
    }
    if (message.content.startsWith(`${prefix}setup`)) {
        if (message.author.id !== message.guild.owner.id) {
            message.author.send(ndoneemsg)
        }
        if (message.author.id === message.guild.owner.id) {
            await message.guild.roles.create("Website Admin", {
                color: "#1a1dd8"
            });
    
            message.author.send(donemsg)
        }
    }
})

client.login(process.env.TOKEN)