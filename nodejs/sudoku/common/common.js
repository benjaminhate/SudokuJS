function indexToRowCol(index, colNb = 9){
	let row = Math.floor(index / colNb) + 1;
    let col = index % colNb + 1;
	return [row, col];
}

function rowColToIndex(row, col, colNb = 9){
	return (row - 1) * colNb + col - 1;
}

function shuffle(array) {
    return array.sort(() => 0.5 - Math.random());
}

function generateWithoutValue(value){
	return generateArray().filter(e => e != value);
}

function generateArray(){
	return Array.from(Array(9)).map((_,i)=>i+1);
}