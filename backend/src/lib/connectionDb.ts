import mongoose from 'mongoose';



const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI as string);
        console.log(`MongoDB Connected Successfully`);
    } catch (error) {
        if (error instanceof Error) {
            console.error(`Error: ${error.message}`);
        } else {
            console.error('Unknown error occurred:', error);
        }
        process.exit(1);
    }
};

export default connectDB;