export{}
const a:number = 0;
const b:number = 1;
const name:string = "TypeScript";
const c:boolean = false;
const d:boolean = true;
console.log(a,b,c,d,name);

//union type
let x:"male" | "female";
x="female";
x="male";
console.log(x);

let z:boolean | string;
z=true;
z="male";
z="female";
console.log(z);

//unknown :Type-safe any
let q :unknown;
q=true;
q="sunny";
q=100;
q=a;
console.log(q);

//void | null | undefined | never
let v:null | undefined;
function fn():void{}
function fn2():never{
    throw new Error("Unknown error");
}
console.log(v);
console.log(fn);
console.log(fn2);

//any
let g:any;
g=q;
g="male";
g=999;
console.log(g);


let s:string;
/**if (typeof name === "string") {
    s=name;
} **/
s=x as string;
// s=<string>x;
console.log(s);

//object
let person: {
    name: string;
    age: number;
    isStudent?: boolean;
};
person = {
    name:"john",
    age: 32,
    isStudent: true,
}
console.log(person);
let weather: {
    name: string;
    temperature: number;
    quality: number;
    windforce: number;
    forecast?: boolean;
};
    weather = {
    name:"Storm",
    temperature:15,
    quality:0.5,
    windforce:10,
    forecast:true,
}
weather.temperature = 5;
console.log(weather);

let f:(m:number,n:number)=>number
f=function (f1:number,f2:number):number{
    return f1 / f2;
}
console.log(f(10,2));

//array
let nums:number[]=[1,2,3,4,5,6];
let letters:string[]=['a','b','c','d','e','f'];
let nums2:Array<number>=[10,20,30,40,50,60];
let letters2:Array<boolean>=[true,false];
let result:Array<object>=[];
console.log(nums);
console.log(letters);
console.log(nums2);
console.log(letters2);
console.log(result);

//tuple
let t:[number,string,boolean?]
t = [123,'hello',false];
console.log(t);
console.log(t[0]);
let volume:[number, number,number];
volume = [10,20,30]
volume[0] = 5;
console.log(volume);

//enum
enum Gender {
    Male="male",
    Female="female",
}
let i:{name:string,gender:Gender};
i = {
    name:"Alice",
    gender:Gender.Female,
}
console.log(i.gender === Gender.Female);
console.log(i);





