// timestamping tests to help differentiate between tests, esp. successful ones
Date.prototype.getMonthString = function () {
	switch (this.getMonth()) {
		case 0: return "Jan.";
		case 1: return "Feb.";
		case 2: return "Mar.";
		case 3: return "Apr.";
		case 4: return "May";
		case 5: return "June";
		case 6: return "July";
		case 7: return "Aug.";
		case 8: return "Sep.";
		case 9: return "Oct.";
		case 10: return "Nov.";
		case 11: return "Dec.";
	}
}
Date.prototype.today = function () { 
    return (this.getMonthString() + " " + ( (this.getDate() < 10)?"0":"") + this.getDate() +", "+ this.getFullYear() );
}
// For the time now
Date.prototype.timeNow = function () {
	return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
}
Date.prototype.getFullTime = function () {
	return this.today() + " @ " + this.timeNow();
}