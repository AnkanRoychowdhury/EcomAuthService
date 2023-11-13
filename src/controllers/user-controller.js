import UserService from "../services/user-service.js"

const userService = new UserService();

export const signup = async (req,res) => {
    try {
        const response = await userService.signUp({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role
        });
        return res.status(201).json({
            data: response,
            success: true,
            message: 'Successfully signed up',
            err: {}
        });
    } catch (error) {
        res.status(500).json({
            data:{},
            success: false,
            message: 'SignUp failed',
            err: error
        });
        throw error;
    }
}

export const signin = async (req,res) => {
    try {
        const response = await userService.signIn({
            email: req.body.email,
            password: req.body.password
        });
        return res.status(200).json({
            data: response,
            success: true,
            message: 'Successfully logged in',
            err: {}
        });
    } catch (error) {
        res.status(500).json({
            data:{},
            success: false,
            message: 'SignIn failed',
            err: error
        });
        throw error;
    }
}