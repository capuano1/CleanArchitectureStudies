import { Bike } from "../domain/bike";
import { BikeNotFoundError } from "../errors/bike-not-found-error";
import { BikeRepo } from "../ports/bike-repo";


export class FindBike {

    constructor (
        readonly bikeRepo: BikeRepo
    ){}

    async findBike(bikeId: string): Promise<Bike> {
        const bike = await this.bikeRepo.find(bikeId)
        if (!bike) throw new BikeNotFoundError
        return bike
    }
}