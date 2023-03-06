function User(name){
    this.name=name;
}
var users = [new User("Yaroslav"), new User("Denys"), new User("Yaryk"), new User("bogdan")];
users.sort((a, b) => {
    let a1 = a.name.toUpperCase();
    let b1 = b.name.toUpperCase();
    return a1.localeCompare(b1);
}) 
console.log(users);