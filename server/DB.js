import mongoose, { connect } from "mongoose";

export const DBconnection = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log(`mongoDb connected ${connect.connection.host}`);
  } catch (error) {
    console.log("Db connection failed", error.message);
    process.exit(1);
  }
};
