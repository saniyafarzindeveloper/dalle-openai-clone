import mongoose from "mongoose";

//funct to connect db
const connectDB = (url) => {
    mongoose.set('strictQuery', true);

    mongoose.connect(url)
    .then(() => console.log('mongoDB connected'))
    .catch((err) => console.log(err)) 
}

export default connectDB;