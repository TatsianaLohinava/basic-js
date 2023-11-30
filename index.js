// Write a function that receives a number as a parameter (123456) and returns a String (“1+2+3+4+5+6”) as output.

function transformToString(num) {
    return num.toString().split('').join('+');
}

console.log(transformToString(123456));

/* Create a function that receives a String as a parameter and return True or False if the String is a Pangram. 
(“The quick brown fox jumps over the lazy dog”).*/

function checkIsPangram(string) {
    const alphabetArr = 'abcdefghijklmnopqrstuvwxyz'.split("");
    return alphabetArr.every(letter => string.toLowerCase().includes(letter))
}

console.log(checkIsPangram('The quick brown fox jumps over the lazy dog'));

// Write a function that checks if two Strings are Anagrams. (“Thomas Edison”, “notes said ‘Ohm’“)

function checkIsAnagram(string1, string2) {
    function turnToArray(string) {
        return string.toLowerCase().split('')
            .filter(item => item
                .match(/[a-z]/))
            .sort();
    }
    const arr1 = turnToArray(string1);
    const arr2 = turnToArray(string2);

    return arr1.filter((item, index) => item === arr2[index]).length === arr2.length;
}

console.log(checkIsAnagram('Thomas Edison', 'notes said "Ohm"'));

/* Create a class Person and create 3 objects with name, age and address (Names: John, Anna, Rocky, Aviva).
Assign those 3 objects into an array and sort them by descending age. Then create a function that will
receive the array of objects as argument and return an array of boolean depending on if the name is a
palindrome or not (Expected result: [John: false, Anna: true, Rocky: false, Aviva: true]). */

class Person {
    constructor(name, age, address) {
        this.name = name;
        this.age = age;
        this.address = address;
    }
}

const person1 = new Person('John', 30, 'NY');
const person2 = new Person('Anna', 31, 'Philadelphia');
const person3 = new Person('Aviva', 32, 'Chicago');
const person4 = new Person('Rocky', 25, 'Ottawa');

const personArray = Array.of(person1, person2, person3, person4);

const sortedArray = personArray.sort((a, b) => b.age - a.age);

function checkHasPalindrome(array) {
    return array.map(item => {
        const lowercaseName = item.name.toLowerCase();
        const isPalindrome = lowercaseName === lowercaseName.split('').reverse().join('');
        return `${item.name}: ${isPalindrome}`
    })
}

console.log(checkHasPalindrome(sortedArray))

// Given this input: “3[asdf]” you have to generate an output string: “asdfasdfasdf”

function generateString(string) {
    return string.match(/[a-z]/g).join('').repeat(string.match(/\d/));
}

console.log(generateString('3[asdf]'));

// Given this input: “3[as2[df]]2[gh]” you have to generate an output string: “asdfdfasdfdfasdfdfghgh”

function generateFromNestedString(string) {
    function getMatch(string) {
        return string.match(/\d\[[^\]]*\]/g)
    }
    const matchedArray = getMatch(string);

    return matchedArray.map(item => {

        const nestedMatch = getMatch(item.slice(2));

        if (nestedMatch) {
            nestedMatch.map(nestedItem => item = item.replace(nestedItem, generateFromNestedString(nestedItem)))
        }
        return generateString(item);
    }).join('');
}

console.log(generateFromNestedString('3[as2[df]]2[gh]'))

// Challenges from Nov 24th

/* You are going to be given a word. Your job is to return the middle character of the word. 
If the word's length is odd, return the middle character. 
If the word's length is even, return the middle 2 characters.

#Examples:
getMiddle("test") should return "es"
getMiddle("testing") should return "t"
getMiddle("middle") should return "dd"
getMiddle("A") should return "A" */

function getMiddle(string) {
    let cutString = string;
    while (cutString.length > 2) {
        cutString = getMiddle(cutString.slice(1, -1))
    }
    return cutString;
}

console.log(getMiddle("testing"))
console.log(getMiddle("test"))
console.log(getMiddle("middle"))
console.log(getMiddle("A"))

/*Create the function prefill that returns an array of n elements that all have the same value v. See if you can do this without using a loop.

You have to validate input:

    v can be anything (primitive or otherwise)
    if v is omitted, fill the array with undefined
    if n is 0, return an empty array
    if n is anything other than an integer or integer-formatted string (e.g. '123') that is >=0, throw a TypeError

When throwing a TypeError, the message should be n is invalid, where you replace n for the actual value passed to the function.

Code Examples

    prefill(3,1) --> [1,1,1]
    
    prefill(2,"abc") --> ['abc','abc']
    
    prefill("1", 1) --> [1]
    
    prefill(3, prefill(2,'2d'))
      --> [['2d','2d'],['2d','2d'],['2d','2d']]
      
    prefill("xyz", 1)
      --> throws TypeError with message "xyz is invalid" */

function prefill(n, v) {
    if (isNaN(n) || n < 0) {
        throw new TypeError(`${n} is invalid`)
    } else {
        return Array(n).fill(v);
    }

}

console.log(prefill(3, 1));
console.log(prefill(2, "abc"))
console.log(prefill("1", 1))
console.log(prefill(3, prefill(2, '2d')))
console.log(prefill("0", 1))
console.log(prefill(3))
// console.log(prefill("-1", 1))

/* Make a Cat constructor that takes arguments name and weight to instantiate a new cat object. 
The constructor should also have an averageWeight method that returns the average weight of cats created with the constructor.

garfield = new Cat('garfield', 25);
averageWeight(); // 25

felix = new Cat('felix', 15);
averageWeight();   // now 20

Cats can change weight. Use Object.defineProperty to write custom setters and getters for the weight 
property so that the following works properly even as instances change their weight value:

felix.weight = 25;
felix.weight // 25
averageWeight(); // now 25

Throw an error if name or weight not specified when invoking the constructor.

averageWeight() method should give the average weight of all cat instances created with Cat, 
even after if the instance's properties have changed. */

const Cat = (function () {
    let count = 0;
    let weightSum = 0;
    let calculatedWeight = 0;

    function InnerConstructor(name, weight) {
        if (!name || !weight) {
            throw new Error('Please specify both name and weight');
        }

        this.name = name;

        count++;

        Object.defineProperty(this, 'weight', {
            get() {
                return this.catWeight || 0;
            },
            set(value) {
                weightSum = weightSum - this.weight + value;
                calculatedWeight = weightSum / count;
                this.catWeight = value;
            },
        })
        this.weight = weight;

    }
    InnerConstructor.averageWeight = () => calculatedWeight;

    return InnerConstructor;
})();

const garfield = new Cat('garfield', 25);
console.log('avg weight:', Cat.averageWeight())
const felix = new Cat('felix', 15);
console.log('avg weight:', Cat.averageWeight())
felix.weight = 30;
console.log('avg weight:', Cat.averageWeight())