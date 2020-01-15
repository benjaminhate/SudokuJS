function solveGrid(grid){
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

function fillGrid(grid){
	let row, col;
	for (let i = 0; i < 81; i++) {
		[row, col] = indexToRowCol(i);
		if(grid[i] !== undefined)
			continue;

		let values = shuffle(generateArray());
		for (let k = 0; k < 9; k++) {
			let value = values[k];
			if(rowContains(grid, i, value) || colContains(grid, i, value) || squareContains(grid, i, value))
				continue;

			grid[i] = value;

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