(function(){
    type electricVehicle = {
        Model_Specifications:string,
        range:number,
        batteryPerformance:boolean
    };
    interface Quality_Inspection{
        validation:number;
        rangeTest:boolean;
        batteryTest:boolean;
        test():void;
        Result():string;
    }
    interface category extends electricVehicle {
        Model_Specifications:string,
        Manufacturing_date:Date,
        price:number,
        displayInstructions():string;
    }
    class deliveryResults implements Quality_Inspection {
        batteryTest: boolean;
        rangeTest: boolean;
        validation: number;
        constructor(batteryTest: boolean, rangeTest: boolean, validation: number) {
            this.batteryTest = batteryTest;
            this.rangeTest = rangeTest;
            this.validation = validation;
        }
        Result():string {
            return `batterTest: ${this.batteryTest.toString()}\n`+
                `rangeTest: ${this.rangeTest.toString()}\n`+
                `validation: ${this.validation}`;
        }
        test() {
            console.log("Quality qualified");
        }

    }
    class vehicleReportInstructions implements category {
        Manufacturing_date: Date;
        Model_Specifications: string;
        batteryPerformance: boolean;
        price: number;
        range: number;
        constructor(Manufacturing_date: Date,Model_Specifications:string,batteryPerformance:boolean,price:number,range:number) {
            this.Manufacturing_date = Manufacturing_date;
            this.Model_Specifications = Model_Specifications;
            this.batteryPerformance = batteryPerformance;
            this.price = price;
            this.range = range;
        }
        displayInstructions(): string {
            return `Manufacturing date: ${this.Manufacturing_date.toISOString()}\n` +
                `Model Specifications: ${this.Model_Specifications}\n` +
                `Battery performance: ${this.batteryPerformance}\n` +
                `Price: ${this.price}\n` +
                `Range: ${this.range}`;
        }
    }

    type UserActivation = {
        user_id: string;
        user_name: string;
        email: string;
        password: string;
        ipAddress: string;
    };

    interface userLogger {
        LoginStatus: (user_email: string, password: string) => boolean;
        isAuthenticated: (user_id: string) => boolean;
        isAdmin: (user_id: string) => boolean;
        isBot: (ipAddress:string) => boolean;
    }
    interface server {
        currentState:boolean;
        Port: number;
        Protocol:number;
        start():void;
        stop():void;
    }
    interface Database extends UserActivation {

    }
    class returnResponse implements userLogger {
        private users: UserActivation[];

        constructor(users: UserActivation[]) {
            this.users = users;
        }

        LoginStatus(user_email: string, password: string): boolean {
            const user = this.users.find(
                u => u.email === user_email && u.password === password
            );
            return user !== undefined;
        }

        isAuthenticated(user_id: string): boolean {
            const user = this.users.find(u => u.user_id === user_id);
            return user !== undefined;
        }

        isAdmin(user_id: string): boolean {
            return user_id.startsWith("admin_");
        }

        isBot(ipAddress: string): boolean {
            const blockedIps = ["127.0.0.2", "10.0.0.1"];
            return blockedIps.includes(ipAddress);
        }
    }
    class checkInfo implements server {
        currentState: boolean;
        Port: number;
        Protocol: number;

        constructor(Port: number, Protocol: number, currentState: boolean = false) {
            this.Port = Port;
            this.Protocol = Protocol;
            this.currentState = currentState;
        }

        start(): void {
            this.currentState = true;
            console.log(`Server started on port ${this.Port} with protocol ${this.Protocol}`);
        }

        stop(): void {
            this.currentState = false;
            console.log("Server stopped");
        }
    }
    const userData: UserActivation[] = [
        {
            user_id: "admin_1",
            user_name: "Alice",
            email: "alice@test.com",
            password: "123456",
            ipAddress: "127.0.0.1"
        },
        {
            user_id: "user_2",
            user_name: "Bob",
            email: "bob@test.com",
            password: "abcdef",
            ipAddress: "10.0.0.1"
        }
    ];

    const logger = new returnResponse(userData);
    console.log("login alice:", logger.LoginStatus("alice@test.com", "123456"));
    console.log("alice is admin:", logger.isAdmin("admin_1"));
    console.log("bob is bot:", logger.isBot("10.0.0.1"));

    const serverInfo = new checkInfo(8080, 4);
    serverInfo.start();
    serverInfo.stop();

    const vehicle1 = new vehicleReportInstructions(
        new Date("2024-01-01"),
        "Model X Performance",
        true,
        500000,
        600
    );

    console.log(vehicle1.displayInstructions());
    console.log("Model_Specifications:", vehicle1.Model_Specifications);
    console.log("range:", vehicle1.range);
    console.log("batteryPerformance:", vehicle1.batteryPerformance);
})();