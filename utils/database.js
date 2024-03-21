import mongoose from 'mongoose';

let isConneted = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);
    if (isConneted) {
        console.log("mongoDB is already connected");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
          dbName: "shsre_prompt",
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        isConneted = true;
        console.log('mongoDB connected')
    } catch (error) {
        console.log(error)
    }
}