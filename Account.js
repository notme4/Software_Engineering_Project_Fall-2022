

function hashCode(string){
    var hash = 0;
    for (var i = 0; i < string.length; i++) {
        var code = string.charCodeAt(i);
        hash = ((hash<<5)-hash)+code;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}

class Account {
	id;
	username;
	password;
	country;
	isAdult;
    address;
    ethnicity;
    gender;
    dob;
	
	/**
	 * @constructor
	 * 
	 * @param {number} id 
	 * @param {string} username 
	 * @param {string} password 
	 * @param {string} country 
	 * @param {boolean} isAdult 
     * @param {string} address 
     * @param {string} ethnicity 
     * @param {string} gender 
     * @param {Date} dob 
	 */
	constructor(id, username, password, country, isAdult, address, ethnicity, gender, dob) {
		this.id = id;
		this.username = username;
		this.password = password;
		this.country = country;
		this.isAdult = isAdult;
        this.address = address;
        this.ethnicity = ethnicity;
        this.gender = gender;
        this.dob = dob;
	}
}


function f() {

    var id = hashCode( document.getElementById("name").value);
    var username = document.getElementById("name").value;
    var password = document.getElementById("password").value;
    var country = document.getElementById("country").value;
    var isAdult = document.getElementById("isAdult").value;
    var address = document.getElementById("address").value;
    var ethnicity = document.getElementById("ethnicity").value;
    var gender = document.getElementById("gender").value;
    var date = document.getElementById("dob").value;
    var d = new Date(date)

    if (isAdult != "" && username != "" && password != "" && country != "")
	{
		var acc = new Account(id, username, password, country, isAdult=="Yes", address, ethnicity, gender, d);
		alert(JSON.stringify(acc) + "Uploaded to Database");
		document.location.href = "home.html";
	}
	else
	{
		alert("Required Information Missing");
	}
	
    console.log(id);
    console.log(username);
    console.log(password);
    console.log(country);
    console.log(isAdult);
    console.log(address);
    console.log(ethnicity);
    console.log(gender);
    console.log(d.toJSON());


    
}