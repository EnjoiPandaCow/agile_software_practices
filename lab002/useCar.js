import Car from './car.js' ;

let car1 = new Car('Joe Bloggs','3 Walkers Lane',
    'Toyota','Corolla',1.8,'10-WD-1058');
car1.addPreviousOwner( 'Pat Smith', '1 Main Street');
car1.addPreviousOwner( 'Pat Smith', '1 Main Street');
car1.addPreviousOwner( 'Sheila Dwyer', '2 High Street');
console.log(`Path Smith ? ${car1.wasOwnedBy('Pat Smith')}`);

car1.newOwner('Donal Dunne','5 Kings Way');
console.log(car1.previous_owners[2].name);
console.log(car1.owner);
console.log(`Car age: ${car1.howOld()}`);

console.log(`Alarm: ${car1.hasFeature('alarm')}` );