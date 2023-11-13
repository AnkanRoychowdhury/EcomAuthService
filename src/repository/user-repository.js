
import { Role, User } from '../models/index.js';

export default class UserRepository {
    
    async createUser (data) {
        try {
            const role = await this.getUserRole(data.role);
            const user = await User.create(data);
            user.roles.push(role);
            await user.save();
            return user;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getUserByEmail (userEmail) {
        try {
            const user = await User.findOne({email: userEmail});
            return user;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getUserById (userId) {
        try {
            const user = await User.findById(userId);
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