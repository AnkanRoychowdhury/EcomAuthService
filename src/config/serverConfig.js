import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT;
export const SALT = bcrypt.genSaltSync(10);
export const JWT_KEY = process.env.JWT_SECRET_KEY;