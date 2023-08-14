/** product: calculate the product of an array of numbers. */

function product(nums) {
  if(nums.length === 0)
    return 1;
  else{
    let n = nums.pop();
    return n * product(nums);
  }
    
}

/** longest: return the length of the longest word in an array of words. */

function longest(words) {
  if(words.length === 0)
    return 0;
  else{
    let w = words.pop();
    return Math.max(w.length, longest(words));
  }
}

/** everyOther: return a string with every other letter. */

function everyOther(str) {
  let first = str.substr(0, 1);
  if(first === "")
    return "";
  else{
    return first + everyOther(str.substr(2));
  }
}

/** isPalindrome: checks whether a string is a palindrome or not. */

function isPalindrome(str) {
  if(str.length <=3 && str.charAt(0) === str.charAt(str.length -1))
    return true;
  else{
    return str.charAt(0) === str.charAt(str.length -1) &&
            isPalindrome(str.substr(1, str.length-2));
  }
}

/** findIndex: return the index of val in arr (or -1 if val is not present). */

function findIndex(arr, val) {
  return findIndexWithStartIndex(arr, val);
}

//helper function for findIndex
function findIndexWithStartIndex(arr, val, start=0){
    if(start >= arr.length)
      return -1;
    else{
      if(arr[start] === val)
        return start;
      else
        return findIndexWithStartIndex(arr, val, start+1);
    }
}


/** revString: return a copy of a string, but in reverse. */

function revString(str) {
  if(str.length <=1)
    return str;
  else{
    return str.charAt(str.length -1) + revString(str.substr(0, str.length-1));
  }
}

/** gatherStrings: given an object, return an array of all of the string values. */

function gatherStrings(obj) {
  let values = Object.values(obj);
  let result =[];
  for(let value of values){
    if(typeof(value) === "string")
      result.push(value);
    else if(typeof(value) === "object")
      result = [...result, ...gatherStrings(value)];
  }
  return result;
}

/** binarySearch: given a sorted array of numbers, and a value,
 * return the index of that value (or -1 if val is not present). */

function binarySearch(arr, val) {
  return binarySearchWithStartEnd(arr, val);
}

// helper func of binarySearch
function binarySearchWithStartEnd(arr, val, start=0, end=arr.length-1){
  if(start > end)
    return -1;
  else{
    let mid = Math.floor((start + end)/2);
    if(arr[mid] === val)
      return mid;
    else if(arr[mid] < val)
      return binarySearchWithStartEnd(arr, val, mid+1, end);
    else
      return binarySearchWithStartEnd(arr, val, start, mid-1);
  }
}

module.exports = {
  product,
  longest,
  everyOther,
  isPalindrome,
  findIndex,
  revString,
  gatherStrings,
  binarySearch
};
