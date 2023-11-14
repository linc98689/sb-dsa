const {swap} = require("./helpers");

function insertionSort(arr) {
    let len = arr.length;
    if (len < 2)
        return arr;

    for(let i = 1; i < len; i++){
        let curr = arr[i];
        for(let j = i-1; j >=0; j--){
            if(arr[j] <= curr)
                continue;
            else
                swap(arr, j+1, j);
        }
    }
    return arr;
}

module.exports = insertionSort;