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
