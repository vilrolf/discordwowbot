var cron = require('node-cron');
var sheet = require('../sheet')
var db = require('../db')

const fiveMin = () => {
    cron.schedule('*/5 * * * *', async () => {
        const shouldWrite = await db.updateAllCharacters()
        if (shouldWrite) sheet.write()
    })
}
exports.runCrons = () => {
    fiveMin()
}

