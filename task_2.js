function sort_strings(arr){
arr.sort(function compArr(a, b){
    let a1 = a.toUpperCase();
    let b1 = b.toUpperCase();
    return a1.localeCompare(b1);
});
    return arr;
}

var strings = ['Fog', 'frog','finish', 'oak'];
sort_strings(strings);
console.log(strings);

// let str = "Java Script Object Notation";
// let acronym = str.split(/\s/).reduce((response,word)=> response+=word.slice(0,1)+"\t",'')

// console.log(acronym);