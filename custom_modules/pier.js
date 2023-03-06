class Pier{
    constructor (id){
        this.id = id;
        this.ship_collection = [];
    }
}

var addPier = (port) => {
    let pier_arr = port.pier_collection;
    let pier = new Pier((pier_arr.length) ? pier_arr[pier_arr.length-1].id + 1 : 1);
    pier_arr.push(pier);
    return pier;
}

var removePier = (port, pier) => {
    let pier_arr = port.pier_collection;
    if(pier.id>pier_arr[pier_arr.length-1].id) return -1;
    pier_arr.splice(pier_arr.indexOf(pier), 1);
    return 1;
}

var showPier = (port) => {
    let pier_arr = port.pier_collection;
    console.log(`\nСписок усіх пристаней у порті ${port.name}:`);
    if(!pier_arr.length) {
        console.log('Нема!');
        return pier_arr;
    }
    for (let index = 0; index < pier_arr.length; index++) {
        console.log(`Індекс пристані: ${pier_arr[index].id}`);
        console.log('Список кораблів на пристані: ');
        if(!pier_arr[index].ship_collection.length) {
            console.log('Нема!');
            continue;
        }
        for (let j = 0; j < pier_arr[index].ship_collection.length; j++) {
            console.log(`Назва корабля: ${pier_arr[index].ship_collection[j].name}`);
        }
    }
    return pier_arr;
}

exports.addPier = addPier;
exports.removePier = removePier;
exports.showPier = showPier;