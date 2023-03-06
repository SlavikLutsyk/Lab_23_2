function gcd(a, b){
    let nsd;
    for(let i=0; (a>b)?i<=b:i<=a; i++){
        if(!(a%i) && !(b%i)) nsd = i;
    }
    return nsd;
}
console.log(gcd(48, 48));