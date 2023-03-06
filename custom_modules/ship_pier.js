class Ship_Pier{
    constructor(pier, ship){
        this.pier = pier;
        this.ship = ship;
        pier.ship_collection.push(ship);
    }
}

var arriveShip = (pier, ship) => new Ship_Pier(pier, ship);

var departureShip = (pier, ship) => {
    let id = pier.ship_collection.indexOf(ship);
    if (id===-1) return -1;
    pier.ship_collection.splice(id, 1);
    return 1;
}

exports.arriveShip = arriveShip;
exports.departureShip = departureShip;