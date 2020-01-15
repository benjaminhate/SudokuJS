const inputs = document.getElementsByTagName("input");
const colNb = 9;
let row;
let col;

/*
 * Alter a given cell (row, column) with one of the following states :
 * 'default' :   Default style
 * 'generated' : Indicate that the cell has been set by the program. The player
 *               is not able to modify its value.
 * 'error' :     Indicate that the cell is invalid according to the game rules.
 * @param row    Row index (0-9)
 * @param col    Column index (0-9)
 * @param state  Style to apply to the stated cell
 * @return state or -1 if an error occured
 */
function SetCellState(row, col, state) {

    if (   0 < row && row <= colNb
        && 0 < col && col <= colNb) {

        let cellNb = rowColToIndex(row, col, colNb);

        /* Reset cell */
        inputs[cellNb].className = '';
        inputs[cellNb].parentNode.className = '';

        /* Set to [not] editable.
         * Set DEFAULT_STATE to 'default' to switch the default mode
         * to generated */
        const DEFAULT_STATE = 'generated';
        inputs[cellNb].readOnly = state == DEFAULT_STATE;

        if (state == 'default') {
            inputs[cellNb].className = 'input';
        } else {

            /* <input> style */
            inputs[cellNb].className = 'input ' + state;

            if (state == 'error') {
                /* parentNode refers to the <td>. Necessary in order to get the
                 * background color right */
                inputs[cellNb].parentNode.className = 'bg-' + state;
            }
        }

    } else {
        console.log('Invalid cell coordinates');
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
    value = value == undefined ? "" : value;
    console.log(row + "," + col + "," + value);

    if (   0 < row && row <= colNb
        && 0 < col && col <= colNb) {

        let cellNb = rowColToIndex(row, col, colNb);

        inputs[cellNb].value = value;
        
    } else {
        console.log('Invalid cell coordinates or invalid value');
        return -1;
    }

    return value;
}

/* Display in the console the row and col of the clicked cell */
let clickedElement;
window.onclick = e => {
    clickedElement = e.target;
    if (clickedElement.tagName == 'INPUT') {
        for (var i = 0; i < inputs.length; i++) {
            if (clickedElement === inputs[i]) {
                [row, col] = indexToRowCol(i, colNb);
                console.log(row, col);
            }
        }
    }
}

function DrawSudoku(){
    for(let i = 0; i < 81; i++){
        let [row, col] = indexToRowCol(i);
        SetCellValue(row, col, sudokuGrid[i]);
    }
}