import { IUser } from "../interfaces/user.interface";
import { UserRepository } from "../repositories/user.repository";
import dotenv from 'dotenv';

dotenv.config();

export class UserService {
    static async create(user: IUser): Promise<IUser> {
        try {
            return await UserRepository.create(user);
        } catch (error) {
            const err = error as Error;
            if (err.message === 'User already exists') {
                throw new Error('User already exists');
            }
            throw new Error('An error occurred while creating the user');
        }
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

    static async login(username: string, password: string): Promise<IUser | null> {
        const user = await UserRepository.findByUsername(username);
        if (!user) return null;
        const isPasswordValid = password===user.password?true:false;
        if (!isPasswordValid) return null;
        return user;
    }
}