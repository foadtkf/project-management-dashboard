import mongoose from "mongoose";

export async function connect() {
  await mongoose
    .connect(process.env.MONGO_URI as string, {
      tls: true,
    })
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.log("Error connecting to MongoDB", err);
    });
}
