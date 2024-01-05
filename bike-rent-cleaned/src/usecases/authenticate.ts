import { CryptPassword } from "../ports/crypt-password";
import { UserRepo } from "../ports/user-repo";
import { FindUser } from "./find-user";


export class Authenticate {

    constructor(
        readonly userRepo: UserRepo,
        readonly crypt: CryptPassword
    ){}

    findUser: FindUser = new FindUser(this.userRepo)

    async perform (userEmail: string, password: string): Promise<boolean> {
        const user = await this.findUser.perform(userEmail)
        return await this.crypt.authPassword(password, user.password)
    }
}