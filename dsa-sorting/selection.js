const {swap} = require("./helpers");

function selectionSort(arr) {
    let len = arr.length;
    if(len < 2)
        return arr;
    for(let i = 0; i < len-1; i++){
        let min = arr[i];
        let minIdx = i;
        for(let j = i+1 ; j <len; j++){
            if(arr[j] < min){
                min = arr[j];
                minIdx = j;
            }
        }
        swap(arr, i, minIdx);
    }

    return arr;
}

module.exports = selectionSort;