exports.getThumbnail = (thumbnail) =>{
    return 'http://render-eu.worldofwarcraft.com/character/' + thumbnail
}
exports.getArmoryUrl = (char) => {
  return  'https://worldofwarcraft.com/en-gb/character/'+ char.realm + '/' + char.name
}