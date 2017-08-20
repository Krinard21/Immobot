/**
 * Created by Louis on 1/18/2017.
 */

const commando = require('discord.js-commando');
const https = require("https");

function getRaidKP(progression) {
    var sum = 0;

    progression.raids.forEach(function(raid) {
        // 8440 = ToV, 8025 = NH, 8026 = EN
        if (raid.id != 8440 && raid.id != 8025 && raid.id != 8026) {
            return;
        }

        raid.bosses.forEach(function(boss) {
            sum += boss.lfrKills * 2;
            sum += boss.normalKills * 3;
            sum += boss.heroicKills * 4;
            sum += boss.mythicKills * 6;
        });
    });
    console.log("Raid+ KP: "+sum);
    return sum;
};

function getChallengeKP(achievements) {
    var sum = 0;
    var total_runs = 0;

    var idsArr = [
        33096,
        33097,
        33098,
        32028
    ];

    idsArr.forEach(function(id) {
        var index = achievements.criteria.indexOf(id);

        if (index === -1) {
            return;
        }

        sum += achievements.criteriaQuantity[index] * 3.5;
        total_runs += achievements.criteriaQuantity[index];
    });

    console.log("Total M+ Runs: "+total_runs);
    console.log("mythic+ KP: "+sum);

    return sum;
}

function getDailyKP(achievements) {
    // 10671 = Level 110
    var index = achievements.achievementsCompleted.indexOf(10671);
    if (index === -1) {
        return 0;
    }

    var timestamp = achievements.achievementsCompletedTimestamp[index];

    var date = new Date();
    // 86400000 = 24 hours
    var days = Math.floor((date.getTime() - timestamp) / 86400000);
    var kp = days * 2;
    console.log("Daily KP: "+kp);
    return kp;
}

function getMaxChests(){
    var date1 = new Date();
    var date2 = new Date("2016-09-21");
    return Math.floor(Math.floor(date1-date2)/1000/60/60/24/7);
}

function getKP(toon) {
    var raidKp = getRaidKP(toon.progression);
    var dailyKp = getDailyKP(toon.achievements);
    var dungeonKp = getChallengeKP(toon.achievements);
    var totalKP = raidKp+dailyKp+dungeonKp;
    return "TotalKP range for: " +totalKP+" - "+(totalKP+getMaxChests()*11)+
        "\n    RaidKP: " +raidKp+
        "\n    DailyKP: "+dailyKp+
        "\n    DungeonKP: "+dungeonKp+
        details;
}

var details = "\nEstimated legendaries per KP:" +
    "\n    1 Legendary 194" +
    "\n    2 Legendaries 578" +
    "\n    3 Legendaries 1225" +
    "\n    4 Legendaries 2181" +
    "\n    5 Legendaries 4800" +
    "\n    6 Legendaries 9600"+
    "\n Please note: each opened chest is ~ 11 KP which accounts for the total range, Current max chests: "+getMaxChests();

function make_request(msg, character, realm = 'Korgath', region = 'us'){
    var options = {
        host: region+".api.battle.net",
        port: 443,
        path: "/wow/character/"+realm+"/"+character+"?fields=progression,achievements&apikey=kr2bfgpv5wtx5entzwkvvq6kqpwfwg7e"
    }
    https.request(options, function(res){
        console.log(options)
        console.log(res.statusCode+" Status");
        var request_data = '';
        res.on('data', function(request_chunk){
            request_data += request_chunk;
        });

        res.on('end', function (){
            try {
                console.log('Parsing json string to js object')
                var toon = JSON.parse(request_data);
                var kp = getKP(toon);
                msg.author.sendMessage(kp);
                msg.delete(1000);
            }catch(err){
                msg.author.sendMessage("Error in fetching KP. Check your character name. If all else fails, yell at Annomaly");
                msg.delete(1000);
            }
        })
    }).end();
}

module.exports = class lego extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'lego',
            aliases: ['kp'],
            group: 'util',
            memberName: 'kp',
            description: 'Calculates your KP ( legendary chance kill points )',
        examples: ['!lego Annomaly', '!lego Annomaly Korgath', "!lego Annomaly Korgath us"],

            args: [
            {
                key: 'name',
                label: 'characterName',
                prompt: 'What is your character name',
                type: 'string',
                infinite: false
            },
            {
                key: 'realm',
                label: 'realmName',
                prompt: 'What realm is your character on',
                type: 'string',
                infinite: false,
                default: 'Korgath'
            },
            {
                key: 'region',
                label: 'regionName',
                prompt: 'What realm is your region on, eu or us',
                type: 'string',
                infinite: false,
                default: 'us'
            }
        ]
    });
}

async run(msg, args) {
    return make_request(msg, args.name.replace(/\s/g, ''), args.realm.replace(/\s/g, ''), args.region.replace(/\s/g, ''));
}
};