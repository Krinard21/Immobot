const commando = require('discord.js-commando');

class Cupcake extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'cupcake',
            group: 'random',
            memberName: 'cupcake',
            description: 'Sends a cupcake to the specified user'
        });
    }
    async run(message, args) {
        message.delete(1000);
        var cupcake = [
            'https://s-media-cache-ak0.pinimg.com/236x/09/84/77/098477b2d82af335427fcd3da1b8aaa0.jpg',
            'http://i.imgur.com/2EHIuBD.jpg',
            'http://i.imgur.com/HX4S39x.jpg',
            'http://i.imgur.com/4xk9d7w.jpg',
            'http://imgur.com/a/EtW06',
            'https://cdn.discordapp.com/attachments/221768994552676353/272045327769534464/jj.png',
            
            ];
            
        let randomCupcake = cupcake[Math.floor(Math.random() * cupcake.length)];
            {
        let mbr = message.mentions.users.first();
        
            message.guild.member(mbr).sendMessage(randomCupcake + 'You have recieved a cupcake from ' + message.author);
        
    
}


    }
}

module.exports = Cupcake;