const { Client, Intents, Message, MessageEmbed, Collection } = require('discord.js');

const client = new Client({partials: ["CHANNEL"], intents: [Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILDS, Intents.FLAGS.DIRECT_MESSAGES]});

const Pokedex = require('pokedex-promise-v2');
const P = new Pokedex();
const weaknesses = require('./weaknesses');

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
      'r!',
      'R!',
 
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
