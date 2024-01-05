import { User } from "../domain/user";
import { UserRepo } from "../ports/user-repo";
import { UserNotFoundError } from "../errors/user-not-found-error";

export class FindUser {

    constructor(
        readonly userRepo: UserRepo
    ) {}

    async perform (email: string): Promise<User> {
        const user = await this.userRepo.find(email)
        if (!user) throw new UserNotFoundError()
        return user
    }
}