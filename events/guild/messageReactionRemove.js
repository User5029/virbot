module.exports = async (Discord, client, reaction, user) => {
     const channel1 = await reaction.message.guild.channels.cache.get('812858248122204182')
     const proles = await reaction.message.guild.channels.cache.find(c => c.name === '「🔔」roles')
     //return;
     const b = reaction.emoji.name
     if(reaction.message.partial) await reaction.message.fetch()
     if(reaction.partial) await reaction.fetch()
     if(user.bot) return;
     if(!reaction.message.guild) return;

     //Verification
     const verified = reaction.message.guild.roles.cache.find(r => r.name === '✔️VERIFIED✔️');

     const Everified= '✅'

     if(reaction.message.channel.id === channel1.id){
          if(b === Everified) {
               reaction.message.guild.members.cache.get(user.id).roles.remove(verified)
          }
     }
     //End Verification
     //Notification Roles
     const announcements = reaction.message.guild.roles.cache.find(r => r.name === '📢announcement📢');
     const staffevents = reaction.message.guild.roles.cache.find(r => r.name === '🏆Staff events🏆');
     const giveaway = reaction.message.guild.roles.cache.find(r => r.name === '🥳 giveaway🥳');
     const newvids = reaction.message.guild.roles.cache.find(r => r.name === '🎥Video room🎥');
     const vote = reaction.message.guild.roles.cache.find(r => r.name === '✋Vote✋');
     const events = reaction.message.guild.roles.cache.find(r => r.name === '📅events📅');

     const one = '📢'
     const two = '🏆'
     const three = '🥳'
     const four = '🎥'
     const five = '✋'
     const six = '📅'

     if(reaction.message.channel.id === proles.id){
          if(b === one) {
               reaction.message.guild.members.cache.get(user.id).roles.remove(announcements)
          }
          if(b === two) {
               reaction.message.guild.members.cache.get(user.id).roles.remove(staffevents)
          }
          if(b === three) {
               reaction.message.guild.members.cache.get(user.id).roles.remove(giveaway)
          }
          if(b === four) {
               reaction.message.guild.members.cache.get(user.id).roles.remove(newvids)
          }
          if(b === five) {
               reaction.message.guild.members.cache.get(user.id).roles.remove(vote)
          }
          if(b === six) {
               reaction.message.guild.members.cache.get(user.id).roles.remove(events)
          }
     }
     //End Notification Roles

 }
 