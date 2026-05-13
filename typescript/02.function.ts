class person {

    //Define instance properties
    name:string="John";
    age:number=28;
}
const person1 = new person();
console.log(person1);
console.log(person1.name,person1.age);

class MyClass {
    static readonly x:number=0;
    static printX() {
        console.log(MyClass.x)
    }
}
console.log(MyClass.x);
MyClass.printX();

class Greeter {
    public name: string="Hello";

    constructor(othername?: string) {
        if (othername !== undefined) {
            this.name = othername;
        }
    }
}
const newValue = new Greeter();
newValue.name="World";
console.log(newValue.name);

class Point {
    x:number;
    y:number;
    constructor(x:number=2,y:number=4) {
        this.x = x;
        this.y = y;
    }
}
const point1 = new Point();
const point2=new Point(3,5);
console.log(point1.x,point1.y);
console.log(point2.x,point2.y);

class Battery {
    protected current_capacity: number;
    readonly Maximumcapacity: number;
    public performance: boolean;

    constructor(current_capacity: number, Maximumcapacity: number, performance: boolean) {
        this.current_capacity = current_capacity;
        this.Maximumcapacity = Maximumcapacity;
        this.performance = performance;
    }
    charge(){
        console.error("Battery maximum capacity is too low");
    }
    success(){
        console.log("Battery capacity is normal");
    }
}
    const NewBattery=new Battery(90,100,true);
    const OldBattery=new Battery(70,100,false);
    OldBattery.charge();
    NewBattery.success();

class point {
    constructor(public x: number, public y: number) {}
}

function CreatePoint(fn: (p: point) => void): void {
    fn(new point(10, 9));
}

function distance(p: point): void {
    console.log(p);
}

CreatePoint(distance);

class Point1 {
    constructor(public x: number, public y: number) {}
}

function CreatePoint1(fn: (d: number) => void): void {
    const p = new Point1(7, 20);
    fn(p.x);
}

function distance1(d: number): void {
    console.log(d);
}

CreatePoint1(distance1);


/*** Call Signature ***/
type ProductQuantity = {
    inspection: string;
    value: number;
    (validation: number): boolean;
};

function Qualification_inspection(fn: ProductQuantity): void {
    console.log(fn.inspection + " returned " + fn(10));
}

const StandardQualification: ProductQuantity = (validation: number): boolean => {
    return validation > 5;
};

StandardQualification.inspection = "Quality inspection qualified";
StandardQualification.value = 0;

Qualification_inspection(StandardQualification);










