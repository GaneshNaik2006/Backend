import dns from "node:dns";
import mongoose from "mongoose";
import { DB_NAME } from '../constants.js';

const DbConnection = async () => {
    try {
        dns.setServers(["1.1.1.1", "1.0.0.1", "8.8.8.8", "8.8.4.4"]);
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`\n MongoDB is connected ${connectionInstance.connection.host}`);

    } catch (error) {
        console.log("error in connecting database", error);
        process.exit(1);
    }
}

export default DbConnection;