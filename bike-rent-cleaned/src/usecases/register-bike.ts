import { Bike } from "../domain/bike";
import { BikeRepo } from "../ports/bike-repo";


export class RegisterBike {

    constructor (
        readonly bikeRepo: BikeRepo
    ){}

    async registerBike(bike: Bike): Promise<string> {
        return await this.bikeRepo.add(bike)
    }
}