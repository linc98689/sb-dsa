/** Boggle word check.

Given a 5x5 boggle board, see if you can find a given word in it.

In Boggle, you can start with any letter, then move in any NEWS direction.
You can continue to change directions, but you cannot use the exact same
tile twice.

So, for example::

    N C A N E
    O U I O P
    Z Q Z O N
    F A D P L
    E D E A Z

In this grid, you could find `NOON* (start at the `N` in the top
row, head south, and turn east in the third row). You cannot find
the word `CANON` --- while you can find `CANO` by starting at the
top-left `C`, you can 't re-use the exact same `N` tile on the
front row, and there's no other `N` you can reach.

*/

function makeBoard(boardString) {
  /** Make a board from a string.

    For example::

        board = makeBoard(`N C A N E
                           O U I O P
                           Z Q Z O N
                           F A D P L
                           E D E A Z`);

        board.length   // 5
        board[0]       // ['N', 'C', 'A', 'N', 'E']
    */

  const letters = boardString.split(/\s+/);

  const board = [
    letters.slice(0, 5),
    letters.slice(5, 10),
    letters.slice(10, 15),
    letters.slice(15, 20),
    letters.slice(20, 25),
  ];

  return board;
}

function find(board, word) {
  /** Can word be found in board? 
   * Use loop instead of recursion
   * variables: 
   *    boardArr - 1d representation of board
   *    validPath - stack, value: (idx, pos)
   *    currPath - array of positions of characters already found in word;
   *               with the length of word, initial to -1 for all elements
   * 
   * functions: 
   *    findChar - return a stack of positions of a given character;
   *        this is used to place on board the first charactor in word
   *    findPosForNext - return a tack of positions to place next character,
   *        that is the immediate neibors of the charact placed last
   *    _boardToArr   - return array of all the characters in board
   *    _pos_1_to_2   - convert position from 1d to 2d
   *    _pos_2_to_1   - convert position from 2d to 1d
  */

  const _boardToArr = (bd) =>{
    const result = new Array(numRows * numCols);

    for(let i = 0; i < numRows; i++){
      for(let j = 0; j<numCols; j++){
        result[i*numCols + j] = bd[i][j];
      }
    }
    return result;
  }

  const _pos_1_to_2 = (p) =>{
    if(p === -1)
      return [-1, -1];
    else{
      let i = Math.floor(p/numCols);
      let j = p % numCols;
      return [i,j];
    }
  }

  const _pos_2_to_1 = (i, j) =>{
    return i*numCols + j;
  }
  
  const findChar = (char) => { // find positions of first character in word in boradArr
    const result = [];
    let idx = boardArr.indexOf(char);
    while(idx !== -1){
      result.push([0,idx]); // 0: index of the first character in word
      idx = boardArr.indexOf(char, idx+1);
    }
    return result; // 1d
  };

  const findPosForNext = (p) =>{
    const [i, j] = _pos_1_to_2(p);
    let result = [[i-1,j], [i+1, j], [i, j-1], [i, j+1]]; // adjacents of [i,j]
    // need to be on board
    result = result.filter(([m,n]) => m>=0 && m<numRows && n>=0 && n<numCols);
    result = result.map(([i,j])=>_pos_2_to_1(i,j) );
    // should not be used
    const occupied = new Set(currPath);
    return result.filter(p => !occupied.has(p));
  }

  const search = (paths) =>{
    if(paths.length === 0)
      return false;
    let [idx, p] = paths.pop();
    currPath[idx] = p;
    if(idx === word.length-1)
      return true;
    let positions = findPosForNext(p);
    if (positions.length === 0){
      currPath[idx] = -1;
      return search([...paths]); // recursive
    }
    positions = positions.filter(p=> boardArr[p] === word.charAt(idx+1));
    if(positions.length === 0)
    {
      currPath[idx] = -1;
      return search([...paths]);
    }

    paths.push(...positions.map(p=> [idx+1, p]));
     return search([...paths]);
  };

  const numRows = board.length;
  const numCols = board[0].length;
  const boardArr = _boardToArr(board);
   
  const currPath = [];
  for(let i = 0; i<word.length; i++)
    currPath.push(-1);

  const validPath = findChar(word.charAt(0));

  // searching
  console.log("board: ", board);
  console.log("word: ", word);
  let isFound = search([...validPath]);
  console.log(currPath.map(e=>_pos_1_to_2(e)));
  return isFound;
}

// EXAMPLE TEST

// For example::

// const board1 = makeBoard(`N C A N E
//                          O U I O P
//                          Z Q Z O N
//                          F A D P L
//                          E D E A Z`);

// console.log("isFound: ", find(board1, "NOON"));

// console.log("isFound: ", find(board1, "CANON"));


// console.log("isFound: ", find(board1, "QUINE"));


// console.log("isFound: ", find(board1, "FADED"));

// console.log("isFound: ", find(board1, "NOPE"));

// `NOON` should be found (0, 3) -> (1, 3) -> (2, 3) -> (2, 4)::

// console.log(find(board, "NOON"), true);

// `NOPE` should be found (0, 3) -> (1, 3) -> (1, 4) -> (0, 4)::

// console.log(find(board, "NOPE"), true);

// `CANON` can't be found (`CANO` starts at (0, 1) but can't find
// the last `N` and can't re-use the N)::

// console.log(find(board, "CANON"), false);

// You cannot travel diagonally in one move, which would be required
// to find `QUINE`::

// console.log(find(board, "QUINE"), false);

// We can recover if we start going down a false path (start 3, 0)::

// console.log(find(board, "FADED"), true);

// An extra tricky case --- it needs to find the `N` toward the top right,
// and then go down, left, up, up, right to find all four `O`s and the `S`::

// const board2 = makeBoard(`E D O S Z
//                           N S O N R
//                           O U O O P
//                           Z Q Z O R
//                           F A D P L`);

// console.log("isFound: ", find(board2, "NOOOOS"));

module.exports = {makeBoard, find};
