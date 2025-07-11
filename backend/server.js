import express from 'express'
import dotenv from 'dotenv'
import { connectToMongo } from './mongo_connection.js'
import authRouter from './routes/auth.js'
import validDataRouter from './routes/validData.js'
import cors from 'cors'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
})); 
app.use(express.json())
app.use('/api/auth', authRouter);
app.use('/api/valid', validDataRouter);

//Fire up Server
const server = app.listen(PORT, async() => {
    console.log(`Server running on port ${PORT}`)
    await connectToMongo()
})

