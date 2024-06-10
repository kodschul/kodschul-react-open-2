let myName: any = "Max";

let age: number = 30;
let isTrue: boolean = true;

let fruits: string[] = ["Apfel", "Banane", "Orange"];

let fruitsNumbers = ["string", 10];

type Person = {
  name: string;
  age: number;
  isStudent?: boolean;
};

interface Student extends Person {
  studentId: number;
}

let person: Person = { name: "Max", age: 30 };
let person2: Person | undefined = { name: "Max", age: 30, isStudent: true };
let person3: Student = { studentId: 100, ...person };

let undefinedVar: undefined;
let nullVar: null = null;
