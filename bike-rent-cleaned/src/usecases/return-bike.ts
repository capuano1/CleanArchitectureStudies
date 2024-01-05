import { RentNotFoundError } from "../errors/rent-not-found-error";
import { BikeRepo } from "../ports/bike-repo";
import { RentRepo } from "../ports/rent-repo";


export class ReturnBike {

    constructor (
        readonly bikeRepo: BikeRepo,
        readonly rentRepo: RentRepo
    ){}

    async perform(bikeId: string, userEmail: string): Promise<number> {
        const now = new Date()
        const rent = await this.rentRepo.findOpen(bikeId, userEmail)
        if (!rent) throw new RentNotFoundError()
        await this.rentRepo.updateEnd(rent.id, now)
        await this.bikeRepo.updateAvailability(bikeId, true)
        const hours = diffHours(now, rent.start)
        return hours * rent.bike.rate
    }
}

function diffHours(dt2: Date, dt1: Date) {
    var diff = (dt2.getTime() - dt1.getTime()) / 1000
    diff /= (60 * 60)
    return Math.abs(diff)
}