import { NextFunction, Request, Response } from 'express';
import User from '../models/UserModel';
import mongoose from 'mongoose';

const userController = {
    createUser: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { username, email, password } = req.body;
            if (!username || !email || !password) {
                return res.status(400).json({ message: 'Missing data' });
            }

            const isUserExists = await User.findOne({ email }).exec();
            if (isUserExists) return res.status(401).json({ message: 'User Already Exists' });

            const user = new User({
                _id: new mongoose.Types.ObjectId(),
                username,
                email,
                password
            });
            return user
                .save()
                .then((user) => res.status(201).json({ user }))
                .catch((error) => {
                    res.status(500).json({ error });
                });
        } catch (err) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
};

export default { userController };
