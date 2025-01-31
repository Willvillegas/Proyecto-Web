import { IUser } from "../interfaces/user.interface";
import { UserRepository } from "../repositories/user.repository";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = 'SECRET_KEY';

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

    static async login(username: string, password: string): Promise<string | null> {
        const user = await UserRepository.findByUsername(username);
        console.log(user);
        if (!user) return null;
        if (user.password === password) {
            const token = jwt.sign(
                { id: user._id, isAdmin: user.isAdmin },
                JWT_SECRET,
                { expiresIn: '1h' }
            );
            return token;
        }
        return null;
    }
}