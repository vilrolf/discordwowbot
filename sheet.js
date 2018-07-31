var GoogleSpreadsheet = require('google-spreadsheet');
const { promisify } = require('util')
const { getAllChars } = require('./db.js')
const { getBestPvpRating } = require('./util/charUtil')
const moment = require('moment')
// test
var doc = new GoogleSpreadsheet(process.env.sheetId);

exports.write = async () => {
  try {
    const characters = getAllChars()
    const headers = ['time']
    const time = moment().format('DD.MM.YYYY HH.mm.ss')
    const levelData = { time }
    const itemLvlData = { time }
    const pvpData = { time }

    for (i in characters) {
      const c = characters[i]
      const h = c.name
      headers.push(h)
      levelData[h] = c.level
      itemLvlData[h] = c.averageItemLevel
      pvpData[h] = getBestPvpRating(c)
    }
    
    var private_value = process.env.sheetPrivateKey.replace(/\\n/g, '\n');    
    var creds = {
      "private_key": private_value,
      "client_email": process.env.sheetClientEmail,
    }

    await promisify(doc.useServiceAccountAuth)(creds)
    const info = await promisify(doc.getInfo)()
    const levelSheet = info.worksheets[1]
    await promisify(levelSheet.resize)({ colCount: headers.length })
    const iLvlSheet = info.worksheets[2]
    await promisify(iLvlSheet.resize)({ colCount: headers.length })
    const pvpSheet = info.worksheets[3]
    await promisify(pvpSheet.resize)({ colCount: headers.length })
    await levelSheet.setHeaderRow(headers)
    await iLvlSheet.setHeaderRow(headers)
    await pvpSheet.setHeaderRow(headers)

    await promisify(levelSheet.addRow)(levelData)
    await promisify(iLvlSheet.addRow)(itemLvlData)
    await promisify(pvpSheet.addRow)(pvpData)
    return true
  }
  catch (error) {
    console.log(error)
  }
}
// exports.write()

