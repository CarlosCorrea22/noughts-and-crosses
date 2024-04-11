const game = {
    currentMove: 'X'
}

function getField(fieldNumber) {
    const $field = document.querySelector('.scenario-field-' + fieldNumber) //.scenary-field-0
    return $field
}

function toggleCurrentMove() {
    if (game.currentMove == 'X') {
        game.currentMove = 'O'
    } else if (game.currentMove == 'O') {
        game.currentMove = 'X'
    }
}

function verifyFields(firstField, secondField, thirdField) {
    const $fieldList = document.querySelectorAll('.scenario-field-big')

    const hasWinner = $fieldList[firstField].textContent != ''
        && $fieldList[firstField].textContent == $fieldList[secondField].textContent
        && $fieldList[secondField].textContent == $fieldList[thirdField].textContent

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

for (let i = 0; i < 9; i++) {
    const $field = getField(i)

    $field.addEventListener('click', function () {
        $field.textContent = game.currentMove
        console.log(getWinner())
        toggleCurrentMove()
    })
}