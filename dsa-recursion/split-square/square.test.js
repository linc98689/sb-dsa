const {dump, validate, simplify, add} = require("./square");

describe("dump", function(){
   
    it("should print  1 line", ()=>{
        const logSpy = jest.spyOn(global.console, "log");

        dump([1]);
        expect(logSpy).toHaveBeenCalled();
        expect(logSpy).toHaveBeenCalledTimes(1);
        expect(logSpy).toHaveBeenCalledWith(1);
        expect(logSpy.mock.calls).toContainEqual( [1]);

        logSpy.mockRestore();
    });

    it("should print 4 lines", ()=>{
        const logSpy = jest.spyOn(global.console, "log");

        dump([1,1,0,0]);
        expect(logSpy).toHaveBeenCalled();
        expect(logSpy).toHaveBeenCalledTimes(4);
        expect(logSpy.mock.calls).toContainEqual( [1]);

        logSpy.mockRestore();
    });

    it("should print 10 lines", ()=>{
        const logSpy = jest.spyOn(global.console, "log");

        dump([[1,0,0,1],0, [1, 1, 0,0], 1]);
        expect(logSpy).toHaveBeenCalled();
        expect(logSpy).toHaveBeenCalledTimes(10);
    
        logSpy.mockRestore();
    });

    it("should print 10 lines", ()=>{
        const logSpy = jest.spyOn(global.console, "log");

        dump([[1,0,0, [1, 1, 0, 0]], 0, 1, 1]);
        expect(logSpy).toHaveBeenCalled();
        expect(logSpy).toHaveBeenCalledTimes(10);
    
        logSpy.mockRestore();
    });
});

describe("validate", ()=>{
    it("should be valid", ()=>{
        expect(validate(1)).toBe(true);
        expect(validate(0)).toBe(true);
        expect(validate([1,0, 1, 0])).toBe(true);
        expect(validate([1, 0, [1, 0, 1, [0, 1, 0, 1]], 1])).toBe(true);

    });

    it("should NOT be valid", ()=>{
        expect(validate()).toBe(false);
        expect(validate(4)).toBe(false);
        expect(validate([1,0, 1 ])).toBe(false);
        expect(validate([1, 0, [1, 0, 1, [0, 1, 0, 1]]])).toBe(false);
        expect(validate([1,0, 4, 0])).toBe(false);
        expect(validate([1, 0, [1, 0, 1, [0, 1, 4, 1]], 1])).toBe(false);
        expect(validate([1, 0, [1, [0, 0, 0, 0, 1], 1, [1, 1, 1, 1]], 1])).toBe(false); 
        expect(validate([1, [1, 0, 1, [0, [0, 0, 0], 1, 1]], [1, 0, 1, 0], 1])).toBe(false);
    });
});

describe("simplify", ()=>{
    it("can be simplified to a simple square", ()=>{
        expect(simplify(0)).toBe(0);
        expect(simplify([1,1,1,1])).toBe(1);
        expect(simplify([0,0,0,0])).toBe(0);
    });

    it("can not be simplified", ()=>{
        expect(simplify([1,0,1,0]).toString()).toBe([1,0,1,0].toString
            ());
        expect(simplify([0,0,1,0]).toString()).toBe([0,0,1,0].toString());
    });

    it("can be simplified even nested", ()=>{
        expect(simplify([1, 0, 1, [1,1,1,1]]).toString()).toBe([1,0, 1,1].toString());
        expect(Number(simplify([1,1,1,[1,1,1,1]]).toString())).toBe(1);
        expect(Number(simplify([[1,1,1,1],[1,1,1,1],1,1]))).toBe(1);
        expect(simplify([1,0,[1,[0,0,0,0],1,[1,1,1,1]], 1]).toString()).toBe([1,0, [1,0,1,1], 1].toString());
    });
});

describe("add", ()=>{
    it("adds two simple squares", ()=>{
        expect(add(0,0)).toBe(0);
        expect(add( 1, 0 ) ).toBe(1);
        expect(add(1, 1)).toBe(1);
    });

    it("should add split square and simple square", ()=>{
        let s1 = 0;
        let s2 = 1;
        let s3 =  [1, 0, 1, 0];
        expect(add(s1, s3).toString()).toBe(s3.toString());
        expect(add(s2, s3).toString()).toBe([1,1,1,1].toString());
    });

    it("should add split squares", ()=>{
        let s1 = [0, [1, 1, 1, [0, 0, 0, 0]], [0, 0, 0, 0], 1]
        let s2 = [1, [1, 0, 1, [0, 0, 1, 1]], [1, 0, 1, 0], 1]
        expect(add(s1, s2).toString()).toBe([1, [1, 1, 1,[0,0, 1,1],[1,0,1,0]],1].toString());
        
    });

    it("should add nested split squares", ()=>{
        let s1 = [0, [1, 1, 1, 0           ], [0, 0, 0, 0], 1];
        let s2 = [1, [1, 0, 1, [0, 0, 1, 1]], [1, 0, 1, 0], 1];
        expect(add(s1, s2).toString()).toBe([1, [1, 1, 1, [0, 0, 1, 1]], [1, 0, 1, 0], 1].toString());

        s1 = [0, [1, 1, 1, 1                      ], [0, 0, 0, 0], 1];
        s2 = [1, [1, 0, 1, [0, [0, 0, 0, 0], 1, 1]], [1, 0, 1, 0], 1];
        expect(add(s1, s2).toString()).toBe([1, [1, 1, 1, [1, [1, 1, 1, 1], 1, 1]], [1, 0, 1, 0], 1].toString());
    });
}); 