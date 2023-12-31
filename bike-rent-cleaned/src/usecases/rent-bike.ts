import { Rent } from "../domain/rent"
import { UnavailableBikeError } from "../errors/unavailable-bike-error"
import { BikeRepo } from "../ports/bike-repo"
import { RentRepo } from "../ports/rent-repo"
import { UserRepo } from "../ports/user-repo"
import { FindBike } from "./find-bike"
import { FindUser } from "./find-user"


export class RentBike {

    constructor (
        readonly bikeRepo: BikeRepo,
        readonly userRepo: UserRepo,
        readonly rentRepo: RentRepo
    ){}

    findBike: FindBike = new FindBike(this.bikeRepo)
    findUser: FindUser = new FindUser(this.userRepo)

    async rentBike(bikeId: string, userEmail: string): Promise<string> {
        const bike = await this.findBike.findBike(bikeId)
        if (!bike.available) throw new UnavailableBikeError
        const user = await this.findUser.findUser(userEmail)
        await this.bikeRepo.updateAvailability(bikeId, false)
        const newRent = new Rent(bike, user, new Date())
        return await this.rentRepo.add(newRent)
    }
}