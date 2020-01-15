const cells = document.getElementsByTagName('td');
const states = ['input', 'generated', 'error'];
const DEFAULT_STATE = states[0];

let row;
let col;

/* Set the default state */
for (var i = 0; i < cells.length; i++) {
    cells[i].className = DEFAULT_STATE;
}

/* ------------------- TEMP --------------------- */

/*
 * Fill the whole table (easier than doing it in raw html)
 */
const fillValues = [1, 2, 3, 1, 2, 3, 1, 2, 3, 4, 5, 6, 4, 5, 6, 4, 5, 6,
                    7, 8, 9, 7, 8, 9, 7, 8, 9, 1, 2, 3, 1, 2, 3, 1, 2, 3,
                    4, 5, 6, 4, 5, 6, 4, 5, 6, 7, 8, 9, 7, 8, 9, 7, 8, 9,
                    1, 2, 3, 1, 2, 3, 1, 2, 3, 4, 5, 6, 4, 5, 6, 4, 5, 6,
                    7, 8, 9, 7, 8, 9, 7, 8, 9, 1, 2, 3, 1, 2, 3, 1, 2, 3,
                    4, 5, 6, 4, 5, 6, 4, 5, 6, 7, 8, 9, 7, 8, 9, 7, 8, 9];
for (var i = 0; i < cells.length; i++) {
    cells[i].innerHTML = fillValues[i];
}

/*
 * Set random states from states[] for testing purposes
 */
function SetRandomStates() {
    let tmpRow;
    let tmpCol;
    let tmpState;
    for (var i = 0; i < 81 ; i++) {
        [tmpRow, tmpCol] = indexToRowCol(i);
        tmpState = states[Math.floor(Math.random() *3)];
        SetCellState(tmpRow, tmpCol, tmpState);
    }
}
/* ------------------- TEMP --------------------- */

/*
 * Alter a given cell (row, column) with one of the following states :
 * 'input' :     Indicate that the cell is editable by the player.
 * 'generated' : Indicate that the cell has been set by the program. The player
 *               is not able to modify its value.
 * 'error' :     Indicate that the cell is invalid according to the game rules.
 * @param row    Row index (0-9)
 * @param col    Column index (0-9)
 * @param state  Style to apply to the stated cell
 * @return state or -1 state is unknown
 */
function SetCellState(row, col, state) {

    if (states.includes(state)) {

        let cellNb = rowColToIndex(row, col);

        /* Reset stated cell */
        cells[cellNb].className = DEFAULT_STATE;
        cells[cellNb].className += ' ' + state;

    } else {

        console.log('Unknown state.');
        return -1;

    }

    return state;
}

/*
 * Set the value of a given cell (row, column) with the passed value
 * @param row    Row index (0-9)
 * @param col    Column index (0-9)
 * @param value  The value to set into the cell (1 <= value <= 9)
 * @return value or -1 if an error occured
 */
function SetCellValue(row, col, value) {

    if (1 <= value && value <= 9) {

        let cellNb = rowColToIndex(row, col);
        cells[cellNb].innerHTML = value;

    } else {

        console.log('Invalid value.');
        return -1;

    }

    return value;
}


/*
 * Get the cliked element to apply the focus state to the cell,
 * and it's row and column aswell
 */
$('.input').click(function(e){
    let clickedElementIndex;

    /* Find the index of the clicked element */
    for (var i = 0; i < cells.length; i++) {
        if(this == cells[i]) {
            clickedElementIndex = i;
        }
    }

    /* TODO check if editable (use a boolean) */

    /* Set to focus state */
    UnfocusAllCells();
    cells[clickedElementIndex].className += ' focus';

    /* TODO select row */

    /* TODO select column */


})

/*
 * Remove the focus state to all cells
 */
function UnfocusAllCells() {
    let tempClassName;
    for (var i = 0; i < cells.length; i++) {
        if (cells[i].className.includes('focus')) {

            tempClassName = cells[i].className.substring(0, cells[i].className.length -6);
            cells[i].className = tempClassName;

        }
    }
}

/*
 * Set the default state (const DEFAULT_STATE) to all the cells
 */
function ResetAllCells() {
    for (var i = 0; i < cells.length; i++) {
        cells[i].className = DEFAULT_STATE;
    }
}