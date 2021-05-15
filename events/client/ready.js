module.exports = async (Discord, client, message) => {
    console.log("Bot online \nName: " + client.user.username);
    client.user.setStatus('idle');


}