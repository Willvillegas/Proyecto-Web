import { IUser } from "../interfaces/user.interface";
import { UserService } from "../services/user.service";
import { Request, Response } from "express";


export class UserController {
    static async create(req: Request, res: Response) {
        try {
            const user: IUser = req.body;
            const newUser = await UserService.create(user);
            res.status(201).json(newUser);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async findAll(req: Request, res: Response) {
        try {
            const users = await UserService.findAll();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async findById(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const user = await UserService.findById(id);
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const user: IUser = req.body;
            const updateUser = await UserService.update(user);
            res.status(200).json(updateUser);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async login(req: Request, res: Response) {
        try {
            const { username, password } = req.body;
            const token = await UserService.login(username, password);
            if (token !== null) {
                res.status(200).json(token);
            } else {
                res.status(401).json('Invalid username or password');
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }
}