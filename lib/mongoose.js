import mongoose from 'mongoose';

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('connected to db....?');
  } catch (error) {
    console.log(error.message);
  }
};
export default connectToDatabase;
