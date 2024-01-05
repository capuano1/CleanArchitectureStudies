import { User } from "../domain/user";
import { UserRepo } from "../ports/user-repo";
import { DuplicateUserError } from "../errors/duplicate-user-error";
import { Crypt } from "../crypt";


export class RegisterUser {

    crypt: Crypt = new Crypt()

    constructor(
        readonly userRepo: UserRepo
    ){}

    async perform (user: User): Promise<string> {
        if (await this.userRepo.find(user.email)) {
            throw new DuplicateUserError()
        }
        const encryptedPassword = await this.crypt.encrypt(user.password)
        user.password = encryptedPassword
        return await this.userRepo.add(user)
    }
}