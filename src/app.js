import express from 'express'
import { userRouter } from './routes/user.routes.js'
import { adminRouter } from './routes/admin.routes.js'
const app = express()

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))

app.use('/user', userRouter)
app.use('/admin', adminRouter)

export { app }  
