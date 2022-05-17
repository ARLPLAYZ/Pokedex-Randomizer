function toFeet(n) {
    let realFeet = ((n * 0.393700) / 12);
    let feet = Math.floor(realFeet);
    let inches = Math.round((realFeet - feet) * 12);
    return `${feet}ft ${inches}in`;
}

function kToLbs(pK) {
    var nearExact = pK / 0.45359237;
    var lbs = Math.floor(nearExact);
    return `${lbs}lbs`;
}
function capitalise(string) {
          return string.charAt(0).toUpperCase() + string.slice(1);

}
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
module.exports = async (message, args, P) => {
  let pokeName = args.join(' ').toLowerCase();
  try {
    let res = await P.getPokemonByName(pokeName);

    let height = res.height * 10;
    let weight = res.weight / 10;
    return message.channel.send({embeds: [
                    {
                        author: {
                            name: capitalise(res.species.name),
                            icon_url: 'http://pngimg.com/uploads/pokemon_logo/pokemon_logo_PNG12.png',
                        },
                        color: color[res.types[0].type.name],
                        thumbnail: {
                            url: res.sprites.front_default,
                        },
                        timestamp: new Date(),
                        fields: [
                            {
                                name: 'Height',
                                value: `${toFeet(height)} (${height}cm)`,
                                inline: true,
                            },
                            {
                                name: 'Weight',
                                value: `${kToLbs(weight)} (${weight}kg)`,
                                inline: true,
                            },
                            {
                                name: res.types.length > 1 ? 'Types' : 'Type',
                                value: `\`${res.types.map(a => capitalise(a.type.name)).join(', ')}\``,
                                inline: true,
                            },
                            {
                                name: `Abilities [${res.abilities.length}]`,
                                value: res.abilities.map(a => capitalise(a.ability.name)).join(', '),
                                inline: true,
                            },
                            
                        ],
                    },
                ]
            });
  } catch(er) {
    console.log(er);
    return message.channel.send('OOPS! Either that pokemon doesnt exist or an error occurred on my side.')
    
  }
    
}
