
class Car { 
	constructor(name_in,address_in,make_in,model_in,cc_in,reg_in) {
		this.owner = name_in ;
		this.address = address_in;
		this.previous_owners = [ ];
		this.type = { make : make_in, model : model_in, cc : cc_in };
	    let reg_parts = reg_in.split('-');
	    let year = parseInt(reg_parts[0]);
	    this.registration = {year : year , county : reg_parts[1], number : reg_parts[2] } ;
        this.features = ['Parking assist', 'Alarm', 'Tow-bar'];
    }
	howOld() {
	    let today = new Date();
	    let this_year = today.getFullYear();
        return this_year - (this.registration.year + 2000);
	}
	newOwner(p_name,p_address) {
	       this.addPreviousOwner(this.owner,this.address);
	       this.owner = p_name;
	       this.address = p_address;
	    }
	addPreviousOwner(p_name,p_address) {
	       let o = { name : p_name, address : p_address };
	       if (this.previous_owners.length == 3) {
	       	  this.previous_owners.shift();
	       }
	       this.previous_owners.push(o);
	    }
	wasOwnedBy(name_in) {
        let result = false;
		let match = this.previous_owners.find(
			(element,index) => element.name.toUpperCase() == name_in.toUpperCase()
		);
		if (match != undefined) {
			result = true;
		}
	    return result;
	    }

	hasFeature(query) {
		let result = false;
		let match = this.features.find(
			(element, index) => element.toUpperCase() === query.toUpperCase()
		);
		if (match !== undefined) {
			result = true;
		}
		return result;
		}
}
export default Car;