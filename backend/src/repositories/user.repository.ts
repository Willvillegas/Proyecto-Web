import { User } from "../models/user.model";
import { IUser } from "../interfaces/user.interface";

export class UserRepository {
    /**
     * Creates a new user in the database
     * @param user Interface IUser
     * @returns Promise<IUser>
     */
    static async create(user: IUser): Promise<IUser> {
        const existingUser = await User.findOne({ username: user.username }).exec();
        if (existingUser) {
            throw new Error('User already exists');
        }
        
        const newUser = new User(user);
        const savedUser = await newUser.save();
        return savedUser;
    }

    /**
     * Retrieves all users from the database
     * @returns Promise<IUser[]>
     */
    static async findAll(): Promise<IUser[]> {
        return User.find().exec();
    }

    /**
     * Retrieves a single user by ID
     * @param id string
     * @returns Promise<IUser>
     */
    static async findById(id: string): Promise<IUser | null> {
        return User.findById(id).exec();
    }

    /**
     * Edits a user by ID
     * @param id string
     * @param user Interface IUser
     * @returns Promise<IUser | null>
     * 
     */
    static async update(user: IUser): Promise<IUser | null> {
        return User.findByIdAndUpdate(user._id, user, { new: true }).exec();
    }

    /**
     * find user by username
     * @param username string
     * @returns Promise<IUser | null>
     */
    static async findByUsername(username: string): Promise<IUser | null> {
        return User.findOne({ username }).exec();
    }

}