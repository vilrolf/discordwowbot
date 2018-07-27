const axios = require('axios')

const wowKey = process.env.wowToken

exports.getAvgItemLvl = async(realm, charName ) => {
    console.log('https://eu.api.battle.net/wow/character/' + realm + '/' + charName + '/' + wowKey)
    const result =  await axios.get('https://eu.api.battle.net/wow/character/' + realm + '/' + charName + '?fields=items&locale=en_GB&apikey=' + wowKey)
    console.log('result', result.data)
    return result.data.items.averageItemLevel
}

exports.getInfo = async(realm, charName ) => {
    // console.log('https://eu.api.battle.net/wow/character/' + realm + '/' + charName + '/' + wowKey)
    const result =  await axios.get('https://eu.api.battle.net/wow/character/' + realm + '/' + charName + '?fields=items+pvp&locale=en_GB&apikey=' + wowKey)
    // console.log('result', result.data)
    return result.data
}
// getAvgItemLvl('turalyon', 'snitrus')