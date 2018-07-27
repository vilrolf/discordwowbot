const db = require('./db.js')

const all =  db.getAllChars('race')
console.log(all.length)