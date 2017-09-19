function Car(name,address,make,model,cc,reg) {
    this.owner = name;
    this.address = address;
    this.previous_owners = [ ];
    this.type = { make : make, model : model, cc : cc };
    this.features = ['Parking assist', 'Alarm', 'Tow-bar'];

    var regParts = reg.split('-');
    this.registration = {
        year : parseInt(regParts[0]),
        county : regParts[1],
        number : regParts[2]
    };


    this.addPreviousOwner = function(newName,newAddress) {
        var o = { name : newName, address : newAddress }
        if (this.previous_owners.length == 3) {
            this.previous_owners.shift()
        }
        this.previous_owners.push(o)
    };

    this.wasOwnedBy = function(query) {
        var match = this.previous_owners.find(function(element,index) {
            return element.name.toUpperCase() == query.toUpperCase() ;
        });
        return match == undefined ? false : true ;
    };

    this.newOwner = function(newName, newAddress) {
        this.addPreviousOwner(this.owner,this.address) ;
        this.owner = newName ;
        this.address = newAddress ;
    }

    this.howOld = function() {
        var today = new Date();
        var this_year = today.getFullYear();
        return this_year - (this.registration.year + 2000);
    };
}

var car1 = new Car('Joe Bloggs','3 Walkers Lane',
    'Toyota','Corolla',1.8,
    '10-WD-1058') ;
car1.addPreviousOwner( 'Pat Smith',
    '1 Main Street') ;
car1.addPreviousOwner( 'Pat Smith',
    '1 Main Street') ;
car1.addPreviousOwner( 'Sheila Dwyer',
    '2 High Street') ;
console.log('Path Smith ? ' + car1.wasOwnedBy('Pat Smith')) ;

car1.newOwner('Donal Dunne','5 Kings Way') ;
console.log(car1.previous_owners[2].name) ;
console.log(car1.owner) ;

console.log('Car age: ' + car1.howOld()) ;