const { MessageEmbed } = require('discord.js');
const weaknesses = require('../weaknesses');
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
    name: 'weakness',
    description: 'Get weaknesses of pokemon',
    usage: 'weak <pokemon>',
    aliases: ['weak'],
    async run({ msg,args, P }) {
        if (!args[0]) return msg.reply('`r!weak <pokemon>``')
        const pokemon = encodeURIComponent(args.join(' '));
        try {
            const res = await P.getPokemonByName(pokemon);
            const type1 = res.types[0].type.name;
            const type2 = res.types[1] ? res.types[1].type.name : null;
            const data = getWeakStats(type1, type2);
            const embed = new MessageEmbed()
                .setColor(color[res.types[0].type.name])
                .setTitle('Showing weaknesses for ' + args.join(' ').toLowerCase())
                .setDescription(`
**Weak:** ${data.weak === '``' ? '`None`' : data.weak},
**Resistant:** ${data.resist=== '``' ? '`None`' : data.resist},
**Immune:** ${data.immune === '``' ? '`None`' : data.immune}
`)
            return msg.channel.send({
                embeds: [embed]
            })
        } catch (e) {
            console.error(e.message)
            return msg.channel.send('Didnt find a pokemon. If you found this as a bug use the report cmd!');
        }

    }
}
function getWeakStats(type1, type2) {
    if (!type2) {
        const e = weaknesses[type1];
        return {
            weak: '`' + e.weak.join('`, `') + '`',
            resist: '`'+e.res.join('`, `')+'`',
            immune: '`'+ e.imm.join('`, `') + '`'
        }
    };
    const first = weaknesses[type1];
    const second = weaknesses[type2];
    const weak = first.weak.concat(second.weak);
    const resist = first.res.concat(second.res);
    const immune = first.imm.concat(second.imm);    
    const finalWeak = [];
    const finalRes = [];
    for (const type of weak) {
        if (immune.includes(type)) continue
        if (!resist.includes(type)) {
            if (!finalWeak.includes(type)) 
            finalWeak.push(type);        
            //spliceElement(resist, type)
        }
        
    }
    for (const type of resist) {
        if (immune.includes(type)) continue;
        if (!weak.includes(type)) {
          if (!finalRes.includes(type)) finalRes.push(type)
        }
    }
    return {
        weak: '`'+finalWeak.join('`, `')+'`',
        resist:'`'+ finalRes.join('`, `')+'`',
        immune: '`'+immune.join('`, `')+'`'
    }



} 
