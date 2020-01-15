const express = require('express');
const app = express();

app.use(express.static('sudoku'));

app.get('/', function(req, res){
	res.redirect('sudoku.html');
})

app.listen(3000, function() {
	console.log('server launched');
})