import express from 'express'
import dotenv from 'dotenv'
import { connectToMongo } from './mongo_connection.js'
import authRouter from './routes/auth.js'
import userRouter from './routes/user.js'



dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use('/api', authRouter);
app.use('/api', userRouter)


  

//Fire up Server
const server = app.listen(PORT, async() => {
    console.log(`Serverr running on port ${PORT}`)
    await connectToMongo()
})

