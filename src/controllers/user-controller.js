import UserService from "../services/user-service.js"
import { StatusCodes } from 'http-status-codes';

const userService = new UserService();

export const signup = async (req,res) => {
    try {
        const response = await userService.signUp({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role
        });
        return res.status(StatusCodes.CREATED).json({
            data: response,
            success: true,
            message: 'Successfully Signed Up',
            err: {}
        });
    } catch (error) {
        console.log(error)
        return res.status(error.statusCode).json({
            data: {},
            success: false,
            message: error.message,
            err: error.explanation
        });
    }
}

export const signin = async (req,res) => {
    try {
        const response = await userService.signIn({
            email: req.body.email,
            password: req.body.password
        });
        return res.status(StatusCodes.OK).json({
            data: response,
            success: true,
            message: 'Successfully Logged In',
            err: {}
        });
    } catch (error) {
        return res.status(error.statusCode).json({
            data: {},
            success: false,
            message: error.message,
            err: error.explanation
        });
    }
}

export const isAuthenticated = async (req,res) => {
    try {
        const token = req.headers['x-access-token'];
        const response = await userService.isAuthenticate(token);
        return res.status(StatusCodes.OK).json({
            data: response,
            success: true,
            message: 'Authenticated User Successfully',
            err: {}
        });
    } catch (error) {
        return res.status(error.statusCode).json({
            data: {},
            success: false,
            message: error.message,
            err: error.explanation
        });
    }
}