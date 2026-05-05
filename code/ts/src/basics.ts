let myName: any = "Max";

let age: number = 30;
let isTrue: boolean = true;

let fruits = ["Apfel", "Banane", "Orange"];

let arr: number[] = [1, 2, 4];

type MySpecialArr = (string | number)[];

let fruitsNumbers: MySpecialArr = ["string", 10, 1];

let xyz: number = 124;

type Person = {
  readonly name: string;
  /** When were you born? */
  age: number;
  isStudent?: boolean;
};

let newPerson: Person = {
  name: "test",
  age: 10,
  // isStudent: undefined
};

type RollDiceNumber = 1 | 2 | 3;

type Student2 = Person & { studentId: number };

interface Student extends Person {
  studentId: number;
}

let person: Person = { name: "Max", age: 30 };

person.pkid = "Eva";

console.log(person.isStudent?.toString());
let person2: Person | undefined = { name: "Max", age: 30, isStudent: true };
let person3: Student = { studentId: 100, ...person };

let undefinedVar: undefined;
let nullVar: null = null;
