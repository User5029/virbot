const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true
}

const punishmentlog = mongoose.Schema({
    userID: reqString,
    type: reqString,
    reason: reqString,
    by: reqString
    }, {
        timestamps: true
    })

    module.exports = mongoose.model('punishment-logs', punishmentlog)