
var StanleyRubik = {};

StanleyRubik.RubixPoint = function() {
	this.x = 0;
	this.y = 0;
	this.z = 0;
}

StanleyRubik.RubixPoint.prototype = {
	setTo:function(newPoint) {
		this.x = newPoint.x;
		this.y = newPoint.y;
		this.z = newPoint.z;
	},
	clone:function() {
		return StanleyRubik.RubixPoint_Factory(this.x,this.y,this.z);
	},
	isEqualTo:function(point) {
		if(this.x!=point.x) return false;
		if(this.y!=point.y) return false;
		if(this.z!=point.z) return false;
		return true;
	},
	isEqualToAnyOf:function(pointArray) {
		for(var i=0;i<pointArray.length;i++) {
			if(this.isEqualTo(pointArray[i])) return true;
		}
		return false;
	},
	face:function(cubeSize) {
		//return which face of the cube the point is on
		//this is for humans to read. There is more than one answer for edge pieces, so they're in order of easiest to see.
		if(this.y==0) return "Front";
		if(this.x==0) return "Left";
		if(this.x==cubeSize-1) return "Right";
		if(this.z==cubeSize-1) return "Top";
		if(this.z==0) return "Bottom";
		if(this.y==cubeSize-1) return "Back";
		if(0<=this.x && this.x<cubeSize && 0<=this.y && this.y<cubeSize && 0<=this.z && this.z<cubeSize) return "Interior Point";
		else throw "RubixPoint is out of bounds";
	},
	toString:function(cubeSize) {
		var pointFace = this.face(cubeSize);
		var result = "";
		switch(pointFace) {
			case "Front":
				return "(" + pointFace + " " +  this.x + "," + this.z+")";
				break;
			case "Top":
				return "(" + pointFace + " " +  this.x + "," + this.y+")";
				break;
			case "Left":
				return "(" + pointFace + " " +  (cubeSize - 1 - this.y) + "," + this.z + ")";
				break;
			case "Right":
				return "(" + pointFace + " " +  this.y + "," +  this.z + ")";
				break;
			case "Bottom":
				return "(" + pointFace + " " +  this.x + "," + (cubeSize - 1 - this.y) + ")";
				break;
			case "Back":
				return "(" + pointFace + " " +  (cubeSize-1-this.x) + "," + this.z + ")";
				break;
			default:
				break;
		}
	}

}

StanleyRubik.RubixPoint_Factory = function(x,y,z) {
	var result = new StanleyRubik.RubixPoint();
	result.x = x;
	result.y = y;
	result.z = z;
	return result;
}

StanleyRubik.RubixPermutation = function() {
	this.points = [];
	this.points[0] = [];
	this.points[0][0] = [];
	this.points[0][0][0] = new StanleyRubik.RubixPoint();
	this.size = 1;
	
	this.tempPoints = [];
	this.tempPoints[0] = [];
	this.tempPoints[0][0] = [];
	this.tempPoints[0][0][0] = new StanleyRubik.RubixPoint();
}

StanleyRubik.RubixPermutation.prototype = {
	face:function(point) {
		if(!(point instanceof StanleyRubik.RubixPoint)) throw "Not a RubixPoint";
		//return which face of the cube the point is on
		//this is for humans to read. There is more than one answer for edge pieces, so they're in order of easiest to see.
		if(point.y==0) return "Front";
		if(point.x==0) return "Left";
		if(point.x==this.size-1) return "Right";
		if(point.z==this.size-1) return "Top";
		if(point.z==0) return "Bottom";
		if(point.y==this.size-1) return "Back";
		if(0<=point.x && point.x<this.size && 0<=point.y && point.y<this.size && 0<=point.z && point.z<this.size) return "Interior Point";
	},
	isOnAFace:function(point) {
		if(!(point instanceof StanleyRubik.RubixPoint)) throw "Not a RubixPoint";
		if(point.x==0) return true;
		if(point.y==0) return true;
		if(point.z==0) return true;
		if(point.x==this.size-1) return true;
		if(point.y==this.size-1) return true;
		if(point.z==this.size-1) return true;
		return false;
	},
	resetTemp:function() {
		this.tempPoints = [];
		for(var i = 0;i<this.size;i++) {
			this.tempPoints[i] = [];
			for(var j = 0;j<this.size;j++) {
				this.tempPoints[i][j] = [];
				for(var k = 0;k<this.size;k++) {
					this.tempPoints[i][j][k] = StanleyRubik.RubixPoint_Factory(i,j,k);
				}
			}
		}
	},
	copyTempPointToPoint:function() {
		for(var i = 0;i<this.size;i++) {
			for(var j = 0;j<this.size;j++) {
				for(var k = 0;k<this.size;k++) {
					this.points[i][j][k].setTo(this.tempPoints[i][j][k]);
				}
			}
		}
	},
	applyFrontSpin:function(layer) {
		if(layer<0||layer>=this.size) return;
		for(var i=0;i<this.size;i++) {
			for(var j=0;j<this.size;j++) {
				this.tempPoints[i][layer][j].setTo(this.points[j][layer][this.size-1-i]);
			}
		}
		this.copyTempPointToPoint();
	},
	applyLeftSpin:function(layer) {
		if(layer<0||layer>=this.size) return;
		for(var i=0;i<this.size;i++) {
			for(var j=0;j<this.size;j++) {
				this.tempPoints[layer][i][j].setTo(this.points[layer][this.size-1-j][i]);
			}
		}
		this.copyTempPointToPoint();
	},
	applyTopSpin:function(layer) {
		if(layer<0||layer>=this.size) return;
		var i,j;
		for(i=0;i<this.size;i++) {
			for(j=0;j<this.size;j++) {
				this.tempPoints[i][j][layer].setTo(this.points[j][this.size-1-i][layer]);
			}
		}
		this.copyTempPointToPoint();
	},
	isEqualTo:function(permutation) {
		if(!(permutation instanceof StanleyRubik.RubixPermutation)) throw "thats not a RubixPermutation!";
		var i,j,k;
		for(i = 0;i<this.size;i++) {
			for(j = 0;j<this.size;j++) {
				for(k = 0;k<this.size;k++) {
					if(!this.isOnAFace(StanleyRubik.RubixPoint_Factory(i,j,k))) continue;
					if(!(this.points[i][j][k].isEqualTo(permutation.points[i][j][k]))) {
						return false;
					}
				}
			}
		}
		return true;
	},
	apply:function(permutation) {
		if(!(permutation instanceof StanleyRubik.RubixPermutation)) throw "thats not a RubixPermutation!";
		this.resetTemp();
		var aPoint;
		var i,j,k;
		for(i = 0;i<this.size;i++) {
			for(j = 0;j<this.size;j++) {
				for(k=0;k<this.size;k++) {
					aPoint = this.points[i][j][k];
					this.tempPoints[i][j][k].setTo(permutation.points[aPoint.x][aPoint.y][aPoint.z]);
				}
			}
		}
		this.copyTempPointToPoint();
	},
	applyTo:function(point) {
		return StanleyRubik.RubixPoint_Factory(this.points[point.x][point.y][point.z].x,this.points[point.x][point.y][point.z].y,this.points[point.x][point.y][point.z].z);
	},
	changedPointCount:function() {
		var differentPointCount=0;
		var i,j,k;
		var point_ijk = new StanleyRubik.RubixPoint();
		for(i=0;i<this.size;i++) {
			for(j=0;j<this.size; j++) {
				for(k=0; k<this.size;k++) {
					point_ijk.x = i;
					point_ijk.y = j;
					point_ijk.z = k;
					if(this.isOnAFace(point_ijk) && !(this.points[i][j][k].isEqualTo(point_ijk))) {
						differentPointCount++;
					}
				}
			}
		}
		
		return differentPointCount;
	},
	keepsTopLayerConstant:function(layer) {
		var identityPoint;
		for(var i=0;i<this.size;i++) {
			for(var j=0;j<this.size;j++) {
				identityPoint = StanleyRubik.RubixPoint_Factory(i,j,layer);
				if(!this.isOnAFace(identityPoint)) continue;
				if(!this.points[i][j][layer].isEqualTo(identityPoint)) return false;
			}
		}
		return true;
	},
	keepsFrontLayerConstant:function(layer) {
		var identityPoint;
		for(var i=0;i<this.size;i++) {
			for(var j=0;j<this.size;j++) {
				identityPoint = StanleyRubik.RubixPoint_Factory(i,layer,j);
				if(!this.isOnAFace(identityPoint)) continue;
				if(!this.points[i][layer][j].isEqualTo(identityPoint)) return false;
			}
		}
		return true;
	},
	keepsLeftLayerConstant:function(layer) {
		var identityPoint;
		for(var i=0;i<this.size;i++) {
			for(var j=0;j<this.size;j++) {
				identityPoint = StanleyRubik.RubixPoint_Factory(layer,i,j);
				if(!this.isOnAFace(identityPoint)) continue;
				if(!this.points[layer][i][j].isEqualTo(identityPoint)) return false;
			}
		}
		return true;
	},
	toString:function() {
		var result = "";
		var visitedPoints = [];
		var travellingPoint;
		var travellingPointOrigin;
		for(var i=0;i<this.size;i++) {
			for(var j=0;j<this.size;j++) {
				for(var k=0;k<this.size;k++) {
					travellingPoint = StanleyRubik.RubixPoint_Factory(i,j,k);
					
					if(!this.isOnAFace(travellingPoint)) continue;
																						
					travellingPointOrigin = travellingPoint.clone();
					if(travellingPoint.isEqualToAnyOf(visitedPoints)) continue;
					visitedPoints.push(travellingPoint.clone());
					
					travellingPoint.setTo(this.applyTo(travellingPoint));
					if(travellingPoint.isEqualTo(travellingPointOrigin)) continue;
					
					result += travellingPointOrigin.toString(this.size) + "->";
					while(!travellingPoint.isEqualTo(travellingPointOrigin)) {
						visitedPoints.push(travellingPoint.clone());
						result += travellingPoint.toString(this.size) + "->";
						travellingPoint.setTo(this.applyTo(travellingPoint));
					}
					result += travellingPoint.toString(this.size) + "<br>";
				}
			}
		}
		return result;
		
	}
}

StanleyRubik.RubixPermutation_Factory = function(size) {
	//generate a rubix cube in its default state
	var result = new StanleyRubik.RubixPermutation();
	result.size = size;
	var i,j,k;
	for(i = 0;i<size;i++) {
		result.points[i] = [];
		for(j = 0;j<size;j++) {
			result.points[i][j] = [];
			for(k = 0;k<size;k++) {
				result.points[i][j][k] = StanleyRubik.RubixPoint_Factory(i,j,k);
			}
		}
	}
	result.resetTemp();
	return result;
}

StanleyRubik.RubixPermutationCollection = function() {
	Object.defineProperty(this,"length", {	value:0,
										writable:true,
										enumerable:false,
										configurable:true});
}


Object.defineProperty(StanleyRubik.RubixPermutationCollection.prototype,"createBasicMovesForCubeWithSize", {	enumerable:false,
																												value:function(size) {
	var j=0;
	for(var i = 0;i<size;i++) {
		this[j] = StanleyRubik.RubixPermutation_Factory(size);
		this[j].applyFrontSpin(i);
		j++;
		this[j] = StanleyRubik.RubixPermutation_Factory(size);
		this[j].applyLeftSpin(i);
		j++
		this[j] = StanleyRubik.RubixPermutation_Factory(size);
		this[j].applyTopSpin(i);
		j++
		
	}
	this.length = j;
}
});

Object.defineProperty(StanleyRubik.RubixPermutationCollection.prototype,"createInverseMovesForCubeWithSize", {	enumerable:false,
																												value:function(size) {
	var j=0;
	for(var i = 0;i<size;i++) {
		this[j] = StanleyRubik.RubixPermutation_Factory(size);
		this[j].applyFrontSpin(i);
		this[j].applyFrontSpin(i);
		this[j].applyFrontSpin(i);
		j++;
		this[j] = StanleyRubik.RubixPermutation_Factory(size);
		this[j].applyLeftSpin(i);
		this[j].applyLeftSpin(i);
		this[j].applyLeftSpin(i);
		j++
		this[j] = StanleyRubik.RubixPermutation_Factory(size);
		this[j].applyTopSpin(i);
		this[j].applyTopSpin(i);
		this[j].applyTopSpin(i);
		j++;
		
	}
	this.length = j;
}
});


/*
Object.defineProperty(StanleyRubik.RubixPermutationCollection.prototype,"createBasicMovesForCubeWithSize", {	enumerable:false,
																												value:function(size) {
	for(var i = 0;i<size;i++) {
		this["front"+i] = StanleyRubik.RubixPermutation_Factory(size);
		this["front"+i].applyFrontSpin(i);
		
		this["left"+i] = StanleyRubik.RubixPermutation_Factory(size);
		this["left"+i].applyLeftSpin(i);
		
		this["top"+i] = StanleyRubik.RubixPermutation_Factory(size);
		this["top"+i].applyTopSpin(i);
		
		this.length += 6;
	}
}
});

Object.defineProperty(StanleyRubik.RubixPermutationCollection.prototype,"createInverseMovesForCubeWithSize", {	enumerable:false,
																												value:function(size) {
	for(var i = 0;i<size;i++) {
		this["front"+i+"inverse"] = StanleyRubik.RubixPermutation_Factory(size);
		this["front"+i+"inverse"].applyFrontSpin(i);
		this["front"+i+"inverse"].applyFrontSpin(i);
		this["front"+i+"inverse"].applyFrontSpin(i);
		
		this["left"+i+"inverse"] = StanleyRubik.RubixPermutation_Factory(size);
		this["left"+i+"inverse"].applyFrontSpin(i);
		this["left"+i+"inverse"].applyFrontSpin(i);
		this["left"+i+"inverse"].applyFrontSpin(i);

		this["top"+i+"inverse"] = StanleyRubik.RubixPermutation_Factory(size);
		this["top"+i+"inverse"].applyTopSpin(i);
		this["top"+i+"inverse"].applyTopSpin(i);
		this["top"+i+"inverse"].applyTopSpin(i);
		
		this.length += 3;
	}
}
});
* */

StanleyRubik.RubixPermutationCollection_factory = function(size) {
	var result = new StanleyRubik.RubixPermutationCollection;
	result.createBasicMovesForCubeWithSize(size);
	return result;
}


