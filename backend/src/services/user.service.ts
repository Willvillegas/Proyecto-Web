import { IUser } from "../interfaces/user.interface";
import { UserRepository } from "../repositories/user.repository";
import { jwtGenerate } from "../utils/JWT";

export class UserService {
    static async create(user: IUser): Promise<IUser> {
        return UserRepository.create(user);
    }

    static async findAll(): Promise<IUser[]> {
        return UserRepository.findAll();
    }

    static async findById(id: string): Promise<IUser | null> {
        return UserRepository.findById(id);
    }

    static async update(user: IUser): Promise<IUser | null> {
        return UserRepository.update(user);
    }

    /**
     * login user
     */
    static async login(username: string, password: string): Promise<string | null> {
        //find user by username
        const user = await UserRepository.findByUsername(username);
        // if user is found, generate token
        if (!user) return null;
        //compare password
        if (user.password === password) {
            const token = jwtGenerate(user);
            return token;
        }
        return null;
    }
}