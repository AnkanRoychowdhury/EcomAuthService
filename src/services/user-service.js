import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { SALT, JWT_KEY } from '../config/serverConfig.js';
import UserRepository from './../repository/user-repository.js';
import AppErrors from '../utils/error-handler.js';
import { StatusCodes } from 'http-status-codes';

export default class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async #createUser (data) {
        try {
            const hashPassword = this.#encryptPassword(data.password);
            data.password = hashPassword;
            const user = await this.userRepository.createUser(data);
            return user;
        } catch (error) {
            throw error;
        }
    }

    async getUserByEmail(userEmail){
        try {
            const user = await this.userRepository.getUserByEmail(userEmail);
            return user;
        } catch (error) {
            throw error;
        }
    }

    async signUp (data) {
        try {
            await this.userRepository.isExists(data.email);
            // if(oldUser){
            //     throw {error: 'User already exist'}
            // }
            const newUser = await this.#createUser(data);
            return newUser;
        } catch (error) {
            throw error;
        }
    }

    /**
     * 
     * @param {*} email 
     * @param {*} plainPassword
     * Here can have two cases :
     * 1 => IF User exist : compare password & create JWT token
     * 2 => If User doesn't exist throw message for signup
     */
    async signIn(data){
        try {
            const user = await this.userRepository.getUserByEmail(data.email);
            const matchPassword = this.#comparePassword(data.password,user.password);
            if(!matchPassword){
                throw new AppErrors(
                    'EmailNotFound',
                    'Please check your email & password',
                    "User doesn't exist with the given email & password",
                    StatusCodes.NOT_FOUND
                );
            }
            const newJWT = this.#createToken({email:user.email,id:user.id,role: user.roles});
            return newJWT;
        } catch (error) {
            if(error.name == 'EmailNotFound'){
                throw error;
            }
            throw error;
        }
    }

    async isAuthenticate (token) {
        try {
            const response = this.#verifyToken(token);
            if(!response){
                throw {error: 'Invalid Token'}
            }
            const user = await this.userRepository.getUserById(response.id);
            if(!user){
                throw {error: 'Invalid User'}
            }
            return user;
        } catch (error) {
            throw error;
        }
    }

    #createToken(user){
        try {
            const token = jwt.sign(user,JWT_KEY, {expiresIn: '30 days'});
            return token;
        } catch (error) {
            throw new AppErrors(
                'TokenIssue',
                "Token creation failed",
                "Something went wrong",
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }

    #verifyToken(token) {
        try {
            const response = jwt.verify(token,JWT_KEY);
            return response;
        } catch (error) {
            throw new AppErrors(
                'TokenIssue',
                "Invalid Token",
                "Please check your Access Token",
                StatusCodes.BAD_REQUEST
            );
        }
    }

    #comparePassword(userInputPassword,hashPassword){
        try {
            const response = bcrypt.compareSync(userInputPassword, hashPassword);
            return response;
        } catch (error) {
            console.log("Something went wrong in password checking");
            throw error;
        }
    }

    #encryptPassword(plainPassword){
        const encryptedPassword = bcrypt.hashSync(plainPassword,SALT);
        return encryptedPassword;
    }
}