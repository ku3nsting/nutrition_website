// *******************************
//           Classes
// *******************************

//UserStats Class Definition
function UserStats (weight, height, age, lvl, spesh, sex, bfeeding, pregnant) {
    this.weight = weight;   //in lbs
    this.height = height;   //in inches
    this.age = age;
	this.activityLvl = lvl;
	this.specialDiet = spesh;
	this.sex = sex;
	this.breastfeeding = bfeeding;
	this.pregnant = pregnant;
}
 
//UserGoals Class Definition
function UserGoals (goalWeight, totalChange, weeklyChange) {
    this.goalWeight = goalWeight;
    this.totalChange = totalChange;
    this.weeklyChange = weeklyChange;
}

//Plan Class Definition
function Plan () {
    this.weight = 0;
    this.goalWeight = 0;
	this.totalLoss = (this.weight - this.goalWeight);
	this.totalDeficit = (this.totalLoss * 3500);
    this.expectedLossPerWeek = 0;
	this.startDate = 0;
	this.daysToGoal = 0;
	this.goalDate = 0;
	this.BMR = 0;  //BMR not adjusted for activity, primarily for testing
	this.adjustedBMR = 0;
	this.dailyAllowedCalories = 0;
	this.dailyCalorieDeficit = 0;
	this.adjustedDailyDeficit = 0;
}

// *******************************
//           Unit Tests
// *******************************

//Test case #1 - tests class initialization for UserStats class
function unitTest_1(w, h, a, s){
	
	var testWeight = w;
	var testHeight = h;
	var testAge = a;
	var testSex = s;
	
	//Initialize new object instance
	var testClass = new UserStats(
							testWeight,
							testHeight,
							testAge,
							0,
							false,
							testSex,
							false,
							false);
							
	//Generate random number 1-4 to choose randomly from important object member variables
	var randomNum = Math.floor(Math.random() * 4) + 1;
	
	//Assign value in that object member variable to classVal
	if(randomNum == 1){
		var classVal = UserStats.weight;
	}
	else if(randomNum == 2){
		var classVal = UserStats.height;
	}
	else if(randomNum == 3){
		var classVal = UserStats.age;
	}
	else if(randomNum == 4){
		var classVal = UserStats.sex;
	}
	else{
		console.log("Test Failed");
		return 1;
	}
	
	//Identify which variable is under test
	var valUnderTest = randomNum;
	
	//Compare classval to hard-coded value it should contain
	if(valUnderTest == 1){
		classVal == testWeight;
	}
	else if(valUnderTest == 2){
		classVal == testHeight;
	}
	else if(valUnderTest == 3){
		classVal == testAge;
	}
	else if(valUnderTest == 4){
		classVal == testSex;
	}
	else{
		console.log("Test Failed, value under test: "+valUnderTest);
		return 1;
	}
	
	//if execution reaches here, test was successful:
	console.log("Test succeeded, value under test: "+valUnderTest);
	return 0;
}

//Test case #2 - tests class initialization for UserGoals class
function unitTest_2(gw, tc, dw){
	
	var testGoalWeight = gw;
	var testTotalChange = tc;
	var testWeeklyChange = dw;
	
	//Initialize new object instance
	var testClass = new UserGoals(
							testGoalWeight,    //goal weight
							testTotalChange,		// total change
							testWeeklyChange		// desired weekly change
							);
							
	//Generate random number 1-3 to choose randomly from important object member variables
	var randomNum = Math.floor(Math.random() * 3) + 1;
	
	//Assign value in that object member variable to classVal
	if(randomNum == 1){
		var classVal = UserGoals.goalWeight;
	}
	else if(randomNum == 2){
		var classVal = UserGoals.totalChange;
	}
	else if(randomNum == 3){
		var classVal = UserGoals.weeklyChange;
	}
	else{
		console.log("Test Failed");
		return 1;
	}
	
	//Identify which variable is under test
	var valUnderTest = randomNum;
	
	//Compare classval to hard-coded value it should contain
	if(valUnderTest == 1){
		classVal == testGoalWeight;
	}
	else if(valUnderTest == 2){
		classVal == testTotalChange;
	}
	else if(valUnderTest == 3){
		classVal == testWeeklyChange;
	}
	else{
		console.log("Test Failed, value under test: "+valUnderTest);
		return 1;
	}
	
	//if execution reaches here, test was successful:
	console.log("Test succeeded, value under test: "+valUnderTest);
	return 0;
}

//Test case #3 - tests BMR calculation (test only involves UserStats object)
function unitTest_3(userStatsObject){
	
	var testSex = userStatsObject.sex;
	var testWeight = userStatsObject.weight;
	var testHeight = userStatsObject.height;
	var testAge = userStatsObject.age;
	
	//Use correct formula based on sex of user
	if(testSex == 'F'){
		var testBMR = 655 + (4.35 * testWeight) + (4.7 * testHeight) - (4.7 * testAge);
	}
	else{
		var testBMR = 66 + (6.23 * testWeight) + (12.7 * testHeight) - (6.8 * testAge);
	}
	
	//console.log("Test calculated BMR: "+testBMR);
		
	//call caloricNeedsAlgorithm with dummy goals object to get BMR calculation
	var testGoals = new UserGoals(0, 0, 0);
	
	var functionPlan = new Plan();
	
	var functionPlan = caloricNeedsAlgorithm(userStatsObject, UserGoals);
	
	var functionBMR = functionPlan.BMR;

	//testBMR to BMR returned in Plan object
	if(testBMR != functionBMR){
		console.log("Test failed, BMRs do not match");
		return 1;
	}
	else{
		console.log("Test succeeded");
		return 0;
	}
}

//Test case #4 - total deficit calculation (test only involves UserGoals object)
function unitTest_4(userGoalsObject){
	
	var testTotalChange = userGoalsObject.totalChange;
		//console.log(userGoalsObject.totalChange);
	
	//calculate what the total calorie deficit to goal should be
	testDeficit = testTotalChange * 3500;
	
		
	//call caloricNeedsAlgorithm with dummy stats object to get total weight loss calculation
	var testStats = new UserStats(0, 0, 0, 0, 0, 0, 0, 0);
	
	var functionPlan = caloricNeedsAlgorithm(UserStats, userGoalsObject);
	
	//calculate the deficit
	var functionDeficit = (functionPlan.totalDeficit);

	//compare testDeficit to deficit returned in Plan object
	if(testDeficit != functionDeficit){
		console.log("Test failed, calorie deficits do not match");
		return 1;
	}
	else{
		console.log("Test succeeded");
		return 0;
	}
}

//Test case #5 - daily deficit calculation
function unitTest_5(userStatsObject, userGoalsObject){
	
	//get goal weight
	var testGoalWeight = userGoalsObject.goalWeight;
	
	//get BMR at starting weight:
	var testSex = userStatsObject.sex;
	var testWeight = userStatsObject.weight;
	var testHeight = userStatsObject.height;
	var testAge = userStatsObject.age;
	
	//Use correct formula based on sex of user
	if(testSex == 'F'){
		var testBMR = 655 + (4.35 * testWeight) + (4.7 * testHeight) - (4.7 * testAge);
	}
	else{
		var testBMR = 66 + (6.23 * testWeight) + (12.7 * testHeight) - (6.8 * testAge);
	}
	
	//Get BMR at goal weight
	//Use correct formula based on sex of user. Add 6 months to time because that's what we do in function
	if(testSex == 'F'){
		var testGoalBMR = 655 + (4.35 * testGoalWeight) + (4.7 * testHeight) - (4.7 * (testAge + .5));
	}
	else{
		var testGoalBMR = 66 + (6.23 * testGoalWeight) + (12.7 * testHeight) - (6.8 * (testAge + .5));
	}
	
	var diffDeficit = testBMR - testGoalBMR;
	
	functionPlan = caloricNeedsAlgorithm(userStatsObject, userGoalsObject);
	
	//retrieve calculated deficit from plan object -- this is the UNADJUSTED deficit value.
	var functionPlanDailyDef = functionPlan.dailyCalorieDeficit;
	
	//compare testDeficit to deficit returned in Plan object
	if(diffDeficit != functionPlanDailyDef){
		console.log("Test failed, daily calorie deficits do not match");
		return 1;
	}
	else{
		console.log("Test succeeded");
		return 0;
	}
}


//Caloric Needs Function Definition

function caloricNeedsAlgorithm(userStatsObject, userGoalsObject){
	
	//Get current user BMR
	//(Source: http://www.bmi-calculator.net/bmr-calculator/bmr-formula.php)
	//Use correct formula based on sex of user
	
	if(userStatsObject.sex == 'F'){
		var BMR = 655 + (4.35 * userStatsObject.weight) + (4.7 * userStatsObject.height) - (4.7 * userStatsObject.age);
	}
	else{
		var BMR = 66 + (6.23 * userStatsObject.weight) + (12.7 * userStatsObject.height) - (6.8 * userStatsObject.age);
	}
	
	//Get goal weight user BMR
	//add 6 months to age (optimistic thinking!)
	if(userStatsObject.sex == 'F'){
		var GoalBMR = 655 + (4.35 * userGoalsObject.goalWeight) + (4.7 * userStatsObject.height) - (4.7 * (userStatsObject.age + .5));
	}
	else{
		var GoalBMR = 66 + (6.23 * userGoalsObject.goalWeight) + (12.7 * userStatsObject.height) - (6.8 * (userStatsObject.age + .5));
	}
	
	
	//apply activity level multiplier
	//source (http://www.sparkpeople.com/resource/nutrition_articles.asp?id=1940)
	if(userStatsObject.activityLvl == 0){
		adjustedBMR = BMR * 1;
		GoalBMR = GoalBMR * 1;
	}
	if(userStatsObject.activityLvl == 1){
		adjustedBMR = BMR * 1.2;
		GoalBMR = GoalBMR * 1.2;
	}
	if(userStatsObject.activityLvl == 2){
		adjustedBMR = BMR * 1.375;
		GoalBMR = GoalBMR * 1.375;
	}
	if(userStatsObject.activityLvl == 3){
		adjustedBMR = BMR * 1.55;
		GoalBMR = GoalBMR * 1.55;
	}
	

	var dailyDeficit = (BMR - GoalBMR); //(Idea is that we start by thinking about the amount the user will need to eat daily after their weight loss (i.e. maintenance calories), then make changes to that calorie number based on the speed of loss they are looking for.)
	
	//get TOTAL calorie deficit needed for weight loss
	var totalDeficit = (userGoalsObject.totalChange * 3500);

	var weeklyLoss = (dailyDeficit * 7) / 3500; //weekly loss in lbs
	
	//if they want a slower loss than our base, give them a deficit to meet their needs:
	if(weeklyLoss > userGoalsObject.weeklyChange){
		var adjustedDailyDeficit = (userGoalsObject.weeklyChange * 3500)/7;
	}
	//if our projected speed is the same as their goal, leave it the same
	else if(weeklyLoss == userGoalsObject.weeklyChange){
		adjustedDailyDeficit = dailyDeficit;
	}
	//Otherwise, speed up our projection as much as is reasonable
	else{
		var userDesiredDeficit = (userGoalsObject.weeklyChange * 3500)/7;
		if(BMR - userDesiredDeficit < 1200){
			//we're not going to let users consume fewer than 1200 calories per day. 
			//so, calculate their absolute MAX deficit:
			var maxDef = BMR - 1200;
			adjustedDailyDeficit = maxDef;
			weeklyLoss = 3500 / (maxDef * 7);
		}
		else{
			var adjustedDailyDeficit = (userGoalsObject.weeklyChange * 3500)/7;
		}
	}
	
	//calculate daily allowed calories
	var allowedCals = adjustedBMR - adjustedDailyDeficit;
		
	//Calculate loss per week with our new numbers
	var lossPerWeek = (adjustedDailyDeficit * 7) * 3500;
	
	//Divide total deficit by daily deficit to get number of days to goal
	var daysToGoal = totalDeficit/adjustedDailyDeficit;
	
	//Get current date as a date object:
	var currentDate = new Date();
	var day = currentDate.getDate();
	var month = currentDate.getMonth() + 1;
	var year = currentDate.getFullYear();
	
	//Increment it with function
	var goalEndDate = currentDate.addDays(daysToGoal);
	
	//build Plan object to return
	var userPlan = new Plan();
	
	userPlan.weight = userStatsObject.weight;
    userPlan.goalWeight = userGoalsObject.goalWeight;
	userPlan.totalLoss = (userPlan.weight - userPlan.goalWeight);
	userPlan.totalDeficit = totalDeficit;
    userPlan.expectedLossPerWeek = weeklyLoss;
	userPlan.startDate = currentDate;
	userPlan.daysToGoal = daysToGoal;
	userPlan.goalDate = goalEndDate;
	userPlan.BMR = BMR;
	userPlan.adjustedBMR = adjustedBMR;
	userPlan.dailyAllowedCalories = allowedCals;
	userPlan.dailyCalorieDeficit = dailyDeficit;
	userPlan.adjustedDailyDeficit = adjustedDailyDeficit;
	
	return userPlan;
}

//*********************************
//    Date Incrementor Function
//*********************************

Date.prototype.addDays = function(days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}

//Build testable classes
var Stats = new UserStats(	300,
							61,
							40,
							0,
							false,
							'F',
							false,
							false);
							
var Goals = new UserGoals(  120,
							40,
							4
							);
							

console.log("Run all tests:");

console.log("\nTest #1:");
unitTest_1(200, 63, 25, 'M');

console.log("\nTest #2:");
unitTest_2(150, 50, 2);

console.log("\nTest #3:");
unitTest_3(Stats);

console.log("\nTest #4:");
unitTest_4(Goals);

console.log("\nTest #5:");
unitTest_5(Stats, Goals);

console.log("end Test.");