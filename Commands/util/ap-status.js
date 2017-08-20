/**
 * Created by Louis on 1/18/2017.
 */

const commando = require('discord.js-commando');
const https = require("https");
const api_key = 'chugbegg6sxqepgfb6dt5nh377n9u8gs';

var ap_dict = {};
var ap_list = [];

function get_guild_members(guild_data) {
    var members = [];

    guild_data.members.forEach(function(member) {
        if ((member.rank == 0 || member.rank == 1 || member.rank == 3) && member.character.level == 110) {
            members.push(member.character.name);
        }
    });
    return members;
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function get_sorted_ap_ranks(msg){
    var ap_for_max_traits = 65256330;
    ap_list.sort(function(a,b){return b-a});
    var ap_string = '\nHall of Fame\n';
    var i = 0;
    while(i < ap_list.length){
        if (i < 10){
            ap_string += "   "+ap_dict[ap_list[i]]+" "+numberWithCommas(ap_list[i])+"\n";
        }
        if (i == 10 ){
            ap_string += "Hall of Shame (<54 traits)\n"
        }
        if (i >= 10 && ap_list[i] < ap_for_max_traits && ap_list[i] > 10000000){

            ap_string += "   "+ap_dict[ap_list[i]]+" "+numberWithCommas(ap_list[i])+"\n";
        }
        i += 1;
    }
    msg.reply(ap_string);
}

function parse_ap_data(request_data){
    try {
        var member_data = JSON.parse(request_data);
        var index_for_ap = member_data.achievements.criteria.indexOf(30103);
        ap_dict[member_data.achievements.criteriaQuantity[index_for_ap]] = member_data.name;
        ap_list.push(member_data.achievements.criteriaQuantity[index_for_ap]);
        console.log("Index Stuff "+member_data.name);
    }catch(err){
        console.log(err);
    }
}

function request_ap_info_for_members(characters, msg){
    var promises = [];
    characters.forEach(function(character) {
        var action = new Promise(function (resolve, reject) {
            var options = {
                host: 'us.api.battle.net',
                port: 443,
                path: "/wow/character/Korgath/" + character + "?fields=achievements&locale=en_US&apikey=" + api_key
            }
            const request = https.request(options, function (res) {
                if (res.statusCode < 200 || res.statusCode > 299) {
                    reject(new Error('Failed to load page, status code: ' + res.statusCode));
                }
                var request_data = '';
                res.on('data', function (request_chunk) {
                    request_data += request_chunk;
                });

                res.on('end', function() {resolve(parse_ap_data(request_data))});
            });
            request.on('error', (err) => reject(err));
            request.end();
        });
        promises.push(action);
    });
    Promise.all(promises)
        .then(function() {get_sorted_ap_ranks(msg)})
        .catch((err) => console.log(err));
}

function request_guild_data(msg){
    ap_dict = {};
    ap_list = [];
    var options = {
        host: 'us.api.battle.net',
        port: 443,
        path: "/wow/guild/Korgath/Immortality?fields=members&locale=en_US&apikey="+api_key
    }
    console.log('making request');
    const req = https.request(options, function(res){
        var request_data = '';
        res.on('data', function(request_chunk){
            request_data += request_chunk;
        });

        res.on('end', function (){
            try {
                var guild_data = JSON.parse(request_data);
                var members = get_guild_members(guild_data);
                request_ap_info_for_members(members, msg);
            }catch(err){
                console.log(err);
            }
        });
    });
    req.on('error', function(err) {console.log(err)});
    req.end();

}

module.exports = class ap_total extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'ap_total',
            aliases: ['ap_war','showap', 'apleaderboard'],
            group: 'util',
            memberName: 'aptotal',
            description: 'Shows top 10 AP earners',
            details: '',
            examples: ['!showap'],

        });
    }

    async run(msg, args) {
        return request_guild_data(msg);
    }
};