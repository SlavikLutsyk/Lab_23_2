class Port{
    constructor (name){
        this.name = name;
        this.pier_collection = [];
        if(name === undefined) this.name = "Невідомий порт";
    }
}

var port_collection = new Array();

var addPort = (name) => {
    let port = new Port(name);
    port_collection.push(port);
    return port;
}

var findPort = (name) => {
    for (let index = 0; index < port_collection.length; index++)
        if(port_collection[index].name == name) return port_collection[index];
    return -1;
}

var editPort = (name, new_name) => {
    let port = findPort(name);
    if(port === -1) return -1;
    port.name = new_name;
    return 1;
}

var removePort = (name) => {
    let port = findPort(name);
    if(port === -1) return -1;
    let index = port_collection.indexOf(port);
    port_collection.splice(index, 1); 
    return 1;
}

var showPorts = () => {
    console.log("\nСписок усіх портів:");
    for (let index = 0; index < port_collection.length; index++) {
        console.log(`Індекс порту: ${index+1} \t Назва порту: ${port_collection[index].name} \t 
        Кількість пристаней: ${port_collection[index].pier_collection.length}`);
    }
    return port_collection;
}

exports.findPort = findPort;
exports.addPort = addPort;
exports.removePort = removePort;
exports.editPort = editPort;
exports.showPorts = showPorts;