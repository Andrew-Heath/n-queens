
var solutionCount = 0;
var walk = function(boardState, numRooks, row) {
  var totalCol = n;
  if (numRooks === n) {
    solutionCount++;
    return undefined;
  }
  var currentRow = board.get(row);
  if (row === 0 && n % 2 === 0) {
    totalCol = Math.ceil(totalCol / 2);
  }
  for (var col = 0; col < totalCol; col++) {    
    if (!currentRow[col]) {
      board.togglePiece(row, col);
      if (board.hasAnyRooksConflicts()) {
        board.togglePiece(row, col);
      } else {
        walk(boardState, numRooks + 1, row + 1);
        board.togglePiece(row, col);
      }
    }
  }
};

onmessage = function(e) {
  walk(e.data[0], e.data[1], e.data[2]);
  postMessage(solutionCount);
};