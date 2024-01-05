import { User } from "../domain/user";
import { UserRepo } from "../ports/user-repo";

export class ListUsers {

    constructor(
        readonly userRepo: UserRepo
    ){}

    async perform(): Promise<User[]> {
        return await this.userRepo.list()
    }
}