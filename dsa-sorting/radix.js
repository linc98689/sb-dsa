function radixSort(arr) { 
    let mostD= mostDigits(arr);
    if(mostD === 0) // base case I
        return [];

    let result = [];
    if(mostD === 1){ // base case II
        for(let i=0; i<10; i++){
            let nums = arr.filter(e=>e===i);
            result = [...result, ...nums];
        }
        return result;
    }

    for(let i = 0; i<10; i++){
        let nums  = arr.filter(e => getDigit(e, mostD-1) === i). map(e => e - i*10**(mostD-1));
        nums = radixSort(nums);
        nums = nums.map(e => e + i * 10**(mostD-1))
        result = [...result, ...nums];
    }

    return result;
}

function getDigit(num, pos){
    return Math.floor(num / 10 ** pos) % 10;
}

function digitCount(num){
    return num.toString().length;
}

function mostDigits(arr){
    let len = arr.length;
    if(len === 0)
        return 0;
    if(len === 1)
        return digitCount(arr[0]);

    let currCount = digitCount(arr[0]);
    for(let i = 1; i <len; i++){
        if(currCount < digitCount(arr[i]))
            currCount = digitCount(arr[i])
    }
    return currCount;
}

module.exports = {radixSort, getDigit, digitCount, mostDigits};