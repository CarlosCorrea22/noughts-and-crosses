const $historyMoveList = document.querySelector('.history-card-list')

const game = {
    start: true,
    currentMove: 'X',
    bot: {
        active: false,
    },
    players: {
        score1: 0,
        score2: 0,
    }
}

function getField(fieldNumber) {
    const $field = document.querySelector('.scenario-field-' + fieldNumber) //.scenary-field-0
    return $field
}

function toggleCurrentMove() {
    if (game.currentMove === 'X') {
        game.currentMove = 'O'
    } else if (game.currentMove === 'O') {
        game.currentMove = 'X'
    }
}

function verifyFields(firstField, secondField, thirdField) {
    const $fieldList = document.querySelectorAll('.scenario-field-big')

    const hasWinner = $fieldList[firstField].textContent != ''
        && $fieldList[firstField].textContent === $fieldList[secondField].textContent
        && $fieldList[secondField].textContent === $fieldList[thirdField].textContent

    return hasWinner
}

function getWinner() {
    if (verifyFields(0, 1, 2)) {
        return game.currentMove
    } else if (verifyFields(3, 4, 5)) {
        return game.currentMove
    } else if (verifyFields(6, 7, 8)) {
        return game.currentMove
    } else if (verifyFields(0, 3, 6)) {
        return game.currentMove
    } else if (verifyFields(1, 4, 7)) {
        return game.currentMove
    } else if (verifyFields(2, 5, 8)) {
        return game.currentMove
    } else if (verifyFields(0, 4, 8)) {
        return game.currentMove
    } else if (verifyFields(2, 4, 6)) {
        return game.currentMove
    }

    return ''
}

function addPlayerScore(winner) {
    if (winner === 'X') {
        game.players.score1++
    } else if (winner === 'O') {
        game.players.score2++
    }
}

function printPlayerScore() {
    const [$score1, $score2] = document.querySelectorAll('.player-score')

    $score1.textContent = game.players.score1
    $score2.textContent = game.players.score2
}

function resetBoard() {
    const $fieldList = document.querySelectorAll('.scenario-field-big')

    for (const $field of $fieldList) {
        $field.textContent = ''
    }
}

function getPlayerName(move) {
    if (move === 'X') {
        const $inputPlayer1 = document.querySelector('.player1-box')

        return $inputPlayer1.value
    } else if (move === 'O') {
        const $inputPlayer2 = document.querySelector('.player2-box')

        return $inputPlayer2.value
    }
}

function printWinnerName(winnerName) {
    const $winnerField = document.querySelector('.winner-field')
    $winnerField.textContent = winnerName
}

function configSwitch(query, callback) {
    const $switch = document.querySelector(query)

    $switch.addEventListener('click', function () {
        $switch.classList.toggle('switch-active')
        callback()
    })
}

function botMove() {
    if (!game.bot.active) return; //verifica se o bot está ativado
    const move = randomNumber(9)

    const $field = getField(move)

    const canNotPlay = draw()

    if (canNotPlay) return

    if ($field.textContent !== '') {
        botMove()
    }

    play($field, move)
}

function draw() {
    const $fieldList = document.querySelectorAll('.scenario-field-big')
    let filledFields = 0

    for (const $field of $fieldList) {
        if ($field.textContent) filledFields++
    }

    const winner = getWinner()

    if (filledFields === 9 && !winner) {
        return true
    }

    return false
}

function randomNumber(max) {
    const number = Math.floor(Math.random() * max)
    return number
}

function play($field, position) {
    if ($field.textContent !== '' || game.start === false) return
    $field.textContent = game.currentMove

    const winner = getWinner()

    const currentPlayerName = getPlayerName(game.currentMove)

    createHistoryMoveCard(game.currentMove, currentPlayerName, position)
    if (winner !== '') {
        addPlayerScore(winner)
        printPlayerScore()
        setTimeout(resetBoard, 1000)
        game.start = false
        const winnerName = getPlayerName(winner)
        printWinnerName(winnerName)
        setTimeout(function () {
            game.start = true
        }, 1000)
        return
    }

    const hasDraw = draw()

    if (hasDraw) {
        setTimeout(resetBoard, 1000)
    }


    toggleCurrentMove()
}

function createHistoryMoveCard(move, player, position) {
    const positionLabels = [
        'Primeiro quadrado',
        'Segundo quadrado',
        'Terceiro quadrado',
        'Quarto quadrado',
        'Quinto quadrado',
        'Sexto quadrado',
        'Sétimo quadrado',
        'Oitavo quadrado',
        'Nono quadrado'
    ]

    $historyMoveList.innerHTML += `
    <li class="play-history-Wrapper">
    <div class="play-symbol play-symbol1">${move}</div>
    <div class="play-history-text-wrapper">
        <p class="play-history-text">${player}</p>
        <p class="player-move-location-text">${positionLabels[position]}</p>
    </div>
    </li>
    `
}

for (let i = 0; i < 9; i++) {
    const $field = getField(i)

    $field.addEventListener('click', function () {
        if ($field.textContent === '') { // Verifica se o campo está vazio antes de jogar
            play($field, i)
            botMove()
        }
    })
}

configSwitch('.switch-bot', function () {
    game.bot.active = !game.bot.active
})

configSwitch('.switch-white', function () {

})