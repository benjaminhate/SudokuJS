let sudokuGrid = [
	,,,,,,,,,
	,,,,,,,,,
	,,,,,,,,,
	,,,,,,,,,
	,,,,,,,,,
	,,,,,,,,,
	,,,,,,,,,
	,,,,,,,,,
	,,,,,,,,,
]

function checkGrid(grid){
	return !grid.includes(undefined);
}

function rowContains(grid, index, value){
	let [row, col] = indexToRowCol(index);
	let indexes = generateArray().map(i => rowColToIndex(row, i));
	return indexesContains(grid, indexes, value);
}

function colContains(grid, index, value){
	let [row, col] = indexToRowCol(index);
	let indexes = generateArray().map(i => rowColToIndex(i, col));
	return indexesContains(grid, indexes, value);
}

function squareContains(grid, index, value){
	let [row, col] = indexToRowCol(index);
	let indexes = squareIndexes(row, col);
	return indexesContains(grid, indexes, value);
}

function squareIndexes(row, col){
	let indexes = [];
	let [sRow, sCol] = squareStartIndex(row, col);
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			indexes.push(rowColToIndex(sRow + i, sCol + j));
		}
	}
	return indexes;
}

function squareStartIndex(row, col){
	let sRow = Math.ceil(row / 3);
	let sCol = Math.ceil(col / 3);
	return [3 * sRow - 2, 3 * sCol - 2]
}

function indexesContains(grid, indexes, value){
	let values = indexes.map(i => grid[i]);
	return values.includes(value);
}

function generateWithoutValue(value){
	return generateArray().filter(e => e != value);
}

function generateArray(){
	return Array.from(Array(9)).map((_,i)=>i+1);
}

function solveGrid(grid, callback = null){
	let row, col;
	for (let i = 0; i < 81; i++) {
		[row, col] = indexToRowCol(i);
		if(grid[i] !== undefined)
			continue;

		let values = generateArray();
		for (let k = 0; k < 9; k++) {
			let value = values[k];
			if(rowContains(grid, i, value) || colContains(grid, i, value) || squareContains(grid, i, value))
				continue;

			grid[i] = value;
			if(callback !== null) callback();

			if(checkGrid(grid)){
				return true;
			}else{
				if(solveGrid(grid))
					return true;
			}
		}
		break;
	}
	console.log('BackTracking')
	grid[rowColToIndex(row, col)] = undefined;
}

var counter = 0;