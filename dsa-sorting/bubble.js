const { swap } = require("./helpers");

function bubbleSort(arr) {
    let len = arr.length;
    if (len === 0)
        return arr;

    for(let i=0; i<len-1; i++){
        for(let j=0; j<len-1-i; j++){
            if(arr[j] > arr[j+1])
                swap(arr, j, j+1);
        }
    }
    return arr;
}

module.exports =  bubbleSort;