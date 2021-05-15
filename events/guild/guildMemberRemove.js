module.exports = async (Discord, client, member) => {
    let cwelcome = member.guild.channels.cache.find(c => c.name === '👋welcome')
    if(!cwelcome) return;

    const embed = new Discord.MessageEmbed()
    .setTitle("Member Left")
    .setDescription(`${member} has left ${member.guild.name}`)
    .setTimestamp()

    cwelcome.send(embed)
}