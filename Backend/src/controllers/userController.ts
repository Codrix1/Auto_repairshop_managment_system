// Login User
import User from "../models/User";
import { Request, Response, NextFunction } from "express";
import bcrypt from 'bcryptjs'
import { generateToken } from "../utils/auth";


export const addUser = async (request: Request, response: Response) => {
    try {
        const { username, password, role, permissions} = request.body;
        const user = await User.create({ username: username, password: password, role: role, permissions: permissions});

        if (!user) {
            response.status(500).json({ message: "Error adding employee" });
            return;
        }

        response.status(200).json({ message: "User registered successfully.", username: username, role: role});

    }
    catch (err: any) {
        response.status(500).json({ message: err.message })
    }
}

export const getAllUsers = async (request: Request, response: Response) => {
    try {
        const users = await User.find();
        if (!users) {
            response.status(500).json("No users found")
        }
        response.status(200).json(users);
        return;
    }
    catch (err: any) {
        response.status(500).json({ message: err.message })
    }
}

export const getUserById = async (request: Request, response: Response) => {
    try {
        const userId = request.params.id;
        const user = await User.find({ _id: userId });
        if (!user) {
            response.status(500).json("No user found")
        }
        response.status(200).json(user);
        return;
    }
    catch (err: any) {
        response.status(500).json({ message: err.message })
    }
}

export const updateUser = async (request: Request, response: Response) => {
    try {
        const userId = request.params.id;
        const updateFields = request.body;
        const user = await User.findOneAndUpdate(
            { _id: userId },
            updateFields,
            { new: true, omitUndefined: true }
        );
        if (!user) {
            response.status(500).json("No user found");
            return;
        }
        response.status(200).json(user);
    }
    catch (err: any) {
        response.status(500).json({ message: err.message })
    }
}

export const deleteUser = async (request: Request, response: Response) => {
    try {
        const userId = request.params.id;
        const user = await User.findOneAndDelete({ _id: userId });
        if (!user) {
            response.status(500).json("No user found")
            return;
        }
        response.status(200).json(user);
    }
    catch (err: any) {
        response.status(500).json({ message: err.message })
    }
}

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { name, password } = req.body;
        const user = await User.findOne({ name: name });
        if (user && (await bcrypt.compare(password, user.password))) {
            res.status(200).json({
                message: "Logged in successfully",
                _id: user._id,
                username: user.username,
                role: user.role,
                token: generateToken(user._id, user.role),
            });
        } else {
            res.status(401).json({ error: 'Invalid Data' });
        }
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};