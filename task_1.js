function strtok_word(str) {
    var arr = str.split(/\s/);
    for(let i = 0; i<arr.length; i++){
        arr[i] = arr[i].replace(/\W/, '');
    }
    return arr;
}
console.log(strtok_word("I like Bogdan, and dot."));