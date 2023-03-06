function swap_arr(arr){
    let rand;
    for(let i = 0;i<arr.length;i++){
        rand = Math.floor(Math.random()*(arr.length-1));
        [arr[i], arr[rand]] = [arr[rand], arr[i]];
    } 
}
arr_numb = [2,6,3,9,6,-4,8, 15,-7,4,-2];
console.log(arr_numb);
swap_arr(arr_numb);
console.log(arr_numb);