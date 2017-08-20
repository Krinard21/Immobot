const commando = require('discord.js-commando');

class NuzzFacts extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'nuzzfacts',
            group: 'random',
            aliases: ['nuzzfact'],
            memberName: 'nuzzfacts',
            description: 'Generates a random Nuzzlez fact'
        });
    }
    async run(message, args) {
        var facts = [
            'Nuzzlez one night rallied the raid on gorefiend from near death by coffee.',
            'Nuzzlez is fat and gay.',
            'Nuzzlez shares a room with 5 cats and a known autist.',
            'Nuzzlez didn\'t learn to ride a bike until he was 14.',
            'Nuzzlez is 21.',
            'Nuzzlez enjoys porters and stouts.',
            'Nuzzlez is a musician. Link: https://www.SoundCloud.com/summonedsouls.',
            'Nuzzlez streams himself choking to death on coffee. https://www.Twitch.tv/snazzlefritz.',
            "Nuzzlez' name is Drew.",
            'Nuzzlez once won a hotdog eating contest against his 9th grade geology teacher.',
            'Nuzzlez is a paper boy and NOT a sexual predator.',
            'Nuzzlez once played rugby with a severed pighead.',
            'Nuzzlez used to play the trombone in a punk band.',
            'Nuzzlez hates tequila.',
            'Nuzzlez has a mildly unhealthy obsession with Hulk Hands',
            'When Nuzzlez yawns, he typicially ends up yodeling',
            'Nuzzlez once did an entire raid dressed in chain mail, wearing a wizard hat, and brandishing a sword.',
            'Nuzzlez is part cow. https://cdn.discordapp.com/attachments/270753550534049792/276521221514985472/cowstiffarm.jpg',
            'According to all known laws of aviation\, there is no way a Nuzzlez should be able to fly. Its wings are too small to get its fat little body off the ground. The Nuzzlez, of course, flies anyway because Nuzzlez doesn\'t carewhat humans think is impossible.',
            'Nuzzles has a DK named Puzzlez'
             ];
        let randomNumber = facts[Math.floor(Math.random() * facts.length)];
        message.channel.sendMessage(randomNumber);    
    }
    }



module.exports = NuzzFacts;