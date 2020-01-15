const cells = document.getElementsByClassName('cell');
const states = ['input', 'generated', 'error'];
const DEFAULT_STATE = states[1];

let row;
let col;

/* Set the default state */
for (let i = 0; i < cells.length; i++) {
    cells[i].classList.add(DEFAULT_STATE);
}

/* ------------------- TEMP --------------------- */

/*
 * Fill the whole table (easier than doing it in raw html)
 */
const fillValues = [1, 1, 1, 1, 1, 1, 1, 1, 1,
                    2, 2, 2, 2, 2, 2, 2, 2, 2,
                    3, 3, 3, 3, 3, 3, 3, 3, 3,
                    4, 4, 4, 4, 4, 4, 4, 4, 4,
                    5, 5, 5, 5, 5, 5, 5, 5, 5,
                    6, 6, 6, 6, 6, 6, 6, 6, 6,
                    7, 7, 7, 7, 7, 7, 7, 7, 7,
                    8, 8, 8, 8, 8, 8, 8, 8, 8,
                    9, 9, 9, 9, 9, 9, 9, 9, 9];
// DrawSudoku(fillValues);

/*
 * Set random states from states[] for testing purposes
 */
function SetRandomStates() {
    let tmpRow;
    let tmpCol;
    let tmpState;
    for (let i = 0; i < 81 ; i++) {
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
 * @param row    Row index (1-9)
 * @param col    Column index (1-9)
 * @param state  Style to apply to the stated cell
 * @return state or -1 state is unknown
 */
function SetCellState(row, col, state) {

    if (states.includes(state)) {

        let cellNb = rowColToIndex(row, col);

        /* Reset stated cell */
        cells[cellNb].className = DEFAULT_STATE;
        cells[cellNb].classList.add(state);

    } else {

        console.log("Unknown state : " + state + ".");
        return -1;

    }

    return state;
}

/*
 * Set the value of a given cell (row, column) with the passed value
 * @param row    Row index (1-9)
 * @param col    Column index (1-9)
 * @param value  The value to set into the cell (1 <= value <= 9)
 * @return value or -1 if an error occured
 */
function SetCellValue(row, col, value) {
    let index = rowColToIndex(row, col);
    return SetCellValue(index, value)
}
/*
 * Set the value of a given cell (row, column) with the passed value
 * @param index    Raw index (0-80)
 * @param value  The value to set into the cell (1 <= value <= 9)
 * @return value or -1 if an error occured
 */
function SetCellValue(index, value) {

    if ((1 <= value && value <= 9) || value == undefined) {

        cells[index].innerHTML = value;

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
$('.cell').click(function(e){
    let clickedElementIndex;

    /* Find the index of the clicked element */
    for (let i in cells) {
        if(this == cells[i]) {
            clickedElementIndex = i;
        }
    }

    /* TODO check if editable (use a boolean) */

    /* Set to focus state */
    UnfocusAllCells();
    cells[clickedElementIndex].classList.add('focus');

    /* select row */
    let rowIndex = rowIndexes(clickedElementIndex);
    for (let i in rowIndex){
        cells[rowIndex[i]].classList.add('focus');
    }

    /* select column */
    let colIndex = colIndexes(clickedElementIndex);
    for (let i in colIndex){
        cells[colIndex[i]].classList.add('focus');
    }

})

/*
 * Remove the focus state to all cells
 */
function UnfocusAllCells() {
    for (let i = 0; i < cells.length; i++) {
        if (cells[i].classList.contains('focus')) {

            cells[i].classList.remove('focus');

        }
    }
}

/*
 * Set the default state (const DEFAULT_STATE) to all the cells
 */
function ResetAllCells() {
    for (let i = 0; i < cells.length; i++) {
        cells[i].className = DEFAULT_STATE;
    }
}

function DrawSudoku(grid){
    for (let i = 0; i < cells.length; i++) {
        SetCellValue(i, grid[i]);
    }
}