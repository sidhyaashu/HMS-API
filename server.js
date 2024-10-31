import app from "./src/app.js";
import dotenv from "dotenv";
import connectDB from "./src/config/db-config.js";

dotenv.config();

// Set default port if not provided in environment variables
const PORT = process.env.PORT || 5000;

// Connect to database and start server
(async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error(`Error connecting to the database: ${error.message}`);
        process.exit(1); 
    }
})();
