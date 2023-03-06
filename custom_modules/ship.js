class Ship{
    constructor (name){
        this.name = name;
        if(name === undefined) this.name = "Невідомий корабель";
    }
}

var Ship_collection = new Array();

var addShip = (name) => {
    let ship = new Ship(name);
    Ship_collection.push(ship);
    return ship;
}

var findShip = (name) => {
    for (let index = 0; index < Ship_collection.length; index++)
        if(Ship_collection[index].name == name) return Ship_collection[index];
    return -1;
}

var editShip = (name, new_name) => {
    let ship = findShip(name);
    if(ship === -1) return -1;
    ship.name = new_name;
    return 1;
}

var removeShip = (name) => {
    let ship = findShip(name);
    if(ship === -1) return -1;
    let index = Ship_collection.indexOf(ship);
    Ship_collection.splice(index, 1); 
    return 1;
}

var showShips = () => {
    console.log("\nСписок усіх кораблів:");
    for (let index = 0; index < Ship_collection.length; index++) {
        console.log(`Індекс корабля: ${index+1} \t Назва корабля: ${Ship_collection[index].name}`);
    }
    return Ship_collection;
}

exports.findShip = findShip;
exports.addShip = addShip;
exports.removeShip = removeShip;
exports.editShip = editShip;
exports.showShips = showShips;