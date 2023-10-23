import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

// export const connectDB = () => {
//      mongoose.connect(process.env.MONGODB_URL, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,

//     }, { family: 4 }
//     ).then(() => console.log("connected to database successfully")).catch((error) => {
//         console.log("Database connection failed ")
//         console.error(error)
//         process.exit(1)
//     })
// }

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
export const connectToDatabase = async () => {
  let isConnected = false;
  let retryCount = 0;

  while (!isConnected) {
    try {
      await mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      isConnected = true;
      console.log("Connected to MongoDB successfully");
    } catch (error) {
      console.error("Database connection failed");
      console.error(error);

      // Increase the delay between retry attempts (e.g., exponential backoff).
      const retryDelay = Math.pow(1, retryCount) * 1000;
      retryCount++;
      console.log(`Retrying in ${retryDelay / 1000} seconds...`);

      // Wait for the specified delay before the next retry.
      await delay(retryDelay);
    }
  }
};

connectToDatabase();
