const { MessageEmbed } = require('discord.js');
const mons = require('../newDex.json');
const capitalise = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
function toFeet(n) {
    let realFeet = ((n * 0.393700) / 12);
    let feet = Math.floor(realFeet);
    let inches = Math.round((realFeet - feet) * 12);
    return `${feet}ft ${inches}in`;
}const monColor = {
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


module.exports = {

    name: 'dex',
    description: 'Dex a mon',
    aliases: ['d'],
    usage: ['d <mon>'],
    async run({msg, args, P}) {
        let form='';
        let search = args[0]
        if (args[0].endsWith('-galar')) {
            form = '-galar';
            search = args[0].replace('-galar','');
        }
        if (args[0].endsWith('-alola')) {
            form = '-galar';
            search = args[0].replace('-galar','');
        }
        if (args[0].endsWith('-therian')) {
            form = '-therian';
            search = args[0].replace('-therian', '');
        }
        if (args[0].endsWith('-mega')) {
            form = '-mega';
            search = args[0].replace('-mega', '');
        }
        console.log(search);
        const chosenOne = mons.find(r=> r.name === search.toLowerCase());
        if (!chosenOne) return msg.reply('could not find that mon ;-;');
        try {
            let name = chosenOne.name;
            if (name === 'morpeko') name = 'morpeko-full-belly';
            if (name === 'toxtricity') name = 'toxtricity-low-key';
            if (name === 'eiscue') name = 'eiscue-ice';
            if (name === 'gourgeist') name = 'gourgeist-average';
            console.log(name+form);
            const res = await P.getPokemonByName(name + form);  
            const embed = new MessageEmbed()
                .setTitle(`#${chosenOne.dex} - ${capitalise(chosenOne.name)}`)
                .setDescription(chosenOne.description.replace(/\n/g, ' '))
                .setColor(monColor[chosenOne.color]);
            if (chosenOne.leg || chosenOne.myt) embed.addField('Rarity',chosenOne.leg ? 'Legendary' : 'Mythical');
            embed.addField('Types', res.types.map(a=>capitalise(a.type.name)).join('\n'), true);
            embed.addField('Appearance', `Height: ${toFeet(res.height*10)}\nWeight: ${res.weight/10}kg`, true)
            embed.addField('Abilities', res.abilities.map(a => capitalise(a.ability.name)).join('\n'), true)
            embed.setImage(res.sprites.other['official-artwork'].front_default)
            embed.setFooter({ text: 'Some pokemon forms have not been added yet!'});
            msg.channel.send({embeds:[embed]})
        } catch(err) {
            console.log(err.message);
            if (err.message.includes('404')) return msg.reply('I couldnt find this mon. Use the report cmd for this.');
            else return msg.reply('An unexpected error occurred!');

        }
    }
}