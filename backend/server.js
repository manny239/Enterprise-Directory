import express from 'express'
import dotenv from 'dotenv'
import { connectToMongo } from './mongo_connection.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

  

//Fire up Server
const server = app.listen(PORT, async() => {
    console.log(`Serverr running on port ${PORT}`)
    await connectToMongo()
})

