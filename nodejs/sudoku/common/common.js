function indexToRowCol(index, colNb = 9){
	let row = Math.floor(index / colNb) + 1;
    let col = index % colNb + 1;
	return [row, col];
}

function rowColToIndex(row, col, colNb = 9){
	return (row - 1) * colNb + col - 1;
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}