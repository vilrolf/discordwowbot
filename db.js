const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const wow = require('./wow.js')

const adapter = new FileSync('./data/db.json')
const db = low(adapter)
const _ = require('lodash')
const { getBestPvpRating } = require('./util/charUtil')
db.defaults({ characters: [], members: [] })
    .write()

exports.addWowChar = (id, wowData) => {
    const exists = db.get('characters').find({ name: wowData.name, realm: wowData.realm }).value()
    if (exists) return false
    const char = { ...wowData, memberId: id }
    db.get('characters')
        .push(char)
        .write()
    return char
}
exports.getWowCharactersFromUser = (id) => {
    const data = db.get('characters').filter({ memberId: id }).value()
    if (data) return data
    return null
}
exports.addUser = (member) => {
    const memberFromDb = db.get('members').find({ id: member.id }).value()
    if (!memberFromDb) {
        db.get('members').push(member).write()
    }
}
exports.getAllChars = (sortBy) => {
    return db.get('characters').sortBy(sortBy).value()
}
exports.getAllUsers = () => {
    return db.get('users').value()
}

exports.updateAllCharacters = async () => {
    let shouldUpdate = false
    const chars = db.get('characters').value()
    for (i in chars) {
        const old = chars[i]
        const newChar = await wow.updateCharacter(old)
        const isChanged = exports.isDifferent(old, newChar)
        if (!shouldUpdate) shouldUpdate = isChanged
        db.get('characters').find(old).assign(newChar).write()
    }
    return shouldUpdate
}

exports.isDifferent = (a, b) => {
    if (a.level !== b.level) return true
    if (a.averageItemLevel !== b.averageItemLevel) return true
    if (getBestPvpRating(a) !== getBestPvpRating(b)) return true
    return false
}