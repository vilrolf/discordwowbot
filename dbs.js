const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('./data/db.json')
const db = low(adapter)

// Set some defaults (required if your JSON file is empty)
db.defaults({ users: [] })
  .write()

// Add a post

// Set a user using Lodash shorthand syntax
db.set('user.id', 'aksak')
  .write()
db.get()
// Increment count
db.update('count', n => n + 1)
  .write()