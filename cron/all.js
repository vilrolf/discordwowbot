var cron = require('node-cron');
var sheet = require('../sheet')

const write15minDayTime = () => {
    cron.schedule('0,15,30,45 14-23 * * *', () => {
        sheet.write()
    })
}
const everHourAtNight = () => {
    cron.schedule('0 0-13 * * *', () => {
        sheet.write()
    } )
}
const everyMinute = () => {
    cron.schedule('* * * * *', () => {
        console.log('writing')
        sheet.write()
    } )
}
exports.runCrons = () => {
    // write15minDayTime()
    // everHourAtNight()
    everyMinute()
}

