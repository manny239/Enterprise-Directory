import express from 'express'
import dotenv from 'dotenv'
import { connectToMongo } from './mongo_connection.js'
import authRouter from './routes/auth.js'
import predictRouter from './routes/predict.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use('/api', authRouter)
app.use('/api', predictRouter)

app.get ("/api/status", (req, res) => {
    res.status (200).json ({status: "Server is running!"})
})

//Fire up Server
const server = app.listen(PORT, async() => {
    console.log(`Server running on port ${PORT}`)
    await connectToMongo()
})

