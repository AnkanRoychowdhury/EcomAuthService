import mongoose from "mongoose";

const DB_NAME = process.env.DB_NAME;
const URI = process.env.CONNECTION_URI;

const DBConnect = async () => {
    try {
        const connection = await mongoose.connect(`${URI}${DB_NAME}`);
        if(connection.STATES.connected){
            console.log('Database Connected Successfully');
        }
    } catch (error) {
        throw {error};
    }
}

export {DBConnect as default}