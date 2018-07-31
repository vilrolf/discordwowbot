var GoogleSpreadsheet = require('google-spreadsheet');
const { promisify } = require('util')
const { getAllChars } = require('./db.js')
const { getBestPvpRating } = require('./util/charUtil')
const moment = require('moment')

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
    // var creds = require('./WowBot-51fa73b5dc1e.json')
    // var creds = {
    //   "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCXlTbzp4smGf7y\nByiGCHu7kXnUFuCSxe+RK03uhohPQEueL57MMCSj7ZuqV4p1tFpS2L30Rqvx2i8s\nWZNMge4KvpxIdag8NcmrCSpcPiCMHWnevq4dXC6BRhCzGLJwZ07CgPk1A7b5nUF3\n91lWABHYogU+SP52NTahy51zKevZVDek1Abn2g2M/ti6PC0F28pr+vd4o5pi4fCX\nVdzBEcJQA1vF2Vtoq/Li1qCZLuM6iztUOR7gSJmKeDWyzTNuq1be2IPlNYl55l49\nsuRESa/cBYZJtT9NCcj/TMzxriZGd1ZIkx6w2KeUmsXvNFLw3u+bpW2SJuOsfdlL\nKNomMhnZAgMBAAECggEAM3VMOlreOgkJK1CSyS2IE5zHJuC9TBY1xapVwmuZSo4h\nHYo89kRBrAS1m5YsQtj+8LDzi0GSjX/sE7o07vwMu0kJ9O88NXRtCcsKvlW45tf1\nYNCKex0YDHqkoKf5q37mldECyKSCMSrZVsh5Y2CSrmASN5rAB5D5AuQEh1vr3NLb\n/bF2+tH41VxeiebZyQSMGhQhb9+1qZ3tFoeoxlSeGUzJfdbiig9ZtEMKPfQ9Id2q\n3KuNFods0IS5vVGdKHnOgYz3dJ4E2Yl7tFlRN7tXIIz6yP2WZczK4CVXKoj2qc4z\nZ0AwEzGUzMZpxOhB2/mA+66M+TTtyRSbKzkqHqgUoQKBgQDV4DMTW1voMnlh40FF\ny8UogHB6LJ04/Ts1ZJ2/fHgh9TbI7Oe5EibCn8NGHKtdfF7p+7yil8BhIneKIvB3\n/AHl1NVV39OfbVJpORsSnFSTrYkiWtoqlydOvObcOAo8QSdZudqMgSulBnMjazQr\nptE9KCKLAMX7q9bWH1i9ZjsSCwKBgQC1cCc0B19zPQEjjS72gl6PKDOM/fNakeM5\noMKdzCHn/v0lRh1a5NATl4afDfmu6ZcLituOZNUjazTuL1oUiAe3PLGb6hJdB1mg\nibx78UV8VRna4576KQGtBBNgYxvYf6/wKN5ppNcroUPR4oQUdjNKL/MXIhB2narr\n+cc2tf92KwKBgQC0xYBGLyT6mJbx/uQvuzDUr+Lh0Q2+moNN+NJAhFMB2MJKh7rA\nObBbNjAV9at+I94RhP4Gq58mOryxHCEGORHdkcwTflDfYsaSO3s/erUd8UKEsCfQ\ncdv+eDnlDtTP4v4An88yjQc3v8DXwgfhkWkveNnhhXDR7Id0iiA2Tc9FywKBgFLa\n7Iwt8cDGUwbRKmkYD+aADUqNjdwGUyW17CnzVmiDYUbsReuEIiFQSQHJeAQQWBHF\nT44vLcYG5xz+Mry9ggiDhvgUZF5nRN6zB4fyHjExC6WR3L+QiltgSRjzKXwsk0Ow\n5iCITlp2QmpObtKJR9LRIsmlnK8OQUeRwQ+S/R4RAoGASQder/MBpwDPCodGpCe8\nCgAI+urjCmqopTNj+dZ5p4lDcLver1L45QkN2lAAA0taP/BHyOoWZ+iFFmcABOb4\no+8THPgnh+PI+EkE+LfohZ4PrseaNNVgYbl6DJ6hS00en7muo0VWH4T3XHs+KSTJ\non0YvBosRExR6l9sMJz0jp4=\n-----END PRIVATE KEY-----\n",
    //   "client_email": "wowbot@wowbot-1532979039674.iam.gserviceaccount.com",
    // }
    
    var private_value = process.env.sheetPrivateKey.replace(/\\n/g, '\n');    
    var creds = {
      "private_key": private_value,
      "client_email": process.env.sheetClientEmail,
    }
    console.log(creds.private_key.length)

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

