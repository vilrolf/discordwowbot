var cron = require('node-cron');
var sheet = require('../sheet')

const write30Min = () => {
    cron.schedule('0,30 15-23 * * *', () => {
        sheet.write()
    })
    cron.schedule('0 0-3 * * *', () => {
        sheet.write()
    })
}
const everHourAtNight = () => {
    cron.schedule('0 3-14 * * *', () => {
        sheet.write()
    } )
}
const updateChars = () => {
    cron.schedule('25,55 * * * *', () => {
        sheet.write()
    })
}
// const everyMinute = () => {
//     cron.schedule('* * * * *', () => {
//         console.log('writing')
//         sheet.write()
//     } )
// }
exports.runCrons = () => {
    write30Min()
    everHourAtNight()
    updateChars()
    // everyMinute()
}

