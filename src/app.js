import express from 'express'
import { userRouter } from './routes/user.routes.js'
const app = express()

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))

app.use('/user', userRouter)

export { app }  
