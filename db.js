const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)
db.defaults({ characters: [], users: [] })
    .write()

exports.addWowChar = (id, wowData) => {
    const exists = db.get('characters').find({ name: wowData.name, realm: wowData.realm }).value()
    if (exists) return false
    const char = {...wowData, memberId: id} 
    db.get('characters')
        .push( char)
        .write()
    return char
}
exports.getWowCharactersFromUser = (id) => {
    const data = db.get('characters').filter({ memberId: id }).value()
    console.log('dat', data)
    if (data) return data
    return null
}

exports.getAllChars = (sortBy) => {
    return db.get('characters').sortBy(sortBy).value()
}
exports.getAllUsers = () => {
    return db.get('users').value()
}
