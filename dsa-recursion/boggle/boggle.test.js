const {makeBoard, find} = require("./boggle");
describe("board-1", ()=>{
    const board = makeBoard(`N C A N E
    O U I O P
    Z Q Z O N
    F A D P L
    E D E A Z
    `);

    it("should be found", ()=>{
        expect(find(board, "NOON")).toBe(true);
        expect(find(board,"NOPE")).toBe(true);
        expect(find(board, "FADED")).toBe(true);
    });

    it("should not be found", ()=>{
        expect(find(board, "CANON")).toBe(false);
        expect(find(board, "QUINE")).toBe(false);
    });
});

describe("board-2", ()=>{
    const board = makeBoard(`E D O S Z
    N S O N R
    O U O O P
    Z Q Z O R
    F A D P L
    `);

    it("should be found", ()=>{
        expect(find(board, "NOOOOS")).toBe(true);
    });
});