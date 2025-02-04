import { hash, compare } from 'bcrypt'

export const hashPassword = async (password: string): Promise<string> => {
    if (!process.env.SALT_ROUNDS) {
        throw new Error("La variable de entorno SALT debe estar definida");
    }
    return hash(password, 20);
}

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
    return compare(password, hash);
}