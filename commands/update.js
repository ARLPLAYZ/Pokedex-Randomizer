module.exports = {
    name: 'update',
    hide: true,
    run({msg}) {
        const para = 
        `
        **God my unstable code is giving me anxiety**

        The \`info\` command has been replaced with the \`dex\` command.
        The \`random\` command should no longer throw errors
        The bot is now open source: [enjoy you bunch of sorry freeloaders](https://github.com/ARLPLAYZ/Pokedex-Randomizer/)
        ||just use the report command instead of pinging me if theres a problem and the bots online dumbass||
        `
        return msg.channel.send({
            embeds: [
                {
                    title: 'Update',
                    color: '#e3e3e3',
                    description: para
                }
            ]
        })
    }
}