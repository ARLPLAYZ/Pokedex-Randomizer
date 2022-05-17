const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));


const { Client, Intents, Message, MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const client = new Client({partials: ["CHANNEL"], intents: [Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILDS, Intents.FLAGS.DIRECT_MESSAGES]});
const mons = require('./mons.json');
const Pokedex = require('pokedex-promise-v2');
const P = new Pokedex();
const weaknesses = require('./weaknesses');
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
client.on('ready', ()=> console.log(client.user.tag));
client.on('messageCreate', async (msg)=> {
    const prefix = 'r!';
    const owner = '737579062108880948';
    if (!msg.channel) return;
    const args = msg.content.trim().split(' ');
    const command = args.shift();
    const cmd = command.slice(prefix.length);
 
    if (cmd === 'rand' || cmd === 'random') {
        const random = Math.floor(Math.random()*mons.length);
        const randomMon = mons[random];
        try {
            const res = await P.getPokemonByName(randomMon.toLowerCase());
            const embed = new MessageEmbed()
                .setColor(color[res.types[0].type.name])
                .setTitle(randomMon)
                .setImage(res.sprites.front_default);
            msg.channel.send({ embeds: [embed]})
        } catch(err) {
            console.log(err.stack);
            return msg.reply('oops. Try again later :sleepy:');
        } 
    }
    if (cmd === 'info') {
      require('./getMonInfo')(msg, args, P);     
    }
    if (cmd === 'stats') {
        const mon = args[0]
        if (!mon) return msg.channel.send('specify a pokemon pls');
        else try {
            const res = await P.getPokemonByName(encodeURIComponent(mon.toLowerCase()));
            const total = res.stats.map(r=>parseInt(r.base_stat));
            const totalSum = total.reduce((partialSum, a) => partialSum + a, 0);
            const embed = new MessageEmbed()
              .setColor(color[res.types[0].type.name])
                .setTitle(`Total base stats: ${totalSum}`)
                .setDescription(res.stats.map(r=> `**${r.stat.name}:** \`${r.base_stat}\``).join('\n'))
                .setImage(res.sprites.front_default);

            return msg.channel.send({ embeds: [embed]})
        } catch (err) {
            console.log(err);
            return msg.reply('Couldnt find that pokemon on the database')
        }
    }
    if (cmd === 'help') {
        return msg.channel.send({ 
            embeds: [
                new MessageEmbed()
                    .setTitle('I have literally, 5 commands lmao')
                    .setDescription('`rand/random` , `stats`, `info`, `weak` and `help`')
                    .setFooter({ text: 'At the moment I only support english. Multi language support coming soon'})
            ]
        })
    }

    if (cmd === 'weak') {
       if (!args[0]) return msg.reply('`r!weak <pokemon>``')
        const pokemon = encodeURIComponent(args.join(' '));
        try{ 
            const res = await P.getPokemonByName(pokemon);
            const type1 = res.types[0].type.name;
            const type2 = res.types[1] ? res.types[1].type.name : null;
            const data = getWeakStats(type1,type2);
          const embed = new MessageEmbed()
            .setColor(color[res.types[0].type.name])
          .setTitle('Showing weaknesses for ' + args.join(' ').toLowerCase())
          .setDescription(`**Weak:** ${data.weak},
**Resistant:** ${data.resist=== '``' ? '`None`' : data.resist},
**Immune:** ${data.immune === '``' ? '`None`' : data.immune}
`)
            return msg.channel.send({ embeds: [embed]})
        } catch(e) {
            console.error(e.message)
            return msg.channel.send('Didnt find a pokemon. (the type support is just not here rn)');
        }
    }
})
client.login(process.env.token)



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

function capitalizeFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

