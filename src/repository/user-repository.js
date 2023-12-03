
import { Role, User } from '../models/index.js';
import AppErrors from '../utils/error-handler.js';
import { StatusCodes } from 'http-status-codes';

export default class UserRepository {
    
    async createUser (data) {
        let role;
        try {
            const user = await User.create(data);
            if(data.role){
                role = await this.getUserRole(data.role);
            }
            role = await this.getUserRole('CUSTOMER');
            user.roles.push(role);
            await user.save();
            return user;
        } catch (error) {
            throw new AppErrors();
        }
    }

    async getUserByEmail (userEmail) {
        try {
            const user = await User.findOne({email: userEmail});
            if(!user) {
                throw new AppErrors(
                    'EmailNotFound',
                    'Invalid email sent in request',
                    'Please Check the email provided, as there is no record of the email',
                    StatusCodes.NOT_FOUND
                );
            }
            return user;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async isExists (userEmail) {
        try {
            const user = await User.findOne({email: userEmail});
            if(user) {
                throw new AppErrors(
                    'ExistUserIssue',
                    'User is already exist',
                    'Please login to to proceed',
                    StatusCodes.OK
                );
            }
            return user;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getUserById (userId) {
        try {
            const user = await User.findById(userId).select("-password");
            return user;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async updateUser (userId,data) {
        try {
            const user = await User.findByIdAndUpdate(userId,data);
            return user;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async deleteUser (userId) {
        try {
            const response = await User.findByIdAndDelete(userId);
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getUserRole (roleName){
        try {
            const role = await Role.findOne({name: roleName});
            return role;
        } catch (error) {
            throw error;
        }
    }
}