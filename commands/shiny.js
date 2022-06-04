const { MessageEmbed } = require('discord.js');
module.exports = {
    name: 'shiny',
    description: 'Get general pokemon info',
    usage: 'sh <pokemon>',
    aliases: ['sh'],
    run({msg, args}) {
        const mon = args[0].toLowerCase();
        if (!mon) return msg.reply('not a valid pokemon :(');
        else return msg.reply({
            embeds: [
                new MessageEmbed()
                    .setColor('RANDOM')
                    .setFooter({ text: 'Some images are broken rip'})
                    .setImage('https://play.pokemonshowdown.com/sprites/ani-shiny/' + mon + '.gif')
            ]
        })
    }
}