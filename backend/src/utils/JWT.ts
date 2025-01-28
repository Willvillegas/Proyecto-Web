import { sign, verify } from "jsonwebtoken";
import { IUser } from "../interfaces/user.interface";


export const jwtGenerate = (user: IUser): string => {
    return sign({
        _id: user._id,
        name: user.name,
        username: user.username,
        isAdmin: user.isAdmin
    }, process.env.JWT as string, { expiresIn: '1d' });
}
export const jwtVerify = (token: string): IUser | null => {
    try {
        return verify(token, process.env.JWT as string) as IUser;
    } catch (error) {
        throw new Error('Invalid token' + error);
    }
}