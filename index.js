const { Client, Intents, Message, MessageEmbed, Collection } = require('discord.js');
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
client.commands = new Collection();
client.on('debug',i=>console.warn(i));
client.on('ready', ()=> {
  console.log(client.guilds.cache.map(r=>r.name))
    const fs = require('fs');
    fs.readdirSync('./commands').forEach(c=>{
        if (!c.endsWith('.js')) return;
        const load = require('./commands/'+c);
        client.commands.set(load.name, load);
        if (load.aliases) {
            load.aliases.forEach(a=>client.commands.set(a, load))
        }
        console.log(c);
    })
}
);

  /*
  client.on('messageCreate',async (msg)=> {
    function wait(ms){
        let start = new Date().getTime();
        let end = start;
        while(end < start + ms) {
          end = new Date().getTime();
       }
     }
      if (msg.content === 'spam cook wen') {
         let i = 0;
         while(i<20) {
             await msg.channel.send('<@757273164018614312>');
             wait(2000);
             i++;
        }

      }
  })
  */
client.on('messageCreate', async (msg) => {
    const prefixes = [
      'k',
      'K',
 
    ];
  const prefix = prefixes.filter(p => msg.content.startsWith(p))[0];
  if (!prefix) return;
    const owner = '737579062108880948';
    if (!msg.channel) return;
    const args = msg.content.trim().split(' ');
    const command = args.shift();
    if (!command) return;
    const cmd = command.slice(prefix.length).toLowerCase();
    const run = client.commands.get(cmd);
    if (!run ) return;
    else run.run({ msg, args, P});
})

client.login(process.env.token);
