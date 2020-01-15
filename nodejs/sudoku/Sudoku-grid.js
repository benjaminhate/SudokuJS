function rowIndexes(index){
	let [row, col] = indexToRowCol(index);
	return generateArray().map(i => rowColToIndex(row, i));
}

function rowContains(grid, index, value){
	let indexes = rowIndexes(index);
	return indexesContains(grid, indexes, value);
}

function colIndexes(index){
	let [row, col] = indexToRowCol(index);
	return generateArray().map(i => rowColToIndex(i, col));
}

function colContains(grid, index, value){
	let indexes = colIndexes(index);
	return indexesContains(grid, indexes, value);
}

function squareContains(grid, index, value){
	let indexes = squareIndexes(index);
	return indexesContains(grid, indexes, value);
}

function squareIndexes(index){
	let [row, col] = indexToRowCol(index);
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

function checkGrid(grid){
	return !grid.includes(undefined);
}