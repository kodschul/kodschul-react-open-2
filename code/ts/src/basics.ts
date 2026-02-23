let myName: any = "Max";

let age: number = 30;
let isTrue: boolean = true;

let fruits: string[] = ["Apfel", "Banane", "Orange"];

let arr: number[] = [1, 2, 4];

let fruitsNumbers: (string | number)[] = ["string", 10, 1];

let xyz: number = 124;

type Person = {
  readonly name: string;
  /** When were you born? */
  age: number;
  isStudent?: boolean;
};

interface Student extends Person {
  studentId: number;
}

let person: Person = { name: "Max", age: 30 };

person.name = "Eva";

console.log(person.isStudent?.toString());
let person2: Person | undefined = { name: "Max", age: 30, isStudent: true };
let person3: Student = { studentId: 100, ...person };

let undefinedVar: undefined;
let nullVar: null = null;
