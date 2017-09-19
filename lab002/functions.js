var aCar = {
	owner : 'Joe Bloggs',
	address : '3 Walkers Lane',
    newOwner : function(name, address) {
        this.addPreviousOwner(this.owner,this.address) ;
        this.owner = name ;
        this.address = address ;
    },
	addPreviousOwner : function(newName,newAddress) {
        var o = {name: newName, address: newAddress};
        if (this.previous_owners.length == 3) {
            this.previous_owners.shift();
        }
        this.previous_owners.push(o);
    },
    hasFeature : function(query) {
	    var match = this.features.find(function(element,index) {
	        return query.toUpperCase() == element.toUpperCase();
        });
	    return match == undefined ? false : true;
    },
    /*
    hasFeature : function(query) {
        var result = false;
        this.features.forEach(function(feature) {
            if (query.toUpperCase() == feature.toUpperCase() ) {
                result = true ;
            }
        })
        return result ;
    },
    */
    wasOwnedBy : function(name_in) {
      var match = this.previous_owners.find(function(owner, index) {
         var name = owner.name.toUpperCase();
         return name_in.toUpperCase() == name;
      });
      return match == undefined ? false : true;
    },
    /*
    wasOwnedBy : function(name_in) {
	    var result = false;
	    this.previous_owners.forEach(function(owner) {
	        var name = owner.name.toUpperCase();
	        if(name_in.toUpperCase() == name) {
	            result = true;
            }
        });
	    return result;
    },
    */
    howOld : function() {
        var today = new Date();
        var this_year = today.getFullYear() ;
        return this_year - (this.registration.year + 2000) ;
    },
    previous_owners : [ { name : 'Pat Smith', address : '1 Main Street'}, 
                        { name : 'Sheila Dwyer', address : '2 High Street'}],
	type : {
		make : 'Toyota',
		model : 'Corolla',
		cc : 1.8
	},
	features : ['Parking assist', 'Alarm', 'Tow-bar'],
	registration : {year : 10, county : 'WD', number : 1058}
} ;

aCar.mileage = 80000 ;
aCar.color = { exterior : 'red', 
               interior : { texture : 'leather', 
                            shade : 'cream' }
              } ;

aCar.addPreviousOwner('Jim Nugent','3 Lower Road') ;
var last = aCar.previous_owners.length - 1;
console.log(aCar.previous_owners[last].name) ;

aCar.addPreviousOwner('Rachel Fleming','4 Upper Road') ;
console.log(aCar.previous_owners[2].name) ;
console.log(aCar.previous_owners[0].name) ;

aCar.newOwner('Donal Dunne','5 Kings Way') ;
console.log(aCar.previous_owners[2].name) ;
console.log(aCar.owner) ;

console.log(aCar.howOld()) ;

console.log('Alarm: ' + aCar.hasFeature('alarm'));

var name = 'Jim Nugent' ;
console.log(name + ' ? ' + aCar.wasOwnedBy(name)) ;
name = 'Paul Minihan' ;
console.log(name + ' ? ' + aCar.wasOwnedBy(name)) ;

             