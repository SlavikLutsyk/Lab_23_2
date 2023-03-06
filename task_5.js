var getNumDays = (mon, year)=>{
    if([4, 6, 9, 11].includes(mon)) return 30;
    if([1, 3, 5, 7, 8, 10, 12].includes(mon)) return 31;
    if(!(year%4||(year%100 == 0 && year%400))) return 29;
    else return 28;
}
console.log(getNumDays(12, 2004));