let myArray = [
    [1, 2, 3],
    [0, 0, 0]
];
let a = 1;

let myObj = {1: myArray.map(subArray => [...subArray])};
//myObj[1] = myArray.map(subArray => [...subArray]);

console.log(myArray[0][0], myArray[0][1], myArray[0][2]);
console.log(myObj[1][0][0], myObj[1][0][1], myObj[1][0][2]);

a++;
idx = a - 1;
console.log("a=" + a);
myArray[0][2] = 5;
console.log(myArray[0][2]);

myObj[a] = myArray.map(subArray => [...subArray]);

console.log(myArray[0][0], myArray[0][1], myArray[0][2]);
//console.log(myArray[1][0], myArray[1][1], myArray[1][2]);
console.log(myObj[1][0][0], myObj[1][0][1], myObj[1][0][2]);
console.log(myObj[2][0][0], myObj[2][0][1], myObj[2][0][2]);
console.log(myObj[a][0][2]);