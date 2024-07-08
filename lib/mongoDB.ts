import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDB = async (): Promise<void> => {
    mongoose.set("strictQuery", true)

    if (isConnected) {
        console.log("MongoDB is already Connected");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URL || "", {
            dbName: "Maven_Store"
        })

        isConnected = true;
        console.log("MongoDB is Connected");
    } catch (err) {
        console.log(err);
    }
};