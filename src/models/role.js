import mongoose from 'mongoose';
const { Schema } = mongoose;

const roleSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    }
},{timestamps: true});

const Role = mongoose.model('Role', roleSchema);

export {Role as default}
