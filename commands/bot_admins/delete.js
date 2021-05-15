const db = require('quick.db')
const mongo = require('../../mongo')
const punishmentSchema = require('../../schemas/punishmentlog')

module.exports = {
    name: 'delete',
    async execute(client, msg, args) {
        msg.delete()
        if(msg.author.id === '665562488158289943' || msg.author.id === '721416593166303352') {
            if(!args[0]) return msg.reply("Please enter a mongo id, the one labled id").then(msg => msg.delete({timeout: 60000}));

            await mongo().then(async (mongoose) => {
                try {
                    const result = await punishmentSchema.findOneAndDelete({
                        _id: args[0],
                    })
                    
    
                } finally {
                    mongoose.connection.close()
                }
            })
        }

    }    
}