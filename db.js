const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)
db.defaults({ users: [] })
    .write()

exports.addWowChar = (id, wowData) => {
    // check if user exists
    const user = db.get('users').find({ id })
    const uValue = user.value()
    if (uValue)  {
        uValue.characters.push(wowData)
        user.assign(uValue).write()
    }
    else {
        db.get('users')
            .push({ id, characters: [wowData] })
            .write()
    }
}
exports.getWowChar = (id) => {
    const data = db.get('users').find({ id }).value()
    if (data) return data.wowData
    return null
}

exports.getAllChars = (sortBy) => {
    
    return db.get('users').map('wowData').sortBy(sortBy).value()
}
