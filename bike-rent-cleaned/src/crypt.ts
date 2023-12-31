import bcrypt from 'bcrypt'
import { CryptPassword } from './ports/crypt-password'

export class Crypt implements CryptPassword {
    private rounds = 10

    async encrypt(plain: string): Promise<string> {
        return await bcrypt.hash(plain, this.rounds)
    }

    async authPassword(plain: string, encrypted: string): Promise<boolean> {
        return await bcrypt.compare(plain, encrypted)
    }
}