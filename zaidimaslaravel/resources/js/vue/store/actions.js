import axios from "axios";

let actions = {
    createGame({commit}) {
        axios.get('/api/games/restart')
            .then(res => {
                window.lastgame = (res.data.id)
                commit('CREATE_GAME', res.data)
            }).catch(err => {
            console.log(err)
        })

    },
    fetchGame({commit}) {
        axios.get('/api/games')
            .then(res => {
                window.lastgame = (res.data.id)
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
    },
    finishGame({commit}, game){
        axios.post('/api/games/finish', game)
            .then(res => {
                if (res.data === 'ok')
                    console.log('finished')
            }).catch(err => {
                console.log(err)
        })
    },
    getLastEntry(){
        axios.get('api/games/read')
            .then(res => {
                window.lastentry = res.data
            }).catch(err => {
                console.log(err)
        })
    }
}

export default actions
