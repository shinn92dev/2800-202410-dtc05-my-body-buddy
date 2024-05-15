import mongoose from "mongoose";

export const connectMongoDB = async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@mybodybuddydb.3gwp6yi.mongodb.net/MyBodyBuddy`
        );
        console.log("✓Connected to MongoDB.");
    } catch (error) {
        console.log("❌Error connecting to MongoDB: ", error);
    }
};
