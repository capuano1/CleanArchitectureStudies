import { Location } from "../domain/location";
import { BikeRepo } from "../ports/bike-repo";
import { FindBike } from "./find-bike";

export class MoveBikeTo {

    constructor(
        readonly bikeRepo: BikeRepo
    ){}

    findBike: FindBike = new FindBike(this.bikeRepo)

    async moveBikeTo(bikeId: string, location: Location): Promise<void> {
        await this.findBike.findBike(bikeId)
        await this.bikeRepo.updateLocation(bikeId, location.latitude, location.longitude)
    }
}