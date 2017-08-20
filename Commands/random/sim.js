const commando = require('discord.js-commando');

class Sim extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'sim',
            group: 'random',
            memberName: 'sim',
            description: 'Puts out a sim gif'
        });
    }

    async run(message, args) {
        message.channel.sendMessage('https://i.giphy.com/3o7TKMyfMHjPEQLumI.gif')

    }
}
module.exports = Sim;