const fetch = require('node-fetch');
const Discord = require('discord.js');
const dex = require('../newDex.json');
module.exports = {
    name: 'eval',
    description: 'a',
    hide: true,
    run({msg, args, P}) {
        if (msg.author.id !== '737579062108880948') return;
        const input = args.join(' ');
        if (!input) return msg.reply('no input = no eval');
        const embed = new Discord.MessageEmbed();

        try {
            let output = eval(input);
            if (typeof output !== 'string') output = require('util').inspect(output, { depth: 0 });
            embed
            .addField('Input', `\`\`\`js\n${input.length > 1024 ? 'Too large to display.' : input}\`\`\``)
            .addField('Output', `\`\`\`js\n${output.length > 1024 ? 'Too large to display.' : output}\`\`\``)
            .setColor('#66FF00');

        
            
        } catch (error) {
             embed
          .addField('Input', `\`\`\`js\n${input.length > 1024 ? 'Too large to display.' : input}\`\`\``)
          .addField('Output', `\`\`\`js\n${err.length > 1024 ? 'Too large to display.' : err}\`\`\``)
          .setColor('#FF0000');
        }
        msg.channel.send({embeds:[embed]});
    }
}