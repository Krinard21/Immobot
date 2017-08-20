const commando = require('discord.js-commando');

class DiceRollCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'roll', //same as what's being called so !roll
            group: 'random', //name of folder that command is in
            memberName: 'roll', //same as name 
            description: 'Rolls a d20' //self explanitory 
        });

    
        
    } //all function code goes here
    async run(message, client, args) {
     let numbers = message
     {
            

}
     

        var roll = Math.floor(Math.random() * message.number ) + 1;
        message.reply("You rolled " + roll);
        
             console.log
    }
}

module.exports = DiceRollCommand; // matches class
