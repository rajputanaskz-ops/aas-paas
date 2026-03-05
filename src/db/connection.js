import mongoose from "mongoose"

const connectDB= async ()=>{
    try {
        const connectionInstance=await mongoose.connect(`${process.env.DB_URI}/${process.env.DB_NAME}`)
        // console.log(`ConnectionInstance:`,connectionInstance)
    } catch (error) {
        console.log("Database Connection Failed, Error:",error)
    }
}

export {connectDB}