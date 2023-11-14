function merge(arr1, arr2) {
    //setup
    let len1 = arr1.length;
    let len2 = arr2.length;
    let results = [];

    //special cases
    if(len1 === 0 && len2 === 0)    
        return [];
    if(len1 === 0)
        return [...arr2];
    if(len2 === 0)
        return [...arr1];

    //merge
    let pos1 = 0;
    let pos2 = 0;
    while(pos1 < len1 && pos2 < len2){
        if(arr1[pos1] <= arr2[pos2]){
            results.push(arr1[pos1]);
            pos1++
        }
        else{
            results.push(arr2[pos2]);
            pos2++
        }
    }

    // append the rest
    if(pos1===len1) // all content in arr1 have been added to results
        results = [...results, ...arr2.slice(pos2)];
    else
        results = [...results, ...arr1.slice(pos1)];

    return results;
}

function mergeSort(arr) {//recursive
    let len = arr.length;
    if(len < 2) //base
        return arr;

    let mid = Math.floor(len % 2);
    let arr1 = arr.slice(0, mid+1);
    let arr2 = arr.slice(mid+1);
    return merge(mergeSort(arr1), mergeSort(arr2));
}

module.exports = { merge, mergeSort};