import { UserHasOpenRentError } from "../errors/user-has-open-rent-error";
import { RentRepo } from "../ports/rent-repo";
import { UserRepo } from "../ports/user-repo";
import { FindUser } from "./find-user";

export class RemoveUser {

    constructor (
        readonly userRepo: UserRepo,
        readonly rentRepo: RentRepo
    ){}

    findUser: FindUser = new FindUser(this.userRepo)

    async removeUser(email: string): Promise<void> {
        await this.findUser.findUser(email)
        if ((await this.rentRepo.findOpenFor(email)).length > 0) {
            throw new UserHasOpenRentError
        }
        await this.userRepo.remove(email)
    }

}