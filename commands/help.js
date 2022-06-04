const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'help',
    description: 'Display commands',
    usage: 'help [command]',
    run({msg}) {
        const commands = [];
        msg.client.commands.map(c=>{
            if (c.hide)return;
            
            if (commands.includes(`**${c.name}:** \`${c.description}\``)) return;
            commands.push(`**${c.name}:** \`${c.description}\``)
        })
        return msg.channel.send({
            embeds: [
                new MessageEmbed()
                    .setTitle('Help is here!')
                    .setDescription(commands.join('\n'))
                    .setColor('#FF0000')                    
            ]
        })
    }
}