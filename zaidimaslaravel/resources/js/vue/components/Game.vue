<template>
    <div class="game">
        <div class="game-area">
            <div class="game-title">
                <h1>Tic Tac Toe</h1>
            </div>

            <board :squares="squares" :winner="winner" @click="click"/>

            <div class="game-info">
                <p v-if="stepNumber === 0">
                    Game started! Player with:&nbsp;<b :class="currentPlayer">{{ currentPlayer }}</b>! move.
                </p>
                <p v-else-if="!!winner">
                    The winner is:&nbsp;<b :class="currentPlayer">{{ currentPlayer }}</b>!&nbsp;
                    <button @click="restart">Restart game</button>
                </p>
                <p v-else-if="stepNumber > 8">
                    Its a tie!&nbsp;
                    <button @click="restart">Restart game</button>
                </p>
                <p v-else>
                    Game: <b> {{ dblog['game'] }} </b> Slot: <b> {{ dblog['slot'] }} </b> Action: <b> {{
                        dblog['action']
                    }}</b><br>
                    &nbsp;Player with
                    <b :class="currentPlayer">{{ currentPlayer }} </b>!&nbsp;move.

                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Game',
    components: {
        Board: () => import('./Board')
    },
    data() {
        return {
            squares: Array(9).fill(null),
            stepNumber: 0,
            currentPlayer: 'X',
            winner: null,
            lastgame: '',
            winnerint: 0,
            dblog: '',
        }
    },
    mounted() {
        this.$store.dispatch('fetchGame')
    },
    methods: {
        hasWinner() {
            if (this.winner) return true

            const squares = this.squares
            const matches = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7],
                [2, 5, 8], [0, 4, 8], [2, 4, 6]
            ]

            for (let i = 0; i < matches.length; i++) {
                const [a, b, c] = matches[i]
                if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                    this.winner = [a, b, c]
                    if (this.currentPlayer === 'X') {
                        this.winnerint = 1;
                    } else {
                        this.winnerint = 0;
                    }
                    this.$store.dispatch('finishGame', {game: window.lastgame, winner: this.winnerint})
                    this.$store.dispatch('getLastEntry')
                    this.dblog = window.lastentry
                    return true
                }
            }

            return false
        },

        restart() {
            this.squares = Array(9).fill(null)
            this.stepNumber = 0
            // this.currentPlayer = this.currentPlayer
            this.winner = null
            this.lastgame = window.lastgame++
            this.$store.dispatch('createGame')
        },

        click(i) {
            if (this.squares[i] || this.winner) return
            this.$set(this.squares, i, this.currentPlayer);
            this.$store.dispatch('sendAction', {game: window.lastgame, slot: i, action: this.squares[i]})
            this.$store.dispatch('getLastEntry')
            this.dblog = window.lastentry
            if (!this.hasWinner()) {
                this.stepNumber++
                this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X'
            }
        },
    }
}
</script>

<style scoped>
.game {
    background-color: green;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.game-title {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 0 3vmin;
}

.game-title h1 {
    margin: 0;
    font-size: 2.25em;
}

.game-info {
    margin: 3vmin 0 0;
    padding: 1rem .5rem;
    font-size: 1.25em;
    text-align: center;
    border-radius: .5rem;
    background: #fff6;
    color: #111;
    overflow-y: scroll;
}

.game-info p {
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}

.game-info .X {
    color: #c14016;
}

.game-info .O {
    color: #847904;
}

.game-info button {
    text-transform: uppercase;
    font-weight: 600;
    font-size: .75em;
    padding: .5rem 1rem;
    margin: -.5rem 0 -.5rem 1rem;
    border: 2px solid #fff;
    background: #fff5;
    color: #111;
    cursor: pointer;
    transition: all .25s ease;
}

.game-info button:hover {
    background: #1115;
}

.game-info button:active {
    background: #1119;
}

</style>
