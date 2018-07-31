exports.getBestPvpRating = (char) => {
    const pvpRating = [char.pvp.brackets.ARENA_BRACKET_2v2.rating, char.pvp.brackets.ARENA_BRACKET_3v3.rating, char.pvp.brackets.ARENA_BRACKET_RBG.rating ]
    return  pvpRating.sort()[pvpRating.length - 1]
}