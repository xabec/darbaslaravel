let mutations = {
    CREATE_GAME(state, game) {
        state.games.unshift(game)
    },
    FETCH_GAME(state, game) {
        return state.games[1] = game
    },
    SEND_ACTION(state, game, action) {
        let index = state.games.findIndex(item => item.id === game.id)
        state.actions.unshift(index, action)
    }
}
export default mutations
