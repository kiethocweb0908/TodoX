import mongoose from 'mongoose'

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTIONSTRING);
        console.log('liên kết csdl thành công')
    } catch (error) {
        console.error('lỗi khi kết nối csdl: ', error);
        console.log("URI:", process.env.MONGODB_CONNECTIONSTRING);
        process.exit(1);
    }
};