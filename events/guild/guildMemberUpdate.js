module.exports = async (Discord, client, oldmember, newmember) => {
    const log = oldmember.guild.channels.cache.find(c => c.name === 'logs')
    const verified = oldmember.guild.roles.cache.find(r => r.name === '✔️VERIFIED✔️');
    if(!log) return;

    if(oldmember === newmember) return;

    if(oldmember.nickname !== newmember.nickname){
        let oldnickname = oldmember.nickname || 'none'
        let newnickname = newmember.nickname || 'none'
        const embed = new Discord.MessageEmbed()
        .setTitle("Nickname Updated")
        .setDescription(`OLD: [**${oldnickname}**]\nNEW: [**${newnickname}**]`)
        log.send(embed)
    }
    if (oldmember.roles.cache.size > newmember.roles.cache.size) {
        // Creating an embed message.
        const Embed = new Discord.MessageEmbed();
        Embed.setColor("RED");
        Embed.setAuthor(newmember.user.tag, newmember.user.avatarURL());
        
        // Looping through the role and checking which role was removed.
        oldmember.roles.cache.forEach(role => {
            if (!newmember.roles.cache.has(role.id)) {
                Embed.addField("Role Removed", role);
            }
        });
        log.send(Embed);
    }
        
    if (oldmember.roles.cache.size < newmember.roles.cache.size) {
        const Embed = new Discord.MessageEmbed();
        Embed.setColor("GREEN");
        Embed.setAuthor(newmember.user.tag, newmember.user.avatarURL());
        
        // Looping through the role and checking which role was added.
        newmember.roles.cache.forEach(role => {
            if (!oldmember.roles.cache.has(role.id)) {
                Embed.addField("Role Added", role);
            }
        });
        log.send(Embed);
    }



}
