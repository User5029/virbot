const db = require('quick.db')
module.exports = async (Discord, client, member) => {
    let cwelcome = member.guild.channels.cache.find(c => c.name === '👋welcome')
    if(!cwelcome) return;

    const embed = new Discord.MessageEmbed()
    .setTitle("Member Joined")
    .setDescription(`${member} has joined ${member.guild.name}`)
    .setTimestamp()

    cwelcome.send(embed)

    if(!db.get(`user_${member.id}`)){
        db.set(`user_${member.id}`, {joined: Date(), warns: 0, kicks: 0, bans: 0, mutes: 0})
    }

    const embed2 = new Discord.MessageEmbed()
    .setTitle("Welcome to Vircon’s Homebase :)")
    .setDescription(`Hey! Welcome to Vircon’s Homebase! I hope you enjoy your stay :]\nRemember to read the rules and assign roles!!`)
    .setTimestamp()
    
    member.send(embed2)

}