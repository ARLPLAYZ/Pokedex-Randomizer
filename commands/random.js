const { MessageEmbed } = require('discord.js');
const mons = require('../newDex.json');
const monColor = {
    black: '#000000',
    blue: 'BLUE',
    brown: '#823200',
    gray: 'GREY',
    green: 'GREEN',
    pink: 'LUMINOUS_VIVID_PINK',
    purple: 'PURPLE',
    red: 'RED',
    white: 'WHITE',
    yellow: 'YELLOW'
}
const capitalise = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
module.exports = {
    name: 'random',
    description: 'Get a random pokemon',
    usage: 'random [magic spell]',
    aliases: ['rand'],
    async run({msg, P}) {
        const random = Math.floor(Math.random() * mons.length);
        const randomMon = mons[random];
        try {
            const imageName = randomMon.name.toLowerCase().replace(/[\s&\/\\#,+()$~%.'":*?<>{}-]/g, '');
            const imageURL = `https://play.pokemonshowdown.com/sprites/ani/${imageName}.gif`
            const embed = new MessageEmbed()
                .setColor(monColor[randomMon.color])
                .setFooter({ text: 'Some pokemons may not display images, or may not work. Im fixing it ok >:('})
                .setTitle(capitalise(randomMon.name))
                .setImage(imageURL);
            return msg.reply({
                embeds: [embed]
            })
        } catch (err) {
            console.log(err.stack);
            return msg.reply(`oops. Try again later :sleepy:. Error code: \`${random}\``);
        }
    }
}