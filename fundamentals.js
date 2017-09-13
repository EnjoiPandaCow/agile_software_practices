var aCar = {
    owner : "Joe Bloggs",
    address : '3 Walkers Lane',
    previous_owners : [{name: 'Pat Smith', address: '1 Main Street'},{name: 'Sheila Dwyer', address: '2 High Street'}],
    type : {
        make: 'Toyota',
        model: 'Corolla',
        cc: '1.8'
    },
    features : ['Parking assist', 'Alarm', 'Tow-bar'],
    registration : {
        year: '10',
        county_code: 'WD',
        number: '1058'
    }
};

aCar.mileage = '80000';
aCar.color = {
    exterior_color : 'red',
    interior_color : {
        texture : 'leather',
        shade : 'cream'
    }
};

console.log(aCar.owner + ' drives a ' + aCar.type.make);
console.log(aCar.registration.year + ' - ' + aCar.registration.county_code + ' - ' + aCar.registration.number);
console.log('It is a ' + aCar.color.exterior_color + ' car, ' + aCar.mileage + ' milegae, and ' + aCar.color.interior_color.texture + ' interior.');
console.log('First owner : ' + aCar.previous_owners[0].name + ' ' + aCar.previous_owners[0].address);

for (var i = 0; i < aCar.features.length; i+= 1) {
    console.log(aCar.features[i]);
}

for (var x = 0; x < aCar.previous_owners.length; x+= 1) {
    console.log(aCar.previous_owners[x].name);
}

for (var p in aCar.type) {
    console.log(p.toUpperCase() + ' = ' + aCar.type[p]);
}