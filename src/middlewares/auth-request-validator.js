import jwt from 'jsonwebtoken';
import { JWT_KEY } from '../config/serverConfig.js';



export const CheckAccessToken = (req,res,next) => {
    const token = req.headers['x-access-token'];
    const response = verifyToken(token);
    if(!response){
        return res.status(401).json({
            data: {},
            success: false,
            message: 'Please Check the access token',
            err: 'Not Authorized'
        });
    }
    next();
}

const verifyToken = (token) => {
    try {
        const response = jwt.verify(token, JWT_KEY);
        return response;
    } catch (error) {
        console.log("Something went wrong in token creation");
        throw error;
    }
}
