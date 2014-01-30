"use strict"
var FiniteSequenceIterater = function() {
	this[0] = 0;
	this.length = 1;
}

var FiniteSequenceIterater_Factory = function(bound) {
	var result = new FiniteSequenceIterater();
	result.eachElementBound = bound;
	return result;
}

FiniteSequenceIterater.prototype.increment = function() {
	var i = 0;
	while(i<this.length) {
		this[i]++;
		if(this[i]>=this.eachElementBound) {
			this[i]=0;
			i++;
		}
		else {
			return;
		}
	}
	this.length++;
	this[i] = 0;
}
