const { assertEquals } = require(`./testing-framework`);
const Airport = require(`../src/Airport`);
const Airplane = require(`../src/Airplane`);

let expected;
let actual;
let result;
let airplane;
let airport;
let weather;


console.log(`Test 1 - landPlane lands a plane in the airport`);
//Arrange 
weather = 0.1;
airport = new Airport();
airplane = new Airplane("plane1");
expected = 1;

//Act
airport.landPlane(weather, airplane);
actual = airport.airportPlanes.length;


// Assert
result = assertEquals(expected, actual);
console.log(`Test 1: plane to be landed: ${result}`)


// Clean up
airplane = null;
airport = null;
actual = undefined;
result = undefined;
expected = undefined;
weather = undefined;

console.log(`Test 2 - A plane needs to take off so long as it is in the airport`);

//Arrange 
weather = 0.1;
airport = new Airport();
airplane = new Airplane("plane1");
//Expecting 0 since even if weather is good, plane will land and then take off again, leaving 0 planes in airport:
expected = 0;

//Act
airport.airportPlanes.push(airplane);
airport.flyPlane(weather, airplane);

actual = airport.airportPlanes.length;

// Assert
result = assertEquals(expected, actual);
console.log(`Test 2: plane to fly: ${result}`)

// Clean up
airplane = null;
airport = null;
actual = undefined;
result = undefined;
expected = undefined;
weather = undefined;

console.log(`Test 3 - A specific plane can't land if it's already in the airport but other ones can`);

//Arrange 
weather = 0.1;
airport = new Airport();
airplane1 = new Airplane("plane1");
airplane2 = new Airplane("plane2");
airplane3 = new Airplane("plane3");
expected = 3;


//Act
airport.landPlane(weather, airplane1);
airport.landPlane(weather, airplane2);
airport.landPlane(weather, airplane2);
airport.landPlane(weather, airplane3);
airport.landPlane(weather, airplane3);
actual = airport.airportPlanes.length;

// Assert
result = assertEquals(expected, actual);
console.log(`Test 3: same plane can't land more than once but different ones can: ${result}`)

// Clean up
airplane = null;
airport = null;
actual = undefined;
result = undefined;
expected = undefined;
weather = undefined;

console.log(`Test 4 - The same plane can't take off if it's already left the airport but other planes can.`);


//Arrange 
weather = 0.1;
airport = new Airport();
airplane1 = new Airplane("plane1");
airplane2 = new Airplane("plane2");
airplane3 = new Airplane("plane3");
airplane4 = new Airplane("plane4");

expected = 2;


//Act
airport.airportPlanes.push(airplane1);
airport.airportPlanes.push(airplane2);
airport.airportPlanes.push(airplane3);
airport.airportPlanes.push(airplane4);
airport.flyPlane(weather, airplane1);
airport.flyPlane(weather, airplane2);
airport.flyPlane(weather, airplane2);
airport.flyPlane(weather, airplane1);
actual = airport.airportPlanes.length;
// Assert
result = assertEquals(expected, actual);
console.log(`Test 4: same plane can't depart twice or more but different ones can leave: ${result}`)

// Clean up
airplane = null;
airport = null;
actual = undefined;
result = undefined;
expected = undefined;
weather = undefined;


console.log(`Test 5 - The same plane needs to be able to land and then fly again if the weather isn't stormy.`);


//Arrange 
weather = 0.1;
airport = new Airport();
airplane1 = new Airplane("plane1");
expected = 0;


//Act
airport.landPlane(weather, airplane1);
airport.flyPlane(weather, airplane1);

actual = airport.airportPlanes.length;
// Assert
result = assertEquals(expected, actual);
console.log(`Test 5: same plane to land and then fly in decent weather: ${result}`)

// Clean up
airplane = null;
airport = null;
actual = undefined;
result = undefined;
expected = undefined;
weather = undefined;

console.log(`Test 6 - The airport shouldn't admit any object other than a plane.`);

//Arrange 
weather = 0.1;
airport = new Airport();
stringDummy = new String("dummy1");
expected = 0;

//Act
airport.landPlane(weather, stringDummy);
actual = airport.airportPlanes.length;


//Assert
result = assertEquals(expected, actual);
console.log(`Test 6: airport should only land planes ${result}`)

// Clean up
airplane = null;
airport = null;
actual = undefined;
result = undefined;
expected = undefined;
weather = undefined;


console.log(`Test 7 - The airport shouldn't admit a plane in stormy weather.`);

//Arrange 
weather = 0.9;
airport = new Airport();
airplane1 = new Airplane("plane1");
expected = 0;

//Act
airport.landPlane(weather, airplane1);
actual = airport.airportPlanes.length;

//Assert
result = assertEquals(expected, actual);
console.log(`Test 7: no landing in stormy weather ${result}`)

// Clean up
airplane = null;
airport = null;
actual = undefined;
result = undefined;
expected = undefined;
weather = undefined;


console.log(`Test 8 - The airport shouldn't let a plane fly in stormy weather.`);

//Arrange 
airplane = new Airplane("plane1");
airport = new Airport();
airport.airportPlanes.push(airplane);
expected = 1;
weather = 0.9;

//Act
airport.flyPlane(weather, airplane);
actual = airport.airportPlanes.length;
console.log(actual);
//Assert
result = assertEquals(expected, actual);
console.log(`Test 8: no flying in stormy weather ${result}`)

// Clean up
airplane = null;
airport = null;
actual = undefined;
result = undefined;
expected = undefined;
weather = undefined;

console.log(`Test 9 - The airport shouldn't let a plane fly if it is stationed at another airport.`);

//Arrange 
airplane1 = new Airplane("plane1");
airport1 = new Airport();
airport2 = new Airport();
airport1.landPlane(weather, airplane1);
expected = 1;
weather = 0.1;

//Act
airport2.landPlane(weather, airplane1);
actual = airport2.airportPlanes.length;
console.log(actual);
//Assert
result = assertEquals(expected, actual);
console.log(`Test 9: no flying of planes in other airports ${result}`)
