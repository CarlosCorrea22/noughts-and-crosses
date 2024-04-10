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
        game.currentMove= 'X'
    }
}

for (let i = 0; i < 9; i++) {
    const $field = getField(i)

    $field.addEventListener('click', function(){
        $field.textContent = game.currentMove
        toggleCurrentMove()
    })
}