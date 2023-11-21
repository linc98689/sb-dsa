/*
pivot accepts an array, starting index, and ending index
You can assume the pivot is always the first element
*/

function pivot(arr){
    let cpArr = [...arr];
    let len = cpArr.length;
    if(len === 0)
        return -1;

    if(arr.every(e => e === arr[0]))
        return 0;

    let pvt = cpArr[0];
    let arr1 = [...cpArr.filter(e => e < pvt)];
    let arr2 = [...cpArr.filter(e => e > pvt)];
    let arr3 = [...cpArr.filter(e => e === pvt)];
    arr.splice(0, len,...arr1, ...arr3, ...arr2);
    return arr1.length;
}

/*
quickSort accepts an array, left index, and right index
*/

function quickSort(arr) { //recursive
    let len = arr.length;
    if (len < 2) //base case
        return arr;

    let p = pivot(arr);
    let repeatP = arr.filter(e => e ===arr[p]).length;
    let arr1 = arr.slice(0, p);
    arr1 = quickSort(arr1);
    arr.splice(0, arr1.length, ...arr1);

    let arr2 = arr.slice(p+repeatP);
    arr2 = quickSort(arr2);
    arr.splice(p+repeatP, arr2.length, ...arr2);

    return arr;
}

module.exports = {pivot, quickSort};