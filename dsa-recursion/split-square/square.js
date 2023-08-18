function dump(square){
    if(!Array.isArray(square)){ // simple squre
        console.log(square);
        // return ;
    } else{ // split square

        let sqs = square.reverse();
        while(sqs.length > 0){
            // console.log("sqs: ", sqs);
            let s = sqs.pop();
            if(!Array.isArray(s))
                console.log(s);
            else
                dump(s);
        }
    }
}

function validate(square){
    const validSet = new Set([0, 1]);
    if(!Array.isArray(square)) //base case
        return validSet.has(square);
    else{
        if(square.length !== 4) //base case
            return false;
        else{
            while(square.length > 0){
                let s = square.pop();
                if(!Array.isArray(s)){
                    if(!validSet.has(s))
                        return false;
                    continue;
                }   
                let medium = validate(s);  
                if(!medium)
                    return false;
                continue;   
            }
            return true; 
        }
    }
}

function simplify(square){
    //simple square
    if(!Array.isArray(square))
        return square;
    // split square with all quarters filled
    if(square.toString() === "1,1,1,1")
        return 1;
    // spkit square with all quarters empty
    if(square.toString() === "0,0,0,0")
        return 0;
    let newSquare = square.map(s => simplify(s));
    if(newSquare.toString() === square.toString())
        return square;
    square = newSquare;
    return simplify(square);
}

function add(sq1, sq2){
    // add two simple squares
    if(!Array.isArray(sq1) && !Array.isArray(sq2))
        return Math.min(1, sq1 + sq2);

    // add simple square and split square
    if(!Array.isArray(sq1)){
        return sq2.map(s=> add(sq1, s));
    } else if(!Array.isArray(sq2)){
        return sq1.map(s=> add(s, sq2));
    }else{
        return sq1.map((s,i) => add(s, sq2[i]));
    }
}


module.exports = {dump, validate, simplify, add};