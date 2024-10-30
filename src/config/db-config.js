import mongoose from 'mongoose';


const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/hms';

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(uri);
        console.log(`Database Connected on HOST - ${connection.connection.host}.`);
    } catch (error) {
        console.error(`Error while connecting db : ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;
