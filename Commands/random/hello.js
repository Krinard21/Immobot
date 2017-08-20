const commando = require('discord.js-commando');

class Hello extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'hello',
            group: 'random',
            memberName: 'hello',
            description: 'Says hello back to the user'
        });
    }
    async run(message, args) {
        message.channel.sendMessage('Greetings ' + message.author.username);
        

    }
}

module.exports = Hello;
