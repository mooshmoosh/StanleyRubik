
window.onload = function() {
//tests go here!

//randomTests(); At the moment this takes too long for chromium to handle

	RubixPoint_Factory_123_testObjectIsCreated();
	RubixPermutation_Factory_4_testAFewpositionsAreCorrect();
	RubixPoint_face_test_a_bunch_of_points();
	RubixPermutation_applyFrontSpin_whatHappenedOnARealCube();
	RubixPermutation_applyLeftSpin_whatHappenedOnARealCube();
	RubixPermutation_applyTopSpin_whatHappenedOnARealCube();
	RubixPermutation_apply4OfEachSpin_theOriginalCube();
	RubixPermutation_apply_aPermutationWithABunchOfSpinsApplied_theSamePermutation();
	RubixPermutation_changedPointCount_apply4FrontSpinsAnd4LeftSpins_0();
	RubixPermutation_changedPointCount_applyFLFFFLLL4Times_4();
	RubixPoint_toString_aBunchOfPoints();
	RubixPermutation_applyTo_LeftRotationTo000();
	RubixPoint_isEqualToAnyOf();
	RubixPermutation_toString_leftRotation();
	RubixPermutation_toString_combinationThatOnlySwaps2PairsOfPoints();
	RubixPermutation_keepsXXXXLayerConstant_PermutationWithApplyLeftSpin();
	RubixPermutationCollection_createBasicMovesForCubeWithSize_sizeIs3_CheckOnlyRubixPermutationsAreEnumerated();
	RubixPermutationCollection_createInverseMovesForCubeWithSize_sizeIs3_CheckOnlyRubixPermutationsAreEnumerated();
	FiniteSequenceIterater_Factory_3_testBasicMechanicsOver6Increments();

DebugPrint("No exceptions thrown!");

}

function randomTests() {
	DebugPrint("Got Here!");
	var collection = StanleyRubik.RubixPermutationCollection_factory(2);
	var inverses = new StanleyRubik.RubixPermutationCollection();
	inverses.createInverseMovesForCubeWithSize(2);
	
	var iterator = FiniteSequenceIterater_Factory(collection.length);
	var permutation = StanleyRubik.RubixPermutation_Factory(2);
	for(;!iterator[5];iterator.increment()) {
		for(var i=0;i<iterator.length;i++) {
			permutation.apply(collection[iterator[i]]);
		}
		DebugPrint(permutation.changedPointCount());
	}
	
	
}

var RubixPoint_Factory_123_testObjectIsCreated = function () {
	var rubixPoint = StanleyRubik.RubixPoint_Factory(1,2,3);
	assert(rubixPoint.x==1,'rubixPoint.x==1');
	assert(rubixPoint.y==2,'rubixPoint.y==2');
	assert(rubixPoint.z==3,'rubixPoint.z==3');
}

var RubixPermutation_Factory_4_testAFewpositionsAreCorrect = function() {
	var permutation = StanleyRubik.RubixPermutation_Factory(4);
	assert(permutation.points[0][0][0].x==0,'permutation.points[0][0][0].x==0');
	assert(permutation.points[0][1][0].y==1,'permutation.points[0][1][0].y==1');
	assert(permutation.points[0][3][2].z==2,'permutation.points[0][3][2].z==2');
}

var RubixPoint_face_test_a_bunch_of_points = function () {
	var cube = StanleyRubik.RubixPermutation_Factory(4);
	var rubixPoint = StanleyRubik.RubixPoint_Factory(2,0,2);
	assert(cube.face(rubixPoint)=="Front",classof(rubixPoint));
	rubixPoint = StanleyRubik.RubixPoint_Factory(0,2,2);
	assert(cube.face(rubixPoint)=="Left",'cube.face(rubixPoint)=="Left"');
	rubixPoint = StanleyRubik.RubixPoint_Factory(3,2,2);
	assert(cube.face(rubixPoint)=="Right",'cube.face(rubixPoint)=="Right"');
	rubixPoint = StanleyRubik.RubixPoint_Factory(2,3,2);
	assert(cube.face(rubixPoint)=="Back",'cube.face(rubixPoint)=="Back"');
	rubixPoint = StanleyRubik.RubixPoint_Factory(2,2,3);
	assert(cube.face(rubixPoint)=="Top",'cube.face(rubixPoint)=="Top"');
	rubixPoint = StanleyRubik.RubixPoint_Factory(2,2,0);
	assert(cube.face(rubixPoint)=="Bottom",'cube.face(rubixPoint)=="Bottom"');
	rubixPoint = StanleyRubik.RubixPoint_Factory(2,2,2);
	assert(cube.face(rubixPoint)=="Interior Point",'cube.face(rubixPoint)=="Interior Point", instead:' + cube.face(rubixPoint));
	try{
		cube.face(7);
	}
	catch(e) {
		assert(e=="Not a RubixPoint",'cube.face(7) throws "Not a RubixPoint"');
	}
	
	
}

function RubixPermutation_applyFrontSpin_whatHappenedOnARealCube() {
	var rp = new StanleyRubik.RubixPermutation_Factory(5);
	rp.applyFrontSpin(0);
	
	assert(rp.points[0][0][0].x==0);
	assert(rp.points[0][0][0].y==0);
	assert(rp.points[0][0][0].z==4);
	
	assert(rp.points[1][0][0].x==0,'rp.points[1][0][0].x='+rp.points[1][0][0].x);
	assert(rp.points[1][0][0].y==0,'rp.points[1][0][0].y=' +rp.points[1][0][0].y);
	assert(rp.points[1][0][0].z==3,'rp.points[1][0][0].z='+rp.points[1][0][0].z);	
}

function RubixPermutation_applyLeftSpin_whatHappenedOnARealCube() {
	var rp = new StanleyRubik.RubixPermutation_Factory(5);
	rp.applyLeftSpin(0);
	
	assert(rp.points[0][0][0].x==0);
	assert(rp.points[0][0][0].y==4);
	assert(rp.points[0][0][0].z==0);
	
	assert(rp.points[0][4][0].x==0);
	assert(rp.points[0][4][0].y==4);
	assert(rp.points[0][4][0].z==4);
	
	rp.applyLeftSpin(0);
	
	assert(rp.points[0][0][0].x==0, "rp.points[0][0][0].x = " + rp.points[0][0][0].x);
	assert(rp.points[0][0][0].y==4, "rp.points[0][0][0].y = " + rp.points[0][0][0].y);
	assert(rp.points[0][0][0].z==4, "rp.points[0][0][0].z = " + rp.points[0][0][0].z);
	
	rp.applyLeftSpin(0);
	rp.applyLeftSpin(0);
	rp.applyLeftSpin(0);
	
	assert(rp.points[0][1][0].x==0);
	assert(rp.points[0][1][0].y==4);
	assert(rp.points[0][1][0].z==1);
	
	assert(rp.points[0][4][4].x==0);
	assert(rp.points[0][4][4].y==0);
	assert(rp.points[0][4][4].z==4);
	
	assert(rp.points[0][0][4].x==0);
	assert(rp.points[0][0][4].y==0);
	assert(rp.points[0][0][4].z==0);
	
	rp.applyLeftSpin(0);
	
	assert(rp.points[0][0][4].x==0);
	assert(rp.points[0][0][4].y==4);
	assert(rp.points[0][0][4].z==0);
	
}

function RubixPermutation_applyTopSpin_whatHappenedOnARealCube() {
	var rp = new StanleyRubik.RubixPermutation_Factory(5);
	rp.applyTopSpin(4);
	
	assert(rp.points[0][0][4].x==0,"After TopSpin: rp.points[0][0][4].x==0, instead "+rp.points[0][0][4].x);
	assert(rp.points[0][0][4].y==4,"After TopSpin: rp.points[0][0][4].y==4, instead "+rp.points[0][0][4].y);
	assert(rp.points[0][0][4].z==4,"After TopSpin: rp.points[0][0][4].z==4, instead "+rp.points[0][0][4].z);
	
	assert(rp.points[0][1][4].x==1,'After TopSpin: rp.points[0][1][4].x==1');
	assert(rp.points[0][1][4].y==4,'After TopSpin: rp.points[0][1][4].y==4');
	assert(rp.points[0][1][4].z==4,'After TopSpin: rp.points[0][1][4].z==4');
}

function RubixPermutation_apply4OfEachSpin_theOriginalCube() {
	var rp = StanleyRubik.RubixPermutation_Factory(4)
	rp.applyFrontSpin(0);
	rp.applyFrontSpin(0);
	rp.applyFrontSpin(0);
	rp.applyFrontSpin(0);
	
	for(var i=0;i<4;i++) {
		for(var j=0;j<4;j++) {
			assert(rp.points[i][0][j].x==i);
			assert(rp.points[i][0][j].y==0);
			assert(rp.points[i][0][j].z==j);
		}
	}
	
	rp.applyLeftSpin(0);
	rp.applyLeftSpin(0);
	rp.applyLeftSpin(0);
	rp.applyLeftSpin(0);
	for(var i=0;i<4;i++) {
		for(var j=0;j<4;j++) {
			assert(rp.points[0][i][j].x==0);
			assert(rp.points[0][i][j].y==i);
			assert(rp.points[0][i][j].z==j);
		}
	}
	
	rp.applyTopSpin(0);
	rp.applyTopSpin(0);
	rp.applyTopSpin(0);
	rp.applyTopSpin(0);
	for(var i=0;i<4;i++) {
		for(var j=0;j<4;j++) {
			assert(rp.points[i][j][0].x==i);
			assert(rp.points[i][j][0].y==j);
			assert(rp.points[i][j][0].z==0);
		}
	}
}

function RubixPermutation_apply_aPermutationWithABunchOfSpinsApplied_theSamePermutation() {
	var rp1 = StanleyRubik.RubixPermutation_Factory(4);
	var rp2 = StanleyRubik.RubixPermutation_Factory(4);
	rp1.applyFrontSpin(1);
	rp1.applyFrontSpin(1);
	rp1.applyTopSpin(2);
	rp2.apply(rp1);

	assert(rp1.isEqualTo(rp2),'rp1.isEqualTo(rp2)');
	
	rp1 = StanleyRubik.RubixPermutation_Factory(4);
	rp2 = StanleyRubik.RubixPermutation_Factory(4);

	rp1.applyFrontSpin(0);
	rp1.applyTopSpin(0);
	rp1.applyFrontSpin(0);
	rp1.applyFrontSpin(0);
	rp1.applyFrontSpin(0);
	rp1.applyTopSpin(0);
	rp1.applyTopSpin(0);
	rp1.applyTopSpin(0);
	
	rp2.apply(rp1);
	
	assert(rp1.isEqualTo(rp2),'rp1.isEqualTo(rp2)');
}


function RubixPermutation_changedPointCount_apply4FrontSpinsAnd4LeftSpins_0() {
	var rp1 = StanleyRubik.RubixPermutation_Factory(4);
	rp1.applyFrontSpin(0);
	rp1.applyFrontSpin(0);
	rp1.applyFrontSpin(0);
	rp1.applyFrontSpin(0);
	rp1.applyLeftSpin(0);
	rp1.applyLeftSpin(0);
	rp1.applyLeftSpin(0);
	rp1.applyLeftSpin(0);
	
	assert(rp1.changedPointCount()==0);
}

function RubixPermutation_changedPointCount_applyFLFFFLLL4Times_4() {
	var rp1 = StanleyRubik.RubixPermutation_Factory(5);
	
	rp1.applyFrontSpin(0);
	rp1.applyLeftSpin(0);
	rp1.applyFrontSpin(0);
	rp1.applyFrontSpin(0);
	rp1.applyFrontSpin(0);
	rp1.applyLeftSpin(0);
	rp1.applyLeftSpin(0);
	rp1.applyLeftSpin(0);
	rp1.applyFrontSpin(0);
	rp1.applyLeftSpin(0);
	rp1.applyFrontSpin(0);
	rp1.applyFrontSpin(0);
	rp1.applyFrontSpin(0);
	rp1.applyLeftSpin(0);
	rp1.applyLeftSpin(0);
	rp1.applyLeftSpin(0);
	rp1.applyFrontSpin(0);
	rp1.applyLeftSpin(0);
	rp1.applyFrontSpin(0);
	rp1.applyFrontSpin(0);
	rp1.applyFrontSpin(0);
	rp1.applyLeftSpin(0);
	rp1.applyLeftSpin(0);
	rp1.applyLeftSpin(0);
	
	assert(rp1.changedPointCount()==4, "rp1.changedPointCount()="+rp1.changedPointCount());
}

function RubixPoint_toString_aBunchOfPoints() {
	var point = StanleyRubik.RubixPoint_Factory(0,0,0);
	assert(point.toString(4)=="(Front 0,0)",'point.toString(4)=="(Front 0,0)"');
	point = StanleyRubik.RubixPoint_Factory(0,1,2);
	assert(point.toString(4)=="(Left 2,2)",'point.toString(4)=="(Left 2,2)"');
	point = StanleyRubik.RubixPoint_Factory(3,1,2);
	assert(point.toString(4)=="(Right 1,2)",'point.toString(4)=="(Right 1,2)"');
	point = StanleyRubik.RubixPoint_Factory(1,2,3);
	assert(point.toString(4)=="(Top 1,2)",'point.toString(4)=="(Top 1,2)"');
	point = StanleyRubik.RubixPoint_Factory(2,1,0);
	assert(point.toString(4)=="(Bottom 2,2)",'point.toString(4)=="(Bottom 2,2)"');
	point = StanleyRubik.RubixPoint_Factory(1,3,2);
	assert(point.toString(4)=="(Back 2,2)",'point.toString(4)=="(Back 2,2)"');
	
}

function RubixPoint_isEqualToAnyOf() {
	var point = StanleyRubik.RubixPoint_Factory(0,0,0);
	var visitedPoints = [];
	visitedPoints.push(point);
	point = StanleyRubik.RubixPoint_Factory(0,0,0);
}

function RubixPermutation_toString_leftRotation() {
	var leftRotation = StanleyRubik.RubixPermutation_Factory(5);
	leftRotation.applyLeftSpin(0);
	var testString = "(Front 0,0)->(Left 0,0)->(Left 0,4)->(Front 0,4)->(Front 0,0)<br>(Front 0,1)->(Left 1,0)->(Left 0,3)->(Left 3,4)->(Front 0,1)<br>(Front 0,2)->(Left 2,0)->(Left 0,2)->(Left 2,4)->(Front 0,2)<br>(Front 0,3)->(Left 3,0)->(Left 0,1)->(Left 1,4)->(Front 0,3)<br>(Left 3,1)->(Left 1,1)->(Left 1,3)->(Left 3,3)->(Left 3,1)<br>(Left 3,2)->(Left 2,1)->(Left 1,2)->(Left 2,3)->(Left 3,2)<br>"
	assert(leftRotation.toString()==testString, "<br>" + leftRotation.toString() + testString);
}

function RubixPermutation_toString_combinationThatOnlySwaps2PairsOfPoints() {
	var leftRotation = StanleyRubik.RubixPermutation_Factory(5);
	leftRotation.applyLeftSpin(0);
	var frontRotation = StanleyRubik.RubixPermutation_Factory(5);
	frontRotation.applyFrontSpin(0)
	var rp1 = StanleyRubik.RubixPermutation_Factory(5)
	
	rp1.apply(frontRotation);
	rp1.apply(leftRotation);
	rp1.apply(frontRotation);
	rp1.apply(frontRotation);
	rp1.apply(frontRotation);
	rp1.apply(leftRotation);
	rp1.apply(leftRotation);
	rp1.apply(leftRotation);
	rp1.apply(frontRotation);
	rp1.apply(leftRotation);
	rp1.apply(frontRotation);
	rp1.apply(frontRotation);
	rp1.apply(frontRotation);
	rp1.apply(leftRotation);
	rp1.apply(leftRotation);
	rp1.apply(leftRotation);
	rp1.apply(frontRotation);
	rp1.apply(leftRotation);
	rp1.apply(frontRotation);
	rp1.apply(frontRotation);
	rp1.apply(frontRotation);
	rp1.apply(leftRotation);
	rp1.apply(leftRotation);
	rp1.apply(leftRotation);

	assert(rp1.toString()=="(Front 0,0)->(Front 4,0)->(Front 0,0)<br>(Front 0,4)->(Left 0,4)->(Front 0,4)<br>");
	
}

function RubixPermutation_applyTo_LeftRotationTo000() {
	var rp = StanleyRubik.RubixPermutation_Factory(4);
	rp.applyLeftSpin(0);
	
	var point = StanleyRubik.RubixPoint_Factory(0,0,0);
	point = rp.applyTo(point);
	assert(point.x==0)
	assert(point.y==3)
	assert(point.z==0)
}

function RubixPermutation_keepsXXXXLayerConstant_PermutationWithApplyLeftSpin() {
	var rp = StanleyRubik.RubixPermutation_Factory(4);
	rp.applyLeftSpin(0);
	
	assert(rp.keepsLeftLayerConstant(0)==false);
	assert(rp.keepsLeftLayerConstant(1)==true);
	assert(rp.keepsLeftLayerConstant(2)==true);
	assert(rp.keepsLeftLayerConstant(3)==true);
	
	assert(rp.keepsFrontLayerConstant(0)==false);
	assert(rp.keepsFrontLayerConstant(1)==false);
	assert(rp.keepsFrontLayerConstant(2)==false);
	assert(rp.keepsFrontLayerConstant(3)==false);
	
	assert(rp.keepsTopLayerConstant(0)==false);	
	assert(rp.keepsTopLayerConstant(1)==false);	
	assert(rp.keepsTopLayerConstant(2)==false);	
	assert(rp.keepsTopLayerConstant(3)==false);	
	
}

function RubixPermutationCollection_createBasicMovesForCubeWithSize_sizeIs3_CheckOnlyRubixPermutationsAreEnumerated() {
	var collection = StanleyRubik.RubixPermutationCollection_factory(3);
	var permutationCount = 0;
	var p;
	for(p in collection) {
		assert(collection[p] instanceof StanleyRubik.RubixPermutation, "right here, permutationCount=="+permutationCount);
		permutationCount++;
	}
	assert (permutationCount == 9, "permutationCount = " + permutationCount);// Top, left and front, multiplied by the size of the cube 3
}

function RubixPermutationCollection_createInverseMovesForCubeWithSize_sizeIs3_CheckOnlyRubixPermutationsAreEnumerated() {
	var collection = new StanleyRubik.RubixPermutationCollection();
	collection.createInverseMovesForCubeWithSize(3);
	var p;
	var permutationCount = 0;
	for(p in collection) {
		assert(collection[p] instanceof StanleyRubik.RubixPermutation);
		permutationCount++;
	}
	assert (permutationCount == 9);// Top, left and front, multiplied by the size of the cube 3
}

function FiniteSequenceIterater_Factory_3_testBasicMechanicsOver6Increments() {

	var iterator = FiniteSequenceIterater_Factory(3);
	assert(iterator.length == 1,"iterator.length="+iterator.length);
	assert(iterator[0] == 0,"iterator[0]=" + iterator[0]);
	iterator.increment();
	iterator.increment();
	iterator.increment();
	assert(iterator.length == 2,"iterator.length="+ iterator.length + " not 2");
	assert(iterator[0] == 0,"iterator[0]=" + iterator[0]);
	assert(iterator[1] == 0,"iterator[1]=" + iterator[1]);
	iterator.increment();
	iterator.increment();
	iterator.increment();
	assert(iterator.length == 2,"iterator.length=" + iterator.length + " not 2");
	assert(iterator[1] == 1,"iterator[1]=" + iterator[0]);
	assert(iterator[0] == 0,"iterator[0]=" + iterator[0]);
	
}
