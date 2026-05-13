(function (){
    abstract class galaxy {
        public diameter:number;
        protected distance:number;
        protected angle:number;

        protected constructor(diameter:number, distance:number, angle:number) {
            this.diameter = diameter;
            this.distance = distance;
            this.angle = angle;
        }
    }
    class planet extends galaxy{
        public name: string;
        protected orbital_period:number;
        public Habitability:boolean;

       constructor(
           name: string,
           orbital_period:number,
           Habitability:boolean,
           diameter:number,
           distance:number,
           angle:number,
       ) {
           super(diameter,distance,angle);
           this.name = name;
           this.orbital_period = orbital_period;
           this.Habitability = Habitability;
       }
    }
    class satellite extends galaxy{
        public Rotation_period:number;
        protected orbital_period:number;

        constructor(
            Rotation_period:number,
            orbital_period:number,
            diameter:number,
            distance:number,
            angle:number,
        ) {
            super(diameter,distance,angle);
            this.Rotation_period = Rotation_period;
            this.orbital_period = orbital_period;
        }
    }

    /***Encapsulation of properties***/
    abstract class companyDatabase {
        public userId:string;
        protected userPassword:number;
        protected userEmail:string;
        public userPasswordConfirmation:number;
        public userPasswordReset:number;
        public userPasswordResetConfirmation:number;
        protected userLoginConfirmation:number;
        protected userAuthentication:boolean;

        protected constructor(
            userId:string,
            userPassword:number,
            userEmail:string,
            userPasswordConfirmation:number,
            userPasswordReset:number,
            userPasswordResetConfirmation:number,
            userLoginConfirmation:number,
            userAuthentication:boolean,
        ){
            this.userId=`${userId}`;
            this.userPassword = 1234;
            this.userEmail = `wsk293821@outlook.com`;
            this.userPasswordConfirmation = 1;
            this.userPasswordReset = 2;
            this.userPasswordResetConfirmation = 3;
            this.userPasswordResetConfirmation = 4;
            this.userLoginConfirmation = 5;
            this.userAuthentication = true;
        }
        public AccessPermission():boolean {
            return this.userAuthentication;
        }
    }

    interface ResponseResult extends companyDatabase {
        HTTPStatus: number;
        NetworkStatus: boolean;
        FireWallStatus: boolean;
    }

    class PrintResult extends companyDatabase implements ResponseResult {
        public HTTPStatus: number;
        public NetworkStatus: boolean;
        public FireWallStatus: boolean;

        constructor(
            HTTPStatus: number,
            userId: string,
            userPassword: number,
            userEmail: string,
        ) {
            super(
                userId,
                userPassword,
                userEmail,
                1,   // userPasswordConfirmation
                2,   // userPasswordReset
                3,   // userPasswordResetConfirmation
                5,   // userLoginConfirmation
                true // userAuthentication
            );

            this.HTTPStatus = HTTPStatus;
            this.NetworkStatus = true;
            this.FireWallStatus = true;
        }

        public AccessPermission(): boolean {
            const isSuccessStatus =
                this.HTTPStatus >= 200 && this.HTTPStatus < 300;

            return isSuccessStatus && this.userAuthentication;
        }
    }

})();