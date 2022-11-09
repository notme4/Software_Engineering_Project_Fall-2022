
class Account {
	id;
	username;
	password;
	country;
	DoB;
	
	/**
	 * @constructor
	 * 
	 * @param {number} id 
	 * @param {string} username 
	 * @param {string} password 
	 * @param {string} country 
	 * @param {Date} DoB 
	 */
	constructor(id, username, password, country, DoB) {
		this.id = id;
		this.username = username;
		this.password = password;
		this.country = country;
		this.DoB = DoB;
	}
}

module.exports = Account;