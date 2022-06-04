const { MessageEmbed } = require("discord.js");
const color = {
    normal: 0x9B9B6B,
    fire: 0xE5711E,
    water: 0x4C7BED,
    electric: 0xF2C617,
    grass: 0x69B741,
    ice: 0x7FCECE,
    fighting: 0xAF2C25,
    poison: 0x8E398E,
    ground: 0xD9B34A,
    flying: 0x9C88DA,
    psychic: 0xF7356F,
    bug: 0x9BA91E,
    rock: 0xA48F32,
    ghost: 0x634E86,
    dragon: 0x6124F5,
    dark: 0x5E493C,
    style: 0xA6A6C4,
    fairy: 0xE484E4,
};
module.exports = {
    name: 'stats',
    desc: 'Get pokemon statistics',
    usage: 'stats <pokemon>',
    async run({ msg, args, P}) {
        if (!args.length) return msg.reply('You havent specified a pokemon')
        const pokemon = args[0].toLowerCase();
        if (args[1]) {
            if (pokemon==='mega') return msg.reply(`Use search term: \`${args[0]}-mega\``);
            if (pokemon==='galarian') return msg.reply(`Use search term: \`${args[0]}-galar\``);
            if (pokemon==='alola') return msg.reply(`Use search term: \`${args[0]}-alola\``);
        }
        try {
            const res = await P.getPokemonByName(pokemon);    
            const imageName = args[0].toLowerCase().replace(/[\s&\/\\#,+()$~%.'":*?<>{}]/g, '');
      const imageURL = 'https://play.pokemonshowdown.com/sprites/ani-shiny/' +imageName + '.gif'       
            const embed = new MessageEmbed()
                .setColor(color[res.types[0].type.name])
                .setTitle(args[0])
                .setImage(imageURL||res.sprites.front_default);
            return msg.channel.send({ embeds: [embed]});
        } catch (err) {
            console.log(err);
            return msg.reply('I made an oopsie on my side :(. This error has been reported');
        }     
    }
}