import { Location } from "../domain/location";
import { BikeRepo } from "../ports/bike-repo";
import { FindBike } from "./find-bike";

export class MoveBikeTo {

    constructor(
        readonly bikeRepo: BikeRepo
    ){}

    findBike: FindBike = new FindBike(this.bikeRepo)

    async perform(bikeId: string, location: Location): Promise<void> {
        await this.findBike.perform(bikeId)
        await this.bikeRepo.updateLocation(bikeId, location.latitude, location.longitude)
    }
}