export interface CryptPassword {
    encrypt(plain: string): Promise<string>
    authPassword(plain: string, encrypted: string): Promise<boolean>
}