import axios from "axios";

let actions = {
    createGame({commit}, game) {
        axios.post('/api/games', game)
            .then(res => {
                commit('CREATE_GAME', res.data)
            }).catch(err => {
            console.log(err)
        })

    },
    fetchGame({commit}) {
        axios.get('/api/games')
            .then(res => {
                this.lastgame(res.data);
                commit('FETCH_GAME', res.data)
            }).catch(err => {
            console.log(err)
        })
    },
    sendAction({commit}, game) {
        axios.post(`/api/games`, game)
            .then(res => {
                if (res.data === 'ok')
                    commit('SEND_ACTION', game)
            }).catch(err => {
            console.log(err)
        })
    }
}

export default actions
