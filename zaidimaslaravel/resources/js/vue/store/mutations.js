let mutations = {
    CREATE_GAME(state, game) {
        state.games.unshift(game)
        console.debug('create_game')
    },
    FETCH_GAME(state, game) {
        return state.games = game
    },
    SEND_ACTION(state, game, action) {
        let index = state.games.findIndex(item => item.id === game.id)
        state.actions.unshift(index, action)
        console.debug('send_action')
    }

}
export default mutations
