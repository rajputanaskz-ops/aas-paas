import dotenv from 'dotenv'
import { connectDB } from './db/connection.js'
import { app } from "./app.js"

dotenv.config({ path: './.env' })
connectDB()
    .then(() => {
        app.listen(process.env.PORT, '0.0.0.0', () => {
            console.log(`Server is listening on port no ${process.env.PORT}`)
        })
    })
    .catch((err) => {
        console.log("MONGO_DB Connection Failed,Error:", err)
    })