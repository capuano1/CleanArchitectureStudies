import { Bike } from "../domain/bike";
import { BikeRepo } from "../ports/bike-repo";

export class ListBikes {

    constructor(
        readonly bikeRepo: BikeRepo
    ){}

    async perform(): Promise<Bike[]> {
        return await this.bikeRepo.list()
    }

}