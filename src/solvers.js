/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var board = new Board({n: n});
  var walk = function(boardState, numRooks, row) {
    if (numRooks === n) {
      return board.rows();
    }
    var currentRow = board.get(row);
    for (var col = 0; col < n; col++) {    
      if (!currentRow[col]) {
        board.togglePiece(row, col);
        if (board.hasAnyRooksConflicts()) {
          board.togglePiece(row, col);
        } else {
          return walk(boardState, numRooks + 1, row + 1);
        }
      }
    }
  };
  var solution = walk(board, 0, 0);

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var board = new Board({n: n});
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
  walk(board, 0, 0);
  if (n > 1 && n % 2 === 0) {
    solutionCount = solutionCount * 2;
  }

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var board = new Board({n: n});
  var done = false;
  var solution = board.rows();
  var walk = function(boardState, numQueens, row) {
    if (numQueens === n) {
      done = true;
      solution = board.rows();
      return undefined;
    }
    if (row >= n) {
      return;
    }
    var currentRow = board.get(row);
    for (var col = 0; col < n; col++) {    
      if (!currentRow[col]) {
        board.togglePiece(row, col);
        if (board.hasAnyQueensConflicts()) {
          board.togglePiece(row, col);
        } else {
          walk(boardState, numQueens + 1, row + 1);
          if (done) {
            return undefined;
          } else {
            board.togglePiece(row, col);
          }
        }
      }
    }
  };
  
  walk(board, 0, 0);

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var board = new Board({n: n});
  var solutionCount = 0;
  var walk = function(boardState, numQueens, row) {
    var totalCol = n;

    if (numQueens === n) {
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
        if (board.hasAnyQueensConflicts()) {
          board.togglePiece(row, col);
        } else {
          walk(boardState, numQueens + 1, row + 1);
          board.togglePiece(row, col);
        }
      }
    }
  };
  walk(board, 0, 0);
  if (n > 1 && n % 2 === 0) {
    solutionCount = solutionCount * 2;
  }


  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};








