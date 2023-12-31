import { Bike } from "./domain/bike";
import { CryptPassword } from "./ports/crypt-password";
import { User } from "./domain/user";
import { Location } from "./domain/location";
import { RentRepo } from "./ports/rent-repo";
import { UserRepo } from "./ports/user-repo";
import { BikeRepo } from "./ports/bike-repo";
import { FindUser } from "./usecases/find-user";
import { RegisterUser } from "./usecases/register-user";
import { Authenticate } from "./usecases/authenticate";
import { RegisterBike } from "./usecases/register-bike";
import { RemoveUser } from "./usecases/remove-user";
import { RentBike } from "./usecases/rent-bike";
import { ReturnBike } from "./usecases/return-bike";
import { ListUsers } from "./usecases/list-users";
import { ListBikes } from "./usecases/list-bikes";
import { MoveBikeTo } from "./usecases/move-bike-to";
import { FindBike } from "./usecases/find-bike";

export class App {

    constructor(
        readonly userRepo: UserRepo,
        readonly bikeRepo: BikeRepo,
        readonly rentRepo: RentRepo,
        readonly crypt: CryptPassword
    ) {}

    async findUser(email: string): Promise<User> {
        return await new FindUser(this.userRepo).findUser(email)
    }

    async registerUser(user: User): Promise<string> {
        return await new RegisterUser(this.userRepo).registerUser(user)
    }

    async authenticate(userEmail: string, password: string): Promise<boolean> {
        return await new Authenticate(this.userRepo, this.crypt).authenticate(userEmail, password)
    }

    async registerBike(bike: Bike): Promise<string> {
        return await new RegisterBike(this.bikeRepo).registerBike(bike)
    }

    async removeUser(email: string): Promise<void> {
        await new RemoveUser(this.userRepo, this.rentRepo).removeUser(email)
    }
    
    async rentBike(bikeId: string, userEmail: string): Promise<string> {
        return await new RentBike(this.bikeRepo, this.userRepo, this.rentRepo).rentBike(bikeId, userEmail)
    }

    async returnBike(bikeId: string, userEmail: string): Promise<number> {
        return await new ReturnBike(this.bikeRepo, this.rentRepo).returnBike(bikeId, userEmail)
    }

    async listUsers(): Promise<User[]> {
        return await new ListUsers(this.userRepo).listUsers()
    }

    async listBikes(): Promise<Bike[]> {
        return await new ListBikes(this.bikeRepo).listBikes()
    }

    async moveBikeTo(bikeId: string, location: Location) {
        await new MoveBikeTo(this.bikeRepo).moveBikeTo(bikeId, location)
    }

    async findBike(bikeId: string): Promise<Bike> {
        return await new FindBike(this.bikeRepo).findBike(bikeId)
    }
}